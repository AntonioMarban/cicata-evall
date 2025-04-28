import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ndaform.css";

function NDAForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreementData, setAgreementData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get("projectId");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userType = Number(localStorage.getItem("userType"));

    
    if (!userId || userId === "undefined" || userId === "null") {
      console.error("userId no válido. Redirigiendo a /Inicio.");
      navigate("/Inicio");
      return;
    }
    
    if (!projectId) {
      console.error("No hay projectId. Redirigiendo a /Inicio.");
      navigate("/Inicio");
      return;
    }
    
    if (userType === 1 || userType === 2) {
      navigate(`/Proyecto?projectId=${projectId}`);
    }
    
    const fetchAgreement = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/${userId}/projects/${projectId}/agreement`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el acuerdo");
        }
        const data = await response.json();
        if (data.length > 0) {
          const agreement = data[0];
          setAgreementData(agreement);
          
          if (agreement.agreed === 1) {
            navigate(`/Proyecto?projectId=${projectId}`);
          }
        }
      } catch (error) {
        console.error("Error al obtener el acuerdo:", error);
      }
    };

    fetchAgreement();
  }, [projectId, navigate, apiUrl]);

  const agreementText = agreementData
    ? `
Dr. Paul Mondragón Terán
Encargado de la Dirección
Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada (CICATA) Unidad Morelos

PRESENTE

En mi calidad de Evaluador del proyecto titulado ${agreementData.title}, dirigido por ${agreementData.researcher} ...
`
    : "Cargando acuerdo...";

  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const lineHeight = 7;
    let y = margin + 10;

    doc.setFontSize(14);
    doc.text("Acuerdo de confidencialidad", margin, y);
    y += 10;

    doc.setFontSize(11);
    const lines = doc.splitTextToSize(agreementText, 190);
    lines.forEach((line) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });

    doc.save("acuerdo_de_confidencialidad.pdf");
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId || !projectId) {
      setError("Información de usuario incompleta. Intenta iniciar sesión nuevamente.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${apiUrl}/users/${userId}/projects/${projectId}/agreement`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            email: email,
            password: password,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Error al firmar el acuerdo.");
      }

      navigate("/Inicio"); // o a donde prefieras llevar al usuario después de firmar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="nda-main">
      <div className="nda-header">
        <h1 className="nda-title">Acuerdo de confidencialidad</h1>
        <button onClick={handleDownload} className="nda-button-download">
          Descargar acuerdo
        </button>
      </div>

      <div className="nda-grid">
        <h2 className="nda-subtitle">Contenido</h2>
        <p className="nda-text">{agreementText}</p>

        <div className="nda-input-group">
          <input
            type="email"
            required
            placeholder="Correo electrónico"
            className="nda-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            className="nda-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="nda-error">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`nda-button-submit ${loading ? "disabled" : ""}`}
        >
          {loading ? "Firmando..." : "Firmar acuerdo"}
        </button>
      </div>
    </main>
  );
}

export default NDAForm;
