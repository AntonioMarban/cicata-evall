import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";

export default function HomePage() {
  const [projectCards, setProjectCards] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem("userId");
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!userId || !apiUrl) {
        console.error("Missing userId or apiUrl");
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/researchers/${userId}/projects/active`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        // Transform data to the format expected by Dashboard component
        const formattedCards = data.map((project) => ({
          title: project.Proyecto,
          description: project.Investigador,
          folio: project.Folio,
          fecha: project.FechaInicio
        }));

        setProjectCards(formattedCards);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <main className="flex-1 overflow-y-auto p-6">
        <Dashboard projectCards={projectCards} />
      </main>
    </div>
  );
}
