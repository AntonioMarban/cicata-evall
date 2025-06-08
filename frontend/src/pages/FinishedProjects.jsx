import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";

export default function FinishedProjects() {
  const [projectCards, setProjectCards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const userId = localStorage.getItem("userId");
      const userType = localStorage.getItem("userType");
      const committeeId = localStorage.getItem("committeeId");
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!userId || !apiUrl || !userType) {
        console.error("Missing userId, userType, or apiUrl");
        return;
      }

      let endpoint = "";

      switch (parseInt(userType)) {
        case 1:
          endpoint = `/researchers/${userId}/projects/inactive`;
          break;
        case 2:
          endpoint = `/subdirectorade/projects/inactive`;
          break;
        case 3:
        case 4:
        case 5:
          if (!committeeId) {
            console.error("Missing committeeId for committee user");
            return;
          }
          endpoint = `/committees/${committeeId}/members/${userId}/projects`;
          break;
        default:
          console.error("Unsupported userType:", userType);
          return;
      }

      try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401 || response.status === 403) {
          console.warn(
            "Unauthorized or Forbidden: Clearing session and redirecting."
          );
          localStorage.clear();
          window.location.href = "/";
          return;
        }

        const data = await response.json();
        // Transform data to the format expected by Dashboard component
        const formattedCards = data.map((project) => ({
          projectId: project.projectId,
          title: project.title,
          investigador: project.fullName,
          startDate: project.startDate,
          endDate: project.endDate,
          folio: project.folio,
          status: project.status,
          notification: project.notification,
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
