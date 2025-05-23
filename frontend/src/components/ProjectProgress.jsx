import { useState, useEffect } from "react";
import "../styles/commentscommittee.css";
import ProjectHeader from "../components/ProjectHeader";
import { useNavigate } from "react-router-dom";
import { saveMultipleForms  } from "../db/index";

export default function ProjectProgress({ projectId }) {

    const [deliverables, setDeliverables] = useState({
        idF: 29,
        deliverables1: [
        {id:1, name:"Tesis (Alumnos titulados)"},
        {id:2, name:"Practicantes profesionales"},
        {id:3, name:"Alumnos PIFI"},
        {id:4, name:"Prestante del servicio social"},
        ],
        deliverables2: [
        {id:6, name:"Artículo de divulgación"},
        {id:7, name:"Congresos"},
        {id:8, name:"Cursos"},
        {id:9, name:"Libros"},
        {id:10, name:"Conferencias o ponencias"},
        {id:11, name:"Articulos cientifico"},
        {id:12, name:"Seminarios"},
        {id:13, name:"Manuales"},
        {id:14, name:"Programas de Radio y/o TV"},
        ],
        deliverables3: [
        {id:16, name:"Proceso"},
        {id:17, name:"Patente"},
        {id:18, name:"Hardware"},
        {id:19, name:"Prototipo"},
        {id:20, name:"Certificado de inversión"},
        {id:21, name:"Software"},
        ],
        extras1:[],
        extras2:[],
        extras3:[]
    });

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