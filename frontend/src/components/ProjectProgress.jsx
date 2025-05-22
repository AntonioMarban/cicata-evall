import { useState, useEffect } from "react";
import "../styles/commentscommittee.css";
import ProjectHeader from "../components/ProjectHeader";
import { useNavigate } from "react-router-dom";
import { saveMultipleForms  } from "../db/index";

export default function ProjectProgress({ projectId }) {
     const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState([]);
    const [projectData, setProjectData] = useState(null);

    const fetchData = (url, setData) => {
    fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
    })
        .then(res => res.json())
        .then(data => {setData(data); console.log(data)})
        .catch(error => console.error("Error fetching data:", error));
    };    

    const navigateToForms = () => {
        saveMultipleForms(projectData)
        .then(result => {
            if (result.success) {
                console.log("Todos los formularios guardados:", result.results);
            } else {
                console.error("Error al guardar:", result.error);
            }
        });
        navigate('/Editar-proyecto');
    }
    useEffect(() => {
        fetchData(`${apiUrl}/researchers/projects/${projectId}/comments`, setComments);
        fetchData(`${apiUrl}/users/projects/${projectId}`, setProjectData);
        console.log(projectData)
    }, [projectId]);
    return (
    <main className="w-[100%] flex justify-center">
        <div className="w-[90%]">
            <div>
                <h2 className="font-semibold text-lg !mb-10">Comentarios</h2>
                {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className="!mb-10">
                    <p className="font-medium text-lg">{comment.committeeName}</p>
                    <p className="font-light">{comment.comments}</p>
                    </div>
                ))
                ) : (
                <p>No hay comentarios aún.</p>
                )}
            </div>

            <div className="footer-comments">
                <button onClick={navigateToForms} className="info-button">Realizar correcciones</button>
            </div>
        </div>
    </main>
    );
}