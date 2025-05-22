import AddBudget from "../components/Modals/AddBudget.jsx";
import useLoadFormData from "../hooks/useLoadFormData.js";
import { removeItemByIndex } from "../hooks/removeItemByIndex.js";
import useSubmitFormBack from "../hooks/useSubmitFormBack.js";
import useSubmitFormNext from "../hooks/useSubmitFormNext.js";
import { useState } from "react";
import ShowCards from "../components/ShowCardsBudget.jsx";

const  Budget = ({option,setOption}) => {
    
    const [budget, setBudget] = useState({
        idF: 31,
        budgets:[]
    });
    const [budgetToEdit, setBudgetToEdit] = useState(null);

    const handleOnSubmitFormBack = useSubmitFormBack(budget, setOption);
    const handleOnSubmitForm = useSubmitFormNext(budget, setOption);
    const handleDeleteArray = (index) => {
        setBudget({
            ...budget,
            budgets: removeItemByIndex(budget.budgets, index)
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
                    <p className="flex-1 text-center">Nombre</p>
                    <p className="flex-1 text-end">Gasto $</p>
                    <p className="flex-1 text-start"></p>
                    </div>
                </div>
                <ShowCards cards={budget.budgets} 
                    handleDeleteFile={handleDeleteArray} 
                    handleEditModal={handleEditModal}
                    slice={3}
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
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Budget;