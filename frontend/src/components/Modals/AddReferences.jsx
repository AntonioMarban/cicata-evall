import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddReferences = ({setDesglose, referencesToEdit = null, onEditComplete = null, setData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialValues = {
        referenceName: "",
    }
    const [references, setReferences] = useState(initialValues)
    const [newErrors,setNewErrors] =  useState(initialValues);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReferences(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(()=>{
        if (referencesToEdit){
            setReferences({
                referenceName: referencesToEdit.referenceName || ""
            });
            setIsOpen(true);
        }
    }, [referencesToEdit])
 
    const handleObjectiveSubmit = useFormAddHandler({
        setState: setDesglose,
        key: 'references',
        onSuccess: () => {
            setIsOpen(false);
            if (onEditComplete && referencesToEdit){
                onEditComplete(setData);
            }
            //reset
            setReferences(initialValues);
        },
        initialData: referencesToEdit,
        isEditMode: !!referencesToEdit
      }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(references).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `El campo  es requerido`;
          }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleObjectiveSubmit(e, references, referencesToEdit ? referencesToEdit.index : undefined);
        }
    };
    return (
        <>
            {!referencesToEdit && (
                <button type="button" className='modalAddColaboration' onClick={() => setIsOpen(true)}>
                    Agregar Referencia
                </button>
            )
            }

            <Dialog open={isOpen} onClose={() => {}} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{referencesToEdit ? "Editar Referencia" : "Agregar Referencia"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Nombre de la Referencia
                                <br/>{newErrors.referenceName && <span className="text-red-600">*{newErrors.referenceName}</span>}
                                </p>
                                <input name="referenceName" 
                                       className="form-pieza-input" 
                                       placeholder="Escribe el nombre de la Referencia..."
                                       value={references.referenceName}
                                       onChange={handleInputChange}></input>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">
                                    {referencesToEdit ? "Guardar cambios" : "Guardar Referencia"}
                                </button>
                                {!referencesToEdit && (
                                    <button 
                                    type="button" 
                                    onClick={(e) => {
                                        setIsOpen(false)
                                        setReferences(initialValues)
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

export default AddReferences;