import { useState } from 'react';

const AccountTypeButton = ({ name, selectedName, onClick }) => {
  const isActive = selectedName === name;

  const handleClick = () => {
    onClick(name);
  };

  return (
    <button
      className={`bg-[#5CB7E6] text-white font-semibold rounded ${isActive ? 'bg-[#1591D1]' : ''}`}
      style={{ padding: '10px 20px', width: '100%', maxWidth: '300px', textAlign: 'center' }}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

const AdministradoresPanel = () => <div className="p-4 border rounded shadow">👨‍💼 Gestión de Administradores</div>;
const InvestigadoresPanel = () => <div className="p-4 border rounded shadow">🔬 Gestión de Investigadores</div>;
const PresidentesPanel = () => <div className="p-4 border rounded shadow">📋 Gestión de Presidentes y Secretarios</div>;

const ManageAccounts = () => {

  const [selectedPanel, setSelectedPanel] = useState(null);

  const rederedPanel = () => {
    switch (selectedPanel) {
      case 'Administradores':
        return <AdministradoresPanel />;
      case 'Investigadores':
        return <InvestigadoresPanel />;
      case 'Presidentes y secretarios':
        return <PresidentesPanel />;
      default:
        return null;
    }
  }

  const handlePanelClick = (name) => {
    setSelectedPanel(prev => (prev === name ? null : name));
  };

  return (
    <>
      <div className='flex flex-col overflow-y-auto h-screen max-h-screen' style={{ padding: '5%' }}>
        <div id="manageAccountsHead" className="flex w-full max-w-4xl justify-between items-start flex-col mb-6">
          <h1 className="text-3xl font-semibold">Administrar cuentas</h1>
          <p className="text-gray-600">Tu panel de administración de cuentas del sistema:</p>
        </div>
        <div id="manageAccountsButtons" style={{ padding: '3% 0%'}}>
          <div className="flex flex-row items-center gap-10 mb-6 flex-wrap">
            <AccountTypeButton
              name="Administradores"
              selectedName={selectedPanel}
              onClick={handlePanelClick} />
              <AccountTypeButton name="Investigadores" selectedName={selectedPanel} onClick={handlePanelClick} />
              <AccountTypeButton name="Presidentes y secretarios" selectedName={selectedPanel} onClick={handlePanelClick} />
          </div>
        </div>
        {rederedPanel()}
      </div>
    </>
  )
}

export default ManageAccounts;
