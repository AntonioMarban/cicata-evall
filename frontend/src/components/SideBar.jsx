import { Home, FileBadge, LogOut, Users } from "lucide-react";
import { Link } from "react-router-dom";
import CICATA from "../assets/cicatam.png";

const userType = localStorage.getItem("userType");

function Button({ children, className, ...props }) {
  return (
    <button className={`w-full px-4 py-2 text-lg text-[#1591D1] hover:text-[#2C4A90] text-left break-words ${className}`} {...props}>
      {children}
    </button>
  );
}

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col items-center border-r border-gray-300 h-full justify-between h-screen" style={{ padding: "20px 30px" }}>
      <div className="mt-6">
        <img src={CICATA} alt="Logo" className="w-100 h-auto" />
      </div>

      <nav className="flex flex-col gap-6 w-full px-4">
        <Link to="/Inicio" className="w-full">
          <Button className="flex gap-2 items-center justify-start whitespace-normal">
            <Home /> Inicio
          </Button>
        </Link>
        {userType === "1" || userType === "2" ? (
          <Link to="/ProyectosFinalizados" className="w-full">
            <Button className="flex gap-2 items-center justify-start whitespace-normal">
              <FileBadge /> Proyectos finalizados
            </Button>
          </Link>
        ) : null}
        {userType === "2" || userType === "3" || userType === "4" ? (
          <Link to="/Cuentas" className="w-full">
            <Button className="flex gap-2 items-center justify-start whitespace-normal">
              <Users /> Cuentas
            </Button>
          </Link>
        ) : null}
      </nav>
      <br />
      <br />
      <div>
        <Link to="/" className="w-full">
          <Button className="flex gap-2 justify-start whitespace-normal">
            <LogOut /> Salir
          </Button>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
