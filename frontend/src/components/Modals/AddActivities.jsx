import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";
import useLoadFormData from "../../hooks/useLoadFormData";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddActivities = ({setActivities, activitesToEdit = null, onEditComplete = null,Number,NumberDate }) => {
    const [isOpen, setIsOpen] = useState(false)

    const initialFormValues = {
        goal: "",
        institution: "",
        responsibleMember: "",
        startDate: "",
        endDate: ""
    };
    const initialFormValuesErrors = {
        goal: "*",
        institution: "*",
        responsibleMember: "*",
        startDate: "*",
        endDate: "*"
    };
    const [activity, setActivity] = useState(initialFormValues)
    const [newErrors,setNewErrors] = useState(initialFormValuesErrors);
    const [responsable,setResponsable] = useState([]);
    const [datesManage,setDatesManage] = useState([]);
    useLoadFormData(Number,setResponsable);
    useLoadFormData(NumberDate,setDatesManage);
    useEffect(() => {
            if (activitesToEdit) {
                setActivity({
                    goal: activitesToEdit.goal || "",
                    institution: activitesToEdit.institution  || "",
                    responsibleMember: activitesToEdit.responsibleMember || "",
                    startDate: activitesToEdit.startDate || "",
                    endDate: activitesToEdit.endDate || ""
                });
                setIsOpen(true);
            }
    }, [activitesToEdit]);

    const handleActivitySubmit  = useFormAddHandler({
        setState: setActivities,
        key: 'scheduleActivities',
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
        if(datesManage.endDate && (datesManage.startDate>=activity.startDate || datesManage.endDate <= activity.endDate)){
            return alert("Las fechas deben de estar dentro del rango del proyecto")
        }
        const newErrorsF = {}
        if (activity.startDate > activity.endDate) {
            return alert("No puede ser la fecha de inicio después de la fecha de fin");
        }
        Object.entries(activity).forEach(([key, value]) => {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              newErrorsF[key] = `* El campo  es requerido`;
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
                                   {newErrors.goal && (
                                        <>
                                            {newErrors.goal !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.goal}</span>
                                        </>
                                    )} 
                                </p>
                                <input 
                                    name="goal" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe la meta de la actividad..."
                                    value={activity.goal}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>¿Dónde se realizará?
                                        {newErrors.institution && (
                                        <>
                                            {newErrors.institution !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.institution}</span>
                                        </>
                                        )} 
                                    </p>
                                    <input 
                                        name="institution" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe la institución donde se realizará..."
                                        value={activity.institution}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div>
                                    <p>Participante responsable
                                        {newErrors.responsibleMember && (
                                        <>
                                            {newErrors.responsibleMember !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.responsibleMember}</span>
                                        </>
                                        )} 
                                    </p>
                                    <select 
                                        name="responsibleMember" 
                                        className="form-pieza-input" 
                                        placeholder="Selecciona un tipo"
                                        value={activity.responsibleMember}
                                        onChange={handleInputChange}
                                    >   
                                    <option>Selecciona un participante responsable</option>
                                        {Array.isArray(responsable.members) && responsable.members.map((person, index) => (
                                                <option key={index} value={`${person.fName} ${person.lastName1} ${person.lastName2}`}>{`${person.fName} ${person.lastName1} ${person.lastName2}`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <p>Periodo</p>
                            <div className="form-rows">
                                <div>
                                    <p>Fecha de inicio
                                        {newErrors.startDate && (
                                        <>
                                            {newErrors.startDate !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.startDate}</span>
                                        </>
                                        )} 
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
                                        {newErrors.endDate && (
                                        <>
                                            {newErrors.endDate !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.endDate}</span>
                                        </>
                                        )} 
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
                               
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpen(false)
                                    setActivity(initialFormValues)
                                    setNewErrors(initialFormValuesErrors)
                                }} 
                                className="button-cancel"
                                >
                                Cancelar
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddActivities;