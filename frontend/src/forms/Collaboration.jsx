import AddCollaboration from "../components/AddCollaboration";
import { useFormHandler } from "../hooks/useFormHandler";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import CardAdd from "../components/CardAdd";
import { removeItemByIndex } from "../hooks/removeItemByIndex";

import { useState } from "react";


const  Collaboration = ({option,setOption}) => {
    const [collaborate, setCollaborate] = useState(1);
    const [collaborations, setCollaborations] = useState({ idF: 4, collaborate,collaborateText:"", collaborations: [] });

    const [collaborationToEdit, setCollaborationToEdit] = useState(null);
    const handleOnSubmitForm = useFormHandler({
        form: collaborations,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setCollaborations({
            ...collaborations,
            collaborations: removeItemByIndex(collaborations.collaborations, index)
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
    
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Colaboración con otras instituciones</p>
                </div>
                <div className="!mt-5 !mb-5 flex justify-between flex-wrap mt-5 w-[100%]">
                    <p className="w-3/4">¿El Cuenta con colaboración de otras instituciones?</p>
                    <div className="w-1/4 min-w-[200px] flex justify-between">
                        <button type="button"
                            className={collaborations.collaborate === 1  ? 
                            'bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px]' 
                            : 
                            'bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px]'} 
                            onClick={() => handleChangeButton('collaborate', 1)} >Si</button>
                        <button type="button"
                            className={collaborations.collaborate === 0  ? 
                            'bg-[#5CB7E6] border-none rounded-lg text-white text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px]'
                            : 
                            'bg-[#E1E1E1] border-none rounded-lg text-lg font-medium cursor-pointer shadow-md w-[45%] min-w-[100px]'} 
                            onClick={() => handleChangeButton('collaborate', 0)} >No</button>
                    </div>
                </div>
                {collaborations.collaborate ? (
                <>
                    <div className="rounded-lg p-0 w-full">
                        <div className="flex justify-between !p-2">
                            <p className="flex-1">Institución</p>
                            <p className="flex-1">Convenio colaboración</p>
                            <p className="flex-1">Extranjero / Nacional</p>
                            <p className="flex-1 text-center">Institución</p>
                            <p className="flex-1"></p>
                        </div>
                    </div>
                    <CardAdd cards={collaborations.collaborations} 
                    handleDeleteFile={handleDeleteArray} 
                    handleEditModal={handleEditModal}
                    slice={4} />
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
                    <p className="!mb-5 text-[17px] text-gray-600">(Declarar porque no existe colaboración con otras instituciones)</p>
                        <textarea  
                        className="w-full h-full !p-2 rounded-lg border-2 border-gray-300 text-[19px] flex justify-start items-start text-gray-600 mt-3 min-w-[250px]"
                        name="collaborateText" 
                        placeholder="Escribe porque no hay colaboración con otras instituciones..."
                        value={collaborations.collaborateText}
                        onChange={handleChange}></textarea>
                    </div>
                )}
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!mr-5 ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Collaboration;