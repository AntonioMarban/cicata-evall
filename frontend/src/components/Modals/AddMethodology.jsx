import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddMethodology = ({setDesglose, methodologiesToEdit = null, onEditComplete = null,setData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialValues = {
        methodology: "",
    }
    const initialValuesErrors = {
        methodology: "*",
    }
    const [methodologies, setMethodologies] = useState(initialValues)
    const [newErrors,setNewErrors] =  useState(initialValuesErrors);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMethodologies(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(()=>{
        if (methodologiesToEdit){
            setMethodologies({
                methodology: methodologiesToEdit.methodology || ""
            });
            setIsOpen(true);
        }
    }, [methodologiesToEdit])
 
    const handleObjectiveSubmit = useFormAddHandler({
        setState: setDesglose,
        key: 'methodologies',
        onSuccess: () => {
            setIsOpen(false);
            if (onEditComplete && methodologiesToEdit){
                onEditComplete(setData);
            }
            //reset
            setMethodologies(initialValues);
        },
        initialData: methodologiesToEdit,
        isEditMode: !!methodologiesToEdit
      }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(methodologies).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `* El campo  es requerido`;
          }
        });
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleObjectiveSubmit(e, methodologies, methodologiesToEdit ? methodologiesToEdit.index : undefined);
        }
    };
    return (
        <>
            <button type="button" className='modalAddColaboration' onClick={() => setIsOpen(true)}>
                Agregar metodología
            </button>

            <Dialog open={isOpen} onClose={() => {setIsOpen(false);  setMethodologies(initialValues) }} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{methodologiesToEdit ? "Editar metodología" : "Agregar metodología"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Metodología
                                    {newErrors.methodology && (
                                        <>
                                            {newErrors.methodology !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.methodology}</span>
                                        </>
                                    )} 
                                </p>
                                <textarea name="methodology" 
                                       className="form-pieza-input" 
                                       placeholder="Escribe la metodología..."
                                       value={methodologies.methodology}
                                       onChange={handleInputChange}></textarea>
                            </div>
                            <div className="dialog-actions">
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpen(false)
                                    setMethodologies(initialValues)
                                    setNewErrors(initialValuesErrors)
                                }} 
                                className="button-cancel"
                                >
                                Cancelar
                                </button>
                        
                                <button className="button-confirm">
                                    {methodologiesToEdit ? "Guardar cambios" : "Guardar metodología"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddMethodology;