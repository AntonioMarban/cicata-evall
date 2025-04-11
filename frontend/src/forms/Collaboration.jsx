import AddCollaboration from "../components/AddCollaboration";
import { useFormHandler } from "../hooks/useFormHandler";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import CardAdd from "../components/CardAdd";
import { removeItemByIndex } from "../hooks/removeItemByIndex";

import { useState } from "react";


const  Collaboration = ({option,setOption}) => {
    const [collaborations, setCollaborations] = useState({ idF: 4, collaborations: [] });
    
    const handleOnSubmitForm = useFormHandler({
        form: collaborations,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setCollaborations({
            ...collaborations,
            collaborations: removeItemByIndex(collaborations.collaborations, index)
        });
    };

    useLoadFormData(collaborations.idF,setCollaborations);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Colaboración con otras instituciones</p>
                </div>
                <CardAdd cards={collaborations.collaborations} handleDeleteFile={handleDeleteArray} slice={4} />
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