import { useState } from "react";
import { updateForm  } from "../db/index";
import AddActividades from "../components/AddActivities";
import { prevOption } from "../hooks/optionUtils";
import useLoadFormData from "../hooks/useLoadFormData";

const  Activities = ({option,setOption}) => {
    const [actividades, setActividades] = useState({ idF: 8, activities: [] });

    const handleOnSubmit = async (event) => {
            event.preventDefault();
            
            try{
                await updateForm(actividades);
            } catch(error){
                console.log("Error al guardar contracto",error);;
            }
            setOption(prevOption => prevOption + 1);
    };
    useLoadFormData(actividades.idF,setActividades);
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Actividades</p>
                </div>
                <div className="rounded-lg p-0 w-full border-2 border-gray-300">
                    {actividades.activities.map((activity, index) => (
                    <div className="!p-2 m-5 flex justify-between w-full items-center" key={index}>
                        <p>{activity.actMeta}</p>
                        <p>{activity.insR}</p>
                        <p>{activity.participant}</p>
                        <p>{activity.startDate}</p>
                        <p>{activity.endDate}</p>
                        <button type="button">Editar</button>
                    </div>
                    ))}
                </div>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddActividades setActividades={setActividades}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!mr-5 ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmit}>Siguiente</button>
            </div>
        </div>
    )
}

export default Activities;