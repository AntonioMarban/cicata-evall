import "../styles/projectheader.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatvalue from "../hooks/formatValue"
export default function ProjectHeader({
  title,
  startDate,
  endDate,
  folio,
  status,
  projectId,
}) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [committeeId, setCommitteeId] = useState(localStorage.getItem("committeeId"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [isEvaluator, setIsEvaluator] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handleStorageChange = () => {
      setUserType(localStorage.getItem("userType"));
      setCommitteeId(localStorage.getItem("committeeId"));
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const checkIfEvaluator = async () => {

      if (!projectId || !committeeId || !userId) return;

      if ((userType === "3" || userType === "4") && committeeId && userId && projectId) {
        try {
          const response = await fetch(
            `${apiUrl}/committees/${committeeId}/secretaries/${userId}/evaluations/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if(response.status === 404) {
            setIsEvaluator(false);
            return;
          }

          if (response.status === 401 || response.status === 403) {
            console.warn("Unauthorized or Forbidden: Clearing session and redirecting.");
            localStorage.clear();
            window.location.href = "/";
            return;
          }

          if (response.ok) {
            const data = await response.json();
            
            const isUserPendingEvaluation = data.some(
              (evaluator) =>
                String(evaluator.userId) === String(userId) && evaluator.result === null
            );
            setIsEvaluator(isUserPendingEvaluation);
          } else {
            console.error("Error fetching evaluations:", response.statusText);
            setIsEvaluator(false);
          }
        } catch (error) {
          console.error("Error checking evaluator status:", error);
          setIsEvaluator(false);
        }
      }
    }
    checkIfEvaluator();
  }, [projectId, committeeId, userId, userType, apiUrl]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX");
  };

  const handleInfoClick = () => {
    navigate('/VerFormulario', { state: { projectId: projectId } });
  };

  const handleEvaluateClick = () => {
    if (isEvaluator) {
      navigate('/EvaluarProyecto', { state: { projectId: projectId } });
    } else {
      alert("No tienes permisos para evaluar este proyecto.");
    }
  }

  const handleDictumClick = () => {
    if (status === "Aprobado" || status === "No aprobado") {
      navigate('/Dictamen', { state: { projectId: projectId } });
    } else {
      alert("El proyecto no tiene un dictamen disponible.");
    }
  }

  return (
    <div className="project-header">
      <div className="project-info">
        <h1 className="project-title">{title || "Sin título"}</h1>
        <div className="info-grid">
          <div className="info-item">
            <p className="label">Fecha inicio</p>
            <p>{formatvalue(startDate)}</p>
          </div>
          <div className="info-item">
            <p className="label">Fecha fin</p>
            <p>{formatvalue(endDate)}</p>
          </div>
          <div className="info-item">
            <p className="label">Folio</p>
            <p>{folio || "-"}</p>
          </div>
          <div className="info-item">
            <p className="label">Status</p>
            <p>{status || "-"}</p>
          </div>
        </div>
      </div>
      <div id="project-buttons" className="flex md:flex-row gap-0">
        <button className="info-button" onClick={handleInfoClick}>
          Información
        </button>
        {isEvaluator && (
          <button className="info-button" onClick={handleEvaluateClick}>
            Evaluar
          </button>
        )}
        { (status === "Aprobado" || status === "No aprobado") && (
          <button className="info-button" onClick={handleDictumClick}>
            Dictámen del proyecto
          </button>
        )}
      </div>
    </div>
  );
}