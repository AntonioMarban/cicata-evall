import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddActivities = ({setActivities}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleActivitySubmit  = useFormAddHandler({
        setState: setActivities,
        key: 'activities',
        onSuccess: ()=> setIsOpen(false),
    });

    return (
        <>
            <button className='modalAddProject' onClick={() => setIsOpen(true)}>Agregar actividad</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Actividad</p>
                        <form onSubmit={handleActivitySubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Meta</p>
                                <input name="actMeta" className="form-pieza-input" placeholder="Escribe la meta de la actividad..."></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>Institución donde se realiza</p>
                                    <input name="insR" className="form-pieza-input" placeholder="Escribe la institución donde se realizará..."></input>
                                </div>
                                <div>
                                    <p>Participante Responsable</p>
                                    <input name="participant" className="form-pieza-input" placeholder="Select type"></input>
                                </div>
                            </div>
                            <p>Periodo</p>
                            <div className="form-rows">
                                <div>
                                    <p>Fecha de inicio</p>
                                    <input type="date" name="startDate" className="form-pieza-input"></input>
                                </div>
                                <div>
                                    <p>Fecha de fin</p>
                                    <input type="date" name="endDate" className="form-pieza-input"></input>
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">Guardar actividad</button>
                                <button type="button"  onClick={() => setIsOpen(false)} className="button-cancel">Cancelar</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddActivities;