import "../styles/addprojects.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";
import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddProjects = ({ setProjects, projectToEdit = null, onEditComplete = null }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const initialFormValues = {
        projectName: "",
        projectDate: "",
        projectType: "",
        noRE: "",
        noRESIP: ""
    };
    const [newErrors,setNewErrors] = useState(initialFormValues);
    const [formValues, setFormValues] = useState(initialFormValues);

    
    useEffect(() => {
        if (projectToEdit) {
            setFormValues({
                projectName: projectToEdit.projectName || "",
                projectDate: projectToEdit.projectDate || "",
                projectType: projectToEdit.projectType || "",
                noRE: projectToEdit.noRE || "",
                noRESIP: projectToEdit.noRESIP || ""
            });
            setIsOpen(true);
        }
    }, [projectToEdit]);

    const handleActivitySubmit  = useFormAddHandler({
        setState: setProjects,
        key: 'projects',
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
        delete newErrorsF["noRE"];
        delete newErrorsF["noRESIP"];
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
                                        <br/>{newErrors.projectName && <span className="text-red-600">*{newErrors.projectName}</span>}
                                    </p>
                                    <input 
                                        name="projectName" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe el nombre del proyecto..."
                                        value={formValues.projectName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>Fecha de asociación
                                        <br/>{newErrors.projectDate && <span className="text-red-600">*{newErrors.projectDate}</span>}
                                    </p>
                                    <input 
                                        name="projectDate" 
                                        className="form-pieza-input" 
                                        type="date"
                                        value={formValues.projectDate}
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
                                        name="noRE" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe el numero de registro externo..."
                                        value={formValues.noRE}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>Número de registro SIP</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                        name="noRESIP" 
                                        className="form-pieza-input" 
                                        placeholder="Escribe el numero de registro SIP..."
                                        value={formValues.noRESIP}
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