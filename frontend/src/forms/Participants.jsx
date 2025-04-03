import { useState } from "react";
import AddParticipant from "../components/AddParticipant";
import { updateForm  } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";

const  Participants = ({option,setOption}) => {
    const [participants, setParticipants] = useState({ idF: 3, participants: [] });

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        
        try{
            await updateForm(participants);
        } catch(error){
            console.log("Error al guardar contracto",error);;
        }
        setOption(prevOption => prevOption + 1);
    };
    useLoadFormData(participants.idF,setParticipants);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Participantes</p>
                </div>
                <div className="rounded-lg p-0 w-full border-2 border-gray-300">
                    {participants.participants.map((participant, index) => (
                    <div className="!p-2 m-5 flex justify-between w-full items-center" key={index}>
                        <p>{participant.nombre}</p>
                        <p>{participant.paterno}</p>
                        <p>{participant.materno}</p>
                        <p>{participant.gAcademico}</p>
                        <p>{participant.nivel}</p>
                        <p>{participant.puesto}</p>
                        <button type="button">Editar</button>
                    </div>
                    ))}
                </div>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddParticipant setParticipants={setParticipants}/>
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

export default Participants;