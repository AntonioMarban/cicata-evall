import "../../styles/addprojects.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";
import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddProjects = ({ setProjects, projectToEdit = null, onEditComplete = null }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const initialFormValues = {
        name: "",
        associationDate: "",
        project_type: "",
        externalRegister: "",
        SIPRegister: ""
    };
    const newErrorsArray = {
        name: "*",
        associationDate: "*",
        project_type: "*",
        externalRegister: "*",
        SIPRegister: "*"
    };
    const [newErrors,setNewErrors] = useState(newErrorsArray);
    const [formValues, setFormValues] = useState(initialFormValues);

    
    useEffect(() => {
        if (projectToEdit) {
            setFormValues({
                name: projectToEdit.name || "",
                associationDate: projectToEdit.associationDate || "",
                project_type: projectToEdit.project_type || "",
                externalRegister: projectToEdit.externalRegister || "",
                SIPRegister: projectToEdit.SIPRegister || ""
            });
            setIsOpen(true);
        }
    }, [projectToEdit]);

    const handleActivitySubmit  = useFormAddHandler({
        setState: setProjects,
        key: 'associatedProjects',
         onSuccess: () => {
            setIsOpen(false);
            if (onEditComplete && projectToEdit) {
                onEditComplete();
            }
            //reset
            setFormValues(initialFormValues)
        },
        initialData: projectToEdit,
        isEditMode: !!projectToEdit
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(formValues).forEach(([key, value]) => {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
              newErrorsF[key] = `* El campo  es requerido`;
            }
        });
        delete newErrorsF["externalRegister"];
        delete newErrorsF["SIPRegister"];
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleActivitySubmit(e, formValues, projectToEdit ? projectToEdit.index : undefined);
        }
    };

    return (
        <>
            <button type="button" className='modalAddProject' onClick={() => setIsOpen(true)}>
                Agregar proyecto
            </button>

            <Dialog open={isOpen} onClose={() => {setIsOpen(false); setFormValues(initialFormValues);}}  className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <h1 className="dialog-title">{projectToEdit ? "Editar proyecto asociado" : "Agregar proyecto asociado"}</h1>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-rows">
                                <div>
                                    <p>Nombre proyecto
                                    {newErrors.name && (
                                        <>
                                            {newErrors.name !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.name}</span>
                                        </>
                                    )}
                                    </p>
                                    <input 
                                        name="name" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe el nombre del proyecto..."
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>Fecha de asociación
                                    {newErrors.associationDate && (
                                        <>
                                            {newErrors.associationDate !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.associationDate}</span>
                                        </>
                                    )}
                                    </p>
                                    <input 
                                        name="associationDate" 
                                        className="form-pieza-input" 
                                        type="date"
                                        value={formValues.associationDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-complete-row">
                                <p>Tipo de proyecto</p>
                                <p className="form-subtext">(p.e. Tesis maestría, convocatoria interna innovación, convocatoria externa fronteras, etc.)
                                    {newErrors.project_type && (
                                        <>
                                            {newErrors.project_type !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.project_type}</span>
                                        </>
                                    )}
                                </p>
                                <input 
                                    name="project_type" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={formValues.project_type}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>Número de registro externo
                                        <br/><span className="form-subtext">(Si aplica)</span>
                                    </p>
                                    <input 
                                        name="externalRegister" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe el numero de registro externo..."
                                        value={formValues.externalRegister}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>Número de registro SIP</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                        name="SIPRegister" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe el numero de registro SIP..."
                                        value={formValues.SIPRegister}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpen(false)
                                    setFormValues(initialFormValues);
                                    setNewErrors(newErrorsArray)
                                }} 
                                className="button-cancel"
                                >
                                Cancelar
                                </button>

                                <button className="button-confirm">
                                    {projectToEdit ? "Guardar cambios" : "Guardar proyecto"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddProjects;