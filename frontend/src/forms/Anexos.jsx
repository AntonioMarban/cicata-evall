import { useState, useEffect } from "react";
import useLoadFormData from "../hooks/useLoadFormData";
import DragDrop from "../components/DragDrop";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const  Anexos = ({option,setOption}) => {
    
    const [filesSend,setFilesSend] = useState([]);
    const [anexos, setAnexos] = useState({   
        idF: 14,
        aditionalComments:"",
        afilesSend: filesSend 
    });
    const [newErrors,setNewErrors] = useState({
        aditionalComments:"*"
    });

    const handleOnSubmitFormBack = useSubmitFormBack(anexos, setOption);
    const handleOnSubmit = useSubmitFormNext(anexos, setOption);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnexos({ ...anexos, [name]: value });
    };
    useLoadFormData(anexos.idF,setAnexos);

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        if (!anexos.aditionalComments || (typeof anexos.aditionalComments === 'string' 
            && anexos.aditionalComments.trim() === '')) {
                newErrorsDF.aditionalComments = "* El campo es requerido";
        }
        setNewErrors(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmit(event)
        }
    };

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
    console.log(anexos)
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Agrega comentarios adicionales a tener en cuenta en el proyecto
                        {newErrors.aditionalComments && (
                            <>
                                {newErrors.aditionalComments !== '*' && <br />}
                                <span className="text-red-600"> {newErrors.aditionalComments}</span>
                            </>
                        )}  
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
                 hover:bg-[#4CA6D5] transition-colors duration-300" onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </div>
    )
}

export default Anexos;