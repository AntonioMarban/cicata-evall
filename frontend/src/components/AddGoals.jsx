import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddGoals = ({setDesglose, goalsToEdit = null, onEditComplete = null,setData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialValues = {
        goalName: "",
    }
    const [goals, setGoals] = useState(initialValues)
    const [newErrors,setNewErrors] =  useState(initialValues);
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
                goalName: goalsToEdit.goalName || ""
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
            newErrorsF[key] = `El campo  es requerido`;
          }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleObjectiveSubmit(e, goals, goalsToEdit ? goalsToEdit.index : undefined);
        }
    };
    return (
        <>
            {!goalsToEdit && (
                <button type="button" className='modalAddColaboration' onClick={() => setIsOpen(true)}>
                    Agregar Meta
                </button>
            )
            }

            <Dialog open={isOpen} onClose={() => {}} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{goalsToEdit ? "Editar meta" : "Agregar meta"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Nombre de la Meta
                                <br/>{newErrors.goalName && <span className="text-red-600">*{newErrors.goalName}</span>}
                                </p>
                                <input name="goalName" 
                                       className="form-pieza-input" 
                                       placeholder="Escribe el nombre de la meta..."
                                       value={goals.goalName}
                                       onChange={handleInputChange}></input>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">
                                    {goalsToEdit ? "Guardar cambios" : "Guardar Meta"}
                                </button>
                                {!goalsToEdit && (
                                    <button 
                                    type="button" 
                                    onClick={(e) => {
                                        setIsOpen(false)
                                        setGoals(initialValues)
                                        setNewErrors(initialValues)
                                    }} 
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

export default AddGoals;