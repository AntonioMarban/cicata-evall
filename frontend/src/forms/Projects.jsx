import AddProjects from "../components/AddProjects";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import { useFormHandler } from "../hooks/useFormHandler";
import ShowCards from "../components/ShowCards";
import { removeItemByIndex } from "../hooks/removeItemByIndex";

import { useState } from "react";


const  Projects = ({option,setOption}) => {
    const [projects, setProjects] = useState({ idF: 2, associatedProjects: [] });
    const [projectToEdit, setProjectToEdit] = useState(null);

    const handleOnSubmitForm = useFormHandler({
        form: projects,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });

    const handleDeleteArray = (index) => {
        setProjects({
            ...projects,
            associatedProjects: removeItemByIndex(projects.associatedProjects, index)
        });
    };

    const handleEditModal = (index, project) => {
        setProjectToEdit({ ...project, index });
    };
    
    const handleEditComplete = () => {
        setProjectToEdit(null);
    };


    useLoadFormData(projects.idF,setProjects);
    
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Proyectos Asociados</p>
                </div>
                <div className="rounded-lg p-0 w-full">
                    <div className="flex justify-between !p-2">
                    <p className="flex-1">Nombre proyecto</p>
                    <p className="flex-1">Fecha de asociación</p>
                    <p className="flex-1">Tipo de proyecto</p>
                    <p className="flex-1">Número de registro externo</p>
                    <p className="flex-1 text-center">Número de registro SIP</p>
                    <p className="flex-1"></p>
                    </div>
                </div>
                <ShowCards cards={projects.associatedProjects} 
                    handleDeleteFile={handleDeleteArray}
                    handleEditModal={handleEditModal}
                    slice={5}/>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddProjects 
                            setProjects={setProjects} 
                            projectToEdit={projectToEdit}
                            onEditComplete={handleEditComplete}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" 
                    type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" 
                    onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Projects;