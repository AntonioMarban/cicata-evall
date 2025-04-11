import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddProyectos = ({setProjects}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleActivitySubmit  = useFormAddHandler({
        setState: setProjects,
        key: 'projects',
        onSuccess: ()=> setIsOpen(false),
    });
    return (
        <>
            <button type="button" className='modalAddProject' onClick={() => setIsOpen(true)}>Agregar proyecto</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Proyecto</p>
                        <form onSubmit={handleActivitySubmit} className="form-pieza">
                            <div className="form-rows">
                                <div>
                                    <p>Nombre proyecto</p>
                                    <input name="projectName" className="form-pieza-input" placeholder="Escribe el nombre del proyecto..."></input>
                                </div>
                                <div>
                                    <p>Fecha de asociación</p>
                                    <input name="projectDate" className="form-pieza-input" type="date"></input>
                                </div>
                            </div>
                            <div className="form-complete-row">
                                <p>Tipo de proyecto</p>
                                <p className="form-subtext">(p.e. Tesis maestría, convocatoria interna innovación, convocatoria externa fronteras, etc.)</p>
                                <input name="projectType" className="form-pieza-input" placeholder="Escribe el tipo de proyecto..."></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>Número de registro externo</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input name="noRE" className="form-pieza-input" placeholder="Escribe el numero de registro externo..."></input>
                                </div>
                                <div>
                                    <p>Número de registro SIP</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input name="noRESIP" className="form-pieza-input" placeholder="Escribe el numero de registro SIP..."></input>
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">Guardar proyecto</button>
                                <button type="button" onClick={() => setIsOpen(false)} className="button-cancel">Cancelar</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddProyectos;