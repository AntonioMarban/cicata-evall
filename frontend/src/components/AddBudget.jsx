import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddBudget = ({setBudget, budgetToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)
    const budgetsTypes = ["Gasto de Inversión","Gasto Corriente","Obtención presupuesto interno","Obtención presupuesto externo"]
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
        if(budgetForm.investmentExpenditure === "Gasto de Inversión"){
            setTypeToShow([
                "Equipo de laboratorio",
                "Equipo de cómputo",
                "Herramientas y accesorios",
                "Otros (especifique)"
              ])
        }
        else if(budgetForm.investmentExpenditure === "Gasto Corriente"){
            setTypeToShow([
                "Artículos, materiales y útiles diversos",
                "Gastos de trabajo de campo",
                "Difusión de los resultados de investigación",
                "Pago por servicios externos",
                "Viáticos, pasajes y gastos de transportación",
                "Gastos de atención a profesores visitantes, técnicos o expertos visitantes",
                "Compra de libros y suscripción a revistas",
                "Gastos de publicación en revistas nacionales e internacionales",
                "Registro de patentes y propiedad intelectual",
                "Validación de concepto tecnológico",
                "Animales para el desarrollo de protocolos de investigación",
                "Otros (especifique)"
              ])
        }
        else if(budgetForm.investmentExpenditure === "Obtención presupuesto interno"){
            setTypeToShow([
                "Proyectos de Investigación Científica y Desarrollo Tecnológico",
                "Proyectos de Investigación en el Programa Especial de Consolidación de Investigadores",
                "Proyectos de Desarrollo Tecnológico o Innovación en el IPN",
                "Proyectos de Investigación Multidisciplinarios y Transdisciplinarios de Investigación Científica y Desarrollo Tecnológico",
                "Proyecto transdiciplinario",
                "Proyectos de Desarrollo Tecnológico o Innovación para alumnos del IPN"
              ])
        }
        else if(budgetForm.investmentExpenditure === "Obtención presupuesto externo"){
            setTypeToShow([
                "Especificar el nombre de la convocatoria y año"
              ])
        }
    },[budgetForm.investmentExpenditure])
    console.log(budgetForm.investmentExpenditure,typeToShow)
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
                                    value={budgetForm.investmentExpenditure}
                                    onChange={handleInputChange}>
                                    <option value="">Selecciona una opción</option>
                                    {Array.isArray(budgetsTypes) && budgetsTypes.map((name, index) => (
                                        <option key={index} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-complete-row">
                                <p>Nombre
                                    <br/>{newErrors.name && <span className="text-red-600">*{newErrors.name}</span>}
                                </p>
                                <select 
                                    name="name" 
                                    value={budgetForm.name}
                                    onChange={handleInputChange}>
                                    <option value="">Selecciona una opción</option>
                                    {Array.isArray(typeToShow) && typeToShow.map((name, index) => (
                                        <option key={index} value={index}>{name}</option>
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