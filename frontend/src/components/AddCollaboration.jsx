import "../styles/addcollaboration.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddCollaboration = ({setCollaborations}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialCollaboration = {
        institutionName: "",
        convenioType: "",
        convenioNE: "",
        noConvenio: "",
        isIPN: 1
      };
    const [collaboration, setCollaboration] = useState(initialCollaboration);

    const handleChangeButton = (key, value) => {
        setCollaboration((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollaboration({ ...collaboration, [name]: value });
    };
    
    const handleCollaborationSubmit = useFormAddHandler({
        setState: setCollaborations,
        key: 'collaborations',
        extraData: { isIPN: collaboration.isIPN },
        onSuccess: () => {setIsOpen(false)
            setCollaboration(initialCollaboration);
        }
      });
      
    return (
        <>
            <button className='modalAddColaboration' onClick={() => setIsOpen(true)}>Agregar colaboración</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Colaboración</p>
                        <form onSubmit={handleCollaborationSubmit} className="form-colab">
                            <div className="form-rows">
                                <div>
                                    <p>Nombre de la institución</p>
                                    <input name="institutionName" 
                                    value={collaboration.institutionName}
                                    onChange={handleChange}
                                    className="form-pieza-input" placeholder="Escribe el nombre de la institución..."></input>
                                </div>
                                <div>
                                    <p>¿Es parte del IPN?</p>
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
                                <p>¿Ya cuenta con Convenio de Colaboración?</p>
                                <p className="form-subtext">(General/Específico)</p>
                                <input 
                                value={collaboration.convenioType}
                                onChange={handleChange}
                                name="convenioType" className="form-colab-input" placeholder="Escribe el convenio de colaboración..."></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>¿El convenio es Nacional o Extranjero?</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                    value={collaboration.convenioNE}
                                    onChange={handleChange}
                                    name="convenioNE" className="form-colab-input" placeholder="Escribe el tipo de convenio..."></input>
                                </div>
                                <div>
                                    <p>¿Número de covenio</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                        value={collaboration.noConvenio}
                                        onChange={handleChange}
                                    name="noConvenio" className="form-colab-input" placeholder="Escribe el número de convenio..."></input>
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">Guardar colaboración</button>
                                <button onClick={() => {setIsOpen(false); setCollaboration(initialCollaboration)}} className="button-cancel">Cancelar</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddCollaboration;