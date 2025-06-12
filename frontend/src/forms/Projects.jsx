import AddProjects from "../components/Modals/AddProjects";
import useLoadFormData from "../hooks/useLoadFormData";
import ShowCards from "../components/ShowCards";
import { removeItemByIndex } from "../hooks/removeItemByIndex";
import useSubmitFormBack from "../hooks/useSubmitFormBack";
import useSubmitFormNext from "../hooks/useSubmitFormNext";
import { useState } from "react";


const  Projects = ({option,setOption}) => {
    
    const [projects, setProjects] = useState({ idF: 2, associatedProjects: [] });
    const [projectToEdit, setProjectToEdit] = useState(null);
    
    const handleOnSubmitFormBack = useSubmitFormBack(projects, setOption);
    const handleOnSubmitFormNext = useSubmitFormNext(projects, setOption);

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
                    <p className="text-[22px]">Proyectos asociados</p>
                </div>
                <div className="rounded-lg p-0 w-full">
                    <div className="flex justify-between !p-2">
                    <p className="flex-1">Nombre proyecto</p>
                    <p className="flex-1">Fecha de asociación</p>
                    <p className="flex-1">Tipo de proyecto</p>
                    <p className="flex-1">Número de registro externo</p>
                    <p className="flex-1">Número de registro SIP</p>
                    <p className="flex-1"></p>
                    </div>
                </div>
                <ShowCards cards={projects.associatedProjects} 
                    handleDeleteFile={handleDeleteArray}
                    handleEditModal={handleEditModal}
                    fieldsToShow= {['name', 'associationDate', 'project_type', 'externalRegister','SIPRegister']}
                    />
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
            <div className="flex justify-end items-center !mt-15 mb-5">
                <button className="!p-2 !mr-5 ml-8 text-[20px] rounded-lg border-none bg-[#5CB7E6] 
                text-white font-medium cursor-pointer shadow-md
                hover:bg-[#4CA6D5] transition-colors duration-300" 
                    type="button"  onClick={handleOnSubmitFormBack}>Regresar</button>
                <button className="!p-2 !ml-8 text-[20px] rounded-lg border-none 
                bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md
                hover:bg-[#4CA6D5] transition-colors duration-300" 
                    onClick={handleOnSubmitFormNext}>Siguiente</button>
            </div>
        </div>
    )
}

export default Projects;