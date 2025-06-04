import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddReferences = ({setDesglose, referencesToEdit = null, onEditComplete = null, setData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialValues = {
        reference: "",
    }
    const initialValuesErrors = {
        reference: "*",
    }
    const [references, setReferences] = useState(initialValues)
    const [newErrors,setNewErrors] =  useState(initialValuesErrors);
    
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
                reference: referencesToEdit.reference || ""
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
            newErrorsF[key] = `* El campo  es requerido`;
          }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleObjectiveSubmit(e, references, referencesToEdit ? referencesToEdit.index : undefined);
        }
    };
    return (
        <>
            <button type="button" className='modalAddColaboration' onClick={() => setIsOpen(true)}>
                Agregar referencia
            </button>

            <Dialog open={isOpen} onClose={() => {setIsOpen(false); setReferences(initialValues) }} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{referencesToEdit ? "Editar referencia" : "Agregar referencia"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Nombre de la referencia
                                    {newErrors.reference && (
                                        <>
                                            {newErrors.reference !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.reference}</span>
                                        </>
                                    )} 
                                </p>
                                <textarea name="reference" 
                                       className="form-pieza-input" 
                                       placeholder="Escribe el nombre de la Referencia..."
                                       value={references.reference}
                                       onChange={handleInputChange}></textarea>
                            </div>
                            <div className="dialog-actions">
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    setIsOpen(false)
                                    e.preventDefault()
                                    setReferences(initialValues)
                                    setNewErrors(initialValuesErrors)
                                }} 
                                className="button-cancel"
                                >
                                Cancelar
                                </button>

                                <button className="button-confirm">
                                    {referencesToEdit ? "Guardar cambios" : "Guardar referencia"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddReferences;