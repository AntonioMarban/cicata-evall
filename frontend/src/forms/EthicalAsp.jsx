import useLoadFormData from "../hooks/useLoadFormData";
import DragDrop from "../components/DragDrop";
import { useEffect, useState } from "react";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";

const  EthicalAsp = ({option,setOption}) => {
    
    const [workWithHumans, setWorkWithHumans] = useState(1);
    const [workWithAnimals, setWorkWithAnimals] = useState(1);
    const [filesSend,setFilesSend] = useState([]);
    const [ethicalAsp, setEthicalAsp] = useState({   
        idF: 7,
        ethicalAspects:"",
        workWithHumans,
        workWithAnimals,
        efilesSend: filesSend
    });
    
    const [newErrors,setNewErrors] = useState({
        ethicalAspects:""
    });

    const handleChangeButton = (key, value) => {
        setEthicalAsp((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEthicalAsp({ ...ethicalAsp, [name]: value });
    };

    const handleOnSubmitFormBack = useSubmitFormBack(ethicalAsp, setOption);
    const handleOnSubmitFormNext = useSubmitFormNext(ethicalAsp, setOption);

    const handleSubmitWithValidation = (event) => {
        event.preventDefault();

        const newErrorsF = {}
        Object.entries(ethicalAsp).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `El campo  es requerido`;
            if (value === 0){
                delete newErrorsF[key]
            }
          }
        });
        if ((ethicalAsp.workWithHumans || ethicalAsp.workWithAnimals) && filesSend.length<1){
            return alert("Es necesario subir archivos")
          }
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleOnSubmitFormNext(event); 
        }
    };

    useEffect(()=>{
        if (ethicalAsp.efilesSend && 
            Array.isArray(ethicalAsp.efilesSend) && 
            ethicalAsp.efilesSend.length > 0 && 
            (!filesSend || filesSend.length === 0)) {
            
            setFilesSend(ethicalAsp.efilesSend);
        }
    },[ethicalAsp.efilesSend])
    
    useEffect(()=>{
        setEthicalAsp(prevState=>({
            ...prevState,
            efilesSend: filesSend
        })
        )
    },[filesSend])

    const handleDeleteFile = (index) => {
        const newFileNames = [...ethicalAsp.efilesSend];
        const newFiles = Array.from(ethicalAsp.efilesSend);
      
        newFileNames.splice(index, 1);
        newFiles.splice(index, 1);
      
        setFilesSend(newFiles);
    };

    useLoadFormData(ethicalAsp.idF,setEthicalAsp);
    return (
        <div>
            <div className="flex flex-wrap">
                <div className="flex flex-col justify-between flex-1">
                    <div className="flex-1 w-[90%]">
                        <p className="text-2xl">Aspectos éticos de la investigación</p>
                        <p className="text-lg !mt-3 text-[#6D7580]">Describir cómo el proyecto se apega a los principios bioéticos especificados en la Declaración de Helsinki y otros aspectos bioéticos que sea importante mencionar<br/>{newErrors.ethicalAspects && <span className="text-red-600">*{newErrors.ethicalAspects}</span>}</p>
                    </div>
                    <div className="flex-1 mt-5 w-[90%]">
                        <div className="flex flex-wrap">
                            <div className="flex-1">
                                <textarea 
                                className="w-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-end
                                hover:border-[#5CB7E6] transition-colors duration-300 text-[#6D7580] !mt-3 min-w-[250px]"
                                name="ethicalAspects"
                                value={ethicalAsp.ethicalAspects}
                                onChange={handleChange}
                                placeholder="Escribe los aspectos éticos..."></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex-2 flex flex-col !mt-5 mb-5 w-[90%]">
                        <p className="">¿Necesitas consentimiento de trabajar con humanos o muestras humanas?</p>
                        <div className="flex flex-wrap justify-between w-3/5">
                            <button
                            className={ethicalAsp.workWithHumans === 1  ? 
                            'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                            : 
                            'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                            onClick={() => handleChangeButton('workWithHumans', 1)}
                            type="button">Si</button>
                            <button
                            className={ethicalAsp.workWithHumans === 0  ? 
                            'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                            :
                            'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                            onClick={() => handleChangeButton('workWithHumans', 0)}
                            type="button">No</button>
                        </div>
                        <p className="!mt-5">¿Necesitas consentimiento de trabajar con animales o muestras de animales?</p>
                        <div className="flex flex-wrap justify-between w-3/5">
                            <button
                            className={ethicalAsp.workWithAnimals === 1  ? 
                            'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                            : 
                            'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                            onClick={() => handleChangeButton('workWithAnimals', 1)}
                            type="button">Si</button>
                            <button
                            className={ethicalAsp.workWithAnimals === 0  ? 
                            'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                            : 
                            'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                            onClick={() => handleChangeButton('workWithAnimals', 0)}
                            type="button">No</button>
                        </div>
                    </div>
                </div>
                <div className="!mt-15 flex flex-col w-[100%] h-full flex-1">
                    {(ethicalAsp.workWithAnimals || ethicalAsp.workWithHumans) ?
                    <>
                        <p className="text-2xl">Subir archivos</p>
                        <p className="!mb-4">En caso de trabajar con humanos y/o animales o muestras de humanos y/o animales, (adjuntar el consentimiento informado y el aviso de privacidad)</p>
                        <DragDrop 
                            setFilesSend={setFilesSend} 
                            filesSend={filesSend} 
                            text="Etico"
                        />
                    </>
                    :
                    <p></p>
                    }
                </div>
            </div>
            <div className="flex justify-end items-center !mt-5 mb-5">
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" type="button"  
                    onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" 
                    onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </div>
    )
}

export default EthicalAsp;