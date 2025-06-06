import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCards from "./DashboardCards";
import NOTIFICATION from "../assets/Notification.svg";
import formatvalue from "../hooks/formatValue"
const { Card, CardContent } = DashboardCards;

function formatFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  }).format(fecha);
}

function Dashboard({ projectCards }) {
  const [userFullName, setUserFullName] = useState("");
  const [userType, setUserType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const isFinalizados = window.location.pathname === "/ProyectosFinalizados";
  const cardsPerPage = 10;

  const totalPages = Math.ceil(projectCards.length / cardsPerPage);
  const paginatedCards = projectCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("userFullName") || "Usuario";
    const typeFromStorage = parseInt(localStorage.getItem("userType"), 10) || 1;
    setUserFullName(nameFromStorage);
    setUserType(typeFromStorage);
  }, []);

  const getTitleMessage = () => {
    if (isFinalizados) return "Estos son los proyectos finalizados";
    switch (userType) {
      case 1:
        return "Estos son los proyectos activos que tienes";
      case 5:
        return "Estos son los proyectos a evaluar";
      case 2:
        return "Estos son los proyectos activos en el sistema";
      default:
        return "Proyectos disponibles";
    }
  };

  const getEmptyMessage = () => {
    if (isFinalizados) return "No hay proyectos finalizados disponibles.";
    switch (userType) {
      case 1:
        return "No tienes proyectos activos disponibles.";
      case 5:
        return "No hay proyectos para evaluar.";
      case 2:
        return "No hay proyectos activos en el sistema.";
      default:
        return "No hay proyectos disponibles.";
    }
  };

  const renderPaginationControls = () => (
    <div className="pagination-controls">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Anterior
      </button>
      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Siguiente
      </button>
    </div>
  );

  return (
    <main className="dashboard-main">
      <div
        id="header"
        className="dashboard-header flex justify-between items-center"
      >
        <h1 className="dashboard-title">¡Hola, {userFullName}!</h1>
        {userType === 1 && !isFinalizados && (
          <button
            className="dashboard-button text-white rounded-lg cursor-pointer p-3! bg-[#5CB7E6] hover:bg-[#1591D1]"
            onClick={() => navigate("/CrearProyecto")}
          >
            + Crear proyecto
          </button>
        )}
      </div>

      {projectCards.length === 0 ? (
        <p className="empty-message">{getEmptyMessage()}</p>
      ) : (
        <div>
          <h2 className="dashboard-subtitle">{getTitleMessage()}</h2>
          <div className="card-grid">
            {paginatedCards.map((card, index) => (
              <Card
                key={index}
                onClick={() => {
                  const isCommitteeUser = [3, 4, 5].includes(
                    parseInt(userType)
                  );
                  const route = isCommitteeUser ? "/Acuerdo" : "/Proyecto";
                  navigate(route, { state: { projectId: card.projectId } });
                }}
              >
                <CardContent>
                  <div>
                    <div className="card-text">{card.title}</div>
                    <div className="card-text">{card.investigador}</div>
                  </div>
                  <div>
                    <div className="card-title">Fecha Inicio</div>
                    <div className="card-text">
                      {formatvalue(card.startDate)}
                    </div>
                  </div>
                  <div>
                    <div className="card-title">Fecha Fin</div>
                    <div className="card-text">{formatvalue(card.endDate)}</div>
                  </div>
                  <div>
                    <div className="card-title">Folio</div>
                    <div className="card-text">{card.folio}</div>
                  </div>
                  <div>
                    <div className="card-title">Status</div>
                    <div className="card-text">{card.status}</div>
                  </div>
                  {(userType === 1 &&
                    card.status === "Pendiente de aprobación") ||
                  (userType > 2 && card.status === "En revisión") ? (
                    <div className="show-notification">
                      <img src={NOTIFICATION} alt="Notification" />
                    </div>
                  ) : (
                    <div className="hide-notification">
                      <img src={NOTIFICATION} alt="Notification" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          {projectCards.length > cardsPerPage && renderPaginationControls()}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
