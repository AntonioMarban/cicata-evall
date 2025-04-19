import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";
import useLoadFormData from "../hooks/useLoadFormData";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddActivities = ({setActivities, activitesToEdit = null, onEditComplete = null }) => {
    const [isOpen, setIsOpen] = useState(false)

    const initialFormValues = {
        actGoal: "",
        insR: "",
        participant: "",
        startDate: "",
        endDate: ""
    };
    const [activity, setActivity] = useState(initialFormValues)
    const [newErrors,setNewErrors] = useState(initialFormValues);
    const [responsable,setResponsable] = useState([]);

    useLoadFormData(3,setResponsable);

    useEffect(() => {
            if (activitesToEdit) {
                setActivity({
                    actGoal: activitesToEdit.actGoal || "",
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
        const newErrorsF = {}
        if (activity.startDate > activity.endDate) {
            return alert("No puede ser la fecha de inicio después de la fecha de fin");
        }
        Object.entries(activity).forEach(([key, value]) => {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              newErrorsF[key] = `El campo  es requerido`;
            }
        });

        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleActivitySubmit(e, activity, activitesToEdit ? activitesToEdit.index : undefined);
        }
    };

    return (
        <>
            <button className='modalAddProject' onClick={() => setIsOpen(true)}>Agregar actividad</button>

            <Dialog open={isOpen} onClose={() => {}} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{activitesToEdit ? "Editar Actividades" : "Agregar Actividades"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Meta
                                    <br/>{newErrors.actGoal && <span className="text-red-600">*{newErrors.actGoal}</span>}
                                </p>
                                <input 
                                    name="actGoal" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe la meta de la actividad..."
                                    value={activity.actGoal}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>¿Dónde se realizará?
                                        <br/>{newErrors.insR && <span className="text-red-600">*{newErrors.insR}</span>}
                                    </p>
                                    <input 
                                        name="insR" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe la institución donde se realizará..."
                                        value={activity.insR}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div>
                                    <p>Participante Responsable
                                        <br/>{newErrors.participant && <span className="text-red-600">*{newErrors.participant}</span>}
                                    </p>
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
                                    <p>Fecha de inicio
                                        <br/>{newErrors.startDate && <span className="text-red-600">*{newErrors.startDate}</span>}
                                    </p>
                                    <input 
                                        type="date" 
                                        name="startDate" 
                                        className="form-pieza-input"
                                        value={activity.startDate}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div>
                                    <p>Fecha de fin
                                        <br/>{newErrors.endDate && <span className="text-red-600">*{newErrors.endDate}</span>}
                                    </p>
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