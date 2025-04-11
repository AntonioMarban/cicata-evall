import AddBudget from "../components/AddBudget";
import { prevOption } from "../hooks/optionUtils";
import useLoadFormData from "../hooks/useLoadFormData";
import { useFormHandler } from "../hooks/useFormHandler";
import { removeItemByIndex } from "../hooks/removeItemByIndex";

import { useState } from "react";
import CardAdd from "../components/CardAdd";

const  Budget = ({option,setOption}) => {
    const [budget, setBudget] = useState({idF:11,budget:[]});
    const handleOnSubmitForm = useFormHandler({
        form: budget,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setBudget({
            ...budget,
            budget: removeItemByIndex(budget.budget, index)
        });
    };

    useLoadFormData(budget.idF,setBudget);

    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Presupuesto</p>
                </div>
                <CardAdd cards={budget.budget} handleDeleteFile={handleDeleteArray} slice={5}/>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddBudget setBudget={setBudget}/>
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

export default Budget;