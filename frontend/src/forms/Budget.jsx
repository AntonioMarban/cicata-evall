import AddBudget from "../components/AddBudget";
import { prevOption } from "../hooks/optionUtils";
import useLoadFormData from "../hooks/useLoadFormData";
import { useFormHandler } from "../hooks/useFormHandler";
import { removeItemByIndex } from "../hooks/removeItemByIndex";

import { useState } from "react";
import CardAdd from "../components/CardAdd";

const  Budget = ({option,setOption}) => {
    const [budget, setBudget] = useState({idF:11,p_budgetsJSON:[]});
    const [budgetToEdit, setBudgetToEdit] = useState(null);

    
    const handleOnSubmitForm = useFormHandler({
        form: budget,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setBudget({
            ...budget,
            p_budgetsJSON: removeItemByIndex(budget.p_budgetsJSON, index)
        });
    };

    const handleEditModal = (index, project) => {
        setBudgetToEdit({ ...project, index });
    };
    
    const handleEditComplete = () => {
        setBudgetToEdit(null);
    };

    useLoadFormData(budget.idF,setBudget);

    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Presupuesto</p>
                </div>
                <div className="rounded-lg p-0 w-full">
                    <div className="flex justify-between !p-2">
                    <p className="flex-1">Tipo presupuesto</p>
                    <p className="flex-1 ">Nombre</p>
                    <p className="flex-1 text-center">Gasto $0.00</p>
                    <p className="flex-1"></p>
                    </div>
                </div>
                <CardAdd cards={budget.p_budgetsJSON} 
                    handleDeleteFile={handleDeleteArray} 
                    handleEditModal={handleEditModal}
                    slice={5}
                />
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddBudget 
                            setBudget={setBudget}
                            budgetToEdit={budgetToEdit}
                            onEditComplete={handleEditComplete}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Budget;