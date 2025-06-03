import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddGoals = ({setDesglose, goalsToEdit = null, onEditComplete = null,setData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialValues = {
        goal: "",
    }
    const ErrorinitialValues = {
        goal: "*",
    }
    const [goals, setGoals] = useState(initialValues)
    const [newErrors,setNewErrors] =  useState(ErrorinitialValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGoals(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(()=>{
        if (goalsToEdit){
            setGoals({
                goal: goalsToEdit.goal || ""
            });
            setIsOpen(true);
        }
    }, [goalsToEdit])
 
    const handleObjectiveSubmit = useFormAddHandler({
        setState: setDesglose,
        key: 'goals',
        onSuccess: () => {
            setIsOpen(false);
            if (onEditComplete && goalsToEdit){
                onEditComplete(setData);
            }
            //reset
            setGoals(initialValues);
        },
        initialData: goalsToEdit,
        isEditMode: !!goalsToEdit
      }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(goals).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `* El campo  es requerido`;
          }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleObjectiveSubmit(e, goals, goalsToEdit ? goalsToEdit.index : undefined);
        }
    };
    return (
        <>
            <button type="button" className='modalAddColaboration' onClick={() => setIsOpen(true)}>
                Agregar meta
            </button>


            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{goalsToEdit ? "Editar meta" : "Agregar meta"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Meta
                                    {newErrors.goal && (
                                        <>
                                            {newErrors.goal !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.goal}</span>
                                        </>
                                    )} 
                                </p>
                                <textarea name="goal" 
                                       className="form-pieza-input" 
                                       placeholder="Escribe la meta..."
                                       value={goals.goal}
                                       onChange={handleInputChange}></textarea>
                            </div>
                            <div className="dialog-actions">                                
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpen(false)
                                    setGoals(initialValues)
                                    setNewErrors(ErrorinitialValues)
                                }} 
                                className="button-cancel"
                                >
                                Cancelar
                                </button>

                                <button className="button-confirm">
                                    {goalsToEdit ? "Guardar cambios" : "Guardar meta"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddGoals;