import { useState, useEffect } from "react";
import { updateForm,getAllData } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import DragDrop from "../components/DragDrop";
import { useNavigate  } from 'react-router-dom'

const  Anexos = ({option,setOption}) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [filesForms, setFilesForms] = useState([]);
    const [response, setResponse] = useState();
    const [filesSend,setFilesSend] = useState([]);
    const [anexos, setAnexos] = useState({   
        idF: 14,
        aditionalComments:"",
        afilesSend: filesSend 
    });
    const [newErrors,setNewErrors] = useState({
        aditionalComments:""
    });

    const [forms,setForms] = useState([]);
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            await updateForm(anexos);

        } catch(error){
            alert("Error al guardar el formulario",error);
        }
        try{
            const  formData  = await getAllData();
            if(formData){
                const { afilesSend, efilesSend,idF, ...cleanFormData } = formData;
                setForms(cleanFormData)
                setFilesForms(formData.afilesSend, formData.efilesSend);
                console.log(cleanFormData)
                const response = await fetch(`${apiUrl}/researchers/projects`, {
                    method: 'POST',
                    body: forms,
                  });
            
                  const data = await response.json();
                  if (data.idProject) {
                    navigate(`/VerFormulario/${data.idProject}`);
                  }
            }
        }catch(error){
           alert("Error al obtener el formulario",error);
        }
    }
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
                            className="w-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                            name="aditionalComments" 
                            value={anexos.aditionalComments}
                            onChange={handleChange}
                            placeholder="Escribe los comentarios adicionales..."></textarea>
                            <div className="!mt-5 w-1/2">
                                <p className="text-[18px] !mb-5">Agregar archivos anexos al proyecto</p>
                                <DragDrop setFilesSend={setFilesSend} filesSend={filesSend} />
                                {anexos.afilesSend.length > 0 && (
                                    <div className="!p-0 w-full  h-1/3 overflow-y-auto flex flex-col justify-center items-center rounded-[30px]">
                                    <ul className="!p-2 text-sm text-gray-800  w-[80%]">
                                        {anexos.afilesSend.map((file, index) => (
                                            <li key={index} className="flex justify-between">
                                            <p>{file.name}</p>
                                            <button className="cursor-pointer" type="button" onClick={()=>{handleDeleteFile(index)}}>Eliminar</button>
                                            </li>
                                        ))}
                                    </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-5 !mb-5">
                <button className="!p-2 !mr-5 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleSubmitWithValidation}>Enviar formulario</button>
            </div>
        </form>
    )
}

export default Anexos;