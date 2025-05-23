import { useState, useEffect } from "react";
import { updateForm,getAllData } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import DragDrop from "../components/DragDrop";
import { useNavigate  } from 'react-router-dom'
import useSubmitFormBack from "../hooks/useSubmitFormBack";

const  Anexos = ({option,setOption}) => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    
    const [filesSend,setFilesSend] = useState([]);
    const [anexos, setAnexos] = useState({   
        idF: 33,
        aditionalComments:"",
        afilesSend: filesSend 
    });
    const [newErrors,setNewErrors] = useState({
        aditionalComments:""
    });
    const handleOnSubmitFormBack = useSubmitFormBack(anexos, setOption);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await updateForm(anexos);
        } catch (error) {
            //console.error("Error saving form to IndexedDB:", error);
            alert("Error al guardar el formulario. Por favor, inténtalo de nuevo.");
            return; 
        }

        try {
            const formData = await getFormsInRange(20, 33);
            if (!formData) {
                throw new Error("No se encontraron datos del formulario.");
            }
    
            const { afilesSend, efilesSend, idF, ...cleanFormData } = formData;
            const userId = localStorage.getItem('userId');
            cleanFormData.userId = userId;
    
            //console.log("Submitting project data:", cleanFormData);
            //console.log("Files to upload (afilesSend):", afilesSend);
           
            const response = await fetch(`${apiUrl}/researchers/projects`, {
                method: 'POST',
                body: JSON.stringify(cleanFormData),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            if (data.projectId) {
                //console.log("Project created successfully, ID:", data.projectId);
                
                if ((afilesSend && afilesSend.length > 0) || (efilesSend && efilesSend.length > 0)) {
                    try {
                        //console.log("Uploading document:", afilesSend[0].name);
                        
                        const formDataFiles = new FormData();
                        formDataFiles.append('projectId', data.projectId);
                        if (afilesSend){
                        Object.entries(afilesSend).forEach(([key, value]) => {
                            formDataFiles.append('documents',value)
                        });
                        }
                        if (efilesSend){
                        Object.entries(efilesSend).forEach(([key, value]) => {
                            formDataFiles.append('documents',value)
                        });
                        }
                        //console.log(formDataFiles)
                        const uploadResponse = await fetch(`${apiUrl}/researchers/projects/upload`, {
                            method: 'POST',                    
                            body: formDataFiles,
                        });
    
                        if (!uploadResponse.ok) {
                            throw new Error(`File upload failed: ${uploadResponse.status}`);
                        }
    
                        const uploadData = await uploadResponse.json();
                        
                        if (uploadData.message == 'Documents uploaded successfully') {
                            console.log("File uploaded successfully:", uploadData.message);
                            // navigate(`/VerFormulario/${data.projectId}`);
                            // indexedDB.deleteDatabase('Cicata');
                        } else {
                            console.warn("Upload succeeded but no confirmation message:", uploadData);
                        }
                    } catch (uploadError) {
                        console.error("Error uploading file:", uploadError);
                        alert("El proyecto se creó, pero hubo un error al subir el archivo.");
                    }
                } else {
                    // navigate(`/VerFormulario/${data.projectId}`);
                    // indexedDB.deleteDatabase('Cicata');
                }
            } else {
                throw new Error("Missing projectId in server response.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error al enviar el formulario. Por favor, inténtalo de nuevo.");
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnexos({ ...anexos, [name]: value });
    };
    useLoadFormData(anexos.idF,setAnexos);

    useEffect(()=>{
        if (anexos.afilesSend && 
            Array.isArray(anexos.afilesSend) && 
            anexos.afilesSend.length > 0 && 
            (!filesSend || filesSend.length === 0)) {
            
            setFilesSend(anexos.afilesSend);
        }
    },[anexos.afilesSend])

    useEffect(()=>{
        setAnexos(prevState=>({
            ...prevState,
            afilesSend: filesSend
        })
        )
    },[filesSend])

    const handleDeleteFile = (index) => {
        const newFileNames = [...anexos.afilesSend];
        const newFiles = Array.from(anexos.afilesSend);
      
        newFileNames.splice(index, 1);
        newFiles.splice(index, 1);
      
        setFilesSend(newFiles);
    };

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        if (!anexos.aditionalComments || (typeof anexos.aditionalComments === 'string' 
            && anexos.aditionalComments.trim() === '')) {
                newErrorsDF.aditionalComments = "El campo es requerido";
        }
        setNewErrors(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmit(event)
        }
    };


    return (
        <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Agrega comentarios adicionales a tener en cuenta en el proyecto
                        <br/> {newErrors.aditionalComments && <span className="text-red-600">*{newErrors.aditionalComments}</span>}
                    </p>
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <textarea  
                            className="w-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start 
                            hover:border-[#5CB7E6] transition-colors duration-300
                            items-start text-gray-600 mt-3 min-w-[250px]"
                            name="aditionalComments" 
                            value={anexos.aditionalComments}
                            onChange={handleChange}
                            placeholder="Escribe los comentarios adicionales..."></textarea>
                            <div className="!mt-5 w-1/2">
                                <p className="text-[18px] !mb-5">Agregar archivos anexos al proyecto</p>
                                                        <DragDrop 
                                                            setFilesSend={setFilesSend} 
                                                            filesSend={filesSend} 
                                                            tagType="Anexos"
                                                        />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-5 !mb-5">
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" onClick={handleSubmitWithValidation}>Enviar formulario</button>
            </div>
        </form>
    )
}

export default Anexos;