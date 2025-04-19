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
        typeInvD: "",
        levelInvD: "",
        email: "",
        tipoInv: "",
        netInv: 1
      };
    const [newErrors,setNewErrors] =  useState(initialParticipant);
    const [participant, setParticipant] = useState(initialParticipant);
    
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
    const levels = ["EDI","COFAA","SNI"]
    const [levelsToShow,setLevelToShow]= useState([])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParticipant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrorsF = {}
        Object.entries(participant).forEach(([key, value]) => {
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `El campo  es requerido`;
            if (value === 0){
                delete newErrorsF[key]
            }
            if (key=== "netInv" && value === 0 ){
                delete newErrorsF[key]
                delete newErrorsF["tipoInv"]
            }
          }
        });
        delete newErrorsF["index"];
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleParticipantSubmit(e, participant, participantToEdit ? participantToEdit.index : undefined);
        }
    };

    useEffect(()=>{
        if(participant.typeInvD === "EDI"){
            setLevelToShow(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"])
        }
        else if(participant.typeInvD === "COFAA"){
            setLevelToShow(["I","II","IV","V"])
        }
        else if(participant.typeInvD === "SNI"){
            setLevelToShow(["Candidato","I","II","III","Emerito"])
        }
    },[participant.typeInvD])

    return (
        <>
            {!participantToEdit && (
                <button className="participant-modalAgregarPieza" onClick={() => setIsOpen(true)}>Agregar participante</button>
            )}

            <Dialog open={isOpen} onClose={() => {}} className="participant-dialog-overlay">
                <div className="participant-dialog-container">
                    <DialogPanel className="participant-dialog-panel">
                        <p className="dialog-title">{participantToEdit ? "Editar Participante" : "Agregar Participante"}</p>
                        <form onSubmit={handleSubmit} className="participant-form-participant">
                            <div className="participant-form-rows">
                                <div>
                                    <p>Nombre  
                                        <br/>{newErrors.nombre && <span className="text-red-600">*{newErrors.nombre}</span>}</p>
                                    <input 
                                        name="nombre"
                                        value={participant.nombre}
                                        onChange={handleInputChange}
                                        className="participant-form-pieza-input" placeholder="Escribe el nombre del proyecto..."></input>
                                </div>
                                <div>
                                    <p>Apellido Paterno 
                                        <br/>{newErrors.paterno && <span className="text-red-600">*{newErrors.paterno}</span>}</p>
                                    <input 
                                        name="paterno"
                                        value={participant.paterno}
                                        onChange={handleInputChange}
                                        placeholder="Escribe el apellido paterno..."
                                        className="participant-form-pieza-input"></input>
                                </div>
                                <div>
                                    <p>Apellido Materno 
                                        <br/>{newErrors.materno && <span className="text-red-600">*{newErrors.materno}</span>}</p>
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
                                    <p>Institución perteneciente 
                                        <br/>{newErrors.insti && <span className="text-red-600"> *{newErrors.insti}</span>}
                                    </p>
                                    <input 
                                        name="insti"
                                        value={participant.insti}
                                        onChange={handleInputChange}
                                        className="participant-form-pieza-input" placeholder="Escribe a la institución que pertenece..."></input>
                                </div>
                                <div>
                                    <p>Puesto que desempeña
                                        <br/>{newErrors.puesto && <span className="text-red-600"> *{newErrors.puesto}</span>}
                                    </p>
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
                                    <p>¿Cuál?
                                        <br/>{newErrors.tipoInv && <span className="text-red-600"> *{newErrors.tipoInv}</span>}
                                    </p>
                                    <input  
                                        name="tipoInv"
                                        value={participant.tipoInv}
                                        onChange={handleInputChange} 
                                        placeholder="Escribe el tipo de investigación..."></input>
                                </div>
                            }
                            
                            <div className="participant-complete-row-2">
                                <p>Grado Académico
                                    <br/>{newErrors.gAcademico && <span className="text-red-600"> *{newErrors.gAcademico}</span>}
                                </p>
                                <input
                                    name="gAcademico"
                                    value={participant.gAcademico}
                                    onChange={handleInputChange} 
                                    placeholder="Escribe el grado académico..."
                                    ></input>
                            </div>
                            <div className="participant-form-rows">
                                <div className="participant-button-degree">
                                    <p>Tipo investigador
                                        <br/>{newErrors.typeInvD && <span className="text-red-600"> *{newErrors.typeInvD}</span>}
                                    </p>
                                    <select name="typeInvD" 
                                        value={participant.typeInvD}
                                        onChange={handleInputChange}>
                                        <option value="">Selecciona una opción</option>
                                        {Array.isArray(levels) && levels.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="participant-button-degree">
                                    <p>Nivel
                                        <br/>{newErrors.levelInvD && <span className="text-red-600"> *{newErrors.levelInvD}</span>}
                                    </p>
                                    <select name="levelInvD" 
                                        value={participant.levelInvD}
                                        onChange={handleInputChange}>
                                        <option value="">Selecciona una opción</option>
                                        {Array.isArray(levelsToShow) && levelsToShow.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p>Datos de contacto</p>
                                <div>
                                    <p>Email <br/>{newErrors.email && <span className="text-red-600"> *{newErrors.email}</span>}</p>
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
                                    onClick={(e)=>{
                                        setIsOpen(false); 
                                        setParticipant(initialParticipant); 
                                        setNewErrors(initialParticipant);
                                       }}
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