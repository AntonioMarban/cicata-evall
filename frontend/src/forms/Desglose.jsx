import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import AddObjectivesSpe from "../components/AddObjectivesSpe";
import { useFormHandler } from "../hooks/useFormHandler";
import CardAdd from "../components/CardAdd";
import { removeItemByIndex } from "../hooks/removeItemByIndex";

import { useState } from "react";
const  Desglose = ({option,setOption}) => {
    const [desglose, setDesglose] = useState(
        {   idF: 5,
            introduction: "",
            background:"",
            problemSta:"",
            justification:"", 
            typeInvText: "", 
            hipotesis: "",
            gObjective: "", 
            sObjectives: [] });
    
    const [desgloseToEdit, setDesgloseToEdit] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesglose({ ...desglose, [name]: value });
    };

    const handleOnSubmitForm = useFormHandler({
        form: desglose,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setDesglose({
            ...desglose,
            sObjectives: removeItemByIndex(desglose.sObjectives, index)
        });
    };

    const handleEditModal = (index, project) => {
        setDesgloseToEdit({...project, index});
    };

    const handleEditComplete = () => {
        setDesgloseToEdit(null);
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
                            <p className="!mt-2 text-xl">Introducción</p>
                            <textarea 
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="introduction" 
                            value={desglose.introduction}
                            onChange={handleChange}
                            placeholder="Escribe la introducción del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Antecedentes</p>
                            <textarea
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"  
                            name="background"
                            value={desglose.background}
                            onChange={handleChange} 
                            placeholder="Escribe los antecedentes del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Planteamiento del Problema</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="problemSta"
                            value={desglose.problemSta}
                            onChange={handleChange} 
                            placeholder="Escribe el planteamiento del problema..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Justificación</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="justification"
                            value={desglose.justification}
                            onChange={handleChange} 
                            placeholder="Escribe la justificación del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Hipótesis</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="hipotesis"
                            value={desglose.hipotesis}
                            onChange={handleChange} 
                            placeholder="Escribe la hipótesis del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Objetivo general</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="gObjective"
                            value={desglose.gObjective}
                            onChange={handleChange} 
                            placeholder="Escribe el objetivo general del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Objetivos específicos</p>
                            <CardAdd cards={desglose.sObjectives} 
                                handleDeleteFile={handleDeleteArray}
                                handleEditModal={handleEditModal}
                                slice={2}/>
                        </div>
                        <div className="!flex items-center justify-center">
                                <AddObjectivesSpe 
                                    setDesglose={setDesglose}
                                    desgloseToEdit={desgloseToEdit}
                                    onEditComplete={handleEditComplete}
                                />
                        </div>
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

export default Desglose;