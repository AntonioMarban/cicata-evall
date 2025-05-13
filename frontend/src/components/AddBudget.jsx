import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddBudget = ({setBudget, budgetToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)
    const budgetsTypes = 
    [
        {id: 1, name: "Gasto de Inversión"},
        {id: 2, name: "Gasto Corriente"},
        {id: 3, name: "Obtención presupuesto interno"},
        {id: 4, name: "Obtención presupuesto externo"}
    ]
    const initialFormValues = {
        investmentExpenditure: "",
        name: "",
        expenditure: ""
    };
    const [typeToShow, setTypeToShow] = useState([]);
    const [budgetForm, setBudgetForm] = useState(initialFormValues)
    const [newErrors,setNewErrors] = useState(initialFormValues);

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
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleBudgetSubmit(e, budgetForm, budgetToEdit ? budgetToEdit.index : undefined);
        }
    };


    useEffect(()=>{
        if(budgetToEdit){
            setBudgetForm({
                investmentExpenditure: budgetToEdit.investmentExpenditure ||"",
                name: budgetToEdit.name ||"",
                expenditure: budgetToEdit.expenditure || 0
            });
            setIsOpen(true);
        }
    }, [budgetToEdit])
    useEffect(()=>{
        if(budgetForm.investmentExpenditure.name === "Gasto de Inversión"){
            setTypeToShow([
                {id: 1, name: "Equipo de laboratorio"},
                {id: 2, name: "Equipo de cómputo"},
                {id: 3, name: "Herramientas y accesorios"},
                {id: 4, name:  "Otros (especifique)"}
              ])
        }
        else if(budgetForm.investmentExpenditure.name === "Gasto Corriente"){
            setTypeToShow([
                {id: 5, name: "Artículos, materiales y útiles diversos"},
                {id: 6, name: "Gastos de trabajo de campo"},
                {id: 7, name: "Difusión de los resultados de investigación"},
                {id: 8, name: "Pago por servicios externos"},
                {id: 9, name: "Viáticos, pasajes y gastos de transportación"},
                {id: 10, name: "Gastos de atención a profesores visitantes, técnicos o expertos visitantes"},
                {id: 11, name: "Compra de libros y suscripción a revistas"},
                {id: 12, name: "Gastos de publicación en revistas nacionales e internacionales"},
                {id: 13, name: "Registro de patentes y propiedad intelectual"},
                {id: 14, name: "Validación de concepto tecnológico"},
                {id: 15, name: "Animales para el desarrollo de protocolos de investigación"},
                {id: 16, name: "Otros (especifique)"}
              ])
        }
        else if(budgetForm.investmentExpenditure.name === "Obtención presupuesto interno"){
            setTypeToShow([
                {id: 17, name:"Proyectos de Investigación Científica y Desarrollo Tecnológico"},
                {id: 18, name:"Proyectos de Investigación en el Programa Especial de Consolidación de Investigadores"},
                {id: 19, name:"Proyectos de Desarrollo Tecnológico o Innovación en el IPN"},
                {id: 20, name:"Proyectos de Investigación Multidisciplinarios y Transdisciplinarios de Investigación Científica y Desarrollo Tecnológico"},
                {id: 21, name:"Proyecto transdiciplinario"},
                {id: 22, name:"Proyectos de Desarrollo Tecnológico o Innovación para alumnos del IPN"}
              ])
        }
        else if(budgetForm.investmentExpenditure.name === "Obtención presupuesto externo"){
            setTypeToShow([
                {id: 23, name:"Externas"}
              ])
        }
    },[budgetForm.investmentExpenditure])
    console.log("aqui",budgetForm.investmentExpenditure,budgetForm.name)
    return (
        <>
            {!budgetToEdit && (
                <button type="button" className='modalAddProject' onClick={() => {setIsOpen(true)}}>
                    Agregar presupuesto
                </button>
            )}

            <Dialog open={isOpen} onClose={() => { }} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{budgetToEdit ? "Editar Presupuesto" : "Agregar Presupuesto"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row">
                                <p>Gasto
                                    <br/>{newErrors.investmentExpenditure && <span className="text-red-600">*{newErrors.investmentExpenditure}</span>}
                                </p>
                                <select
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
                                        <option key={index} value={JSON.stringify(object)}>{object.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-complete-row">
                                <p>Nombre
                                    <br/>{newErrors.name && <span className="text-red-600">*{newErrors.name}</span>}
                                </p>
                                <select 
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
                            <div className="form-complete-row">
                                <p>Gasto $0.00
                                    <br/>{newErrors.expenditure && <span className="text-red-600">*{newErrors.expenditure}</span>}
                                </p>
                                <input 
                                    name="expenditure" 
                                    type="number" 
                                    min={0}
                                    step="0.01"
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={budgetForm.expenditure}
                                    onChange={handleInputChange}
                                ></input>
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