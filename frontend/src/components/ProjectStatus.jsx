import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/projectstatus.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProjectStatus() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");

  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!projectId) return;
        const response = await fetch(`${apiUrl}/researchers/projects/${projectId}`);
        const data = await response.json();
        if (data.project && data.project.length > 0) {
          setProjectData(data.project[0]);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <main className="projectstatus-main">Cargando...</main>;
  }

  if (!projectData) {
    return <main className="projectstatus-main">Proyecto no encontrado.</main>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX");
  };

  return (
    <main className="projectstatus-main">
      <div className="project-header">
        <div className="project-info">
          <h1 className="project-title">{projectData.title || "Sin título"}</h1>
          <div className="info-grid">
            <div className="info-item">
              <p className="label">Fecha inicio</p>
              <p>{formatDate(projectData.startDate)}</p>
            </div>
            <div className="info-item">
              <p className="label">Fecha fin</p>
              <p>{formatDate(projectData.endDate)}</p>
            </div>
            <div className="info-item">
              <p className="label">Folio</p>
              <p>{projectData.folio || "-"}</p>
            </div>
            <div className="info-item">
              <p className="label">Status</p>
              <p>{projectData.status || "-"}</p>
            </div>
          </div>
        </div>
        <button className="info-button">Información</button>
      </div>

      <div className="evaluation-progress">
        <h2 className="subtitle">Progreso de evaluación</h2>
        <p className="description">
          Este proyecto aún no ha sido enviado a evaluación
        </p>
      </div>

      <div className="submit-section">
        <button className="submit-button">Enviar a evaluación</button>
      </div>
    </main>
  );
}
