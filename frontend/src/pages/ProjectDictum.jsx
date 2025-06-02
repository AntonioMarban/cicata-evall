import "../styles/projectdictum.css";
import DictumHeader from "../components/ProjectDictum/DictumHeader";
import { useEffect, useState } from "react";
import DictumApprovedBody from "../components/ProjectDictum/DictumApprovedBody";

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
  }, []);

  return (
    <div id="project-dictum" className="flex flex-col p-10! min-h-screen noto-sans">
      {dictumData ? (
        <>
          <DictumHeader
            folio={dictumData.dictumFolio}
            projectId={dictumData.projectFolio}
            projectOwner={dictumData.projectOwner}
            projectOwnerAcademicDegree={dictumData.projectOwnerAcademicDegree}
            authorizationDate={dictumData.authorizationDate}
          />
          {dictumData.decision === "Aprobado" &&
          <DictumApprovedBody
            projectTitle={dictumData.projectTitle}
            projectFolio={dictumData.projectFolio}
          />
          }
        </>
      ) : (
        <p className="text-center text-gray-500 p-10!">Cargando dictamen...</p>
      )}
    </div>
  );
}
