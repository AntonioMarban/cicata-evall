import { useEffect, useState, useCallback } from "react";
import "../styles/projectstatus.css";

export default function ProjectStatus({ projectId }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Stage 1
  const [stage1Evaluations, setStage1Evaluations] = useState([]);
  const [sendingStage1, setSendingStage1] = useState(false);
  const [stage1Completed, setStage1Completed] = useState(0);

  // Stage 2
  const [stage2Evaluations, setStage2Evaluations] = useState([]);
  const [sendingStage2, setSendingStage2] = useState(false);
  const [stage2Completed, setStage2Completed] = useState(0);

  // Stage 3
  const [finalResult, setFinalResult] = useState(null);
  const [sendingStage3, setSendingStage3] = useState(false);
  const [sendingPendingResearcher, setSendingPendingResearcher] = useState(0);
  const [folioDictamen, setFolioDictamen] = useState("");

  // Control Variables
  const [jumpThirdStage, setJumpThirdStage] = useState(0);
  const [sendingPending, setSendingPending] = useState(0);
  const [createDictum, setCreateDictum] = useState(0);

  const fetchStage1Evaluations = useCallback(async () => {
    try {
      if (!projectId) return;
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/evaluations/stage1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.warn(
          "Unauthorized or Forbidden: Clearing session and redirecting."
        );
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      const data = await response.json();
      if (data && Array.isArray(data.evaluations)) {
        setStage1Evaluations(data.evaluations);
      }
      if (data.controlVariables) {
        setStage1Completed(data.controlVariables.stageCompleted);
        setJumpThirdStage(data.controlVariables.jumpThirdStage);
      }
    } catch (error) {
      console.error("Error fetching stage 1 evaluations:", error);
    }
  }, [projectId, apiUrl, token]);

  const fetchStage2Evaluations = useCallback(async () => {
    try {
      if (!projectId) return;
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/evaluations/stage2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.warn(
          "Unauthorized or Forbidden: Clearing session and redirecting."
        );
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      const data = await response.json();
      if (data && Array.isArray(data.evaluations)) {
        setStage2Evaluations(data.evaluations);
      }
      if (data.controlVariables) {
        setStage2Completed(data.controlVariables.stageCompleted);
        setSendingPending(data.controlVariables.sendingPending);
      }
    } catch (error) {
      console.error("Error fetching stage 2 evaluations:", error);
    }
  }, [projectId, apiUrl, token]);

  const fetchStage3 = useCallback(async () => {
    try {
      if (!projectId) return;
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/evaluations/stage3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.warn(
          "Unauthorized or Forbidden: Clearing session and redirecting."
        );
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      const data = await response.json();
      if (data) {
        setFinalResult(data["@finalResult"]);
        setSendingPendingResearcher(data.sendingPending);
        setCreateDictum(data.createDictum);
      }
    } catch (error) {
      console.error("Error fetching stage 3:", error);
    }
  }, [projectId, apiUrl, token]);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (!projectId) return;
        const response = await fetch(
          `${apiUrl}/users/projects/${projectId}/summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 401 || response.status === 403) {
          console.warn(
            "Unauthorized or Forbidden: Clearing session and redirecting."
          );
          localStorage.clear();
          window.location.href = "/";
          return;
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setProjectData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId, apiUrl, token]);

  useEffect(() => {
    fetchStage1Evaluations();
  }, [fetchStage1Evaluations]);

  useEffect(() => {
    if (stage1Completed === 1) {
      fetchStage2Evaluations();
    }
  }, [stage1Completed, fetchStage2Evaluations]);

  useEffect(() => {
    if (stage2Completed === 1 || jumpThirdStage === 1) {
      fetchStage3();
    }
  }, [stage2Completed, jumpThirdStage, fetchStage3]);

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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.warn(
          "Unauthorized or Forbidden: Clearing session and redirecting."
        );
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      if (response.ok) {
        await fetchStage1Evaluations();
      } else {
        console.error("Error en el envío de evaluación etapa 1.");
      }
    } catch (error) {
      console.error("Error en el POST de etapa 1:", error);
    } finally {
      setSendingStage1(false);
    }
  };

  const handleSendStage2 = async () => {
    try {
      setSendingStage2(true);
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/evaluations/stage2`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.warn(
          "Unauthorized or Forbidden: Clearing session and redirecting."
        );
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      if (response.ok) {
        await fetchStage2Evaluations();
      } else {
        console.error("Error en el envío de evaluación etapa 2.");
      }
    } catch (error) {
      console.error("Error en el POST de etapa 2:", error);
    } finally {
      setSendingStage2(false);
    }
  };

  const handleSendStage3 = async () => {
    try {
      setSendingStage3(true);
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/evaluations/stage3`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.warn(
          "Unauthorized or Forbidden: Clearing session and redirecting."
        );
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      if (response.ok) {
        await fetchStage3();
        if (createDictum === 1) {
          await handleCreateDictum();
        } else {
          window.location.reload();
        }
      } else {
        console.error("Error en el envío de evaluación etapa 3.");
      }
    } catch (error) {
      console.error("Error en el PATCH de etapa 3:", error);
    } finally {
      setSendingStage3(false);
    }
  };

  const handleCreateDictum = async () => {
    try {
      const authorizerId = Number(localStorage.getItem("userId"));
      if (!authorizerId || !folioDictamen) {
        console.error(`Folio o authorizerId no disponibles.`);
        return;
      }
      const body = {
        folio: folioDictamen,
        authorizerId: authorizerId,
      };
      const response = await fetch(
        `${apiUrl}/subdirectorade/projects/${projectId}/dictum`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status === 401 || response.status === 403) {
        console.warn(
          "Unauthorized or Forbidden: Clearing session and redirecting."
        );
        localStorage.clear();
        window.location.href = "/";
        return;
      }
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error en el envío de dictamen final.");
      }
    } catch (error) {
      console.error("Error en el POST de dictamen final:", error);
    }
  };

  if (loading || !projectData) return null;

  return (
    <main className="projectstatus-main">
      <div className="evaluation-section">
        <h2 className="subtitle">Progreso de evaluación</h2>

        {/* Etapa 1 */}
        <div className="stage">
          <h3>Etapa 1: Evaluación por el Comité Interno de Proyectos</h3>
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
                  <th>Resultados de evaluación</th>
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
                          : evaluation.result === "Pendiente de aprobación" ||
                            evaluation.result === "No aprobado"
                          ? "not-approved"
                          : "pending"
                      }
                    >
                      {evaluation.result ?? "—"}
                    </td>
                    <td>{evaluation.comments ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Etapa 2 */}
        <div className="stage">
          <h3>Etapa 2: Evaluación por Comités Especializados</h3>
          {stage2Evaluations.length === 0 ? (
            <>
              <p>Este proyecto aún no ha sido enviado a los comités especializados.</p>
              <button
                className={`stage-button ${
                  stage1Completed === 1 && !sendingStage2
                    ? "active"
                    : "disabled"
                }`}
                onClick={handleSendStage2}
                disabled={stage1Completed !== 1 || sendingStage2}
              >
                {sendingStage2 ? "Enviando..." : "Enviar a evaluación"}
              </button>
            </>
          ) : (
            <>
              {sendingPending === 1 ? (
                <>
                  <p>Este proyecto está pendiente de enviar a evaluación.</p>
                </>
              ) : (
                <></>
              )}
              <table className="stage-table">
                <thead>
                  <tr>
                    <th>Comité</th>
                    <th>Resultados de evaluación</th>
                    <th>Comentario</th>
                  </tr>
                </thead>
                <tbody>
                  {stage2Evaluations.map((evaluation, index) => (
                    <tr key={index}>
                      <td>{evaluation.name}</td>
                      <td
                        className={
                          evaluation.result === "Aprobado"
                            ? "approved"
                            : evaluation.result === "Pendiente de aprobación" ||
                              evaluation.result === "No aprobado"
                            ? "not-approved"
                            : "pending"
                        }
                      >
                        {evaluation.result ?? "—"}
                      </td>
                      <td>{evaluation.comments ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sendingPending === 1 ? (
                <>
                  <button
                    className={`stage-button ${
                      sendingStage2 ? "disabled" : "active"
                    }`}
                    onClick={handleSendStage2}
                    disabled={sendingStage2}
                  >
                    {sendingStage2 ? "Enviando..." : "Enviar a evaluación"}
                  </button>
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>

        {/* Etapa 3 */}
        <div className="stage">
          <h3>
            Etapa 3:
            {sendingPendingResearcher === 1 && createDictum === 1
              ? " Generación y envío de dictamen global al investigador titular"
              : " Envío de resultados al investigador titular"}
          </h3>
          <p>
            {sendingPendingResearcher === 1 && createDictum === 1
              ? `El resultado final es: ${finalResult.toLowerCase()}. El resultado aún no ha sido enviado al investigador.`
              : createDictum === 0 && sendingPendingResearcher === 1
              ? `El resultado es: ${finalResult.toLowerCase()}. El resultado aún no ha sido enviado al investigador.`
              : createDictum === 1 && sendingPendingResearcher === 0
              ? "El resultado final de este proyecto ya fue enviado al investigador."
              : "El último estado de este proyecto ya fue enviado al investigador"}
          </p>
          {createDictum === 1 && sendingPendingResearcher === 1 && (
            <div className="dictum-input-form">
              <label htmlFor="folio-dictamen">Folio de dictamen final:</label>
              <input
                id="folio-dictamen"
                type="text"
                value={folioDictamen}
                onChange={(e) => setFolioDictamen(e.target.value)}
                placeholder="Escribe el folio aquí"
              />
            </div>
          )}
          <button
            className={`stage-button ${
              sendingStage3
                ? "disabled"
                : (sendingPendingResearcher === 1 ||
                    sendingPendingResearcher == null) &&
                  (jumpThirdStage === 1 || stage2Completed === 1)
                ? "active"
                : "disabled"
            }`}
            onClick={handleSendStage3}
            disabled={
              sendingStage3 ||
              sendingPendingResearcher === 0 ||
              (jumpThirdStage !== 1 && stage2Completed !== 1)
            }
          >
            {sendingStage3 ? "Enviando..." : "Enviar al investigador"}
          </button>
        </div>
      </div>
    </main>
  );
}
