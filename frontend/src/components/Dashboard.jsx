function Card({ children }) {
  return <div className="p-4 flex flex-col shadow-md bg-white rounded-lg">{children}</div>;
}

function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}

function Dashboard({ projectCards }) {
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-6 overflow-hidden h-full">
      <h1 className="text-2xl font-bold mb-8">¡Bienvenida, Dra. Olmedo!</h1>

      {projectCards.length === 0 ? (
        <p className="text-gray-500">No hay proyectos activos disponibles.</p>
      ) : (
        <div className="grid gap-4 w-2/3 m-8">
          {projectCards.map((card, index) => (
            <Card key={index}>
              <CardContent>
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
export default Dashboard;
