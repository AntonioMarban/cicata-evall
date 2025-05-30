import "../../styles/addcollaboration.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddCollaboration = ({setCollaborations, collaborationToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialCollaboration = {
        name: "",
        collaborationAgreement: "",
        agreementType: "",
        agreementNumber: "",
        partOfIPN: 1
    };
    const initialCollaborationErrors = {
        name: "*",
        collaborationAgreement: "*",
        agreementType: "*",
        agreementNumber: "*",
        partOfIPN: 1
    };
    const collaborationTypes = ["General","Específico","No se cuenta con él"]
    const [newErrors,setNewErrors] =  useState(initialCollaborationErrors);
    const [collaboration, setCollaboration] = useState(initialCollaboration);

    useEffect(() => {
        if (collaborationToEdit) {
            setCollaboration({
                name: collaborationToEdit.name || "",
                collaborationAgreement: collaborationToEdit.collaborationAgreement || "",
                agreementType: collaborationToEdit.agreementType || "",
                agreementNumber: collaborationToEdit.agreementNumber || "",
                partOfIPN: collaborationToEdit.partOfIPN || 1 
            });
            setIsOpen(true);
        }
    }, [collaborationToEdit]);
    useEffect(()=>{
        if(collaboration.collaborationAgreement === "No se cuenta con él"){
            setCollaboration(prev=>({
                ...prev,
                agreementNumber: "",
                agreementType: "",
            })
            )
        }
    },[collaboration.collaborationAgreement])

    const handleChangeButton = (key, value) => {
        setCollaboration((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    
    const handleCollaborationSubmit = useFormAddHandler({
        setState: setCollaborations,
        key: 'collaborativeInstitutions',
        extraData: { partOfIPN: collaboration.partOfIPN },
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
            newErrorsF[key] = `* El campo  es requerido`;
            if (value === 0){
                delete newErrorsF[key]
            }
          }
        });
        delete newErrorsF["agreementType"];
        delete newErrorsF["agreementNumber"];
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
        handleCollaborationSubmit(e, collaboration, collaborationToEdit ? collaborationToEdit.index : undefined);
        }
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
                                    {newErrors.name && (
                                        <>
                                            {newErrors.name !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.name}</span>
                                        </>
                                    )}
                                    </p>
                                    <input name="name" 
                                    value={collaboration.name}
                                    onChange={handleInputChange}
                                    className="form-pieza-input" placeholder="Escribe el nombre de la institución..."></input>
                                </div>
                                <div>
                                    <p>¿Es parte del IPN?
                                    </p>
                                    <div className="colab-button-container">
                                        <button
                                        type="button" 
                                        className={collaboration.partOfIPN === 1  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('partOfIPN',1)}
                                        >Sí</button>
                                        <button
                                        type="button" 
                                        className={collaboration.partOfIPN === 0  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('partOfIPN',0)}
                                        >No</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-complete-row">
                                <p>¿Ya cuenta con convenio de colaboración?
                                    <br/><span className="form-subtext">(General/Específico)</span>
                                    {newErrors.collaborationAgreement && (
                                        <>
                                            {newErrors.collaborationAgreement !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.collaborationAgreement}</span>
                                        </>
                                    )}
                                </p>
                                <select name="collaborationAgreement" 
                                        value={collaboration.collaborationAgreement}
                                        onChange={handleInputChange}
                                        className="form-colab-input">
                                        <option value="">Selecciona una opción</option>
                                        {Array.isArray(collaborationTypes) && collaborationTypes.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                </select>
                            </div>
                            {collaboration.collaborationAgreement != "No se cuenta con él" &&(
                                <div className="form-rows">
                                    <div>
                                        <p>¿El convenio es nacional o internacional?</p>
                                        <p className="form-subtext">(Si aplica)</p>
                                        <input 
                                        value={collaboration.agreementType}
                                        onChange={handleInputChange}
                                        name="agreementType" className="form-colab-input" placeholder="Escribe el tipo de convenio..."></input>
                                    </div>
                                    <div>
                                        <p>¿Número de convenio?<br/><br/><span className="form-subtext">(Si aplica)</span></p>
                                        <input 
                                            value={collaboration.agreementNumber}
                                            onChange={handleInputChange}
                                        name="agreementNumber" className="form-colab-input" placeholder="Escribe el número de convenio..."></input>
                                    </div>
                                </div>
                            )}
                            <div className="dialog-actions">
                                <button className="button-confirm">
                                    {collaborationToEdit ? "Guardar Cambios" : "Guardar colaboración"}
                                </button>
                                
                                <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsOpen(false)
                                    setCollaboration(initialCollaboration)
                                    setNewErrors(initialCollaborationErrors)
                                    }
                                } 
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

export default AddCollaboration;