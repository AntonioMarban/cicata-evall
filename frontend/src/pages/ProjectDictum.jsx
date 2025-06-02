import "../styles/projectdictum.css";
import DictumHeader from "../components/ProjectDictum/DictumHeader";
import { useEffect, useState } from "react";
import DictumApprovedBody from "../components/ProjectDictum/DictumApprovedBody";
import DictumSecondPage from "../components/ProjectDictum/DictumSecondPage";
import DictumFooter from "../components/ProjectDictum/DictumFooter";

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
  }, [ apiUrl, projectId ]);

  const handlePrint = () => {
      window.print();
 };

  return (
    <>
        <div className='div-button flex justify-end pt-5!'>
            <button onClick={handlePrint}>Descargar dictamen</button>
        </div>
        <div id="project-dictum" className="flex flex-col p-10! min-h-screen noto-sans">
        {dictumData ? (
            <>
            <div className="header-print">
                <DictumHeader
                    folio={dictumData.dictumFolio}
                    projectId={dictumData.projectFolio}
                    projectOwner={dictumData.projectOwner}
                    projectOwnerAcademicDegree={dictumData.projectOwnerAcademicDegree}
                    authorizationDate={dictumData.authorizationDate}
                />
            </div>
            {dictumData.decision === "Aprobado" &&
            <DictumApprovedBody
                projectTitle={dictumData.projectTitle}
                projectFolio={dictumData.projectFolio}
            />
            }
            <DictumSecondPage
                authorizerName={dictumData.authorizerName}
                authorizerAcademicDegree={dictumData.authorizerAcademicDegree}
                authorizerPositionWork={dictumData.authorizerPositionWork}
                authorizerInstitution={dictumData.authorizerInstitution}
            />
            <DictumFooter />
            </>
        ) : (
            <p className="text-center text-gray-500 p-10!">Cargando dictamen...</p>
        )}
        </div>
    </>
  );
}
