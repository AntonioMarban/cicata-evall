import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";
import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddProjects = ({ setProjects, projectToEdit = null, onEditComplete = null }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const initialFormValues = {
        name: "",
        associationDate: "",
        projectType: "",
        externalRegister: "",
        SIPRegister: ""
    };
    const [newErrors,setNewErrors] = useState(initialFormValues);
    const [formValues, setFormValues] = useState(initialFormValues);

    
    useEffect(() => {
        if (projectToEdit) {
            setFormValues({
                name: projectToEdit.name || "",
                associationDate: projectToEdit.associationDate || "",
                projectType: projectToEdit.projectType || "",
                externalRegister: projectToEdit.externalRegister || "",
                SIPRegister: projectToEdit.SIPRegister || ""
            });
            setIsOpen(true);
        }
    }, [projectToEdit]);

    const handleActivitySubmit  = useFormAddHandler({
        setState: setProjects,
        key: 'p_associatedProjectsJSON',
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
              newErrorsF[key] = `El campo  es requerido`;
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
            {!projectToEdit && (
                <button type="button" className='modalAddProject' onClick={() => setIsOpen(true)}>
                    Agregar proyecto
                </button>
            )}

            <Dialog open={isOpen} onClose={() => {}}  className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <h1 className="dialog-title">{projectToEdit ? "Editar Proyecto" : "Agregar Proyecto"}</h1>
                        <form onSubmit={handleSubmit} className="form-pieza">
                            <div className="form-rows">
                                <div>
                                    <p>Nombre proyecto
                                        <br/>{newErrors.name && <span className="text-red-600">*{newErrors.name}</span>}
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
                                        <br/>{newErrors.associationDate && <span className="text-red-600">*{newErrors.associationDate}</span>}
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
                                    <br/>{newErrors.projectType && <span className="text-red-600">*{newErrors.projectType}</span>}
                                </p>
                                <input 
                                    name="projectType" 
                                    className="form-pieza-input" 
                                    placeholder="Escribe el tipo de proyecto..."
                                    value={formValues.projectType}
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
                                <button className="button-confirm">
                                    {projectToEdit ? "Guardar cambios" : "Guardar proyecto"}
                                </button>
                                {!projectToEdit && (
                                    <button 
                                    type="button" 
                                    onClick={(e) => {
                                        setIsOpen(false)
                                        setFormValues(initialFormValues);
                                        setNewErrors(initialFormValues)
                                    }} 
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

export default AddProjects;