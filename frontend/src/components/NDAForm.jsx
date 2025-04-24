import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import "../styles/ndaform.css";

function NDAForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreementData, setAgreementData] = useState(null); 
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAgreement = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/6/projects/1/agreement`);
        const data = await response.json();
        if (data.length > 0) {
          setAgreementData(data[0]);
        }
      } catch (error) {
        console.error("Error al obtener el acuerdo:", error);
      }
    };

    fetchAgreement();
  }, [userId]);

  const agreementText = agreementData ? `
Dr. Paul Mondragón Terán
Encargado de la Dirección
Centro de Investigación en Ciencia Aplicada y Tecnología Avanzada (CICATA) Unidad Morelos

PRESENTE

En mi calidad de Evaluador del proyecto titulado ${agreementData.title}, dirigido por ${agreementData.researcher} y que se lleva a cabo total o parcialmente dentro de las instalaciones del CICATA Unidad Morelos del Instituto Politécnico Nacional, me comprometo a cumplir con los siguientes compromisos:

1. **Confidencialidad:** Trataré toda la información proporcionada como estrictamente confidencial. Esta obligación incluye, pero no se limita a, datos, documentos, resultados preliminares y cualquier otra información relacionada con el proyecto que no esté destinada a ser divulgada públicamente.

2. **Uso Exclusivo:** Utilizaré la información confidencial exclusivamente para los fines establecidos en el ámbito de mi participación en el proyecto. Esto incluye la evaluación, análisis o revisión de los datos en el contexto del proyecto.

3. **Protección de la Información:** Garantizaré la protección de la información confidencial tanto en México como en el extranjero. Implementaré medidas adecuadas para prevenir la divulgación no autorizada, el acceso indebido o la pérdida de dicha información.

4. **Prohibición de Divulgación:** No divulgaré a terceros, por ningún medio, ni las actividades de investigación ni los resultados del proyecto sin contar con la autorización previa y por escrito del Investigador Principal del proyecto. Esto incluye, pero no se limita a, la divulgación en publicaciones, presentaciones, conferencias, comunicación verbal o medios electrónicos.

5. **Responsabilidad Legal:** Reconozco que el incumplimiento de estas obligaciones puede resultar en consecuencias legales y disciplinarias del Instituto Politécnico Nacional o según la normativa vigente aplicable. Estoy consciente de que la violación de la confidencialidad puede implicar responsabilidades legales tanto civiles como penales.

6. **Devolución de Información:** Al finalizar mi participación en el proyecto, devolveré o destruiré toda la información confidencial que me haya sido proporcionada con el fin de no preservar ninguna información relacionada con respecto al proyecto de investigación que me fue asignado para evaluación.

7. **Cumplimiento de Normativas:** Me comprometo a cumplir con todas las políticas y procedimientos de confidencialidad establecidos por el CICATA Unidad Morelos, Instituto Politécnico Nacional, así como con cualquier normativa aplicable relacionada con la protección de la información y la propiedad intelectual.

En caso de incumplimiento de los compromisos aquí descritos, otorgo mi consentimiento para que se apliquen las medidas legales y disciplinarias pertinentes conforme a la normativa aplicable.

ATENTAMENTE, 
` : "Cargando acuerdo...";


  // Función para descargar el PDF
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
  
    // Divide el texto en líneas que quepan en el ancho del documento
    const lines = doc.splitTextToSize(agreementText, 190); // 190 mm de ancho considerando márgenes
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
  

  // Función para enviar el formulario
  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");
      navigate("/Inicio");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render
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
