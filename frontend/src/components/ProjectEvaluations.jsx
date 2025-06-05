import { useEffect, useState, useCallback } from "react";
import { X } from 'lucide-react';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useNavigate } from "react-router-dom";
import "../styles/projectevaluations.css";

import CommitteeDictumForm from "./CommitteeDictumForm";

export default function ProjectEvaluations({ projectId }) {

    const committeeId = Number(localStorage.getItem("committeeId"));
    const userId = Number(localStorage.getItem("userId"));

    const apiUrl = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(true);
    const [evaluations, setEvaluations] = useState([]);
    const allEvaluationsCompleted = evaluations.every(evaluation => evaluation.result !== null);
    const [isDictumFormLoaded, setIsDictumFormLoaded] = useState(false);
    const [isAddEvaluatorOpen, setIsAddEvaluatorOpen] = useState(false);
    const [potentialEvaluators, setPotentialEvaluators] = useState([]);
    const [hasAvailableEvaluators, setHasAvailableEvaluators] = useState(false);

    const getNotEvaluators = useCallback(() => {
        return fetch(`${apiUrl}/committees/${committeeId}/secretaries/${userId}/evaluations/${projectId}/non-evaluators`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setPotentialEvaluators(data);
                    setHasAvailableEvaluators(true);
                } else {
                    console.warn("No hay miembros del comité disponibles para asignar como evaluadores.");
                    setPotentialEvaluators([]);
                    setHasAvailableEvaluators(false);
                }
            })
            .catch(error => {
                console.error("Error al cargar posibles evaluadores:", error);
                alert("Ocurrió un error al intentar cargar los evaluadores.");
                setHasAvailableEvaluators(false);
            });
    }, [apiUrl, committeeId, userId, projectId]);

    const openDialogAddEvaluator = async () => {
        setPotentialEvaluators([]);
        await getNotEvaluators();
        setIsAddEvaluatorOpen(true);
    };

    const closeDialogAddEvaluator = () => setIsAddEvaluatorOpen(false);

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

    const deleteEvaluator = async (evaluatorId) => {
        try {
            const response = await fetch(
                `${apiUrl}/committees/${committeeId}/secretaries/${userId}/evaluations/${projectId}/evaluators/${evaluatorId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            if (!response.ok) {
                throw new Error("No se pudo eliminar el evaluador.");
            }
            getNotEvaluators();
            fetchEvaluations();
        } catch (error) {
            console.error("Error al eliminar evaluador:", error);
            alert("Ocurrió un error al intentar eliminar el evaluador.");
        }
    };
                

    useEffect(() => {
        fetchEvaluations();
        getNotEvaluators();
    }, [fetchEvaluations, getNotEvaluators]);

    if (loading) {
        return <main className="project-evaluations-main">Cargando evaluaciones...</main>;
    }

    const openDictumForm = () => {
        if (evaluations.length === 0) {
            alert("No se puede enviar un dictamen de comité sin evaluaciones.");
            return;
        }
        setIsDictumFormLoaded(true);
    };

    const handleDictumFormSubmit = () => {
        setIsDictumFormLoaded(false);
        alert("Dictamen enviado correctamente.");
        navigate("/Inicio");
    }

    const addEvaluator = async (evaluatorId) => {
        try {
          const response = await fetch(
            `${apiUrl}/committees/${committeeId}/secretaries/${userId}/evaluations/${projectId}/evaluators`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ evaluatorId })
            }
          );
      
          if (!response.ok) {
            throw new Error("No se pudo agregar el evaluador.");
          }

          setIsAddEvaluatorOpen(false);
          fetchEvaluations();

        } catch (error) {
          console.error("Error al agregar evaluador:", error);
          alert("Ocurrió un error al intentar agregar el evaluador.");
        }
      };
    

    return (
        <main className="project-evaluations-main">
    
          <div className="evaluation-section">
            <h2 className="subtitle">Evaluaciones</h2>

            {evaluations.length > 0 ? (
                <div className="evaluations-table">
                    <table className="table">
                    <thead>
                        <tr>
                        <th className="w-[250px]">Evaluador</th>
                        <th className="w-[100px] text-center">Puntaje</th>
                        <th className="w-[150px] text-center">Resultado</th>
                        <th className="w-full">Comentarios</th>
                        <th className="w-[50px]"></th>
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
                                : "pending"
                            }>
                            {evaluation.result || "—"}
                            </td> 
                            {/* Add classname with taiwind to make the comments span multiple lines if too long to fit space */}
                            <td className="break-words">
                                {evaluation.comments || "—"}
                            </td>
                            <td className="relative group">
                                <button
                                    className="delete-button text-white rounded-lg p-1! bg-gray-400 hover:bg-gray-700 cursor-pointer"
                                    tooltip="Eliminar evaluación"
                                    onClick={() => deleteEvaluator(evaluation.userId)}
                                >
                                    < X />
                                </button>
                                <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-max px-2! py-1! text-xs bg-gray-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                    Quitar evaluador
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                ) : (
                <div className="no-evaluations-message">
                    <p className="text-gray-700">Este proyecto aún no tiene evaluaciones asignadas.</p>
                    <p className="text-gray-700">Por favor, agrega evaluadores para iniciar el proceso de evaluación.</p>
                </div>
            )}

            <div className="dictumForm">
                {isDictumFormLoaded ? (
                    <CommitteeDictumForm projectId={projectId} onSubmit={handleDictumFormSubmit} />
                ) : (
                    <></>
                )}
            </div>

            {!isDictumFormLoaded && (
                <div className="flex gap-4 justify-center text-white w-full">
                    <button
                        className={
                            `mt-5! px-5! py-3! rounded-lg transition-colors duration-200 
                            ${hasAvailableEvaluators
                                ? "bg-[#5CB7E6] hover:bg-[#1591D1] cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed"
                            }`
                        }
                        onClick={openDialogAddEvaluator}
                        disabled={!hasAvailableEvaluators}
                    >
                        Agregar evaluador
                    </button>
                    <button
                        className={`mt-5! px-5! py-3! rounded-lg transition-colors duration-200
                                    ${evaluations.length === 0 || !allEvaluationsCompleted
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[#5CB7E6] hover:bg-[#1591D1] cursor-pointer"
                                    }
                        `}
                        onClick={openDictumForm}
                        disabled={evaluations.length === 0 || !allEvaluationsCompleted}
                    >
                        Enviar dictamen de comité
                    </button>
                </div>
            )}

            <Dialog open={isAddEvaluatorOpen} onClose={closeDialogAddEvaluator} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="w-full max-w-xl rounded-xl bg-white p-10! shadow-xl">
                        <DialogTitle className="text-xl font-bold mb-4!">Agregar evaluador de proyecto</DialogTitle>

                        {potentialEvaluators.length > 0 ? (
                            <div className="overflow-x-auto">
                            <table className="min-w-full evaluators-table">
                                <thead>
                                <tr>
                                    <th className="text-left py-2! px-4!">Nombre</th>
                                    <th className="text-left py-2! px-4!">Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {potentialEvaluators.map((evaluator) => (
                                    <tr key={evaluator.userId} className="py-2! px-4!">
                                        <td className="py-2! px-4!" id="tdFullNameEvaluators">{evaluator.fullName}</td>
                                        <td className="py-2! px-4!">
                                            <button
                                            className="bg-[#5CB7E6] text-white px-3! py-1! rounded-lg hover:bg-[#1591D1]"
                                            onClick={() => addEvaluator(evaluator.userId)}
                                            >
                                            Agregar evaluador
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        ) : (
                            <p className="text-gray-600">No hay evaluadores disponibles.</p>
                        )}

                    </DialogPanel>
                </div>
            </Dialog>

          </div>
        </main>
    );
}