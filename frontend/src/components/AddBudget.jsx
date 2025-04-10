import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddBudget = ({setBudget}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleBudgetSubmit = useFormAddHandler({
        setState: setBudget,
        key: 'budget',
        onSuccess: () => setIsOpen(false),
      });
    return (
        <>
            <button className='modalAddProject' onClick={() => setIsOpen(true)}>Agregar Presupuesto</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Presupuesto</p>
                        <form onSubmit={handleBudgetSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Gasto</p>
                                <input name="budgetType" className="form-pieza-input" placeholder="Escribe el tipo de proyecto..."></input>
                            </div>
                            <div className="form-complete-row">
                                <p>Nombre</p>
                                <input name="budgetName" className="form-pieza-input" placeholder="Escribe el tipo de proyecto..."></input>
                            </div>
                            <div className="form-complete-row">
                                <p>Gasto $0.00</p>
                                <input name="budgetAm" className="form-pieza-input" placeholder="Escribe el tipo de proyecto..."></input>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">Guardar presupuesto</button>
                                <button onClick={() => setIsOpen(false)} className="button-cancel">Cancelar</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddBudget;