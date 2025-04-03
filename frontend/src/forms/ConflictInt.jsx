import { useState } from "react";
import { updateForm  } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";

const  ConflictoInt = ({option,setOption}) => {
    const [conflict, setConflict] = useState(
        {   idF: 12,
            conflict:"" });
    const next = () => {
        setOption(prevOption => prevOption + 1);
      };
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            await updateForm(conflict);

        } catch(error){
            console.log("Error al guardar contracto",error);
        }
        setOption(prevOption => prevOption + 1);
        
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setConflict({ ...conflict, [name]: value });
    };
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
                        <p className="text-[17px] text-gray-600">(Declarar si existe un interés laboral, personal, profesional, familiar o el proyecto está ligado a la industria farmacéutica, que pueda afectar el desempeño imparcial de alguno de los participantes)</p>
                            <textarea  
                            className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                            name="conflict" 
                            value={conflict.conflict}
                            onChange={handleChange}
                            placeholder="Escribe los conflictos de interes..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-20 !mb-5">
                <button className="!mr-5 !ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmit}>Siguiente</button>
            </div>
        </div>
    )
}

export default ConflictoInt;