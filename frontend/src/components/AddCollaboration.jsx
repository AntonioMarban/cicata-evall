import "../styles/addcollaboration.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddCollaboration = ({setCollaborations, collaborationToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialCollaboration = {
        institutionName: "",
        convenioType: "",
        convenioNE: "",
        noConvenio: "",
        isIPN: 1
    };
    const [newErrors,setNewErrors] =  useState(initialCollaboration);
    const [collaboration, setCollaboration] = useState(initialCollaboration);

    useEffect(() => {
        if (collaborationToEdit) {
            setCollaboration({
                institutionName: collaborationToEdit.institutionName || "",
                convenioType: collaborationToEdit.convenioType || "",
                convenioNE: collaborationToEdit.convenioNE || "",
                noConvenio: collaborationToEdit.noConvenio || "",
                isIPN: collaborationToEdit.isIPN || 1 
            });
            setIsOpen(true);
        }
    }, [collaborationToEdit]);

    const handleChangeButton = (key, value) => {
        setCollaboration((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    
    const handleCollaborationSubmit = useFormAddHandler({
        setState: setCollaborations,
        key: 'collaborations',
        extraData: { isIPN: collaboration.isIPN },
        onSuccess: () => {
            setIsOpen(false)
            if(onEditComplete && collaborationToEdit){
                onEditComplete();
            }
            //reset
            setCollaboration(initialCollaboration);
        },
        initialData: collaborationToEdit,
        isEditMode: !!collaborationToEdit
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCollaboration(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(collaboration).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `El campo  es requerido`;
            if (value === 0){
                delete newErrorsF[key]
            }
          }
        });
        delete newErrorsF["convenioNE"];
        delete newErrorsF["noConvenio"];
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
        handleCollaborationSubmit(e, collaboration, collaborationToEdit ? collaborationToEdit.index : undefined);
        }
        console.log(newErrorsF)
    };

    return (
        <>
            <button className='modalAddColaboration' onClick={() => setIsOpen(true)}>Agregar colaboración</button>

            <Dialog open={isOpen} onClose={() => {}} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p className="dialog-title">{collaborationToEdit ? "Editar colaboración" : "Agregar colaboración"}</p>
                        <form onSubmit={handleSubmit} className="form-colab">
                            <div className="form-rows">
                                <div>
                                    <p>Nombre de la institución
                                        <br/>{newErrors.institutionName && <span className="text-red-600">*{newErrors.institutionName}</span>}
                                    </p>
                                    <input name="institutionName" 
                                    value={collaboration.institutionName}
                                    onChange={handleInputChange}
                                    className="form-pieza-input" placeholder="Escribe el nombre de la institución..."></input>
                                </div>
                                <div>
                                    <p>¿Es parte del IPN?
                                        <br/>{newErrors.isIPN && <span className="text-red-600">*{newErrors.isIPN}</span>}
                                    </p>
                                    <div className="colab-button-container">
                                        <button
                                        type="button" 
                                        className={collaboration.isIPN === 1  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('isIPN',1)}
                                        >Si</button>
                                        <button
                                        type="button" 
                                        className={collaboration.isIPN === 0  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('isIPN',0)}
                                        >No</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-complete-row">
                                <p>¿Ya cuenta con Convenio de Colaboración?
                                    <br/><span className="form-subtext">(General/Específico)</span>
                                    <br/>{newErrors.convenioType && <span className="text-red-600">*{newErrors.convenioType}</span>}
                                </p>
                                <input 
                                value={collaboration.convenioType}
                                onChange={handleInputChange}
                                name="convenioType" className="form-colab-input" placeholder="Escribe el convenio de colaboración..."></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>¿El convenio es Nacional o Extranjero?</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                    value={collaboration.convenioNE}
                                    onChange={handleInputChange}
                                    name="convenioNE" className="form-colab-input" placeholder="Escribe el tipo de convenio..."></input>
                                </div>
                                <div>
                                    <p>¿Número de covenio?</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                        value={collaboration.noConvenio}
                                        onChange={handleInputChange}
                                    name="noConvenio" className="form-colab-input" placeholder="Escribe el número de convenio..."></input>
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">
                                    {collaborationToEdit ? "Guardar Cambios" : "Guardar Colaboración"}
                                </button>
                                {!collaborationToEdit && (
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

export default AddCollaboration;