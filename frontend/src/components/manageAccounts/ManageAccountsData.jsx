const dataToShow = {
    "Investigadores": {
        title: "Investigadores",
        subtitle: "Gestión de usuarios investigadores",
        role: "investigador"
    },
    "Administradores": {
        title: "Administradores",
        subtitle: "Gestión de usuarios administradores",
        role: "administrador"
    },
    "Presidentes y secretarios": {
        title: "Presidentes y secretarios",
        subtitle: "Gestión de usuarios presidentes y secretarios de comité de evaluación",
        role: "presidente o secretario"
    },
    "Comité Interno de Proyectos (CIP)": {
        title: "Comité Interno de Proyectos (CIP)",
        subtitle: "Gestión de usuarios del Comité Interno de Proyectos (CIP)",
        role: "miembro"
    },
    "Comité de Ética en Investigación (CEI)": {
        title: "Comité de Ética en Investigación (CEI)",
        subtitle: "Gestión de usuarios del Comité de Ética en Investigación (CEI)",
        role: "miembro"
    },
    "Comité de Bioseguridad (CB)": {
        title: "Comité de Bioseguridad (CB)",
        subtitle: "Gestión de usuarios del Comité de Bioseguridad (CB)",
        role: "miembro"
    },
    "Comité de Investigación (CI)": {
        title: "Comité de Investigación (CI)",
        subtitle: "Gestión de usuarios del Comité de Investigación (CI)",
        role: "miembro"
    },
    "Comité Interno para el Cuidado y Uso de los Animales de Laboratorio (CICUAL)": {
        title: "Comité Interno para el Cuidado y Uso de los Animales de Laboratorio (CICUAL)",
        subtitle: "Gestión de usuarios del Comité Interno para el Cuidado y Uso de los Animales de Laboratorio (CICUAL)",
        role: "miembro"
    }
}

const ManageAccountsData = ({ accountTypeToManage }) => {

    const { title, subtitle, role } = dataToShow[accountTypeToManage] || {
        title: "Tipo no reconocido",
        subtitle: "No hay información disponible para este tipo de cuenta.",
        role: "desconocido"
    };

    return (

        <>
            {accountTypeToManage && (
                <>
                    <div id="accountsToManageTitle" className="flex flex-col overflow-y-auto h-screen max-h-screen">
                        <h2 className="text-xl font-bold mb-2">{title}</h2>
                        <p className="text-gray-600 mb-4">{subtitle}</p>
                    </div>
                    <div id="accountsToManageDT">
                        tabla
                    </div>
                    {accountTypeToManage !== "Presidentes y secretarios" && (
                        <div id="accountsToManageButtons" className="flex flex-row items-center gap-10 mb-6 flex-wrap">
                            <button
                                className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                                style={{ padding: '10px 20px', width: '100%', maxWidth: '300px', textAlign: 'center' }}
                            >
                                Agregar {role} +
                            </button>
                        </div>
                    )}
                </>
            )}

            {accountTypeToManage === null && (
                <div className="flex flex-col overflow-y-auto h-screen max-h-screen">
                    <h2 className="text-xl font-semibold mb-2">Selecciona un tipo de cuenta para gestionar</h2>
                </div>
            )}
        </>
    );
};

export default ManageAccountsData;
