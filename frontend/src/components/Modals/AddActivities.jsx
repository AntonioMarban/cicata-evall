import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";
import useLoadFormData from "../../hooks/useLoadFormData";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'
import { toast } from "sonner";

const  AddActivities = ({setActivities, activitesToEdit = null, onEditComplete = null,Number,NumberDate,NumberGoal }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [investigator, setInvestigator] = useState(localStorage.getItem("userFullName"));
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
    const [goal,setGoal] = useState([]);
    const [datesManage,setDatesManage] = useState([]);
    useLoadFormData(Number,setResponsable);
    useLoadFormData(NumberGoal,setGoal);
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
    function formatValue(value) {
    if (value == null || value === '') return '-';

    const date = new Date(value);

    if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const start = new Date(datesManage.startDate);
        const end = new Date(datesManage.endDate);
        const activityStart = new Date(activity.startDate);
        const activityEnd = new Date(activity.endDate);
        if(end && (!(start <= activityStart) || !(end >= activityEnd))){
            return toast.error(`Las fechas deben de estar dentro del rango del proyecto del ${formatValue(datesManage.startDate)} al ${formatValue(datesManage.endDate)}`);
        }
        const newErrorsF = {}
        if (activityStart > activityEnd) {
            return toast.error("No puede ser la fecha de inicio después de la fecha de fin");
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
            <button className='modalAddProject' onClick={() => {setIsOpen(true); setActivity(initialFormValues)}}>Agregar actividad</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{activitesToEdit ? "Editar actividades" : "Agregar actividades"}</p>
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
                                    <select 
                                        name="goal" 
                                        className="form-pieza-input" 
                                        placeholder="Selecciona un tipo"
                                        value={activity.goal}
                                        onChange={handleInputChange}
                                    >   
                                    <option>Selecciona una meta</option>
                                        {Array.isArray(goal.goals) && goal.goals.map((item, index) => (
                                                <option key={index} value={`${item.goal}`}>{`${item.goal}`}</option>
                                        ))}
                                    </select>
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
                                    <option value={investigator}>{investigator}</option>
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
                                
                                 <button className="button-confirm">
                                    {activitesToEdit ? "Guardar cambios" : "Guardar actividad"}
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