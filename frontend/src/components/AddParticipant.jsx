import "../styles/addparticipant.css"
import { useState,useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddParticipant = ({setParticipants}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [netInv,setNetInv] = useState(1);
    const [participant, setParticipant] = useState(
        {   nombre: "",
            paterno:"",
            materno:"",
            insti:"",
            puesto:"",
            gAcademico:"",
            nivel:"",
            email:"",
            netInv,
            tipoInv:""
        });
    const handleChangeButton = (key, value) => {
        setParticipant((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParticipant({ ...participant, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const newParticipant  = Object.fromEntries(formData.entries()); 
        
        setParticipants((prevParticipants) => ({
            ...prevParticipants,
            participants: [...prevParticipants.participants, newParticipant],
        }));

        setIsOpen(false);
    };
    return (
        <>
            <button className="participant-modalAgregarPieza" onClick={() => setIsOpen(true)}>Agregar participante</button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="participant-dialog-overlay">
                <div className="participant-dialog-container">
                    <DialogPanel className="participant-dialog-panel">
                        <p>Agregar Participante</p>
                        <form onSubmit={handleSubmit} className="participant-form-pieza">
                            <div className="participant-form-rows">
                                <div>
                                    <p>Nombre</p>
                                    <input 
                                        name="nombre"
                                        value={participant.nombre}
                                        onChange={handleChange}
                                        className="participant-form-pieza-input" placeholder="Escribe el nombre del proyecto..."></input>
                                </div>
                                <div>
                                    <p>Apellido Paterno</p>
                                    <input 
                                        name="paterno"
                                        value={participant.paterno}
                                        onChange={handleChange}
                                        placeholder="Escribe el apellido paterno..."
                                        className="participant-form-pieza-input"></input>
                                </div>
                                <div>
                                    <p>Apellido Materno</p>
                                    <input 
                                        name="materno"
                                        value={participant.materno}
                                        onChange={handleChange}
                                        placeholder="Escribe el apellido materno..."
                                        className="participant-form-pieza-input"></input>
                                </div>
                            </div>
                            <div className="participant-form-rows">
                                <div>
                                    <p>Institución a la que pertence</p>
                                    <input 
                                        name="insti"
                                        value={participant.insti}
                                        onChange={handleChange}
                                        className="participant-form-pieza-input" placeholder="Escribe a la institución que pertenece..."></input>
                                </div>
                                <div>
                                    <p>Puesto que desempeña</p>
                                    <input
                                        name="puesto"
                                        value={participant.puesto}
                                        onChange={handleChange} 
                                        placeholder="Escribe el puesto que desempeña..."
                                        className="participant-form-pieza-input"></input>
                                </div>
                            </div>
                            <div className="participant-complete-row">
                                <p>Pertence a alguna red de investigación</p>
                                <div>
                                    <button type="button" 
                                        className={participant.netInv === 1  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('netInv',1)}>Si</button>
                                    <button type="button"
                                        className={participant.netInv === 0  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('netInv',0)}>No</button>
                                </div>
                            </div>
                            {participant.netInv === 1 &&
                                <div className="participant-complete-row-2">
                                    <p>¿Cuál?</p>
                                    <input  
                                        name="tipoInv"
                                        value={participant.tipoInv}
                                        onChange={handleChange} 
                                        placeholder="Escribe el tipo de investigación..."></input>
                                </div>
                            }
                            <div className="participant-complete-row-2">
                                <p>Grado Académico</p>
                                <input
                                    name="gAcademico"
                                    value={participant.gAcademico}
                                    onChange={handleChange} 
                                    placeholder="Escribe el grado académico..."
                                    ></input>
                            </div>
                            <div>
                                <p>Nivel</p>
                                <div className="participant-button-level">
                                <select name="nivel" 
                                    value={participant.nivel}
                                    onChange={handleChange}>
                                    <option value="SNII">SNII</option>
                                    <option value="COFFA">COFFA</option>
                                    <option value="EDI">EDI</option>
                                </select>
                                </div>
                            </div>
                            <div>
                                <p>Datos de contacto</p>
                                <div>
                                    <p>Email</p>
                                    <input 
                                    name="email"
                                    value={participant.email}
                                    onChange={handleChange} 
                                    placeholder="Escribe el email..."
                                    className="participant-form-pieza-input2"></input>
                                </div>
                            </div>
                            <div className="participant-dialog-actions">
                                <button type="submit" className="participant-button-confirm">Guardar participante</button>
                                <button type="button" onClick={() => setIsOpen(false)} className="participant-button-cancel">Cancelar</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddParticipant;