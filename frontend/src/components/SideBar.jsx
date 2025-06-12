import { Home, FileBadge, LogOut, Users, ClipboardList, CircleHelp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CICATA from "../assets/cicatam.png";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={`w-full px-4 py-2 text-lg text-[#1591D1] hover:text-[#2C4A90] text-left break-words transition-all duration-200 transform hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const [userType] = useState(localStorage.getItem("userType"));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleHelp = () => {
    setIsModalOpen(true);
  }

  return (
    <>
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
          {(userType === "3" || userType === "4") && (
            <Link to="/EditarRubrica" className="w-full">
              <Button className="flex gap-2 items-center justify-start whitespace-normal">
                <ClipboardList /> Rúbrica de comité
              </Button>
            </Link>
          )}
        </nav>

        <div className="mb-10 w-full px-4">
          <Button
            className="flex gap-2 items-center justify-start whitespace-normal mb-4!"
            onClick={handleHelp}
          >
            <CircleHelp /> Ayuda
          </Button>
          <Button
            className="flex gap-2 justify-start whitespace-normal"
            onClick={handleLogout}
          >
            <LogOut /> Salir
          </Button>
        </div>
      </aside>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <DialogPanel className="max-w-[30vw] w-full rounded-xl bg-white p-6! shadow-xl">
            <DialogTitle className="text-xl font-bold mb-4!">Ayuda | CICATA Evall</DialogTitle>
            <p className="text-gray-800 mb-4! text-lg">
              Ingresa a 
              <a
                href={
                  userType === "1"
                    ? "https://www.youtube.com/playlist?list=PL2rVnEgTgMJ-L5VBNy50MYI-zmN0kVyKc"
                    : userType === "2"
                    ? "https://www.youtube.com/playlist?list=PL2rVnEgTgMJ_d4qbh3y1sRdhh3g_rGvFw"
                    : userType === "3" || userType === "4"
                    ? "https://www.youtube.com/playlist?list=PL2rVnEgTgMJ-L3TfiC3fv6G7r5nmNwTk5"
                    : userType === "5"
                    ? "https://www.youtube.com/playlist?list=PL2rVnEgTgMJ_UnzrxZJgKtO7xlYYHk6CR"
                    : "https://www.youtube.com/@CicataEvall"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"> este sitio </a>
              para obtener más información sobre cómo utilizar el sistema.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#BBBBBA] text-white font-semibold rounded hover:bg-[#AAAAAC] cursor-pointer"
                style={{ padding: '10px 20px', width: '100%', maxWidth: '110px', textAlign: 'center' }}
              >
                Cerrar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Sidebar;
