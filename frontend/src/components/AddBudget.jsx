import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddBudget = ({setBudget, budgetToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)

    const initialFormValues = {
        budgetType: "",
        budgetName: "",
        budgetAm: 0
    };

    const [budgetForm, setBudgetForm] = useState({
        budgetType: "",
        budgetName: "",
        budgetAm: 0
    })

    const handleBudgetSubmit = useFormAddHandler({
        setState: setBudget,
        key: 'budget',
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
        handleBudgetSubmit(e, budgetForm, budgetToEdit ? budgetToEdit.index : undefined);
    };


    useEffect(()=>{
        if(budgetToEdit){
            setBudgetForm({
                budgetType: budgetToEdit.budgetType ||"",
                budgetName: budgetToEdit.budgetName ||"",
                budgetAm: budgetToEdit.budgetAm || 0
            });
            setIsOpen(true);
        }
    }, [budgetToEdit])



    return (
        <>
            {!budgetToEdit && (
                <button type="button" className='modalAddProject' onClick={() => setIsOpen(true)}>
                    Agregar presupuesto
                </button>
            )}

            <Dialog open={isOpen} onClose={() => { if(!budgetToEdit) setIsOpen(false)}} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{budgetToEdit ? "Editar Presupuesto" : "Agregar Presupuesto"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Gasto</p>
                                <input 
                                    name="budgetType" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={budgetForm.budgetType}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="form-complete-row">
                                <p>Nombre</p>
                                <input 
                                    name="budgetName" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={budgetForm.budgetName}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="form-complete-row">
                                <p>Gasto $0.00</p>
                                <input 
                                    name="budgetAm" 
                                    type="number" min={0}
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={budgetForm.budgetAm}
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