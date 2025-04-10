import AddProjects from "../components/AddProjects";
import useLoadFormData from "../hooks/useLoadFormData";
import { prevOption } from "../hooks/optionUtils";
import { useFormHandler } from "../hooks/useFormHandler";
import CardAdd from "../components/CardAdd";

import { useState } from "react";


const  Projects = ({option,setOption}) => {
    const [projects, setProjects] = useState({ idF: 2, projects: [] });
    
    const handleOnSubmitForm = useFormHandler({
        form: projects,
        onSuccess: ()=> setOption(prevOption => prevOption + 1),
    });
    
    useLoadFormData(projects.idF,setProjects);
    
    return (
        <div>
            <div className="flex flex-col justify-between">
                <div>
                    <p className="text-[22px]">Proyectos Asociados</p>
                </div>
                <CardAdd cards={projects.projects} slice={5}/>
                <div className="!mt-5">
                    <div className="!flex items-center justify-center">
                        <AddProjects setProjects={setProjects}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-5 mb-5">
                <button className="!mr-5 ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" 
                    type="button"  onClick={() => prevOption(setOption)}>Regresar</button>
                <button className="!ml-8 w-1/8 h-12 text-[20px] rounded-lg border-none bg-[#5CB7E6] text-white font-medium cursor-pointer shadow-md" 
                    onClick={handleOnSubmitForm}>Siguiente</button>
            </div>
        </div>
    )
}

export default Projects;