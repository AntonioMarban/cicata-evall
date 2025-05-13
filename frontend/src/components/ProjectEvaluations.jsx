import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/projectevaluations.css";

import CommitteeDictumForm from "./CommitteeDictumForm";

function openDialogAddEvaluator() {
    // Aquí puedes implementar la lógica para abrir el modal
    console.log("Abrir modal para agregar evaluador");
}

export default function ProjectEvaluations({ projectId }) {

    const committeeId = Number(localStorage.getItem("committeeId"));
    const userId = Number(localStorage.getItem("userId"));

    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(true);
    const [evaluations, setEvaluations] = useState([]);
    const [isDictumFormLoaded, setIsDictumFormLoaded] = useState(false);

    const navigate = useNavigate();

    const fetchEvaluations = useCallback(async () => {
        try {
            if (!projectId) return;

            const response = await fetch(
                `${apiUrl}/committees/${committeeId}/secretaries/${userId}/evaluations/${projectId}`
            );

            const data = await response.json();
        if (Array.isArray(data)) {
            setEvaluations(data);
        } else {
            console.warn("La respuesta no es un array:", data);
        }
        } catch (error) {
        console.error("Error fetching evaluations:", error);
        } finally {
        setLoading(false);
        }
    }, [projectId, committeeId, userId, apiUrl]);

    useEffect(() => {
        fetchEvaluations();
    }, [fetchEvaluations]);

    if (loading) {
        return <main className="project-evaluations-main">Cargando evaluaciones...</main>;
    }

    const openDictumForm = () => {
        setIsDictumFormLoaded(true);
    };

    const handleDictumFormSubmit = () => {
        setIsDictumFormLoaded(false);
        alert("Dictamen enviado correctamente.");
        navigate("/Inicio");
    }
    

    return (
        <main className="project-evaluations-main">
    
          <div className="evaluation-section">
            <h2 className="subtitle">Evaluaciones</h2>

            <div className="evaluations-table">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Evaluador</th>
                        <th>Puntaje</th>
                        <th>Resultado de evaluación</th>
                        <th>Comentarios</th>
                    </tr>
                    </thead>
                    <tbody>
                    {evaluations.map((evaluation, index) => (
                        <tr key={index}>
                        <td>{evaluation.fullName}</td>
                        <td>{evaluation.score !== null ? evaluation.score : "—"}</td>
                        <td className={
                            evaluation.result === "Aprobado"
                                ? "result-approved"
                                : evaluation.result === "No aprobado"
                                ? "result-not-approved"
                                : ""
                            }>
                            {evaluation.result || "—"}
                        </td>
                        <td>{evaluation.comments || "—"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="dictumForm">
                {isDictumFormLoaded ? (
                    <CommitteeDictumForm projectId={projectId} onSubmit={handleDictumFormSubmit} />
                ) : (
                    <p>El formulario de dictamen no se ha cargado.</p>
                )}
            </div>

            {!isDictumFormLoaded && (
                <div className="evaluations-buttons">
                    <button
                        className=""
                        onClick={openDialogAddEvaluator}
                    >
                        Agregar evaluador
                    </button>
                    <button
                        className=""
                        onClick={openDictumForm}
                    >
                        Enviar dictamen de comité
                    </button>
                </div>
            )}

          </div>
        </main>
    );
}