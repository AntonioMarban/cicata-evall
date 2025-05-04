import AddParticipant from "../components/AddParticipant";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import { useFormHandler } from "../hooks/useFormHandler";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import CardAdd from "../components/CardAdd";

import { useState } from "react";

const  Participants = ({option,setOption}) => {
    const [participants, setParticipants] = useState({ idF: 3, members: [] });
    const [participantToEdit, setParticipantToEdit] = useState(null);

    const handleOnSubmitForm = useFormHandler({
        form: participants,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setParticipants({
            ...participants,
            members: removeItemByIndex(participants.members, index)
        });
    };

    const handleEditModal = (index, project) => {
        setParticipantToEdit({ ...project, index });
    };

    const handleEditComplete = () => {
        setParticipantToEdit(null);
    }

    useLoadFormData(participants.idF,setParticipants);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Participantes</p>
                </div>
                <div className="rounded-lg p-0 w-full">
                    <div className="flex justify-between !p-2">
                    <p className="flex-1">Nombre</p>
                    <p className="flex-1">Apellido Paterno</p>
                    <p className="flex-1">Apellido Materno</p>
                    <p className="flex-1">Institución</p>
                    <p className="flex-1 text-center">Puesto</p>
                    <p className="flex-1"></p>
                    </div>
                </div>
                <CardAdd 
                    cards={participants.members} 
                    handleDeleteFile={handleDeleteArray}
                    handleEditModal={handleEditModal}
                    slice={5}/>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddParticipant 
                        setParticipants={setParticipants}
                        participantToEdit={participantToEdit}
                        onEditComplete={handleEditComplete}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Participants;