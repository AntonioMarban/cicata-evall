import "../styles/projectheader.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectHeader({
  title,
  startDate,
  endDate,
  folio,
  status,
  projectId, // <- Asegúrate de pasar esto desde el componente padre
}) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserType(localStorage.getItem("userType"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX");
  };

  const handleInfoClick = () => {
    navigate(`/VerFormulario/${projectId}`);
  };

  return (
    <div className="project-header">
      <div className="project-info">
        <h1 className="project-title">{title || "Sin título"}</h1>
        <div className="info-grid">
          <div className="info-item">
            <p className="label">Fecha inicio</p>
            <p>{formatDate(startDate)}</p>
          </div>
          <div className="info-item">
            <p className="label">Fecha fin</p>
            <p>{formatDate(endDate)}</p>
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
      <div id="project-buttons" className="flex md:flex-row gap-3">
        <button className="info-button" onClick={handleInfoClick}>
          Información
        </button>
        {userType === "4" && <button className="info-button">Evaluar</button>}
      </div>
    </div>
  );
}
