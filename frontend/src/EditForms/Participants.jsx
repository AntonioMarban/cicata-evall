import AddParticipant from "../components/Modals/AddParticipant";
import useLoadFormData from "../hooks/useLoadFormData";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import ShowCards from "../components/ShowCards.jsx";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";
import { useState } from "react";

const  Participants = ({option,setOption}) => {
    
    const [participants, setParticipants] = useState({ idF: 22, members: [] });
    const [participantToEdit, setParticipantToEdit] = useState(null);

    const handleOnSubmitFormBack = useSubmitFormBack(participants, setOption);
    const handleOnSubmitFormNext = useSubmitFormNext(participants, setOption);

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
                <ShowCards 
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
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" 
                type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" 
                onClick={handleOnSubmitFormNext}>Siguiente</button>
            </div>
        </div>
    )
}

export default Participants;