import { useState } from "react"; 
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

function NDAForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. `;

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Acuerdo de confidencialidad", 10, 10);
    doc.text(lorem, 10, 20);
    doc.save("acuerdo_de_confidencialidad.pdf");
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");
      navigate("/Inicio");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center overflow-y-auto h-screen max-h-screen">
      <div className="flex w-full max-w-4xl justify-between items-start mb-6">
        <h1 className="text-2xl m-">Acuerdo de confidencialidad</h1>
        <button
          onClick={handleDownload}
          className="bg-[#5CB7E6] text-white px-6 py-3 text-lg rounded hover:bg-[#4aa3d0]"
        >
          Descargar acuerdo
        </button>
      </div>

      <div className="grid gap-4 w-full max-w-4xl">
        <h2 className="text-xl text-[#5CB7E6]">Contenido</h2>
        <p className="text-gray-600">{lorem}</p>

        <div className="flex gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border border-[#E1E1E1] px-4 py-2 text-lg rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border border-[#E1E1E1] px-4 py-2 text-lg rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-[#5CB7E6] text-white px-6 py-3 text-lg rounded hover:bg-[#4aa3d0] w-auto"
        >
          Firmar acuerdo
        </button>
      </div>
    </main>
  );
}

export default NDAForm;
