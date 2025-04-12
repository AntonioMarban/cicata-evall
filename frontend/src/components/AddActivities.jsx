import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddActivities = ({setActivities, activitesToEdit = null, onEditComplete = null }) => {
    const [isOpen, setIsOpen] = useState(false)

    const initialFormValues = {
        actMeta: "",
        insR: "",
        participant: "",
        startDate: "",
        endDate: ""
    };

    const [activity, setActivity] = useState({
        actMeta: "",
        insR: "",
        participant: "",
        startDate: "",
        endDate: ""
    })

    useEffect(() => {
            if (activitesToEdit) {
                setActivity({
                    actMeta: activitesToEdit.actMeta || "",
                    insR: activitesToEdit.insR  || "",
                    participant: activitesToEdit.participant || "",
                    startDate: activitesToEdit.startDate || "",
                    endDate: activitesToEdit.endDate || ""
                });
                setIsOpen(true);
            }
        }, [activitesToEdit]);

    const handleActivitySubmit  = useFormAddHandler({
        setState: setActivities,
        key: 'activities',
        onSuccess: ()=> {
            setIsOpen(false)
            if (onEditComplete && activitesToEdit){
                onEditComplete();
            }
            setActivity(initialFormValues);
        },
        initialData: activitesToEdit,
        isEditMode: !!activitesToEdit
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivity(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleActivitySubmit(e, activity, activitesToEdit ? activitesToEdit.index : undefined);
    };

    return (
        <>
            <button className='modalAddProject' onClick={() => setIsOpen(true)}>Agregar actividad</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Actividad</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Meta</p>
                                <input 
                                    name="actMeta" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe la meta de la actividad..."
                                    value={activity.actMeta}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>Institución donde se realiza</p>
                                    <input 
                                        name="insR" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe la institución donde se realizará..."
                                        value={activity.insR}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div>
                                    <p>Participante Responsable</p>
                                    <input 
                                        name="participant" 
                                        className="form-pieza-input" 
                                        placeholder="Select type"
                                        value={activity.participant}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                            </div>
                            <p>Periodo</p>
                            <div className="form-rows">
                                <div>
                                    <p>Fecha de inicio</p>
                                    <input 
                                        type="date" 
                                        name="startDate" 
                                        className="form-pieza-input"
                                        value={activity.startDate}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div>
                                    <p>Fecha de fin</p>
                                    <input 
                                        type="date" 
                                        name="endDate" 
                                        className="form-pieza-input"
                                        value={activity.endDate}
                                        onChange={handleInputChange}
                                        ></input>
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">
                                    {activitesToEdit ? "Guardar cambios" : "Guardar actividad"}
                                </button>
                                {!activitesToEdit && (
                                    <button 
                                    type="button" 
                                    onClick={(e) => setIsOpen(false)} 
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

export default AddActivities;