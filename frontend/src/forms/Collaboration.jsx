import { useState } from "react";
import AddCollaboration from "../components/AddCollaboration";
import { useFormHandler } from "../hooks/useFormHandler";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";


const  Collaboration = ({option,setOption}) => {
    const [collaborations, setCollaborations] = useState({ idF: 4, collaborations: [] });
    
    const handleOnSubmitForm = useFormHandler({
        form: collaborations,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    useLoadFormData(collaborations.idF,setCollaborations);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Colaboración con otras instituciones</p>
                </div>
                <div className="rounded-lg p-0 w-full border-2 border-gray-300">
                    {collaborations.collaborations.map((collaboration, index) => (
                    <div className="!p-2 m-5 flex justify-between w-full items-center" key={index}>
                        <p>{collaboration.convenioNE}</p>
                        <p>{collaboration.convenioType}</p>
                        <p>{collaboration.institutionName}</p>
                        <p>{collaboration.isIPN}</p>
                    </div>
                    ))}
                </div>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddCollaboration  setCollaborations={setCollaborations}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!mr-5 ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Collaboration;