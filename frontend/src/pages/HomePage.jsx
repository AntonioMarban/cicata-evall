import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";

export default function HomePage() {
  const [projectCards, setProjectCards] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [committeeId, setCommitteeId] = useState(
    localStorage.getItem("committeeId")
  );
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
      setUserType(localStorage.getItem("userType"));
      setCommitteeId(localStorage.getItem("committeeId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId || !apiUrl || !userType) {
        console.error("Missing userId, userType, or apiUrl");
        return;
      }

      let endpoint = "";

      switch (parseInt(userType)) {
        case 1:
          endpoint = `/researchers/${userId}/projects/active`;
          break;
        case 2:
          endpoint = `/subdirectorade/projects/active`;
          break;
        case 3:
          if (!committeeId) {
            console.error("Missing committeeId for committee user");
            return;
          }
          endpoint = `/committees/${committeeId}/secretaries/${userId}/evaluations`;
          break;
        case 4:
          if (!committeeId) {
            console.error("Missing committeeId for committee user");
            return;   
          }
          endpoint = `/committees/${committeeId}/secretaries/${userId}/evaluations`;
          break;
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
        const response = await fetch(`${apiUrl}${endpoint}`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
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
  }, [userId, userType, committeeId, apiUrl]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <main className="flex-1 overflow-y-auto p-6">
        <Dashboard projectCards={projectCards} />
      </main>
    </div>
  );
}
