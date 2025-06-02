import "../styles/projectdictum.css";
import DictumHeader from "../components/ProjectDictum/DictumHeader";
import { useEffect, useState } from "react";

export default function ProjectDictum() {

    const projectId = 3; //TODO: CAMBIAR POR STATE
    const apiUrl = import.meta.env.VITE_API_URL;
    const [dictumData, setDictumData] = useState(null);

    useEffect(() => {
        const fetchDictum = async () => {
            try {
                const response = await fetch(`${apiUrl}/users/projects/${projectId}/dictum`);
                if (!response.ok) {
                    throw new Error("Error fetching dictum data");
                }
                const data = await response.json();
                setDictumData(data);
            } catch (error) {
                console.error("Error fetching dictum data:", error);
            }
        };

        fetchDictum();
    })


    return (
        <div id="project-dictum" className="flex flex-col p-10! min-h-screen noto-sans">
        <DictumHeader
            folio={dictumData.dictumFolio}
            projectId={dictumData.projectFolio}
            projectOwner={dictumData.projectOwner}
            projectOwnerAcademicDegree={dictumData.projectOwnerAcademicDegree}
            authorizationDate={dictumData.authorizationDate}
        />
        </div>
    );
}