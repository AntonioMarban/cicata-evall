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
            hipotesis: "",
            gObjective: "", 
            sObjectives: [] });
    
    const [newErrorsD,setNewErrorsD] = useState(
        {
            introduction: "",
            background:"",
            problemSta:"",
            justification:"", 
            hipotesis: "",
            gObjective: ""
        });
    const [desgloseToEdit, setDesgloseToEdit] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesglose({ ...desglose, [name]: value });
    };

    const handleOnSubmitForm = useFormHandler({
        form: desglose,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        Object.entries(desglose).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsDF[key] = `El campo  es requerido`;
          }
        });
        setNewErrorsD(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmitForm(event); 
        }
    }

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
                            <p className="!mt-2 text-xl">Introducción {newErrorsD.introduction && <span className="text-red-600">*{newErrorsD.introduction}</span>}</p>
                            <textarea 
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="introduction" 
                            value={desglose.introduction}
                            onChange={handleChange}
                            placeholder="Escribe la introducción del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Antecedentes {newErrorsD.background && <span className="text-red-600">*{newErrorsD.background}</span>}</p>
                            <textarea
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"  
                            name="background"
                            value={desglose.background}
                            onChange={handleChange} 
                            placeholder="Escribe los antecedentes del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Planteamiento del Problema {newErrorsD.problemSta && <span className="text-red-600">*{newErrorsD.problemSta}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="problemSta"
                            value={desglose.problemSta}
                            onChange={handleChange} 
                            placeholder="Escribe el planteamiento del problema..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Justificación {newErrorsD.justification && <span className="text-red-600">*{newErrorsD.justification}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="justification"
                            value={desglose.justification}
                            onChange={handleChange} 
                            placeholder="Escribe la justificación del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Hipótesis {newErrorsD.hipotesis && <span className="text-red-600">*{newErrorsD.hipotesis}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="hipotesis"
                            value={desglose.hipotesis}
                            onChange={handleChange} 
                            placeholder="Escribe la hipótesis del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Objetivo general {newErrorsD.gObjective && <span className="text-red-600">*{newErrorsD.gObjective}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="gObjective"
                            value={desglose.gObjective}
                            onChange={handleChange} 
                            placeholder="Escribe el objetivo general del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Objetivos específicos </p>
                            <div className="rounded-lg p-0 w-full">
                                <div className="flex justify-between !p-2">
                                    <p className="flex-1">Nombre del Objetivo específico</p>
                                    <p className="flex-1 text-center">Descripción</p>
                                    <p className="flex-1"></p>
                                </div>
                            </div>
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
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </div>
    )
}

export default Desglose;