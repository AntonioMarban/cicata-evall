import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import ProjectStatus from "../components/ProjectStatus";
import ProjectHeader from "../components/ProjectHeader";
import ProjectProgress from "../components/ProjectProgress";
import ProjectEvaluations from "../components/ProjectEvaluations";

const apiUrl = import.meta.env.VITE_API_URL;
const userType = Number(localStorage.getItem("userType"))

export default function Project() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        if (!projectId) return;
        const response = await fetch(`${apiUrl}/users/projects/${projectId}/summary`);
        const data = await response.json();

        if (data && data.length > 0) {
          setProjectData(data[0]);
        }

      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return <main className="projectstatus-main">Cargando...</main>;
  }

  if (!projectData) {
    return <main className="projectstatus-main">Proyecto no encontrado.</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <main className="flex-1 overflow-y-auto p-6">
        <ProjectHeader
          title={projectData.title}
          startDate={projectData.startDate}
          endDate={projectData.endDate}
          folio={projectData.folio}
          status={projectData.status}
        />

        {/* Vistas condicionales por tipo de usuario */}
        {userType === 2 && <ProjectStatus projectId={projectId} />}
        {userType === 1 && <ProjectProgress projectId={projectId} />}
        {(userType === 3 || userType === 4) && <ProjectEvaluations projectId={projectId} />}
      </main>
    </div>
  );
}
