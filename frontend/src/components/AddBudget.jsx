import "../styles/addprojects.css"
import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddBudget = ({setBudget}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newBudget  = Object.fromEntries(formData.entries()); // Convierte a objeto
        
        setBudget((prevBudget) => ({
            ...prevBudget,
            budget: [...prevBudget.budget, newBudget], // Agregar nuevo proyecto al array
        }));
        
        setIsOpen(false);
    };
    return (
        <>
            <button className='modalAddProject' onClick={() => setIsOpen(true)}>Agregar Presupuesto</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Presupuesto</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
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