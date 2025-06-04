import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountTables from "./AccountTables";

const dataToShow = {
    "Investigadores": {
        title: "Investigadores",
        subtitle: "Gestión de usuarios investigadores",
        role: "investigador",
        userType_id: 1,
    },
    "Administradores": {
        title: "Administradores",
        subtitle: "Gestión de usuarios administradores",
        role: "administrador",
        userType_id: 2,
    },
    "Presidentes de comité": {
        title: "Presidentes de comité",
        subtitle: "Gestión de usuarios presidentes de comité de evaluación",
        role: "presidente",
        userType_id: 3,
        showCommittee: true,
    },
    "Secretarios de comité": {
        title: "Secretarios de comité",
        subtitle: "Gestión de usuarios secretarios de comité de evaluación",
        role: "secretario",
        userType_id: 4,
        showCommittee: true,
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

    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const { title, subtitle, role, userType_id, showCommittee = false } = dataToShow[accountTypeToManage] || {
        title: "Tipo no reconocido",
        subtitle: "No hay información disponible para este tipo de cuenta.",
        role: "desconocido"
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const userType = parseInt(localStorage.getItem("userType"));
            const userId = parseInt(localStorage.getItem("userId"));
            const committeeId = parseInt(localStorage.getItem("committeeId"))

            if (!userType_id && userType === 2) return;

            try {
                let response;

                if (userType === 3 || userType === 4) {
                    if (!committeeId || !userId) {
                        console.error("Faltan committeeId o userId para obtener los miembros del comité");
                        return;
                    }

                    const url = `${apiUrl}/committees/${committeeId}/secretaries/${userId}/members`;
                    response = await fetch(url);
                } else {
                    const url = `${apiUrl}/subdirectorade/users?userType_id=${userType_id}`;
                    response = await fetch(url);
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error("Error al obtener usuarios:", err);
            }
        };

        fetchUsers();
    }, [userType_id, accountTypeToManage, apiUrl]);

    const handleAddUser = (role) => () => {
        navigate('/FormularioDeUsuario', { state: { formType: "new", role: role } })
    }

    return (
        <>
            {accountTypeToManage && (
                <>
                    <div id="accountsToManageTitle" className="flex flex-col overflow-y-auto max-h-[80vh] mb-4! bg-white p-4! rounded shadow">
                        <h2 className="text-xl font-bold mb-2">{title}</h2>
                        <p className="text-gray-600 mb-4">{subtitle}</p>
                    </div>
                    <div id="accountsToManageDT">
                        <AccountTables users={users} showCommittee={showCommittee} role={role} />
                    </div>
                    {accountTypeToManage !== "Presidentes de comité" && accountTypeToManage !== "Secretarios de comité" && (
                        <div id="accountsToManageButtons" className="flex flex-row items-center gap-10 mb-6 flex-wrap">
                            <button
                                className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                                style={{ padding: '10px 20px', width: '100%', maxWidth: '300px', textAlign: 'center' }}
                                onClick={handleAddUser(role)}
                            >
                                Agregar {role} +
                            </button>
                        </div>
                    )}
                </>
            )}

            {accountTypeToManage === null && (
                <div className="flex flex-col max-h-screen">
                    <h2 className="text-xl font-semibold mb-2">Selecciona un tipo de cuenta para gestionar</h2>
                </div>
            )}
        </>
    );
};

export default ManageAccountsData;
