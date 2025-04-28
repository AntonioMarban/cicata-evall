import { useFormHandler } from "../hooks/useFormHandler";
import AddActividades from "../components/AddActivities";
import { prevOption } from "../hooks/optionUtils";
import useLoadFormData from "../hooks/useLoadFormData";
import CardAdd from "../components/CardAdd";
import { removeItemByIndex } from "../hooks/removeItemByIndex";

import { useState } from "react";
const  Activities = ({option,setOption}) => {
    const [activities, setActivities] = useState({ idF: 8, p_scheduleActivitiesJSON: [] });
    const [activitiesToEdit, setActivitiesToEdit] = useState(null);

    const handleOnSubmitForm = useFormHandler({
        form: activities,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setActivities({
            ...activities,
            p_scheduleActivitiesJSON: removeItemByIndex(activities.p_scheduleActivitiesJSON, index)
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
                <CardAdd cards={activities.p_scheduleActivitiesJSON} 
                    handleDeleteFile={handleDeleteArray} 
                    handleEditModal={handleEditModal}
                    slice={5}/>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddActividades 
                            setActivities={setActivities}
                            activitesToEdit={activitiesToEdit}
                            onEditComplete={handleEditComplete}
                            />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Activities;