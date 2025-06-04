import AddActividades from "../components/Modals/AddActivities";
import useLoadFormData from "../hooks/useLoadFormData";
import ShowCards from "../components/ShowCards.jsx";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import { useState } from "react";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const  Activities = ({option,setOption}) => {
    const [activities, setActivities] = useState({ idF: 9, scheduleActivities: [] });
    const [activitiesToEdit, setActivitiesToEdit] = useState(null);
    const [newErrorsD,setNewErrorsD] = useState({
                activities: "*",
            }
    );
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

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        if(activities.scheduleActivities.length<1){
            newErrorsDF['activities'] = `* Debe haber al menos una actividad`;
        }
        if(activities.scheduleActivities.length>=1){
            delete newErrorsDF['activities']
        }
        setNewErrorsD(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmitFormNext(event); 
        }
    };
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Actividades {newErrorsD.activities && <span className="text-red-600">{newErrorsD.activities}</span>}</p>
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
                    fieldsToShow={['goal','institution','responsibleMember','startDate','endDate']}
                    />
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddActividades 
                            setActivities={setActivities}
                            activitesToEdit={activitiesToEdit}
                            onEditComplete={handleEditComplete}
                            Number={3}
                            NumberDate={1}
                            NumberGoal={6}
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
                 hover:bg-[#4CA6D5] transition-colors duration-300" onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </div>
    )
}

export default Activities;