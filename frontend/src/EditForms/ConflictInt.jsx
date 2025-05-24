import { useState } from "react";
import useLoadFormData from "../hooks/useLoadFormData";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const  ConflictoInt = ({option,setOption}) => {
    
    const [conflict, setConflict] = useState({   
        idF: 32,
        conflictOfInterest:"" 
    });
    const [newErrorsD,setNewErrorsD] = useState({
        conflictOfInterest:""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConflict({ ...conflict, [name]: value });
    };
    
    const handleOnSubmitFormBack = useSubmitFormBack(conflict, setOption);
    const handleOnSubmitForm = useSubmitFormNext(conflict, setOption);

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        if (!conflict.conflictOfInterest || (typeof conflict.conflictOfInterest === 'string' 
            && conflict.conflictOfInterest.trim() === '')) {
                newErrorsDF.conflictOfInterest = "El campo es requerido";
        }
        setNewErrorsD(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmitForm(event)
        }
    }
    
    useLoadFormData(conflict.idF,setConflict);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Conflicto de interés</p>
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                        <p className="text-[17px] text-gray-600">(Declarar si existe un interés laboral, personal, profesional, 
                            familiar o el proyecto está ligado a la industria farmacéutica, que pueda afectar el desempeño
                            imparcial de alguno de los participantes)
                            <br/> {newErrorsD.conflictOfInterest && <span className="text-red-600">*{newErrorsD.conflictOfInterest}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px]
                            hover:border-[#5CB7E6] transition-colors duration-300
                             flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                            name="conflictOfInterest" 
                            value={conflict.conflictOfInterest}
                            onChange={handleChange}
                            placeholder="Escribe los conflictos de interes..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-20 !mb-5">
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

export default ConflictoInt;