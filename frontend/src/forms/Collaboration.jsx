import AddCollaboration from "../components/Modals/AddCollaboration";
import useLoadFormData from "../hooks/useLoadFormData";
import ShowCards from "../components/ShowCards";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";
import { useEffect, useState } from "react";


const  Collaboration = ({option,setOption}) => {
    
    const [hasCollaboration, setHasCollaboration] = useState(1);
    const [collaborations, setCollaborations] = useState({ 
        idF: 4, 
        hasCollaboration,
        collaborationJustification:"", 
        collaborativeInstitutions: [] });
    const [newErrors,setNewErrors] = useState({
            collaborationJustification:"*",
            collaborativeInstitutions:"*"
    });
    const [collaborationToEdit, setCollaborationToEdit] = useState(null);


    const handleOnSubmitFormBack = useSubmitFormBack(collaborations, setOption);
    const handleOnSubmitForm = useSubmitFormNext(collaborations, setOption);


    const handleSubmitWithValidation = (event) => {
        
        event.preventDefault();
        const newErrorsF = {}
        if(collaborations.hasCollaboration===0 && (collaborations.collaborationJustification === 'string' || collaborations.collaborationJustification.trim() === '')){
            newErrorsF['collaborationJustification'] = "* El campo es requerido"
        }
        if(collaborations.hasCollaboration && !collaborations.collaborativeInstitutions.length>=1){
            newErrorsF['collaborativeInstitutions'] = "* Se requiere mínimo una colaboración"
        }
        setNewErrors(newErrorsF)
        if(!Object.keys(newErrorsF).length>0){
            handleOnSubmitForm(event); 
        }
    };

    const handleDeleteArray = (index) => {
        setCollaborations({
            ...collaborations,
            collaborativeInstitutions: removeItemByIndex(collaborations.collaborativeInstitutions, index)
        });
    };
    
    const handleEditModal = (index, project) => {
        setCollaborationToEdit({ ...project, index });
    };
    
    const handleEditComplete = () => {
        setCollaborationToEdit(null);
    };

    const handleChangeButton = (key, value) => {
        setCollaborations((prevState) => ({
            ...prevState,
            [key]: value, 
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollaborations({ ...collaborations, [name]: value });
    };

    useLoadFormData(collaborations.idF,setCollaborations);
    
    useEffect(()=>{
        //Borrar arreglo
        if(collaborations.hasCollaboration===0){
            setCollaborations(prev=>({
                ...prev,
                collaborativeInstitutions: []
            })
            )
        }
        //Borrar texto
        if(collaborations.hasCollaboration===1){
            setCollaborations(prev=>({
                ...prev,
                collaborationJustification:""
            })
            )
        }
    },[collaborations.hasCollaboration])

    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Colaboración con otras instituciones</p>
                </div>
                <div className="!mt-5 !mb-5 flex justify-between flex-wrap mt-5 w-[100%]">
                    <p className="w-3/4">¿El proyecto cuenta con colaboración de otras instituciones?</p>
                    <div className="w-1/4 min-w-[200px] flex justify-between">
                        <button type="button"
                            className={collaborations.hasCollaboration === 1  ? 
                            'bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px]' 
                            : 
                            'bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px]'} 
                            onClick={() => handleChangeButton('hasCollaboration', 1)} >Sí</button>
                        <button type="button"
                            className={collaborations.hasCollaboration === 0  ? 
                            'bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px] '
                            : 
                            'bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px]'} 
                            onClick={() => handleChangeButton('hasCollaboration', 0)} >No</button>
                    </div>
                </div>
                {collaborations.hasCollaboration ? (
                <>
                    <p className="text-red-600">{newErrors.collaborativeInstitutions}</p>
                    <div className="rounded-lg p-0 w-full">
                        <div className="flex justify-between !p-2">
                            <p className="flex-1">Institución</p>
                            <p className="flex-1">Convenio colaboración</p>
                            <p className="flex-1">Internacional / Nacional</p>
                            <p className="flex-1">Número de covenio</p>
                            <p className="flex-1"></p>
                        </div>
                    </div>
                    <ShowCards cards={collaborations.collaborativeInstitutions} 
                    handleDeleteFile={handleDeleteArray} 
                    handleEditModal={handleEditModal}
                    fieldsToShow={['name','collaborationAgreement','agreementType','agreementNumber']}
                    />
                    <div className="!mt-5">
                        <div className="!flex items-center justify-center">
                            <AddCollaboration  
                                setCollaborations={setCollaborations}
                                collaborationToEdit={collaborationToEdit}
                                onEditComplete={handleEditComplete}/>
                        </div>
                    </div>
                </>
                ) : (
                    <div className="flex-1 !mb-5">
                    <p className="!mb-5 text-[17px] text-gray-600">(Declarar porque no existe colaboración con otras instituciones)
                        {newErrors.collaborationJustification && (
                            <>
                                {newErrors.collaborationJustification !== '*' && <br />}
                                <span className="text-red-600"> {newErrors.collaborationJustification}</span>
                            </>
                        )} 
                    </p>
                        <textarea  
                        className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                        name="collaborationJustification" 
                        placeholder="Escribe porque no hay colaboración con otras instituciones..."
                        value={collaborations.collaborationJustification}
                        onChange={handleChange}></textarea>
                    </div>
                )}
            </div>
            <div className="flex justify-end items-center !mt-15 mb-5">
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 w text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                 hover:bg-[#4CA6D5] transition-colors duration-300" onClick={handleSubmitWithValidation}>Siguiente</button>
            </div>
        </div>
    )
}

export default Collaboration;