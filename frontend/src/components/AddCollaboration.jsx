import "../styles/addcollaboration.css"
import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddCollaboration = ({setColaborations}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isIPN, setIsIPN] = useState(1)
    const [colaboration, setColaboration] = useState(
        {   institutionName: "",
            convenioType:"",
            convenioNE:"",
            noConvenio:"",
            isIPN
        });
    const handleChangeButton = (key, value) => {
        setColaboration((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setColaboration({ ...colaboration, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const newColaboration  = Object.fromEntries(formData.entries()); 

        setColaborations((prevColaboration) => ({
            ...prevColaboration,
            colaborations: [...prevColaboration.colaborations, newColaboration],
        }));
        
        setIsOpen(false); 
    };
    return (
        <>
            <button className='modalAddColaboration' onClick={() => setIsOpen(true)}>Agregar colaboración</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="dialog-overlay">
                <div className="dialog-container">
                    <DialogPanel className="dialog-panel">
                        <p>Agregar Colaboración</p>
                        <form onSubmit={handleSubmit} className="form-colab">
                            <div className="form-rows">
                                <div>
                                    <p>Nombre de la institución</p>
                                    <input name="institutionName" 
                                    value={colaboration.institutionName}
                                    onChange={handleChange}
                                    className="form-pieza-input" placeholder="Escribe el nombre de la institución..."></input>
                                </div>
                                <div>
                                    <p>¿Es parte del IPN?</p>
                                    <div className="colab-button-container">
                                        <button
                                        type="button" 
                                        className={colaboration.isIPN === 1  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('isIPN',1)}
                                        >Si</button>
                                        <button
                                        type="button" 
                                        className={colaboration.isIPN === 0  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('isIPN',0)}
                                        >No</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-complete-row">
                                <p>¿Ya cuenta con Convenio de Colaboración?</p>
                                <p className="form-subtext">(General/Específico)</p>
                                <input 
                                value={colaboration.convenioType}
                                onChange={handleChange}
                                name="convenioType" className="form-colab-input" placeholder="Escribe el convenio de colaboración..."></input>
                            </div>
                            <div className="form-rows">
                                <div>
                                    <p>¿El convenio es Nacional o Extranjero?</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                    value={colaboration.convenioNE}
                                    onChange={handleChange}
                                    name="convenioNE" className="form-colab-input" placeholder="Escribe el tipo de convenio..."></input>
                                </div>
                                <div>
                                    <p>¿Número de covenio</p>
                                    <p className="form-subtext">(Si aplica)</p>
                                    <input 
                                        value={colaboration.noConvenio}
                                        onChange={handleChange}
                                    name="noConvenio" className="form-colab-input" placeholder="Escribe el número de convenio..."></input>
                                </div>
                            </div>
                            <div className="dialog-actions">
                                <button className="button-confirm">Guardar colaboración</button>
                                <button onClick={() => setIsOpen(false)} className="button-cancel">Cancelar</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddCollaboration;