import { useEffect, useState, useCallback } from "react";
import "../styles/projectstatus.css";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProjectStatus( { projectId }) {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stage1Evaluations, setStage1Evaluations] = useState([]);
  const [sendingStage1, setSendingStage1] = useState(false);

  const [stageCompleted, setStageCompleted] = useState(null);
  const [jumpThirdStage, setJumpThirdStage] = useState(null);

  const fetchStage1Evaluations = useCallback(async () => {
    try {
      if (!projectId) return;
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/evaluations/stage1`
      );
      const data = await response.json();
      if (data && Array.isArray(data.evaluations)) {
        setStage1Evaluations(data.evaluations);
      }
      if (data.controlVariables && data.controlVariables.length > 0) {
        setStageCompleted(data.controlVariables[0].stageCompleted);
        setJumpThirdStage(data.controlVariables[0].jumpThirdStage);
      }
    } catch (error) {
      console.error("Error fetching stage 1 evaluations:", error);
    }
  }, [projectId]);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!projectId) return;
        const response = await fetch(
          `${apiUrl}/researchers/projects/${projectId}`
        );
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

  useEffect(() => {
    fetchStage1Evaluations();
  }, [fetchStage1Evaluations]);

  if (loading) {
    return <main className="projectstatus-main">Cargando...</main>;
  }

  if (!projectData) {
    return <main className="projectstatus-main">Proyecto no encontrado.</main>;
  }

  const handleSendStage1 = async () => {
    try {
      setSendingStage1(true);
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/evaluations/stage1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await fetchStage1Evaluations(); // Actualizar datos
      } else {
        console.error("Error en el envío de evaluación etapa 1.");
      }
    } catch (error) {
      console.error("Error en el POST de etapa 1:", error);
    } finally {
      setSendingStage1(false);
    }
  };

  if (loading || !projectData) return null;

  return (
    <main className="projectstatus-main">

      <div className="evaluation-section">
        <h2 className="subtitle">Progreso de evaluación</h2>

        {/* Etapa 1 */}
        <div className="stage">
          <h3>Etapa 1</h3>
          {stage1Evaluations.length === 0 ? (
            <>
              <p>Este proyecto aún no ha sido enviado al CIP.</p>
              <button
                className="stage-button active"
                onClick={handleSendStage1}
                disabled={sendingStage1}
              >
                {sendingStage1 ? "Enviando..." : "Enviar a evaluación"}
              </button>
            </>
          ) : (
            <table className="stage-table">
              <thead>
                <tr>
                  <th>Comité</th>
                  <th>Aprobado/No aprobado</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {stage1Evaluations.map((evaluation, index) => (
                  <tr key={index}>
                    <td>{evaluation.name}</td>
                    <td
                      className={
                        evaluation.result === "Aprobado"
                          ? "approved"
                          : "not-approved"
                      }
                    >
                      {evaluation.result}
                    </td>
                    <td>{evaluation.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Etapa 2 */}
        <div className="stage">
          <h3>Etapa 2</h3>
          <p>Este proyecto aún no ha sido enviado al CEI, CB y CI.</p>
          <button
            className={`stage-button ${
              stageCompleted === 0 ? "disabled" : "active"
            }`}
            disabled={stageCompleted === 0}
          >
            Enviar a evaluación
          </button>
        </div>

        {/* Etapa 3 */}
        <div className="stage">
          <h3>Etapa 3</h3>
          <p>
            El resultado de este proyecto aún no ha sido enviado al
            investigador.
          </p>
          <button
            className={`stage-button ${
              jumpThirdStage === 1 ? "active" : "disabled"
            }`}
            disabled={jumpThirdStage !== 1}
          >
            Enviar al investigador
          </button>
        </div>
      </div>
    </main>
  );
}
