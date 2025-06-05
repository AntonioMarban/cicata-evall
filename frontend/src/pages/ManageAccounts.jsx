import { useEffect, useState } from "react";
import ManageAccountsData from "../components/manageAccounts/ManageAccountsData.jsx";

const committees = {
  1: "Comité Interno de Proyectos (CIP)",
  2: "Comité de Ética en Investigación (CEI)",
  3: "Comité de Bioseguridad (CB)",
  4: "Comité de Investigación (CI)",
  5: "Comité Interno para el Cuidado y Uso de los Animales de Laboratorio (CICUAL)",
};

const AccountTypeButton = ({ name, selectedName, onClick }) => {
  const isActive = selectedName === name;

  const handleClick = () => {
    onClick(name);
  };

  return (
    <button
      className={`bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer ${
        isActive ? "bg-[#1591D1]" : ""
      }`}
      style={{
        padding: "10px 20px",
        textAlign: "center",
        margin: "0px",
        whiteSpace: "nowrap",
        minWidth: "250px",
      }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

const ManageAccounts = () => {
  const [selectedPanel, setSelectedPanel] = useState(null);

  const [userType, setUserType] = useState(
    parseInt(localStorage.getItem("userType"))
  );
  const [committeeId, setCommitteeId] = useState(
    parseInt(localStorage.getItem("committeeId"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUserType(parseInt(localStorage.getItem("userType")));
      setCommitteeId(parseInt(localStorage.getItem("committeeId")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handlePanelClick = (name) => {
    setSelectedPanel((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    if (userType === 3 && committeeId && committees[committeeId]) {
      setSelectedPanel(committees[committeeId]);
    }
  }, [userType, committeeId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ padding: "5%" }}>
      <div
        id="manageAccountsHead"
        className="flex w-full max-w-4xl justify-between items-start flex-col mb-6"
      >
        <h1
          className="text-2xl font-semibold"
          style={{ padding: "0 0 10px 0" }}
        >
          Administrar cuentas
        </h1>
        <p className="text-gray-600 text-xl mb-2! font-medium">
          Tu panel de administración de cuentas del sistema:
        </p>
      </div>

      {/* Botones solo para el usuario administrador */}
      {userType === 2 && (
        <div id="manageAccountsButtons" style={{ padding: "3% 0%" }}>
          <div className="flex flex-row flex-wrap gap-4 m-0!">
            <AccountTypeButton
              name="Administradores"
              selectedName={selectedPanel}
              onClick={handlePanelClick}
            />
            <AccountTypeButton
              name="Investigadores"
              selectedName={selectedPanel}
              onClick={handlePanelClick}
            />
            <AccountTypeButton
              name="Presidentes de comité"
              selectedName={selectedPanel}
              onClick={handlePanelClick}
            />
            <AccountTypeButton
              name="Secretarios de comité"
              selectedName={selectedPanel}
              onClick={handlePanelClick}
            />
          </div>
        </div>
      )}

      {/* La tabla se muestra con base en selectedPanel */}
      <ManageAccountsData accountTypeToManage={selectedPanel} />
    </div>
  );
};

export default ManageAccounts;
