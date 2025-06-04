import useLoadFormData from "../hooks/useLoadFormData";
import AddObjectivesSpe from "../components/Modals/AddObjectivesSpe";
import ShowCards from "../components/ShowCards";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";
import { useState } from "react";

const  Desglose = ({option,setOption}) => {
    
    const [desglose, setDesglose] = useState(
        {   idF: 24,
            introduction: "",
            background:"",
            statementOfProblem:"",
            justification:"", 
            hypothesis: "",
            generalObjective: "", 
            specificObjectives: [] });
    
    const [newErrorsD,setNewErrorsD] = useState(
        {
            introduction: "*",
            background:"*",
            statementOfProblem:"*",
            justification:"*", 
            hypothesis: "*",
            generalObjective: "*",
            specificObjectives: "*"
    });
    const [desgloseToEdit, setDesgloseToEdit] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesglose({ ...desglose, [name]: value });
    };

    const handleOnSubmitFormBack = useSubmitFormBack(desglose, setOption);
    const handleOnSubmitFormNext = useSubmitFormNext(desglose, setOption);

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();
        const newErrorsDF = {}
        Object.entries(desglose).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsDF[key] = `* El campo  es requerido`;
          }
        });
        if(desglose.specificObjectives.length<1){
            newErrorsDF['specificObjectives'] = `* Debe haber al menos un objetivo especifico`;
        }
        if(desglose.specificObjectives.length>=1){
            delete newErrorsDF['specificObjectives']
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setNewErrorsD(newErrorsDF)
        if(!Object.keys(newErrorsDF).length>0){
            handleOnSubmitFormNext(event); 
        }
    };

    const handleDeleteArray = (index) => {
        setDesglose({
            ...desglose,
            specificObjectives: removeItemByIndex(desglose.specificObjectives, index)
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
                            <p className="!mt-2 text-xl">Introducción {newErrorsD.introduction && <span className="text-red-600">{newErrorsD.introduction}</span>}</p>
                            <textarea 
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex 
                            justify-start items-start text-[#6D7580] mt-3 min-w-[250px]
                            hover:border-[#5CB7E6] transition-colors duration-300"
                            name="introduction" 
                            value={desglose.introduction}
                            onChange={handleChange}
                            placeholder="Escribe la introducción del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Antecedentes {newErrorsD.background && <span className="text-red-600">{newErrorsD.background}</span>}</p>
                            <textarea
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg hover:border-[#5CB7E6] transition-colors duration-300 flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"  
                            name="background"
                            value={desglose.background}
                            onChange={handleChange} 
                            placeholder="Escribe los antecedentes del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Planteamiento del Problema {newErrorsD.statementOfProblem && <span className="text-red-600">{newErrorsD.statementOfProblem}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] hover:border-[#5CB7E6] transition-colors duration-300 text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="statementOfProblem"
                            value={desglose.statementOfProblem}
                            onChange={handleChange} 
                            placeholder="Escribe el planteamiento del problema..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Justificación {newErrorsD.justification && <span className="text-red-600">{newErrorsD.justification}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] hover:border-[#5CB7E6] transition-colors duration-300 text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="justification"
                            value={desglose.justification}
                            onChange={handleChange} 
                            placeholder="Escribe la justificación del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Hipótesis {newErrorsD.hypothesis && <span className="text-red-600">{newErrorsD.hypothesis}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] hover:border-[#5CB7E6] transition-colors duration-300 text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="hypothesis"
                            value={desglose.hypothesis}
                            onChange={handleChange} 
                            placeholder="Escribe la hipótesis del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Objetivo general {newErrorsD.generalObjective && <span className="text-red-600">{newErrorsD.generalObjective}</span>}</p>
                            <textarea  
                            className="w-full h-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] hover:border-[#5CB7E6] transition-colors duration-300 text-lg flex justify-start items-start text-[#6D7580] mt-3 min-w-[250px]"
                            name="generalObjective"
                            value={desglose.generalObjective}
                            onChange={handleChange} 
                            placeholder="Escribe el objetivo general del proyecto..."></textarea>
                        </div>
                        <div className="flex-1">
                            <p className="!mt-2 text-xl">Objetivos específicos {newErrorsD.specificObjectives && <span className="text-red-600">{newErrorsD.specificObjectives}</span>}</p>
                            <div className="rounded-lg p-0 w-full">
                                <div className="flex justify-between !p-2">
                                    <p className="flex-1">Objetivos específicos</p>
                                    <p className="flex-1"></p>
                                </div>
                            </div>
                            <ShowCards cards={desglose.specificObjectives} 
                                handleDeleteFile={handleDeleteArray}
                                handleEditModal={handleEditModal}
                                fieldsToShow={['objectiveName']}/>
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

export default Desglose;