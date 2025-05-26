import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCards from "./DashboardCards";
import NOTIFICATION from "../assets/Notification.svg"
const { Card, CardContent } = DashboardCards;

function formatFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  }).format(fecha);
}

function Dashboard({ projectCards }) {
  const [userFullName, setUserFullName] = useState("");
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("userFullName") || "Usuario";
    const typeFromStorage = parseInt(localStorage.getItem("userType"), 10) || 1;
    console.log(typeFromStorage)
    setUserFullName(nameFromStorage);
    setUserType(typeFromStorage);
  }, []);

  const isFinalizados = location.pathname === "/ProyectosFinalizados";

  const getTitleMessage = () => {
    if (isFinalizados) {
      return "Estos son los proyectos finalizados";
    }
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
    if (isFinalizados) {
      return "No hay proyectos finalizados disponibles.";
    }
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

  return (
    <main className="dashboard-main">
      <div id="header" className="dashboard-header flex justify-between items-center">
        <h1 className="dashboard-title">¡Hola, {userFullName}!</h1>
        { userType === 1 && (
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
            {projectCards.map((card, index) => (
              <Card
                key={index}
                onClick={() => {
                  const isCommitteeUser = [3, 4, 5].includes(
                    parseInt(userType)
                  );
                  const url = isCommitteeUser
                    ? `/Acuerdo?projectId=${card.projectId}`
                    : `/Proyecto?projectId=${card.projectId}`;
                  navigate(url);
                }}
              >
                <CardContent>
                  {userType > 1 && (
                    <div className={card.notification === 1 ? 'show-notification' : 'hide-notification'}>
                      <img src={NOTIFICATION} alt="Notification" />
                    </div>
                  )}
                  {userType === 0  && (
                    <div className={card.notification === 0 ? 'show-notification' : 'hide-notification'}>
                    <img src={NOTIFICATION} alt="Notification" />
                    </div>
                  )}
                  <div>
                    <div className="card-text">{card.title}</div>
                    <div className="card-text">{card.investigador}</div>
                  </div>
                  <div>
                    <div className="card-title">Fecha Inicio</div>
                    <div className="card-text">{formatFecha(card.startDate)}</div>
                  </div>
                  <div>
                    <div className="card-title">Fecha Fin</div>
                    <div className="card-text">{formatFecha(card.endDate)}</div>
                  </div>
                  <div>
                    <div className="card-title">Folio</div>
                    <div className="card-text">{card.folio}</div>
                  </div>
                  <div>
                    <div className="card-title">Status</div>
                    <div className="card-text">{card.status}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
