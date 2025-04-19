import { useState } from "react";
import useLoadFormData from "../hooks/useLoadFormData";
import { useFormHandler } from "../hooks/useFormHandler";

const  GeneralData = ({option,setOption}) => {
    const [objectiveA, setObjectiveA] = useState(1);
    const [typeInv, setTypeInv] = useState(1);
    const [generalData, setGeneralData] = useState(
        {   idF: 1,
            titleProject: "",
            startDate:"",
            endDate:"",
            typeInv, 
            typeInvText: "", 
            spTopic: "",
            subTopic: "", 
            objectiveA,
            considerations: "",
            summary:"" });
    
    const [newErrors,setNewErrors] = useState({
            titleProject: "",
            startDate:"",
            endDate:"",
            typeInv, 
            typeInvText: "", 
            spTopic: "",
            subTopic: "", 
            objectiveA,
            considerations: "",
            summary:""
    });

    const handleChangeButton = (key, value) => {
        setGeneralData((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneralData({ ...generalData, [name]: value });
    };
    
    const handleOnSubmitForm = useFormHandler({
        form: generalData,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const validateDates = () => {
        if (generalData.startDate > generalData.endDate) {
          alert("No puede ser la fecha de inicio después de la fecha de fin");
          return false; 
        }
        return true; 
      };
    const handleSubmitWithValidation = (event) => {
        event.preventDefault();

        if (!validateDates()) {
            return; 
        }
        const newErrorsF = {}
        Object.entries(generalData).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `El campo  es requerido`;
          }
          if(generalData.typeInv < 4){
            delete newErrorsF['typeInvText'];
        }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleOnSubmitForm(event); 
        }
    };

    useLoadFormData(generalData.idF,setGeneralData);
    
    return (
        <form onSubmit={handleSubmitWithValidation}>
            <div className="flex flex-col">
                <div className="!mt-5 flex-1">
                    <p className="text-2xl font-normal">Datos generales del proyecto</p>
                    <p className="text-lg !mt-3 !mb-2">Título del proyecto {newErrors.titleProject && <span className="text-red-600">*{newErrors.titleProject}</span>}</p>
                    <input 
                        type="text"
                        name="titleProject"
                        className="!p-2 w-2/5 min-w-[250px] p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3" 
                        value={generalData.titleProject}
                        onChange={handleChange}
                        placeholder="Escribe el titulo del proyecto..."></input>
                </div>
                <div className="flex-1 !mt-2">
                    <p className="text-lg font-normal">Periodo del proyecto</p>
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <p>Fecha de Inicio {newErrors.startDate && <span className="text-red-600">*{newErrors.startDate}</span>}</p>
                            <input 
                                    className="!p-2 w-4/5 min-w-[250px] p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end"
                                    name="startDate" 
                                    type="date"
                                    value={generalData.startDate}
                                    onChange={handleChange}
                                ></input>
                        </div>
                        <div className="flex-1">
                            <p>Fecha de Fin {newErrors.endDate && <span className="text-red-600">*{newErrors.endDate}</span>}</p>
                            <input  
                                    className="!p-2 w-4/5 min-w-[250px] p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end"
                                    name="endDate" 
                                    type="date"
                                    value={generalData.endDate}
                                    onChange={handleChange}
                                ></input>
                        </div>
                    </div>
                </div>
                <div className="flex-2 flex flex-col !mt-5 w-[90%]">
                    <p className="text-lg">Tipo de investigación</p>
                    <div className="flex flex-wrap justify-between w-full mt-2.5">
                            <button
                                className={generalData.typeInv === 1  ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5'} 
                                onClick={() => handleChangeButton('typeInv', 1)}
                                type="button">Básica
                            </button>

                            <button
                                className={generalData.typeInv  === 2  ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5'} 
                                onClick={() => handleChangeButton('typeInv', 2)}
                                type="button">Aplicada-clínica
                            </button>

                            <button
                                className={generalData.typeInv  === 3  ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5'} 
                                onClick={() => handleChangeButton('typeInv', 3)}
                                type="button">Desarrollo tecnológico
                            </button>
                            <button
                                className={generalData.typeInv  === 4  ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5'} 
                                onClick={() => handleChangeButton('typeInv', 4)}
                                type="button">Otro
                            </button>
                    </div>
                    {generalData.typeInv === 4 &&
                        <div className="!mt-5 w-100% flex-1">
                            <p>¿Cuál? {newErrors.typeInvText && <span className="text-red-600">*{newErrors.typeInvText}</span>}</p>
                            <input  
                                    className="!p-2 w-4/10 min-w-[250px] p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3" 
                                    name="typeInvText" 
                                    type="text"
                                    value={generalData.typeInvText}
                                    onChange={handleChange}
                                    placeholder="Escribe el tipo de investigación..."></input>
                        </div>
                    }
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <p className="!mb-5">Tema especialidad {newErrors.spTopic && <span className="text-red-600">*{newErrors.spTopic}</span>}</p>
                            <input  
                                    className="!p-2 w-4/5 min-w-[250px] rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end"
                                    name="spTopic" 
                                    value={generalData.spTopic}
                                    onChange={handleChange}
                                    placeholder="Escribe el tema de especialidad..."></input>
                        </div>
                        <div className="flex-1">
                            <p className="!mb-5">Subtema especialidad {newErrors.subTopic && <span className="text-red-600">*{newErrors.subTopic}</span>}</p>
                            <input  
                                    className="!p-2 w-4/5 min-w-[250px] rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end"
                                    name="subTopic" 
                                    value={generalData.subTopic}
                                    onChange={handleChange}
                                    placeholder="Escribe el subtema de especialidad..."></input>
                        </div>
                    </div>
                </div>

                <div className="!mt-5 flex justify-between flex-wrap mt-5 w-[90%]">
                    <p className="w-3/4">¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de desarrollo sostenible?</p>
                    <div className="ml-2 w-1/4 min-w-[200px] flex justify-between">
                        <button type="button"
                            className={generalData.objectiveA === 1  ? 
                            '!ml-2 bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px]' 
                            : 
                            '!ml-2 bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px]'} 
                            onClick={() => handleChangeButton('objectiveA', 1)} >Si</button>
                        <button type="button"
                            className={generalData.objectiveA === 0  ? 
                            'bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px]'
                            : 
                            'bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px]'} 
                            onClick={() => handleChangeButton('objectiveA', 0)} >No</button>
                    </div>
                </div>
                
                <div className="!mt-5 flex-1">
                    <p className="text-lg mt-3">En caso afirmativo ¿Con cuál? / No se considera ¿Por qué? {newErrors.considerations && <span className="text-red-600">*{newErrors.considerations}</span>}</p>
                    <input  
                            className="!p-2 w-2/5 min-w-[250px] !p-2 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] !mt-3" 
                            name="considerations"  
                            value={generalData.considerations}
                            onChange={handleChange}
                            placeholder="Escribe las consideraciones..."></input>
                </div>
                <div className="!mt-5 flex-1 w-[90%]">
                    <p className="text-lg mt-3">Resumen del proyecto {newErrors.summary && <span className="text-red-600">*{newErrors.summary}</span>}</p>
                    <p className="text-lg mt-3">(Máximo de 1500 caracteres con espacios)</p>
                    <textarea 
                        name="summary" 
                        className="w-full !p-2 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] !mt-2 min-w-[250px] !mb-2"
                        value={generalData.summary}
                        onChange={handleChange}
                        placeholder="Escribe el resumen del proyecto..."
                        maxLength={1500}
                        >    
                    </textarea>
                    <p>Caracteres {generalData.summary.length} / 1500</p>
                </div>
            </div>
            <div className="w-[90%] flex justify-end items-center">
                <button 
                className="!p-2 !mt-5 !mb-5 text-xl rounded-lg border-none bg-[#5CB7E6] text-white font-normal cursor-pointer shadow-md"
                type="submit">Siguiente</button>
            </div>
        </form>
    )
}

export default GeneralData;