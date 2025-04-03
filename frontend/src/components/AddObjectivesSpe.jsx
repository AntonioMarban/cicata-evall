import "../styles/addprojects.css"
import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddObjectivesSpe = ({setDesglose}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newObjective  = Object.fromEntries(formData.entries()); 
        
        setDesglose((prevSObjectives) => ({
            ...prevSObjectives,
            sObjectives: [...prevSObjectives.sObjectives, newObjective],
        }));
        
        setIsOpen(false);
    };
    return (
        <>
            <button className='modalAddColaboration' onClick={() => setIsOpen(true)}>Agregar Objetivo</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Objetivo</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Nombre del Objetivo específico</p>
                                <input name="objectiveName" className="form-pieza-input" placeholder="Escribe el nombre del objetivo..."></input>
                            </div>
                            <div className="form-complete-row">
                                <p>Descripción</p>
                                <input name="objectiveDescription" className="form-pieza-input" placeholder="Escribe la descripción del objetivo..."></input>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">Guardar objetivo</button>
                                <button onClick={() => setIsOpen(false)} className="button-cancel">Cancelar</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddObjectivesSpe;