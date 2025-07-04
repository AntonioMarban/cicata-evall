import { useNavigate } from "react-router-dom";
import Rubric from "../components/Rubric"
import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const EvaluateProjectForm = ({ projectId }) => {

    const [committeeId, setCommitteeId] = useState(localStorage.getItem("committeeId"))
    const [memberId, setMemberId] = useState(localStorage.getItem("userId"))
    const [userType, setUserType] = useState(localStorage.getItem("userType"))
    const [totalScore, setTotalScore] = useState("")
    const [evaluationResult, setEvaluationResult] = useState("")
    const [evaluationComments, setEvaluationComments] = useState("")
    const [scoreError, setScoreError] = useState("")

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setCommitteeId(localStorage.getItem("committeeId"));
            setMemberId(localStorage.getItem("userId"));
            setUserType(localStorage.getItem("userType"));
            if (!localStorage.getItem("userId") || localStorage.getItem("userType") === "3" || localStorage.getItem("userType") === "4" || localStorage.getItem("userType") === "5") {
                console.error("Tipo de usuario no autorizado. Redirigiendo a /Inicio.");
                navigate("/Inicio");
            };
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [navigate]);

    const handleScoreBlur = () => {
        const value = totalScore.trim().toUpperCase();
        const isValid = value === "N/A" || /^\d+(\.\d{1,2})?$/.test(value);
    
        if (!isValid) {
            setScoreError("El puntaje total debe ser un número válido o 'N/A'");
        } else {
            setScoreError("");
        }
    };

    

    const handleSubmit = async () => {

        const payload = {
            score: (
                totalScore === "N/A" ||
                totalScore === "n/a" ||
                totalScore === "n/A" ||
                totalScore === "N/a"
            ) ? null : totalScore,
            results: evaluationResult,
            comments: evaluationComments,
        };

        try {
            const response = await fetch(
                `${apiUrl}/committees/${committeeId}/members/${memberId}/projects/${projectId}/evaluations`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (response.status === 401 || response.status === 403) {
                console.warn("Unauthorized or Forbidden: Clearing session and redirecting.");
                localStorage.clear();
                window.location.href = '/';
                return;
            }

            if (!response.ok) {
                throw new Error("Error al enviar la evaluación");
            } else {
                if (userType === "5") {
                    navigate("/Inicio");
                } else {
                    navigate('/Proyecto', { state: { projectId: projectId } });
                }
            }
        } catch (error) {
            console.error("Error al enviar la evaluación:", error);
        }
    }


    return (
        <>
            <div className='flex flex-col overflow-y-auto h-screen max-h-screen px-3!'>
                <h1 className="text-4xl font-semibold">Rúbrica</h1>
                <p className="text-xl text-gray-600 py-4!">
                    Utiliza esta rúbrica para evaluar el proyecto
                </p>

                <Rubric committeeId={committeeId} memberId={memberId} />

                <div id="projectEvaluationForm" style={{ padding: '20px 0' }}>
                    <h2 className="font-semibold text-2xl">Resultado de la evaluación</h2>

                    <div id="evaluationQuestions" className="flex flex-col gap-4 !mb-6">

                        <form
                            action="projectEvaluation" 
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!totalScore || !evaluationResult || !evaluationComments) {
                                    alert("Por favor, completa todos los campos obligatorios.");
                                    return;
                                }
                                if (scoreError) {
                                    alert("Por favor, corrige el error en el puntaje total.");
                                    return;
                                }
                                setShowConfirmModal(true);
                            }}
                        
                        >
                            <div id="topContainer" className="flex flex-row items-center !mb-6 flex-wrap justify-between">
                                <div
                                    id="topTwoQuestions"
                                    className="flex flex-row flex-wrap gap-6 w-full justify-between"
                                    style={{ margin: '1% 0' }}
                                >
                                    <div className="flex flex-col flex-1 min-w-[250px] max-w-[40%]">
                                        <label htmlFor="totalScore" className="text-xl font-medium text-[#6D7580]">
                                            Puntaje total <span className="text-[#FF4D4D] text-lg">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="totalScore"
                                            className="border border-gray-300 rounded-lg w-full text-[#6D7580]"
                                            style={{ padding: '15px' }}
                                            value={totalScore}
                                            onChange={(e) => setTotalScore(e.target.value)}
                                            onBlur={handleScoreBlur}
                                            placeholder="Puntaje total"
                                            required
                                        />
                                        <span className="text-gray-500 text-sm">Si no aplica, escribe "N/A".</span>
                                        {scoreError && <span className="text-red-500 text-sm">{scoreError}</span>}
                                    </div>

                                    <div className="flex flex-col flex-1 min-w-[250px] max-w-[40%]">
                                        <label htmlFor="evaluationResult" className="text-xl font-medium text-[#6D7580]">
                                            Resultado de la evaluación <span className="text-[#FF4D4D] text-lg">*</span>
                                        </label>
                                        <select
                                            name="evaluationResult"
                                            id="evaluationResult"
                                            className="border border-gray-300 rounded-lg w-full text-[#6D7580]"
                                            onChange={(e) => setEvaluationResult(e.target.value)}
                                            required
                                            value={evaluationResult}
                                            placeholder="Resultado de la evaluación"
                                            style={{ padding: '15px' }}
                                        >
                                            <option value="" disabled selected>Selecciona una opción</option>
                                            <option value="Aprobado">Aprobado</option>
                                            <option value="No aprobado">No aprobado</option>
                                            <option value="Pendiente de aprobación">Pendiente de aprobación</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div id="evaluationComments" className="flex flex-col mb-4 basis-1/3 min-w-[250px]">
                                <label htmlFor="evaluationComments" className="text-xl font-medium text-[#6D7580]">
                                    Comentarios de la evaluación <span className="text-[#FF4D4D] text-lg">*</span>
                                </label>
                                <textarea
                                    id="evaluationComments"
                                    className="border border-gray-300 rounded-lg w-full text-[#6D7580]"
                                    style={{ padding: '15px' }}
                                    placeholder="Comentarios de la evaluación"
                                    value={evaluationComments}
                                    onChange={(e) => setEvaluationComments(e.target.value)}
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            <div id="sendButton" className="flex flex-wrap justify-end pt-10!">
                                <button
                                type="submit"
                                className="bg-[#5CB7E6] text-white font-semibold rounded-lg hover:bg-[#1591D1] cursor-pointer"
                                style={{ padding: '15px 20px', width: '100%', maxWidth: '250px', textAlign: 'center' }}
                                >
                                Enviar evaluación
                                </button>
                            </div>

                        </form>

                    </div>
                </div>

                {showConfirmModal && (
                    <Dialog open={showConfirmModal} onClose={() => setShowConfirmModal(false)} className="relative z-50">
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <DialogPanel className="max-w-md w-full rounded-xl bg-white p-6! shadow-xl">
                                <DialogTitle className="text-xl font-bold mb-4!">Confirmar evaluación</DialogTitle>

                                <div className="mb-4!">
                                ¿Estás seguro de que quieres enviar esta evaluación? <br />
                                Una vez enviada, no podrás modificarla.
                                </div>

                                <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="bg-[#BBBBBA] text-white font-semibold rounded hover:bg-[#AAAAAC] cursor-pointer"
                                    style={{ padding: '10px 20px', width: '100%', maxWidth: '110px', textAlign: 'center' }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                    setShowConfirmModal(false);
                                    handleSubmit();
                                    }}
                                    className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                                    style={{ padding: '10px 20px', width: '100%', maxWidth: '180px', textAlign: 'center' }}
                                >
                                    Confirmar envío
                                </button>
                                </div>
                            </DialogPanel>
                            </div>
                        </Dialog>
                    )}
            </div>
        </>
    )
}

export default EvaluateProjectForm;