import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const userTextInput = (label, id, type, placeholder, sublabel, value, onChange) => {
    let subtitle = sublabel || null;

    return (
        <div className="flex flex-col gap-2 mb-4 basis-1/3 min-w-[250px]" style={{ boxSizing: 'border-box', padding: '0 1%', margin: '1% 0' }}>
            <label htmlFor={id} className="text-xl font-semibold">
                {label}:<span className="text-[#FF4D4D] text-lg"> *</span>
            </label>
            {subtitle && <span className="text-gray-500 text-sm">{subtitle}</span>}
            <input
                type={type || "text"}
                id={id}
                className="border border-gray-300 rounded-lg w-full"
                style={{ padding: '15px' }}
                placeholder={placeholder}
                value={value || ""}
                onChange={onChange}
                required
            />
        </div>
    );
}

const yesNoInput = (label, id, stateValue, setStateValue) => {
    return (
        <div className="flex flex-col gap-2 mb-4 basis-1/3 min-w-[250px]" style={{ boxSizing: 'border-box', padding: '0 1%', margin: '1% 0' }}>
            <label htmlFor={id} className="text-xl font-semibold">
                {label}
                <span className="text-[#FF4D4D] text-lg"> *</span>
            </label>
            <div className="flex gap-4">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-lg font-semibold border-none text-lg text-lg font-medium cursor-pointer shadow-md w-[10%] min-w-[70px]
                                ${stateValue === false ? 'bg-[#5CB7E6] text-white' :
                            'bg-[#E1E1E1]'}`}
                    style={{ padding: '15px' }}
                    onClick={() => setStateValue(false)}
                >
                    No
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-lg font-semibold border-none text-lg text-lg font-medium cursor-pointer shadow-md w-[10%] min-w-[70px]
                                ${stateValue === true ? 'bg-[#5CB7E6] text-white' :
                            'bg-[#E1E1E1]'}`}
                    style={{ padding: '15px' }}
                    onClick={() => setStateValue(true)}
                >
                    Sí
                </button>
            </div>
        </div>
    );
};

const divider = () => {
    return (
        <div id="divider" className="border-t border-gray-300 w-full" style={{ margin: "10px 0" }} />
    );
}

