import '../styles/dashboard.css';
import { useEffect, useState } from 'react';

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

function formatFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false
  }).format(fecha);
}

function Dashboard({ projectCards }) {
  const [userFullName, setUserFullName] = useState('');
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const nameFromStorage = localStorage.getItem('userFullName') || 'Usuario';
    const typeFromStorage = parseInt(localStorage.getItem('userType'), 10) || 1; // Default to 1 if not found
    setUserFullName(nameFromStorage);
    setUserType(typeFromStorage);
  }, []);

  const getTitleMessage = () => {
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
      <h1 className="dashboard-title">¡Hola, {userFullName}!</h1>
      <h2 className="dashboard-subtitle">{getTitleMessage()}</h2>

      {projectCards.length === 0 ? (
        <p className="empty-message">{getEmptyMessage()}</p>
      ) : (
        <div className="card-grid">
          {projectCards.map((card, index) => (
            <Card key={index}>
              <CardContent>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.description}</p>
                <p className="card-text">{formatFecha(card.fecha)}</p>
                <p className="card-text">{card.folio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
