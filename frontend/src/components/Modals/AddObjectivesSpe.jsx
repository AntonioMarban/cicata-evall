import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddObjectivesSpe = ({setDesglose, desgloseToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialValues = {
        objectiveName: "",
    }
    const ErrorInitial = {
        objectiveName: "*",
    }
    const [objectiveSpe, setObjectiveSpe] = useState(initialValues)
    const [newErrors,setNewErrors] =  useState(ErrorInitial);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setObjectiveSpe(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(()=>{
        if (desgloseToEdit){
            setObjectiveSpe({
                objectiveName: desgloseToEdit.objectiveName || "",
            });
            setIsOpen(true);
        }
    }, [desgloseToEdit])
 
    const handleObjectiveSubmit = useFormAddHandler({
        setState: setDesglose,
        key: 'specificObjectives',
        onSuccess: () => {
            setIsOpen(false);
            if (onEditComplete && desgloseToEdit){
                onEditComplete();
            }
            //reset
            setObjectiveSpe(initialValues);
        },
        initialData: desgloseToEdit,
        isEditMode: !!desgloseToEdit
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(objectiveSpe).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `* El campo  es requerido`;
          }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleObjectiveSubmit(e, objectiveSpe, desgloseToEdit ? desgloseToEdit.index : undefined);
        }
    };

    return (
        <>
            <button type="button" className='modalAddColaboration' onClick={() => setIsOpen(true)}>
                Agregar objetivo
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{desgloseToEdit ? "Editar objetivo específico" : "Agregar objetivo específico"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Objetivo específico
                                    {newErrors.objectiveName && (
                                        <>
                                            {newErrors.objectiveName !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.objectiveName}</span>
                                        </>
                                    )}  
                                </p>
                                <input name="objectiveName" 
                                       className="form-pieza-input" 
                                       placeholder="Escribe el objetivo específico..."
                                       value={objectiveSpe.objectiveName}
                                       onChange={handleInputChange}></input>
                            </div>
                            <div className="dialog-actions">
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpen(false)
                                    setObjectiveSpe(initialValues)
                                    setNewErrors(ErrorInitial)
                                }} 
                                className="button-cancel"
                                >
                                Cancelar
                                </button>

                                <button className="button-confirm">
                                    {desgloseToEdit ? "Guardar cambios" : "Guardar objetivo"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddObjectivesSpe;