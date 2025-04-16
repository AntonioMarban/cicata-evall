import Rubric from "../components/Rubric"
import { useState } from "react";

const EvaluateProject = () => {
    const committeeId = localStorage.getItem("committeeId")
    const memberId = localStorage.getItem("userId")

    const [totalScore, setTotalScore] = useState("")
    const [scoreError, setScoreError] = useState("")

    const handleScoreBlur = () => {
        const value = totalScore.trim().toUpperCase();
        const isValid = value === "N/A" || /^[0-9]+$/.test(value);
    
        if (!isValid) {
            setScoreError("El puntaje total debe ser un número o 'N/A'");
        } else {
            setScoreError("");
        }
    };


    return (
        <>
            <div id="rubricContainer" className='flex flex-col overflow-y-auto h-screen max-h-screen' style={{ padding: '5%' }}>
                <h1 className="text-4xl font-semibold">Rúbrica</h1>
                <p className="text-xl text-gray-600" style={{ padding: "20px 0" }}>Esta es la rúbrica visible para todos los integrantes de tu comité</p>

                <Rubric committeeId={committeeId} memberId={memberId} />

                <div id="projectEvaluationForm" style={{ padding: '20px 0' }}>
                    <h2 className="font-semibold text-2xl">Resultado de la evaluación</h2>

                    <div id="evaluationQuestions" className="flex flex-col gap-4 !mb-6">

                        <form action="projectEvaluation">
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
                                        <span className="text-gray-500 text-sm">Si no aplica, escribe "N/A"</span>
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
                                            style={{ padding: '15px' }}
                                        >
                                            <option value="" disabled selected>Selecciona una opción</option>
                                            <option value="approved">Aprobado</option>
                                            <option value="notApproved">No aprobado</option>
                                            <option value="pending">Pendiente de correcciones</option>
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
                                    required
                                ></textarea>
                            </div>

                        </form>

                    </div>
                </div>

                <div id="sendButton" className="flex flex-wrap justify-end">
                    <button
                        type="submit"
                        form="projectEvaluation"
                        className="bg-[#5CB7E6] text-white font-semibold rounded-lg hover:bg-[#1591D1] cursor-pointer"
                        style={{ padding: '15px 20px', width: '100%', maxWidth: '250px', textAlign: 'center' }}
                    >
                        Enviar evaluación
                    </button>
                </div>



            </div>
        </>
    )
}

export default EvaluateProject;