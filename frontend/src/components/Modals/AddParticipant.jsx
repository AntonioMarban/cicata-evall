import "../../styles/addparticipant.css"
import { useFormAddHandler } from "../../hooks/useFormAddHandler";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from '@headlessui/react'

const  AddParticipant = ({setParticipants, participantToEdit = null, onEditComplete = null}) => {
    const [isOpen, setIsOpen] = useState(false)
    const initialParticipant = {
        fName: "",
        lastName1: "",
        lastName2: "",
        institution: "",
        positionWork: "",
        academicDegree: "",
        tutorName: "",
        levelNumSNII: "",
        levelNumCOFFA: "",
        levelNumEDI: "",
        email: "",
        phone: "",
        researchNetworkName: "",
        researchNetwork: 0
    };
    const ArrayNewErrors = {
        fName: "*",
        lastName1: "*",
        lastName2: "*",
        institution: "*",
        positionWork: "*",
        academicDegree: "*",
        email: "*",
        phone: "*",
        researchNetworkName: "*",
        researchNetwork: 0
    } 
    const [newErrors,setNewErrors] =  useState(ArrayNewErrors);
    const [participant, setParticipant] = useState(initialParticipant);
    const [levelSNII, setLevelSNII] = useState(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]);
    const [levelCOFFA, setLevelCOFFA] = useState(["I", "II", "IV", "V"]);
    const [levelEDI, setLevelEDI] = useState(["Candidato", "I", "II", "III", "Emerito"]);
    const memberType = ["Investigador","Investigador post doctoral","Estudiante"]
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
        key: 'members',
        extraData: { researchNetwork: participant.researchNetwork },
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
        const newErrorsF = {}
        Object.entries(participant).forEach(([key, value]) => {
            if (key === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isValid = emailRegex.test(value);
                if (!isValid) {
                    newErrorsF[key] = "* El email no es válido";
                }
            }

            if (key === "phone") {
                const phoneRegex = /^\d{10}$/;
                const isValid = phoneRegex.test(value);
                if (!isValid) {
                    newErrorsF[key] = "* El número es inválido";
                }
            }
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            newErrorsF[key] = `* El campo  es requerido`;
            if (value === 0){
                delete newErrorsF[key]
            }
          }
        });
        if (participant.researchNetwork === 0 ){
            delete newErrorsF["researchNetworkName"]
        }
        if (participant.positionWork == "Estudiante"){
            delete newErrorsF["levelNumCOFFA"]
            delete newErrorsF["levelNumEDI"]
            delete newErrorsF["levelNumSNII"]
        }
        if (participant.positionWork != "Estudiante"){
            delete newErrorsF["tutorName"]
        }
        delete newErrorsF["index"];
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleParticipantSubmit(e, participant, participantToEdit ? participantToEdit.index : undefined);
        }
    };
    useEffect(()=>{
        if(participant.researchNetwork===0){
            setParticipant(prev=>({
                ...prev,
                researchNetworkName: ""
            })
            )
        }
    },[participant.researchNetwork]);
    useEffect(()=>{
        if(participant.positionWork==="Estudiante"){
            setParticipant(prev=>({
                ...prev,
                levelNumCOFFA: "",
                levelNumEDI: "",
                levelNumSNII: "",
                researchNetwork: 0

            })
            )
        }
        if(participant.positionWork !="Estudiante"){
            setParticipant(prev=>({
                ...prev,
                tutorName: "",
            })
            )
        }
    },[participant.positionWork]);
    return (
        <>

            <button className="participant-modalAgregarPieza" onClick={() => setIsOpen(true)}>Agregar participante</button>

            <Dialog open={isOpen} onClose={() => {setIsOpen(false); setParticipant(initialParticipant);}} className="participant-dialog-overlay">
                <div className="participant-dialog-container">
                    <DialogPanel className="participant-dialog-panel">
                        <p className="dialog-title">{participantToEdit ? "Editar participante" : "Agregar participante"}</p>
                        <form onSubmit={handleSubmit} className="participant-form-participant">
                            <div className="participant-form-rows">
                                <div>
                                    <p>Nombre  
                                        {newErrors.fName && (
                                            <>
                                                {newErrors.fName !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.fName}</span>
                                            </>
                                        )}  
                                    </p>
                                    <input 
                                        name="fName"
                                        value={participant.fName}
                                        onChange={handleInputChange}
                                        className="participant-form-pieza-input" placeholder="Escribe el nombre del miembro..."></input>
                                </div>
                                <div>
                                    <p>Apellido paterno 
                                        {newErrors.lastName1 && (
                                            <>
                                                {newErrors.lastName1 !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.lastName1}</span>
                                            </>
                                        )}    
                                    </p>
                                    <input 
                                        name="lastName1"
                                        value={participant.lastName1}
                                        onChange={handleInputChange}
                                        placeholder="Escribe el apellido paterno..."
                                        className="participant-form-pieza-input"></input>
                                </div>
                                <div>
                                    <p>Apellido materno 
                                        {newErrors.lastName2 && (
                                            <>
                                                {newErrors.lastName2 !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.lastName2}</span>
                                            </>
                                        )}    
                                    </p>
                                    <input 
                                        name="lastName2"
                                        value={participant.lastName2}
                                        onChange={handleInputChange}
                                        placeholder="Escribe el apellido materno..."
                                        className="participant-form-pieza-input"></input>
                                </div>
                            </div>
                            <div className="participant-form-rows">
                                <div>
                                    <p>Institución perteneciente 
                                        {newErrors.institution && (
                                            <>
                                                {newErrors.institution !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.institution}</span>
                                            </>
                                        )}
                                    </p>
                                    <input 
                                        name="institution"
                                        value={participant.institution}
                                        onChange={handleInputChange}
                                        className="participant-form-pieza-input" placeholder="Escribe a la institución a la que pertenece..."></input>
                                </div>
                                <div>
                                    <p>Puesto que desempeña
                                        {newErrors.positionWork && (
                                            <>
                                                {newErrors.positionWork !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.positionWork}</span>
                                            </>
                                        )}
                                    </p>
                                    <select name="positionWork" 
                                        value={participant.positionWork}
                                        onChange={handleInputChange}
                                        className="participant-form-pieza-input">
                                        <option value="" disabled>Selecciona una opción</option>
                                        {Array.isArray(memberType) && memberType.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                {participant.positionWork === "Estudiante" &&(
                                    <div>
                                        <p>Nombre del tutor
                                            {newErrors.tutorName && (
                                                <>
                                                    {newErrors.tutorName !== '*' && <br />}
                                                    <span className="text-red-600"> {newErrors.tutorName}</span>
                                                </>
                                            )}
                                        </p>
                                        <input
                                            name="tutorName"
                                            value={participant.tutorName}
                                            onChange={handleInputChange} 
                                            placeholder="Escribe el nombre del tutor..."
                                            className="participant-form-pieza-input"></input>
                                    </div>
                                )}
                            </div>
                            <div className="participant-form-rows">
                                <div>
                                <p>Grado académico
                                    {newErrors.academicDegree && (
                                            <>
                                                {newErrors.academicDegree !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.academicDegree}</span>
                                            </>
                                    )}
                                </p>
                                <input
                                    name="academicDegree"
                                    value={participant.academicDegree}
                                    onChange={handleInputChange} 
                                    placeholder="Escribe el grado académico..."
                                    className="participant-form-pieza-input"
                                    ></input>
                                </div>
                            </div>
                            {participant.positionWork != "Estudiante" && (
                            <>
                            <div className="participant-form-rows">
                                <div className="participant-button-degree">
                                    <p>Nivel SNII
                                    </p>
                                    <select name="levelNumSNII" 
                                        value={participant.levelNumSNII}
                                        onChange={handleInputChange}>
                                        <option value="" disabled>Selecciona una opción</option>
                                        {Array.isArray(levelSNII) && levelSNII.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="participant-button-degree">
                                    <p>Nivel COFFA
                                    </p>
                                    <select name="levelNumCOFFA" 
                                        value={participant.levelNumCOFFA}
                                        onChange={handleInputChange}>
                                        <option value=""  disabled>Selecciona una opción</option>
                                        {Array.isArray(levelCOFFA) && levelCOFFA.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="participant-button-degree">
                                    <p>Nivel EDI
                                    </p>
                                    <select name="levelNumEDI" 
                                        value={participant.levelNumEDI}
                                        onChange={handleInputChange}>
                                        <option value=""  disabled>Selecciona una opción</option>
                                        {Array.isArray(levelEDI) && levelEDI.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="participant-complete-row">
                                <p>Pertence a alguna red de investigación</p>
                                <div>
                                    <button type="button" 
                                        className={participant.researchNetwork === 1  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('researchNetwork',1)}>Si</button>
                                    <button type="button"
                                        className={participant.researchNetwork === 0  ? 'participant-button-press' : 'participant-button'} onClick={() =>handleChangeButton('researchNetwork',0)}>No</button>
                                </div>
                            </div>
                            {participant.researchNetwork === 1 && (
                                <div className="participant-complete-row-2">
                                    <p>¿Cuál?
                                       {newErrors.researchNetworkName && (
                                            <>
                                                {newErrors.researchNetworkName !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.researchNetworkName}</span>
                                            </>
                                        )}
                                    </p>
                                    <input  
                                        name="researchNetworkName"
                                        value={participant.researchNetworkName}
                                        onChange={handleInputChange} 
                                        placeholder="Escribe el tipo de investigación..."></input>
                                </div>
                            )}
                            </>
                            )}
                            
                            <p className="subTitle-Row">Datos de contacto</p>
                            <div className="participant-form-rows">
                                    <div>
                                        <p>Email 
                                            {newErrors.email && (
                                            <>
                                                {newErrors.email !== '*' && <br />}
                                                <span className="text-red-600"> {newErrors.email}</span>
                                            </>
                                            )}
                                        </p>
                                        <input 
                                        name="email"
                                        value={participant.email}
                                        onChange={handleInputChange} 
                                        placeholder="Escribe el email..."
                                        className="formContact-participant-form-pieza-input2"></input>
                                    </div>
                                    <div>
                                    <p>
                                    Teléfono
                                    {newErrors.phone && (
                                        <>
                                            {newErrors.phone !== '*' && <br />}
                                            <span className="text-red-600"> {newErrors.phone}</span>
                                        </>
                                    )}
                                    </p>
                                        <input 
                                        name="phone"
                                        value={participant.phone}
                                        onChange={handleInputChange} 
                                        placeholder="Escribe el teléfono..."
                                        className="formContact-participant-form-pieza-input2"></input>
                                    </div>
                            </div>
                            
                            <div className="participant-dialog-actions">
                                <button
                                type="button"
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setIsOpen(false); 
                                    setParticipant(initialParticipant); 
                                    setNewErrors(ArrayNewErrors);
                                    }}
                                className="button-cancel">
                                Cancelar
                                </button>
                                <button  className="participant-button-confirm">
                                    {participantToEdit ? "Guardar cambios" : "Guardar participante"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default AddParticipant;