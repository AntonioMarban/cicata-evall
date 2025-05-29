import AddActividades from "../components/Modals/AddActivities.jsx";
import useLoadFormData from "../hooks/useLoadFormData.js";
import ShowCards from "../components/ShowCards.jsx";
import { removeItemByIndex } from "../hooks/removeItemByIndex.js";
import { useState } from "react";
import useSubmitFormBack from "../hooks/useSubmitFormBack.js";
import useSubmitFormNext from "../hooks/useSubmitFormNext.js";

const  Activities = ({option,setOption}) => {
    
    const [activities, setActivities] = useState({ idF: 28, scheduleActivities: [] });
    const [activitiesToEdit, setActivitiesToEdit] = useState(null);

    const handleOnSubmitFormBack = useSubmitFormBack(activities, setOption);
    const handleOnSubmitFormNext = useSubmitFormNext(activities, setOption);

    const handleDeleteArray = (index) => {
        setActivities({
            ...activities,
            scheduleActivities: removeItemByIndex(activities.scheduleActivities, index)
        });
    };

    const handleEditModal = (index, project) => {
        setActivitiesToEdit({ ...project, index });
    };
    
    const handleEditComplete = () => {
        setActivitiesToEdit(null);
    };

    useLoadFormData(activities.idF,setActivities);

    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Actividades</p>
                </div>
                <div className="rounded-lg p-0 w-full">
                    <div className="flex justify-between !p-2">
                    <p className="flex-1">Meta</p>
                    <p className="flex-1">Institución</p>
                    <p className="flex-1 text-center">Participante</p>
                    <p className="flex-1 text-center">Fecha inicio</p>
                    <p className="flex-1 text-center">Fecha fin</p>
                    <p className="flex-1"></p>
                    </div>
                </div>
                <ShowCards cards={activities.scheduleActivities} 
                    handleDeleteFile={handleDeleteArray} 
                    handleEditModal={handleEditModal}
                    slice={5}/>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddActividades 
                            setActivities={setActivities}
                            activitesToEdit={activitiesToEdit}
                            onEditComplete={handleEditComplete}
                            Number={22}
                            NumberDate={20}
                            />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" onClick={handleOnSubmitFormNext}>Siguiente</button>
            </div>
        </div>
    )
}

export default Activities;