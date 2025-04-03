import { useState } from "react";
import { updateForm  } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";

const  Considerations = ({option,setOption}) => {
    const [considerationsBio, setConsiderationsBio] = useState(
        {   idF: 7,
            considerations:"" });
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            await updateForm(considerationsBio);

        } catch(error){
            console.log("Error al guardar contracto",error);
        }
        setOption(prevOption => prevOption + 1);
        
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsiderationsBio({ ...considerationsBio, [name]: value });
    };
    useLoadFormData(considerationsBio.idF,setConsiderationsBio);
    return (
        <div onSubmit={handleOnSubmit}>
            <div className="flex flex-col justify-between h-[59vh]">
                <div>
                    <p className="text-[22px]">Consideraciones de bioseguridad de la investigación</p>
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                        <p className="text-[17px] text-gray-600">(Describir el tipo de riesgo que presenta la investigación, así como mencionar las acciones que se llevarán a cabo para salvaguardar a los pacientes, animales de laboratorio, el ambiente, estudiantes, investigadores o cualquier involucrado en el desarrollo del proyecto)</p>
                            <textarea  
                                className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                                name="considerations" 
                                value={considerationsBio.considerations}
                                onChange={handleChange}
                                placeholder="Escribe las consideraciones de bioseguridad..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!mr-5 ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmit}>Siguiente</button>
            </div>
        </div>
    )
}

export default Considerations;