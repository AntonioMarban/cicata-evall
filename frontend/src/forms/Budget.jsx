import { useState } from "react";
import AddBudget from "../components/AddBudget";
import { prevOption } from "../hooks/optionUtils";
import useLoadFormData from "../hooks/useLoadFormData";
import { updateForm  } from "../db/index";

const  Budget = ({option,setOption}) => {
    const [budget, setBudget] = useState({idF:11,budget:[]});
    const handleOnSubmit = async (event) => {
            event.preventDefault();
            
            try{
                await updateForm(budget);
            } catch(error){
                console.log("Error al guardar contracto",error);;
            }
            setOption(prevOption => prevOption + 1);
    };
    useLoadFormData(budget.idF,setBudget);

    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Presupuesto</p>
                </div>
                <div className="rounded-lg p-0 w-full border-2 border-gray-300">
                {Array.isArray(budget.budget) && budget.budget.map((item, index) => (
                    <div className="!p-2 m-5 flex justify-between w-full items-center" key={index}>
                        <p>{item.budgetType}</p>
                        <p>{item.budgetName}</p>
                        <p>{item.budgetAm}</p>
                        <button type="button">Editar</button>
                    </div>
                    ))}
                </div>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddBudget setBudget={setBudget}/>
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

export default Budget;