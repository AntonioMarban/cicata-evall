import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddBudget = ({setBudget, budgetToEdit = null, onEditComplete = null}) => {
    const initialFormValues = {
        investmentExpenditure: "",
        name: "",
        expenditure: "",
        otherName: "",
        budgetDate: ""
    };
    const initialFormValuesErrors = {
        investmentExpenditure: "*",
        name: "*",
        expenditure: "*",
        otherName: "*",
        budgetDate: "*"
    };
    const [typeToShow, setTypeToShow] = useState([]);
    const [budgetForm, setBudgetForm] = useState(initialFormValues)
    const [newErrors,setNewErrors] = useState(initialFormValuesErrors);
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
              newErrorsF[key] = `* El campo  es requerido`;
            }
        });
        if (budgetForm.name.budgetTypeId != 4 && 
            budgetForm.name.budgetTypeId != 16 && 
            budgetForm.name.budgetTypeId != 24 && 
            budgetForm.name.budgetTypeId != 23){
            delete newErrorsF['otherName']
        }
        if (budgetForm.name.budgetTypeId != 23 &&
            budgetForm.investmentExpenditure.idType != 3){
            delete newErrorsF['budgetDate']
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
        if(!Object.keys(newErrorsF).length>0){
            handleBudgetSubmit(e, FormatBudget, budgetToEdit ? budgetToEdit.index : undefined);
        }
    };


    useEffect(()=>{
        if(budgetToEdit){
            setBudgetForm({
                investmentExpenditure: {
                    idType: budgetToEdit.idType || "", 
                    nameType: budgetToEdit.nameType || ""
                },
                name:  {
                    budgetTypeId: budgetToEdit.budgetTypeId || "", 
                    name: budgetToEdit.name || ""
                },
                expenditure: budgetToEdit.expenditure || 0,
                otherName: budgetToEdit.otherName || "",
                budgetDate: budgetToEdit.budgetDate
            });
            setIsOpen(true);
        }
    }, [budgetToEdit])
    useEffect(()=>{
        if(budgetForm.investmentExpenditure.idType === 1){
            setTypeToShow([
                {budgetTypeId: 1, name: "Equipo de laboratorio"},
                {budgetTypeId: 2, name: "Equipo de cómputo"},
                {budgetTypeId: 3, name: "Herramientas y accesorios"},
                {budgetTypeId: 4, name:  "Otros (especifique)"}
              ])
        }
        else if(budgetForm.investmentExpenditure.idType === 2){
            setTypeToShow([
                {budgetTypeId: 5, name: "Artículos, materiales y útiles diversos"},
                {budgetTypeId: 6, name: "Gastos de trabajo de campo"},
                {budgetTypeId: 7, name: "Difusión de los resultados de investigación"},
                {budgetTypeId: 8, name: "Pago por servicios externos"},
                {budgetTypeId: 9, name: "Viáticos, pasajes y gastos de transportación"},
                {budgetTypeId: 10, name: "Gastos de atención a profesores visitantes, técnicos o expertos visitantes"},
                {budgetTypeId: 11, name: "Compra de libros y suscripción a revistas"},
                {budgetTypeId: 12, name: "Gastos de publicación en revistas nacionales e internacionales"},
                {budgetTypeId: 13, name: "Registro de patentes y propiedad intelectual"},
                {budgetTypeId: 14, name: "Validación de concepto tecnológico"},
                {budgetTypeId: 15, name: "Animales para el desarrollo de protocolos de investigación"},
                {budgetTypeId: 16,  name: "Otros (especifique)"}
              ])
        }
        else if(budgetForm.investmentExpenditure.idType === 3){
            setTypeToShow([
                {budgetTypeId: 17, name:"Proyectos de Investigación Científica y Desarrollo Tecnológico"},
                {budgetTypeId: 18, name:"Proyectos de Investigación en el Programa Especial de Consolidación de Investigadores"},
                {budgetTypeId: 19, name:"Proyectos de Desarrollo Tecnológico o Innovación en el IPN"},
                {budgetTypeId: 20, name:"Proyectos de Investigación Multidisciplinarios y Transdisciplinarios de Investigación Científica y Desarrollo Tecnológico"},
                {budgetTypeId: 21, name:"Proyecto transdiciplinario"},
                {budgetTypeId: 22, name:"Proyectos de Desarrollo Tecnológico o Innovación para alumnos del IPN"},
                {budgetTypeId: 24, name:"Otros (especifique)"}
              ])
        }
        else if(budgetForm.investmentExpenditure.idType === 4){
            setTypeToShow([
                {budgetTypeId: 23, name:"Externas"}
              ])
        }
    },[budgetForm.investmentExpenditure])
    return (
        <>
            <button type="button" className='modalAddProject' onClick={() => {setIsOpen(true)}}>
                Agregar presupuesto
            </button>


            <Dialog open={isOpen} onClose={() => { }} className="dialog-overlay">
                <div className="dialog-container2">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{budgetToEdit ? "Editar Presupuesto" : "Agregar Presupuesto"}</p>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-complete-row-div">
                                <div>
                                    <p>Gasto
                                        {newErrors.investmentExpenditure && (
                                            <>
                                                {newErrors.investmentExpenditure !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.investmentExpenditure}</span>
                                            </>
                                        )}  
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
                                    {newErrors.name && (
                                        <>
                                            {newErrors.name !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.name}</span>
                                        </>
                                    )}  
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
                                        {newErrors.expenditure && (
                                            <>
                                                {newErrors.expenditure !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.expenditure}</span>
                                            </>
                                        )}  
                                    </p>
                                    <input 
                                        name="expenditure" 
                                        type="number" 
                                        min={0}
                                        step="0.00001"
                                        className="form-pieza-input" 
                                        placeholder="Escribe la cantidad del gasto..."
                                        value={budgetForm.expenditure}
                                        onChange={handleInputChange}
                                    ></input>
                                </div>
                                <div>
                                    {(budgetForm.name.budgetTypeId === 16 || budgetForm.name.budgetTypeId === 24 || budgetForm.name.budgetTypeId === 4 || budgetForm.name.budgetTypeId === 23) && (
                                        <div>
                                            <p>Nombre del presupuesto
                                            {newErrors.otherName && (
                                            <>
                                                {newErrors.otherName !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.otherName}</span>
                                            </>
                                            )}  
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
                                    {(budgetForm.investmentExpenditure.idType === 3 || 
                                    budgetForm.name.budgetTypeId === 23) && (
                                        <div>
                                            <p>Fecha de convocatoria
                                                {newErrors.budgetDate && (
                                            <>
                                                {newErrors.budgetDate !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.budgetDate}</span>
                                            </>
                                            )}  
                                            </p>
                                            <input 
                                                type="date"
                                                name="budgetDate"
                                                value={budgetForm.budgetDate}
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
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpen(false)
                                    setBudgetForm(initialFormValues); 
                                    setNewErrors(initialFormValuesErrors);
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

export default AddBudget;