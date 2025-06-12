import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";

const CommitteeDictumForm = ({ projectId, onSubmit }) => {
  const [committeeId, setCommitteeId] = useState(localStorage.getItem("committeeId"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const apiUrl = import.meta.env.VITE_API_URL;

  const [result, setResult] = useState("");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setCommitteeId(localStorage.getItem("committeeId"));
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const validateFields = () => {
    if (!result || !comments.trim()) {
      setError("Por favor completa todos los campos requeridos.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setIsModalOpen(true);
    }
  };

  const confirmSubmission = async () => {
    setIsSubmitting(true);
    setIsModalOpen(false);

    try {
      const response = await fetch(
        `${apiUrl}/committees/${committeeId}/secretaries/${userId}/evaluations/${projectId}/verdict`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ result, comments }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        console.warn("Unauthorized or Forbidden: Clearing session and redirecting.");
        localStorage.clear();
        window.location.href = "/";
        return;
      }

      if (!response.ok) {
        throw new Error("Error al enviar el dictamen.");
      }

      setSuccessMessage("Dictamen enviado correctamente.");
      if (onSubmit) onSubmit();
    } catch (err) {
      setError(err.message || "Hubo un error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="projectEvaluationForm" style={{ padding: "20px 0" }}>
      <h2 className="font-semibold text-2xl pb-4">
        Formulario de evaluación de comité
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col flex-1 min-w-[250px] max-w-[40%]">
          <label
            htmlFor="evaluationResult"
            className="text-xl font-medium text-[#6D7580]"
          >
            Resultado de la evaluación del comité{" "}
            <span className="text-[#FF4D4D] text-lg">*</span>
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
            <option value="Pendiente de aprobación">
              Pendiente de aprobación
            </option>
          </select>
        </div>

        <div className="flex flex-col mb-4 basis-1/3 min-w-[250px]">
          <label
            htmlFor="evaluationComments"
            className="text-xl font-medium text-[#6D7580]"
          >
            Comentarios de la evaluación del comité{" "}
            <span className="text-[#FF4D4D] text-lg">*</span>
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

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="max-w-[30vw] w-full rounded-xl bg-white p-6! shadow-xl">
            <DialogTitle className="text-xl font-bold mb-4!">Confirmar envío</DialogTitle>
            <div className="mb-4! text-gray-700 text-justify">
              ¿Estás seguro de que deseas enviar el dictamen con los datos ingresados?
            </div>

            <div className="mb-4! text-gray-700 text-justify">
              <span className="font-bold">Importante: </span>
              Una vez enviado esta evaluación de comité, deberás entregar un dictamen de evaluación físico a la subdirección del
              Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada - Unidad Morelos.
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#BBBBBA] text-white font-semibold rounded hover:bg-[#AAAAAC] cursor-pointer"
                style={{ padding: '10px 20px', width: '100%', maxWidth: '110px', textAlign: 'center' }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmSubmission}
                className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                style={{ padding: '10px 20px', width: '100%', maxWidth: '150px', textAlign: 'center' }}
              >
                Confirmar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default CommitteeDictumForm;
