import { useState } from "react";

const CommitteeDictumForm = ({ projectId, onSubmit }) => {
    const committeeId = localStorage.getItem("committeeId")
    const userId = localStorage.getItem("userId")
    const apiUrl = import.meta.env.VITE_API_URL;

    const [result, setResult] = useState("");
    const [comments, setComments] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación simple
        if (!result || !comments.trim()) {
          setError("Por favor completa todos los campos requeridos.");
          return;
        }
    
        setError("");
        setIsSubmitting(true);
    
        try {
          const response = await fetch(
            `${apiUrl}/committees/${committeeId}/secretaries/${userId}/evaluations/${projectId}/verdict`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                result,
                comments,
              }),
            }
          );
    
          if (!response.ok) {
            throw new Error("Error al enviar el dictamen.");
          }
    
          setSuccessMessage("Dictamen enviado correctamente.");
          if (onSubmit) onSubmit(); // Notifica al padre si se necesita recargar o cerrar
    
        } catch (err) {
          setError(err.message || "Hubo un error inesperado.");
        } finally {
          setIsSubmitting(false);
        }
    };

    return (
    <div id="projectEvaluationForm" style={{ padding: "20px 0" }}>
        <h2 className="font-semibold text-2xl pb-4">Formulario de evaluación de comité</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col flex-1 min-w-[250px] max-w-[40%]">
            <label htmlFor="evaluationResult" className="text-xl font-medium text-[#6D7580]">
            Resultado de la evaluación del comité <span className="text-[#FF4D4D] text-lg">*</span>
            </label>
            <select
            id="evaluationResult"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="border border-gray-300 rounded-lg w-full text-[#6D7580]"
            style={{ padding: "15px" }}
            required
            >
            <option value="">Selecciona una opción</option>
            <option value="Aprobado">Aprobado</option>
            <option value="No aprobado">No aprobado</option>
            <option value="Pendiente de correcciones">Pendiente de correcciones</option>
            </select>
        </div>

        <div className="flex flex-col mb-4 basis-1/3 min-w-[250px]">
            <label htmlFor="evaluationComments" className="text-xl font-medium text-[#6D7580]">
            Comentarios de la evaluación del comité <span className="text-[#FF4D4D] text-lg">*</span>
            </label>
            <textarea
            id="evaluationComments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="border border-gray-300 rounded-lg w-full text-[#6D7580]"
            style={{ padding: "15px" }}
            placeholder="Comentarios de la evaluación"
            required
            ></textarea>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}

        <div className="flex justify-end">
            <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#5CB7E6] text-white font-semibold rounded-lg hover:bg-[#1591D1] cursor-pointer"
            style={{
                padding: "15px 20px",
                width: "100%",
                maxWidth: "250px",
                textAlign: "center",
                opacity: isSubmitting ? 0.6 : 1,
            }}
            >
            {isSubmitting ? "Enviando..." : "Enviar evaluación"}
            </button>
        </div>
        </form>
    </div>
    );
};

export default CommitteeDictumForm;