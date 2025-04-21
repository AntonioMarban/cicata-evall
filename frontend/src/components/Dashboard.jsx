import '../styles/dashboard.css';

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
  return (
    <main className="dashboard-main">
      <h1 className="dashboard-title">¡Bienvenida, Dra. Olmedo!</h1>

      {projectCards.length === 0 ? (
        <p className="empty-message">No hay proyectos activos disponibles.</p>
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
