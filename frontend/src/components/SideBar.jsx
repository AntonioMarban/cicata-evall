import { Home, FileBadge, LogOut, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CICATA from "../assets/cicatam.png";
import { useEffect, useState } from "react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={`w-full px-4 py-2 text-lg text-[#1591D1] hover:text-[#2C4A90] text-left break-words ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/");
    window.location.reload(); // force reload to reflect changes
  };

  return (
    <aside
      className="fixed top-0 left-0 w-64 min-h-screen bg-white shadow-md flex flex-col items-center border-r border-gray-300 justify-between"
      style={{ padding: "20px 30px", zIndex: 50 }}
    >
      <div className="mt-6">
        <img src={CICATA} alt="Logo" className="w-full h-auto" />
      </div>

      <nav className="flex flex-col gap-6 w-full px-4 mt-10">
        <Link to="/Inicio" className="w-full">
          <Button className="flex gap-2 items-center justify-start whitespace-normal">
            <Home /> Inicio
          </Button>
        </Link>
        {(userType === "1" || userType === "2") && (
          <Link to="/ProyectosFinalizados" className="w-full">
            <Button className="flex gap-2 items-center justify-start whitespace-normal">
              <FileBadge /> Proyectos finalizados
            </Button>
          </Link>
        )}
        {(userType === "2" || userType === "3" || userType === "4") && (
          <Link to="/Cuentas" className="w-full">
            <Button className="flex gap-2 items-center justify-start whitespace-normal">
              <Users /> Cuentas
            </Button>
          </Link>
        )}
      </nav>

      <div className="mb-10 w-full px-4">
        <Button
          className="flex gap-2 justify-start whitespace-normal"
          onClick={handleLogout}
        >
          <LogOut /> Salir
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
