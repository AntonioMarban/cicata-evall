import useLoadFormData from "../hooks/useLoadFormData";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";
import ShowCards from "../components/ShowCards.jsx";
import AddGoals from "../components/AddGoals";
import AddReferences from "../components/AddReferences";
import AddMethodology from "../components/AddMethodology";

import { useState } from "react";
const  Goals = ({option,setOption}) => {
    const [desglose, setDesglose] = useState(
        {   idF: 6,
            goals: [],
            references: [],
            methodologies: []
        });
    const [goalsToEdit, setGoalsToEdit] = useState(null);
    const [referencesToEdit, setReferencesToEdit] = useState(null);
    const [methodologiesToEdit, setMethodologiesToEdit] = useState(null);

    const handleOnSubmitForm = useSubmitFormNext(desglose, setOption);
    const handleOnSubmitFormBack = useSubmitFormBack(desglose, setOption);

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        handleOnSubmitForm(event); 
    }

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
                            <p className="!mt-2 text-xl">Metas </p>
                            <div className="rounded-lg p-0 w-full">
                                <div className="flex justify-between !p-2">
                                    <p className="flex-1">Nombre de la meta</p>
                                </div>
                            </div>
                            <ShowCards cards={desglose.goals} 
                                handleDeleteFile={handleDeleteArray}
                                handleEditModal={handleEditModal}
                                setData = {setGoalsToEdit}
                                nameArray='goals'
                                slice={1}/>
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
                            <p className="!mt-2 text-xl">Referencias </p>
                            <div className="rounded-lg p-0 w-full">
                                <div className="flex justify-between !p-2">
                                    <p className="flex-1">Nombre de la referencia</p>
                                </div>
                            </div>
                            <ShowCards cards={desglose.references} 
                                handleDeleteFile={handleDeleteArray}
                                handleEditModal={handleEditModal}
                                setData = {setReferencesToEdit}
                                nameArray='references'
                                slice={1}/>
                        </div>
                        <div className="!flex items-center justify-center">
                                <AddReferences 
                                    setDesglose={setDesglose}
                                    referencesToEdit={referencesToEdit}
                                    setData ={setReferencesToEdit}
                                    onEditComplete={handleEditComplete}
                                />
                        </div>

                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Metodologías </p>
                            <div className="rounded-lg p-0 w-full">
                                <div className="flex justify-between !p-2">
                                    <p className="flex-1">Nombre de la Metodología</p>
                                </div>
                            </div>
                            <ShowCards cards={desglose.methodologies} 
                                handleDeleteFile={handleDeleteArray}
                                handleEditModal={handleEditModal}
                                setData = {setMethodologiesToEdit}
                                nameArray='methodologies'
                                slice={1}/>
                        </div>
                        <div className="!flex items-center justify-center">
                                <AddMethodology 
                                    setDesglose={setDesglose}
                                    methodologiesToEdit={methodologiesToEdit}
                                    setData={setMethodologiesToEdit}
                                    onEditComplete={handleEditComplete}
                                />
                        </div>
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

export default Goals;