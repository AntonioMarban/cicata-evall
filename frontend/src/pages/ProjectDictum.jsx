import "../styles/projectDictum.css";
import DictumHeader from "../components/ProjectDictum/DictumHeader";
import { useEffect, useState } from "react";
import DictumApprovedBody from "../components/ProjectDictum/DictumApprovedBody";
import DictumSecondPage from "../components/ProjectDictum/DictumSecondPage";
import DictumFooter from "../components/ProjectDictum/DictumFooter";
import DictumAddress from "../components/ProjectDictum/DictumAddress";
import { useLocation, useNavigate } from "react-router-dom";
import DictumNotApprovedBody from "../components/ProjectDictum/DictumNotApprovedBody";

export default function ProjectDictum() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const projectId = state?.projectId
  
  useEffect(() => {
    if (!projectId) {
      console.error("No project ID found in state");
      navigate("/Inicio");
    }
  }, [projectId, navigate]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const [dictumData, setDictumData] = useState(null);

  useEffect(() => {
    const fetchDictum = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/projects/${projectId}/dictum`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          console.warn("Unauthorized or Forbidden: Clearing session and redirecting.");
          localStorage.clear();
          window.location.href = "/";
          return;
        }

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
                <div className="dictum-header">
                    <DictumHeader
                        folio={dictumData.dictumFolio}
                        projectId={dictumData.projectFolio}
                    />
                </div>
                <div className="dictum-header-spacer"></div>
                <DictumAddress 
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
                {dictumData.decision === "No aprobado" &&
                <DictumNotApprovedBody
                    projectTitle={dictumData.projectTitle}
                    projectFolio={dictumData.projectFolio}
                />
                }
                <div className="page-break" />

                <div className="dictum-header header-second-page">
                    <DictumHeader
                        folio={dictumData.dictumFolio}
                        projectId={dictumData.projectFolio}
                    />
                </div>
                <div className="dictum-header-spacer2"></div>
                
                <DictumSecondPage
                    authorizerName={dictumData.authorizerName}
                    authorizerAcademicDegree={dictumData.authorizerAcademicDegree}
                    authorizerPositionWork={dictumData.authorizerPositionWork}
                    authorizerInstitution={dictumData.authorizerInstitution}
                />
                <div className="dictum-footer">
                    <DictumFooter />
                </div>
            </>
        ) : (
            <p className="text-center text-gray-500 p-10!">Cargando dictamen...</p>
        )}
        </div>
    </>
  );
}
