import { useState } from "react";
import useLoadFormData from "../hooks/useLoadFormData";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const  Considerations = ({option,setOption}) => {
    const [considerationsBio, setConsiderationsBio] = useState(
        {   idF: 8,
            biosecurityConsiderations:"" });
    const [newErrorsD,setNewErrorsD] = useState({
            biosecurityConsiderations:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsiderationsBio({ ...considerationsBio, [name]: value });
    };
    
    useLoadFormData(considerationsBio.idF,setConsiderationsBio);

    
    const handleOnSubmitFormBack = useSubmitFormBack(considerationsBio, setOption);
    const handleOnSubmitFormNext = useSubmitFormNext(considerationsBio, setOption);
    
    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        if (!considerationsBio.biosecurityConsiderations || (typeof considerationsBio.biosecurityConsiderations === 'string' 
            && considerationsBio.biosecurityConsiderations.trim() === '')) {
                newErrorsDF.biosecurityConsiderations = "El campo es requerido";
        }
        setNewErrorsD(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmitFormNext(event)
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-between h-[59vh]">
                <div>
                    <p className="text-[22px]">Consideraciones de bioseguridad de la investigación</p>
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <p className="text-[17px] text-gray-600">(Describir el tipo de riesgo que presenta la investigación, 
                                así como mencionar las acciones que se llevarán a cabo para salvaguardar a los pacientes, animales 
                                de laboratorio, el ambiente, estudiantes, investigadores o cualquier involucrado en el desarrollo 
                                del proyecto) <br/> 
                                {newErrorsD.biosecurityConsiderations && <span className="text-red-600">*{newErrorsD.biosecurityConsiderations}</span>}</p>
                            <textarea  
                                className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                                name="biosecurityConsiderations" 
                                value={considerationsBio.biosecurityConsiderations}
                                onChange={handleChange}
                                placeholder="Escribe las consideraciones de bioseguridad..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </div>
    )
}

export default Considerations;