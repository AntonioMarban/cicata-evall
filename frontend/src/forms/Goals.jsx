import useLoadFormData from "../hooks/useLoadFormData";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";
import ShowCards from "../components/ShowCards.jsx";
import AddGoals from "../components/Modals/AddGoals";
import AddMethodology from "../components/Modals/AddMethodology.jsx";

import { useState } from "react";
const  Goals = ({option,setOption}) => {
    
    const [desglose, setDesglose] = useState({   idF: 6,
            goals: [],
            references: "",
            methodologies: []
        });
    const [newErrorsD,setNewErrorsD] = useState(
        {
            references: "*",
            methodologies: "*",
            goals: "*",
    });
    const [goalsToEdit, setGoalsToEdit] = useState(null);
    const [methodologiesToEdit, setMethodologiesToEdit] = useState(null);

    const handleOnSubmitForm = useSubmitFormNext(desglose, setOption);
    const handleOnSubmitFormBack = useSubmitFormBack(desglose, setOption);
    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}

        if(desglose.references === ''){
            newErrorsDF['references'] = "* El campo es requerido"
        }
        else{
            delete newErrorsDF['references']
        }
        if(desglose.goals.length<1){
            newErrorsDF['goals'] = `* Debe haber al menos una meta`;
        }
        if(desglose.goals.length>=1){
            delete newErrorsDF['goals']
        }
        if(desglose.methodologies.length<1){
            newErrorsDF['methodologies'] = `* Debe haber al menos una metodología`;
        }
        if(desglose.methodologies.length>=1){
            delete newErrorsDF['methodologies']
        }
        setNewErrorsD(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmitForm(event); 
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesglose({ ...desglose, [name]: value });
    };

    const handleDeleteArray = (index,arrayToEdit) => {
        setDesglose({
            ...desglose,
            [arrayToEdit]: removeItemByIndex(desglose[arrayToEdit], index)
        });
    };

    const handleEditModal = (index, project, setData) => {
        setData({...project, index});
    };

    const handleEditComplete = (setData) => {
        setData(null);
    };

    useLoadFormData(desglose.idF,setDesglose);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-2xl">Desglose del proyecto</p>
                </div>
                <div className="flex-1 mt-5">
                    <div className="flex flex-wrap flex-col">
                        
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Metas {newErrorsD.goals && <span className="text-red-600">{newErrorsD.goals}</span>}</p>
                            <div className="rounded-lg p-0 w-full">
                                <div className="flex justify-between !p-2">
                                    <p className="flex-1">Meta</p>
                                </div>
                            </div>
                            <ShowCards cards={desglose.goals} 
                                handleDeleteFile={handleDeleteArray}
                                handleEditModal={handleEditModal}
                                setData = {setGoalsToEdit}
                                nameArray='goals'
                                fieldsToShow= {['goal']}/>
                        </div>
                        <div className="!flex items-center justify-center">
                                <AddGoals 
                                    setDesglose={setDesglose}
                                    goalsToEdit={goalsToEdit}
                                    setData ={setGoalsToEdit}
                                    onEditComplete={handleEditComplete}
                                />
                        </div>

                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Metodologías {newErrorsD.methodologies && <span className="text-red-600">{newErrorsD.methodologies}</span>}</p>
                            <div className="rounded-lg p-0 w-full">
                                <div className="flex justify-between !p-2">
                                    <p className="flex-1">Metodología</p>
                                </div>
                            </div>
                            <ShowCards cards={desglose.methodologies} 
                                handleDeleteFile={handleDeleteArray}
                                handleEditModal={handleEditModal}
                                setData = {setMethodologiesToEdit}
                                nameArray='methodologies'
                                fieldsToShow= {['methodology']}/>
                        </div>
                        <div className="!flex items-center justify-center">
                                <AddMethodology 
                                    setDesglose={setDesglose}
                                    methodologiesToEdit={methodologiesToEdit}
                                    setData={setMethodologiesToEdit}
                                    onEditComplete={handleEditComplete}
                                />
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Referencias {newErrorsD.references && <span className="text-red-600">{newErrorsD.references}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] hover:border-[#5CB7E6] transition-colors duration-300 text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="references"
                            value={desglose.references}
                            onChange={handleChange} 
                            placeholder="Escribe las referencias del proyecto..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-15 mb-5">
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

export default Goals;