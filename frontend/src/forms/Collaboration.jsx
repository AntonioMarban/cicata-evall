import { useState } from "react";
import AddColaboration from "../components/AddCollaboration";
import { updateForm  } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";


const  Collaboration = ({option,setOption}) => {
    const [colaborations, setColaborations] = useState({ idF: 4, colaborations: [] });
    
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        
        try{
            await updateForm(colaborations);
        } catch(error){
            console.log("Error al guardar contracto",error);;
        }
        setOption(prevOption => prevOption + 1);
    };
    useLoadFormData(colaborations.idF,setColaborations);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Colaboración con otras instituciones</p>
                </div>
                <div className="rounded-lg p-0 w-full border-2 border-gray-300">
                    {colaborations.colaborations.map((colaboration, index) => (
                    <div className="!p-2 m-5 flex justify-between w-full items-center" key={index}>
                        <p>{colaboration.convenioNE}</p>
                        <p>{colaboration.convenioType}</p>
                        <p>{colaboration.institutionName}</p>
                        <p>{colaboration.isIPN}</p>
                    </div>
                    ))}
                </div>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddColaboration  setColaborations={setColaborations}/>
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

export default Collaboration;