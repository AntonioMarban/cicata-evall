import { useState } from "react";
import { updateForm  } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";

const  EthicalAsp = ({option,setOption}) => {
    const [conseHum, setConseHum] = useState(1);
    const [conseAnimals, setConseAnimals] = useState(1);
    const [aspectosEticos, setAspectosEticos] = useState(
        {   idF: 6,
            textAspects:"",
            conseHum,
            conseAnimals});
    const handleChangeButton = (key, value) => {
        setAspectosEticos((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAspectosEticos({ ...aspectosEticos, [name]: value });
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try{
            await updateForm(aspectosEticos);

        } catch(error){
            console.log("Error al guardar contracto",error);
        }
        setOption(prevOption => prevOption + 1);
        
    }
    useLoadFormData(aspectosEticos.idF,setAspectosEticos);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div className="flex-1 w-1/2">
                    <p className="text-2xl">Aspectos éticos de la investigación</p>
                    <p className="text-lg !mt-3 text-[#6D7580]">Describir cómo el proyecto se apega a los principios bioéticos especificados en la Declaración de Helsinki y otros aspectos bioéticos que sea importante mencionar</p>
                </div>
                <div className="flex-1 mt-5">
                    <div className="flex flex-wrap w-1/2">
                        <div className="flex-1">
                            <textarea 
                            className="w-full !p-2.5 rounded-lg border-2 border-[#E1E1E1] text-lg flex justify-end text-[#6D7580] !mt-3 min-w-[250px]"
                            name="textAspects"
                            value={aspectosEticos.textAspects}
                            onChange={handleChange}
                            placeholder="Escribe los aspectos éticos..."></textarea>
                        </div>
                    </div>
                </div>
                <div className="flex-2 flex flex-col !mt-5 w-1/2">
                    <p className="text-lg">¿Necesitas consentimiento de trabajar con humanos o muestras humanas?</p>
                    <div className="flex flex-wrap justify-between w-3/5">
                        <button
                        className={aspectosEticos.conseHum === 1  ? 
                        'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                        : 
                        'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                        onClick={() => handleChangeButton('conseHum', 1)}
                        type="button">Si</button>
                        <button
                        className={aspectosEticos.conseHum === 0  ? 
                        'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                        :
                        'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                        onClick={() => handleChangeButton('conseHum', 0)}
                        type="button">No</button>
                    </div>
                    <p className="mb-5">¿Necesitas consentimiento de trabajar con humanos o muestras humanas?</p>
                    <div className="flex flex-wrap justify-between w-3/5">
                    <button
                        className={aspectosEticos.conseAnimals === 1  ? 
                        'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                        : 
                        'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                        onClick={() => handleChangeButton('conseAnimals', 1)}
                        type="button">Si</button>
                        <button
                        className={aspectosEticos.conseAnimals === 0  ? 
                        'bg-[#5CB7E6] w-1/5 p-3 rounded-2xl border-none text-white text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5' 
                        : 
                        'bg-[#E1E1E1] w-1/5 p-3 rounded-2xl border-none text-base font-medium shadow-md cursor-pointer min-w-[150px] !mt-5'} 
                        onClick={() => handleChangeButton('conseAnimals', 0)}
                        type="button">No</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center !mt-5 mb-5">
                <button className="!mr-5 ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  
                    onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" 
                    onClick={handleOnSubmit}>Siguiente</button>
            </div>
        </div>
    )
}

export default EthicalAsp;