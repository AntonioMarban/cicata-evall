import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";
import useLoadFormData from "../hooks/useLoadFormData";

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
    const [responsable,setResponsable] = useState([]);
    const [activity, setActivity] = useState({
        actMeta: "",
        insR: "",
        participant: "",
        startDate: "",
        endDate: ""
    })

    console.log(responsable.participants)
    useLoadFormData(3,setResponsable);

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
                        <p className="dialog-title">{activitesToEdit ? "Editar Actividades" : "Agregar Actividades"}</p>
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
                                    <p>¿Dónde se realizará?</p>
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
                                    <select 
                                        name="participant" 
                                        className="form-pieza-input" 
                                        placeholder="Select type"
                                        value={activity.participant}
                                        onChange={handleInputChange}
                                    >   
                                    <option>Selecciona un participante</option>
                                        {Array.isArray(responsable.participants) && responsable.participants.map((person, index) => (
                                                <option key={index} value={`${person.nombre} ${person.paterno} ${person.materno}`}>{`${person.nombre} ${person.paterno} ${person.materno}`}</option>
                                        ))}
                                    </select>
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