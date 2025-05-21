import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'
import { prevOption } from "../hooks/optionUtils";

const  AddBudget = ({setBudget, budgetToEdit = null, onEditComplete = null}) => {
    const initialFormValues = {
        investmentExpenditure: "",
        name: "",
        expenditure: "",
        otherName: "",
        convDate: ""
    };
    const [typeToShow, setTypeToShow] = useState([]);
    const [budgetForm, setBudgetForm] = useState(initialFormValues)
    const [newErrors,setNewErrors] = useState(initialFormValues);
    const [isOpen, setIsOpen] = useState(false)
    const budgetsTypes = 
    [
        {idType: 1, nameType: "Gasto de Inversión"},
        {idType: 2, nameType: "Gasto Corriente"},
        {idType: 3, nameType: "Obtención presupuesto interno"},
        {idType: 4, nameType: "Obtención presupuesto externo"}
    ]

    const handleBudgetSubmit = useFormAddHandler({
        setState: setBudget,
        key: 'budgets',
        onSuccess: () => {
            setIsOpen(false)
            if (onEditComplete && budgetToEdit){
                onEditComplete();
            }

            setBudgetForm(initialFormValues)
        },
        initialData: budgetToEdit,
        isEditMode: !!budgetToEdit
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBudgetForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(budgetForm).forEach(([key, value]) => {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              newErrorsF[key] = `El campo  es requerido`;
            }
        });
        if (budgetForm.name.idName != 4){
            delete newErrorsF['otherName']
        }
        if (budgetForm.name.idName != 23){
            delete newErrorsF['convDate']
        }
        setNewErrors(newErrorsF)
        function flattenObject(obj, parentKey = '', result = {}) {
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) continue;

            const fullKey = key;
            const value = obj[key];

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            flattenObject(value, fullKey, result);
            } else {
            result[fullKey] = value;
            }
        }
        return result;
        }
        const FormatBudget = flattenObject(budgetForm);
        console.log(budgetForm)
        if(!Object.keys(newErrorsF).length>0){
            handleBudgetSubmit(e, FormatBudget, budgetToEdit ? budgetToEdit.index : undefined);
        }
    };


    useEffect(()=>{
        if(budgetToEdit){
            console.log("toedit",budgetToEdit)
            setBudgetForm({
                investmentExpenditure: {
                    idType: budgetToEdit.idType || "", 
                    nameType: budgetToEdit.nameType || ""
                },
                name:  {
                    idName: budgetToEdit.idName || "", 
                    name: budgetToEdit.name || ""
                },
                expenditure: budgetToEdit.expenditure || 0,
                otherName: budgetToEdit.otherName || "",
                convDate: budgetToEdit.convDate
            });
            setIsOpen(true);
        }
    }, [budgetToEdit])
    useEffect(()=>{
        if(budgetForm.investmentExpenditure.nameType === "Gasto de Inversión"){
            setTypeToShow([
                {idName: 1, name: "Equipo de laboratorio"},
                {idName: 2, name: "Equipo de cómputo"},
                {idName: 3, name: "Herramientas y accesorios"},
                {idName: 4, name:  "Otros (especifique)"}
              ])
        }
        else if(budgetForm.investmentExpenditure.nameType === "Gasto Corriente"){
            setTypeToShow([
                {idName: 5, name: "Artículos, materiales y útiles diversos"},
                {idName: 6, name: "Gastos de trabajo de campo"},
                {idName: 7, name: "Difusión de los resultados de investigación"},
                {idName: 8, name: "Pago por servicios externos"},
                {idName: 9, name: "Viáticos, pasajes y gastos de transportación"},
                {idName: 10, name: "Gastos de atención a profesores visitantes, técnicos o expertos visitantes"},
                {idName: 11, name: "Compra de libros y suscripción a revistas"},
                {idName: 12, name: "Gastos de publicación en revistas nacionales e internacionales"},
                {idName: 13, name: "Registro de patentes y propiedad intelectual"},
                {idName: 14, name: "Validación de concepto tecnológico"},
                {idName: 15, name: "Animales para el desarrollo de protocolos de investigación"},
                {idName: 4,  name: "Otros (especifique)"}
              ])
        }
        else if(budgetForm.investmentExpenditure.nameType === "Obtención presupuesto interno"){
            setTypeToShow([
                {idName: 17, name:"Proyectos de Investigación Científica y Desarrollo Tecnológico"},
                {idName: 18, name:"Proyectos de Investigación en el Programa Especial de Consolidación de Investigadores"},
                {idName: 19, name:"Proyectos de Desarrollo Tecnológico o Innovación en el IPN"},
                {idName: 20, name:"Proyectos de Investigación Multidisciplinarios y Transdisciplinarios de Investigación Científica y Desarrollo Tecnológico"},
                {idName: 21, name:"Proyecto transdiciplinario"},
                {idName: 22, name:"Proyectos de Desarrollo Tecnológico o Innovación para alumnos del IPN"}
              ])
        }
        else if(budgetForm.investmentExpenditure.nameType === "Obtención presupuesto externo"){
            setTypeToShow([
                {idName: 23, name:"Externas"}
              ])
        }
    },[budgetForm.investmentExpenditure])
    return (
        <>
            {!budgetToEdit && (
                <button type="button" className='modalAddProject' onClick={() => {setIsOpen(true)}}>
                    Agregar presupuesto
                </button>
            )}

            <Dialog open={isOpen} onClose={() => { }} className="dialog-overlay">
                <div className="dialog-container2">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{budgetToEdit ? "Editar Presupuesto" : "Agregar Presupuesto"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row-div">
                                <div>
                                    <p>Gasto
                                        <br/>{newErrors.investmentExpenditure && <span className="text-red-600">*{newErrors.investmentExpenditure}</span>}
                                    </p>
                                    <select
                                        className="modal-select"
                                        name="investmentExpenditure"
                                        value={JSON.stringify(budgetForm.investmentExpenditure)}
                                        onChange={(e) =>
                                            setBudgetForm({
                                            ...budgetForm,
                                            investmentExpenditure: JSON.parse(e.target.value),
                                            })
                                        }
                                        >
                                        <option value="">Selecciona una opción</option>
                                        {budgetsTypes.map((object, index) => (
                                            <option key={index} value={JSON.stringify(object)}>{object.nameType}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-complete-row">
                                <p>Nombre
                                    <br/>{newErrors.name && <span className="text-red-600">*{newErrors.name}</span>}
                                </p>
                                <select 
                                    className="modal-select"
                                    name="name" 
                                    value={JSON.stringify(budgetForm.name)}
                                    onChange={(e)=>{setBudgetForm({
                                        ...budgetForm,
                                        name: JSON.parse(e.target.value),
                                        })}}>
                                    <option value="">Selecciona una opción</option>
                                    {Array.isArray(typeToShow) && typeToShow.map((object, index) => (
                                        <option key={index} value={JSON.stringify(object)}>{object.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-complete-row-div">
                                <div>
                                    <p>Gasto $0.00
                                        <br/>{newErrors.expenditure && <span className="text-red-600">*{newErrors.expenditure}</span>}
                                    </p>
                                    <input 
                                        name="expenditure" 
                                        type="number" 
                                        min={0}
                                        step="0.01"
                                        className="form-pieza-input" 
                                        placeholder="Escribe la cantidad del gasto..."
                                        value={budgetForm.expenditure}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div>
                                    {budgetForm.name.idName === 4 || budgetForm.name.idName === 23 && (
                                        <div>
                                            <p>Nombre del presupuesto
                                                <br/>{newErrors.otherName && <span className="text-red-600">*{newErrors.otherName}</span>}
                                            </p>
                                            <input 
                                                placeholder="Escribe el nombre del presupuesto..." 
                                                name="otherName"
                                                value={budgetForm.otherName}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {budgetForm.name.idName === 23 && (
                                        <div>
                                            <p>Fecha de convocatoria
                                                <br/>{newErrors.convDate && <span className="text-red-600">*{newErrors.convDate}</span>}
                                            </p>
                                            <input 
                                                type="date"
                                                name="convDate"
                                                value={budgetForm.convDate}
                                                onChange={handleInputChange}
                                            ></input>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">
                                    {budgetToEdit ? "Guardar cambios" : "Guardar presupuesto"}
                                </button>
                                {!budgetToEdit && (
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

export default AddBudget;