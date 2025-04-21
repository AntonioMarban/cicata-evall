import { useState } from 'react';
import ManageAccountsData from '../components/manageAccounts/ManageAccountsData.jsx';
const userType = localStorage.getItem("userType");

const AccountTypeButton = ({ name, selectedName, onClick }) => {
  const isActive = selectedName === name;

  const handleClick = () => {
    onClick(name);
  };

  return (
    <button
      className={`bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer ${isActive ? 'bg-[#1591D1]' : ''}`}
      style={{ padding: '10px 20px', width: '100%', maxWidth: '300px', textAlign: 'center' }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

const ManageAccounts = () => {

  const [selectedPanel, setSelectedPanel] = useState(null);

  const handlePanelClick = (name) => {
    setSelectedPanel(prev => (prev === name ? null : name));
  };

  return (
    <>
      <div className='flex flex-col overflow-y-auto h-screen max-h-screen' style={{ padding: '5%' }}>
        <div id="manageAccountsHead" className="flex w-full max-w-4xl justify-between items-start flex-col mb-6">
          <h1 className="text-4xl font-semibold" style={{ padding: "0 0 10px 0" }}>Administrar cuentas</h1>
          <p className="text-gray-600 text-2xl">Tu panel de administración de cuentas del sistema:</p>
        </div>
        <div id="manageAccountsButtons" style={{ padding: '3% 0%' }}>
          <div className="flex flex-row items-center gap-10 mb-6 flex-wrap">
            {userType === "2" ? (
              <>
                <AccountTypeButton name="Administradores" selectedName={selectedPanel} onClick={handlePanelClick} />
                <AccountTypeButton name="Investigadores" selectedName={selectedPanel} onClick={handlePanelClick} />
                <AccountTypeButton name="Presidentes y secretarios" selectedName={selectedPanel} onClick={handlePanelClick} />
              </>
            ) : null}
            {userType === "3" || userType === "4" ? (
              <>
                <AccountTypeButton name="Comité Interno de Proyectos (CIP)" selectedName={selectedPanel} onClick={handlePanelClick} />
                <AccountTypeButton name="Comité de Ética en Investigación (CEI)" selectedName={selectedPanel} onClick={handlePanelClick} />
                <AccountTypeButton name="Comité de Bioseguridad (CB)" selectedName={selectedPanel} onClick={handlePanelClick} />
                <AccountTypeButton name="Comité de Investigación (CI)" selectedName={selectedPanel} onClick={handlePanelClick} />
                <AccountTypeButton name="Comité Interno para el Cuidado y Uso de los Animales de Laboratorio (CICUAL)" selectedName={selectedPanel} onClick={handlePanelClick} />
              </>
            ) : null}

          </div>
        </div>
        <ManageAccountsData accountTypeToManage={selectedPanel} />
      </div>
    </>
  )
}

export default ManageAccounts;