const ManageIndividualUserForm = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    const formType = state?.formType;
    const role = state?.role || "usuario";

    const roles = {
        "investigador": 1,
        "administrador": 2,
        "presidente": 3,
        "secretario": 4,
        "miembro": 5,
        "usuario": null
    }

    useEffect(() => {
        if (!formType || !role) {
            navigate('/Cuentas');
        }
    }, [formType, role, navigate]);

    const handleCreateUser = async () => {
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        console.log("Creating user with role:", role);

        const normalizedRole = role.trim().toLowerCase();
        const userType_id = roles[normalizedRole];

        console.log("User type ID:", userType_id);

        const body = {
            fName,
            lastName1,
            lastName2,
            email,
            password,
            institution,
            positionWork,
            researchNetwork: isInResearchNetwork ? 1 : 0,
            researchNetworkName: isInResearchNetwork ? researchNetworkName : "",
            academicDegree,
            levelName,
            levelNum: parseInt(levelNum),
            userType_id: roles[role.toLowerCase()] || null
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/subdirectorade/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Error al crear el usuario');
            }

            alert("Usuario creado exitosamente.");
            navigate('/Cuentas');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert("Error al crear el usuario. Por favor, inténtalo de nuevo.");
        }
    }

    
    const formTitle = formType === "new" ? "Crear nuevo usuario " + role : "Editar usuario " + role;
    
    const [fName, setFName] = useState("");
    const [lastName1, setLastName1] = useState("");
    const [lastName2, setLastName2] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [institution, setInstitution] = useState("");
    const [positionWork, setPositionWork] = useState("");
    const [isInResearchNetwork, setIsInResearchNetwork] = useState(null);
    const [researchNetworkName, setResearchNetworkName] = useState("");
    const [academicDegree, setAcademicDegree] = useState("");
    const [levelName, setLevelName] = useState("");
    const [levelNum, setLevelNum] = useState("");

    return (
        <>
            <div className='flex flex-col overflow-y-auto h-screen max-h-screen' style={{ padding: '5%' }}>
                <div id="manageIndividualUserFormHead" className="flex w-full max-w-4xl justify-between items-start flex-col mb-6">
                    <h1 className="text-4xl font-semibold" style={{ padding: "0 0 10px 0" }}>{formTitle}</h1>
                </div>

                <div id="manageIndividualUserFormBody" className="flex flex-col gap-4 mb-6" style={{ padding: '3% 0%' }}>

                    <div id="userPersonalDetails">
                        <h2 className="text-2xl font-semibold mb-4">Datos del usuario</h2>
                        <br />

                        <div id="userFullNameContainer" className="flex flex-row items-center mb-6 flex-wrap justify-between">
                            {userTextInput("Nombre(s)", "name", "text", "Nombre(s) del usuario", null, fName, (e) => setFName(e.target.value))}
                            {userTextInput("Apellido paterno", "firstLastName", "text", "Apellido paterno del usuario", null, lastName1, (e) => setLastName1(e.target.value))}
                            {userTextInput("Apellido materno", "secondLastName", "text", "Apellido materno del usuario", null, lastName2, (e) => setLastName2(e.target.value))}
                        </div>

                        <div id="userEmailContainer" className="flex flex-row items-center gap-10 mb-6 flex-wrap justify-between">
                            {userTextInput("Correo electrónico", "email", "email", "Correo electrónico del usuario", null, email, (e) => setEmail(e.target.value))}
                        </div>


                        <div id="userPasswordContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {userTextInput("Contraseña", "password", "password", "Contraseña del usuario", null, password, (e) => setPassword(e.target.value))}
                            {userTextInput("Confirmar contraseña", "confirmPassword", "password", "Confirmar contraseña del usuario", null, confirmPassword, (e) => setConfirmPassword(e.target.value))}
                        </div>
                    </div>

                    {divider()}

                    <div id="userAccountDetails">
                        <h2 className="text-2xl font-semibold mb-4">Detalles de la cuenta</h2>
                        <br />

                        <div id="userInstitutionContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {userTextInput("Institución a la que pertenece", "institution", "text", "Institución del usuario", "Ej. Universidad, empresa, organización, etc.", institution, (e) => setInstitution(e.target.value))}
                            {userTextInput("Puesto que desempeña", "positionWorl", "text", "Puesto del usuario", "Ej. investigador, estudiante, directivo, etc.", positionWork, (e) => setPositionWork(e.target.value))}
                        </div>

                        <div id="investigationNetworkContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {yesNoInput("¿Pertenece a alguna red de investigación?", "researchNetwork", isInResearchNetwork, setIsInResearchNetwork)}
                            {isInResearchNetwork && userTextInput("Nombre de la red de investigación", "researchNetworkName", "text", "Nombre de la red de investigación", null, researchNetworkName, (e) => setResearchNetworkName(e.target.value))}
                        </div>

                        <div id="userAcademicDegree" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {userTextInput("Grado académico", "academicDegree", "text", "Grado académico del usuario", "Ej. Doctorado, Maestría, Licenciatura, etc.", academicDegree, (e) => setAcademicDegree(e.target.value))}
                            {userTextInput("Nivel académico", "levelName", "text", "Nivel académico del usuario", "Ej. SNII, COFFA, EDI, etc.", levelName, (e) => setLevelName(e.target.value))}
                            {userTextInput("Número de cédula", "levelNum", "number", "Número de cédula del usuario", "Ej. 1, 2, 3, etc.", levelNum, (e) => setLevelNum(e.target.value))}
                        </div>

                    </div>
                </div>

                <div id="actionButtons" className="flex flex-row items-center gap-10 mb-6 flex-wrap justify-end">
                    <button
                        className="bg-[#FF4D4D] text-white font-semibold rounded hover:bg-[#FF0000] cursor-pointer"
                        style={{ padding: '10px 20px', width: '100%', maxWidth: '200px', textAlign: 'center' }}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                        style={{ padding: '10px 20px', width: '100%', maxWidth: '200px', textAlign: 'center' }}
                        onClick={handleCreateUser}
                    >
                        {formType === "new" ? "Crear" : "Guardar"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ManageIndividualUserForm;