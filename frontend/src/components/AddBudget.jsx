import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddBudget = ({setBudget, budgetToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)

    const initialFormValues = {
        investmentExpenditure: "",
        name: "",
        expenditure: ""
    };

    const [budgetForm, setBudgetForm] = useState(initialFormValues)
    const [newErrors,setNewErrors] = useState(initialFormValues);

    const handleBudgetSubmit = useFormAddHandler({
        setState: setBudget,
        key: 'budgets',
        onSuccess: () => {
            setIsOpen(false)
            if (onEditComplete && budgetToEdit){
                onEditComplete();
            }

            setBudgetForm(initialFormValues)
        },
        initialData: budgetToEdit,
        isEditMode: !!budgetToEdit
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBudgetForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(budgetForm).forEach(([key, value]) => {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              newErrorsF[key] = `El campo  es requerido`;
            }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleBudgetSubmit(e, budgetForm, budgetToEdit ? budgetToEdit.index : undefined);
        }
    };


    useEffect(()=>{
        if(budgetToEdit){
            setBudgetForm({
                investmentExpenditure: budgetToEdit.investmentExpenditure ||"",
                name: budgetToEdit.name ||"",
                expenditure: budgetToEdit.expenditure || 0
            });
            setIsOpen(true);
        }
    }, [budgetToEdit])



    return (
        <>
            {!budgetToEdit && (
                <button type="button" className='modalAddProject' onClick={() => {setIsOpen(true)}}>
                    Agregar presupuesto
                </button>
            )}

            <Dialog open={isOpen} onClose={() => { }} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{budgetToEdit ? "Editar Presupuesto" : "Agregar Presupuesto"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Gasto
                                    <br/>{newErrors.investmentExpenditure && <span className="text-red-600">*{newErrors.investmentExpenditure}</span>}
                                </p>
                                <input 
                                    name="investmentExpenditure" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={budgetForm.investmentExpenditure}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="form-complete-row">
                                <p>Nombre
                                    <br/>{newErrors.name && <span className="text-red-600">*{newErrors.name}</span>}
                                </p>
                                <input 
                                    name="name" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={budgetForm.name}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="form-complete-row">
                                <p>Gasto $0.00
                                    <br/>{newErrors.expenditure && <span className="text-red-600">*{newErrors.expenditure}</span>}
                                </p>
                                <input 
                                    name="expenditure" 
                                    type="number" 
                                    min={0}
                                    step="0.01"
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={budgetForm.expenditure}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">
                                    {budgetToEdit ? "Guardar cambios" : "Guardar presupuesto"}
                                </button>
                                {!budgetToEdit && (
                                    <button 
                                    type="button" 
                                    onClick={(e) => setIsOpen(false)} 
                                    className="button-cancel"
                                    >
                                    Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddBudget;