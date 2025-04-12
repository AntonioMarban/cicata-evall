import "../styles/addparticipant.css"
import { useFormAddHandler } from "../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddParticipant = ({setParticipants, participantToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialParticipant = {
        nombre: "",
        paterno: "",
        materno: "",
        insti: "",
        puesto: "",
        gAcademico: "",
        nivel: "",
        email: "",
        netInv: 1,
        tipoInv: ""
      };

    const [participant, setParticipant] = useState({
        nombre: "",
        paterno: "",
        materno: "",
        insti: "",
        puesto: "",
        gAcademico: "",
        nivel: "",
        email: "",
        netInv: 1,
        tipoInv: ""
    });
    const handleChangeButton = (key, value) => {
        setParticipant((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };

        useEffect(() => {
            if (participantToEdit) {
                setParticipant({
                    ...participantToEdit
                });
                setIsOpen(true);
            }
        }, [participantToEdit]);

    const handleParticipantSubmit = useFormAddHandler({
        setState: setParticipants,
        key: 'participants',
        extraData: { netInv: participant.netInv },
        onSuccess: () => {
            setIsOpen(false)
            if(onEditComplete && participantToEdit){
                onEditComplete();
            }
            //reset
            setParticipant(initialParticipant)
        },
        initialData: participantToEdit,
        isEditMode: !!participantToEdit
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParticipant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleParticipantSubmit(e, participant, participantToEdit ? participantToEdit.index : undefined);
    };

    return (
        <>
            {!participantToEdit && (
                <button className="participant-modalAgregarPieza" onClick={() => setIsOpen(true)}>Agregar participante</button>
            )}

            <Dialog open={isOpen} onClose={() => {if (!participantToEdit) setIsOpen(false);}} className="participant-dialog-overlay">
                <div className="participant-dialog-container">
                    <DialogPanel className="participant-dialog-panel">
                        <p>{participantToEdit ? "Editar Participante" : "Agregar Participante"}</p>
                        <form onSubmit={handleSubmit} className="participant-form-pieza">
                            <div className="participant-form-rows">
                                <div>
                                    <p>Nombre</p>
                                    <input 
                                        name="nombre"
                                        value={participant.nombre}
                                        onChange={handleInputChange}
                                        className="participant-form-pieza-input" placeholder="Escribe el nombre del proyecto..."></input>
                                </div>
                                <div>
                                    <p>Apellido Paterno</p>
                                    <input 
                                        name="paterno"
                                        value={participant.paterno}
                                        onChange={handleInputChange}
                                        placeholder="Escribe el apellido paterno..."
                                        className="participant-form-pieza-input"></input>
                                </div>
                                <div>
                                    <p>Apellido Materno</p>
                                    <input 
                                        name="materno"
                                        value={participant.materno}
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                        className="participant-form-pieza-input" placeholder="Escribe a la institución que pertenece..."></input>
                                </div>
                                <div>
                                    <p>Puesto que desempeña</p>
                                    <input
                                        name="puesto"
                                        value={participant.puesto}
                                        onChange={handleInputChange} 
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
                                        onChange={handleInputChange} 
                                        placeholder="Escribe el tipo de investigación..."></input>
                                </div>
                            }
                            <div className="participant-complete-row-2">
                                <p>Grado Académico</p>
                                <input
                                    name="gAcademico"
                                    value={participant.gAcademico}
                                    onChange={handleInputChange} 
                                    placeholder="Escribe el grado académico..."
                                    ></input>
                            </div>
                            <div>
                                <p>Nivel</p>
                                <div className="participant-button-level">
                                <select name="nivel" 
                                    value={participant.nivel}
                                    onChange={handleInputChange}>
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
                                    onChange={handleInputChange} 
                                    placeholder="Escribe el email..."
                                    className="participant-form-pieza-input2"></input>
                                </div>
                            </div>
                            <div className="participant-dialog-actions">
                                <button  className="participant-button-confirm">
                                    {participantToEdit ? "Guardar cambios" : "Guardar proyecto"}
                                </button>
                                {!participantToEdit &&(
                                    <button
                                    type="button"
                                    onClick={(e)=>setIsOpen(false)}
                                    className="button-cancel">
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

export default AddParticipant;