import { useState } from "react";
import useLoadFormData from "../hooks/useLoadFormData";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const GeneralData = ({option,setOption}) => {
    const [alignsWithPNIorODS, setalignsWithPNIorODS] = useState(1);
    const [typeResearch, setTypeResearch] = useState(1);
    const [generalData, setGeneralData] = useState(
        {   idF: 1,
            title: "",
            startDate:"",
            endDate:"",
            typeResearch, 
            otherTypeResearch: "", 
            topic: "",
            subtopic: "", 
            alignsWithPNIorODS,
            alignmentPNIorODS: "",
            summary:"" });
    
    const [newErrors,setNewErrors] = useState({
            title: "",
            startDate:"",
            endDate:"",
            typeResearch, 
            otherTypeResearch: "", 
            topic: "",
            subtopic: "", 
            alignmentPNIorODS: "",
            summary:""
    });
    const handleOnSubmitFormNext = useSubmitFormNext(generalData, setOption);
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
        });
        if(generalData.typeResearch < 4){
            delete newErrorsF['otherTypeResearch'];
        }
        if(generalData.alignsWithPNIorODS === 0){
            delete newErrorsF['alignsWithPNIorODS']
        }
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleOnSubmitFormNext(event); 
        }
    };

    useLoadFormData(generalData.idF,setGeneralData);
    
    return (
        <main>
            <div className="flex flex-col">
                <div className="!mt-5 flex-1">
                    <p className="text-2xl font-normal">Datos generales del proyecto</p>
                    <p className="text-lg !mt-3 !mb-2">Título del proyecto {newErrors.title && <span className="text-red-600">*{newErrors.title}</span>}</p>
                    <input 
                        type="text"
                        name="title"
                        className="!p-2 min-w-[250px] w-[47.5%] p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 hover:border-[#5CB7E6] transition-colors duration-300 max-[800px]:w-full" 
                        value={generalData.title}
                        onChange={handleChange}
                        placeholder="Escribe el titulo del proyecto..."></input>
                </div>
                <div className="flex-1 !mt-2">
                    <p className="text-lg font-normal">Periodo del proyecto</p>
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <p>Fecha de inicio {newErrors.startDate && <span className="text-red-600">*{newErrors.startDate}</span>}</p>
                            <input 
                                    className="!p-2 w-[95%] min-w-[250px] p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end hover:border-[#5CB7E6] transition-colors duration-300 max-[800px]:w-full"
                                    name="startDate" 
                                    type="date"
                                    value={generalData.startDate}
                                    onChange={handleChange}
                                ></input>
                        </div>
                        <div className="flex-1">
                            <p>Fecha de fin {newErrors.endDate && <span className="text-red-600">*{newErrors.endDate}</span>}</p>
                            <input  
                                    className="!p-2 w-[100%] min-w-[250px] p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end hover:border-[#5CB7E6] transition-colors duration-300"
                                    name="endDate" 
                                    type="date"
                                    value={generalData.endDate}
                                    onChange={handleChange}
                                ></input>
                        </div>
                    </div>
                </div>
                <div className="flex-2 flex flex-col !mt-5 w-[100%]">
                    <p className="text-lg">Tipo de investigación</p>
                    <div className="flex flex-wrap justify-between w-full mt-2.5">
                            <button
                                className={generalData.typeResearch === 1 ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#4CA6D5] transition-colors duration-300' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#D1D1D1] transition-colors duration-300'} 
                                onClick={() => handleChangeButton('typeResearch', 1)}
                                type="button">Básica
                            </button>

                            <button
                                className={generalData.typeResearch === 2 ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#4CA6D5] transition-colors duration-300' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#D1D1D1] transition-colors duration-300'} 
                                onClick={() => handleChangeButton('typeResearch', 2)}
                                type="button">Aplicada-clínica
                            </button>

                            <button
                                className={generalData.typeResearch === 3 ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#4CA6D5] transition-colors duration-300' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#D1D1D1] transition-colors duration-300'} 
                                onClick={() => handleChangeButton('typeResearch', 3)}
                                type="button">Desarrollo tecnológico
                            </button>
                            <button
                                className={generalData.typeResearch === 4 ? 
                                '!mt-2 bg-[#5CB7E6] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#4CA6D5] transition-colors duration-300' 
                                : 
                                '!mt-2 bg-[#E1E1E1] w-1/5 min-w-[150px] p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer mt-5 hover:bg-[#D1D1D1] transition-colors duration-300'} 
                                onClick={() => handleChangeButton('typeResearch', 4)}
                                type="button">Otro
                            </button>
                    </div>
                    {generalData.typeResearch === 4 &&
                        <div className="!mt-5 w-[100%] flex-1">
                            <p>¿Cuál? {newErrors.otherTypeResearch && <span className="text-red-600">*{newErrors.otherTypeResearch}</span>}</p>
                            <input  
                                    className="!p-2 w-[47%] max-[800px]:w-full p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 hover:border-[#5CB7E6] transition-colors duration-300" 
                                    name="otherTypeResearch" 
                                    type="text"
                                    value={generalData.otherTypeResearch}
                                    onChange={handleChange}
                                    placeholder="Escribe el tipo de investigación..."></input>
                        </div>
                    }
                </div>
                <div className="flex-1 !mt-5">
                    <div className="flex flex-wrap">
                        <div className="flex-1">
                            <p className="!mb-5">Tema especialidad {newErrors.topic && <span className="text-red-600">*{newErrors.topic}</span>}</p>
                            <input  
                                    className="!p-2 !mb-5 w-[95%] min-w-[250px] rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end hover:border-[#5CB7E6] transition-colors duration-300 max-[800px]:w-full"
                                    name="topic" 
                                    value={generalData.topic}
                                    onChange={handleChange}
                                    placeholder="Escribe el tema de especialidad..."></input>
                        </div>
                        <div className="flex-1">
                            <p className="!mb-5">Subtema especialidad {newErrors.subtopic && <span className="text-red-600">*{newErrors.subtopic}</span>}</p>
                            <input  
                                    className="!p-2 w-[100%] min-w-[250px] rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] mt-3 flex justify-end hover:border-[#5CB7E6] transition-colors duration-300"
                                    name="subtopic" 
                                    value={generalData.subtopic}
                                    onChange={handleChange}
                                    placeholder="Escribe el subtema de especialidad..."></input>
                        </div>
                    </div>
                </div>

                <div className="!mt-5 flex justify-between flex-wrap mt-5 w-[100%]">
                    <p className="w-3/4">¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de desarrollo sostenible?</p>
                    <div className="ml-2 max-[1100px]:w-full min-w-[200px] flex justify-between">
                        <button type="button"
                            className={generalData.alignsWithPNIorODS === 1 ? 
                            '!ml-2 !mr-2 bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px] hover:bg-[#4CA6D5] transition-colors duration-300' 
                            : 
                            '!ml-2 !mr-2 bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px] hover:bg-[#D1D1D1] transition-colors duration-300'} 
                            onClick={() => handleChangeButton('alignsWithPNIorODS', 1)} >Si</button>
                        <button type="button"
                            className={generalData.alignsWithPNIorODS === 0 ? 
                            'bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px] hover:bg-[#4CA6D5] transition-colors duration-300'
                            : 
                            'bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[40%] min-w-[100px] hover:bg-[#D1D1D1] transition-colors duration-300'} 
                            onClick={() => handleChangeButton('alignsWithPNIorODS', 0)} >No</button>
                    </div>
                </div>
                
                <div className="!mt-5 flex-1">
                    <p className="text-lg mt-3">En caso afirmativo ¿Con cuál? / No se considera ¿Por qué? {newErrors.alignmentPNIorODS && <span className="text-red-600">*{newErrors.alignmentPNIorODS}</span>}</p>
                    <input  
                            className="!p-2 w-[47%] max-[800px]:w-full !p-2 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] !mt-3 hover:border-[#5CB7E6] transition-colors duration-300" 
                            name="alignmentPNIorODS"  
                            value={generalData.alignmentPNIorODS}
                            onChange={handleChange}
                            placeholder="Escribe las como es que se considera o no..."></input>
                </div>
                <div className="!mt-5 flex-1 w-[100%]">
                    <p className="text-lg mt-3">Resumen del proyecto {newErrors.summary && <span className="text-red-600">*{newErrors.summary}</span>}</p>
                    <p className="text-lg mt-3">(Máximo de 1500 caracteres con espacios)</p>
                    <textarea 
                        name="summary" 
                        className="w-full !p-2 rounded-lg border-2 border-[#E1E1E1] text-lg text-[#6D7580] !mt-2 min-w-[250px] !mb-2 hover:border-[#5CB7E6] transition-colors duration-300"
                        value={generalData.summary}
                        onChange={handleChange}
                        placeholder="Escribe el resumen del proyecto..."
                        maxLength={1500}
                        >    
                    </textarea>
                    <p>Caracteres {generalData.summary.length} / 1500</p>
                </div>
            </div>
            <div className="w-[100%] flex justify-end items-center">
                <button 
                className="!p-2 !mt-5 !mb-5 text-xl rounded-lg border-none bg-[#5CB7E6] text-white font-normal cursor-pointer shadow-md hover:bg-[#4CA6D5] transition-colors duration-300"
                onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </main>
    )
}

export default GeneralData;