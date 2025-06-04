import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const userTextInput = (label, id, type, placeholder, sublabel, value, onChange, onBlur, error, autoComplete) => {
    let subtitle = sublabel || null;

    return (
        <div className="flex flex-col gap-2! my-4! px-4! basis-1/3 min-w-[250px] items-start">
            <label htmlFor={id} className="text-xl font-semibold">
                {label}:<span className="text-[#FF4D4D] text-lg"> *</span>
            </label>
            {subtitle && <span className="text-gray-500 text-sm">{subtitle}</span>}
            <input
                type={type || "text"}
                id={id}
                className={`border rounded-lg w-full p-3! ${error ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={placeholder}
                value={value || ""}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={autoComplete || "off"}	
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}

const yesNoInput = (label, id, value, onChange, error) => {
    return (
        <div className="flex flex-col gap-2! mb-4! basis-1/3 min-w-[250px]" style={{ boxSizing: 'border-box', padding: '0 1%', margin: '1% 0' }}>
            <label htmlFor={id} className="text-xl font-semibold">
                {label}
                <span className="text-[#FF4D4D] text-lg"> *</span>
            </label>
            <div className="flex gap-4">
                {["No", "Sí"].map((opt, i) => (
                <button
                    key={opt}
                    type="button"
                    className={`px-4! py-4! rounded-lg font-semibold text-lg cursor-pointer shadow-md w-[10%] min-w-[70px] ${value === !!i ? 'bg-[#5CB7E6] text-white' : 'bg-[#E1E1E1]'}`}
                    onClick={() => onChange(!!i)}
                >
                    {opt}
                </button>
            ))}
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

const userSelectInput = (label, id, options, value, onChange, error) => {
    return (
        <div className="flex flex-col gap-2! my-4! px-4! basis-1/3 min-w-[250px] items-start" style={{ boxSizing: 'border-box', padding: '0 1%', margin: '1% 0' }}>
            <label htmlFor={id} className="text-xl font-semibold">
                {label}:
            </label>
            <select

                id={id}
                className={`border rounded-lg w-full p-3! ${error ? 'border-red-500' : 'border-gray-300'}`}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => onChange(value)}
            >
                <option value="" disabled>Selecciona una opción</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};

const Divider = () => <div className="border-t border-gray-300 w-full my-4" />;

const ManageIndividualUserForm = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    const formType = state?.formType;
    const role = state?.role || "usuario";
    const userId = state?.userId || null;
    
    const [committeeId] = useState(localStorage.getItem("committeeId"));
    const [currentUserId] = useState(localStorage.getItem("userId"));

    const apiUrl = import.meta.env.VITE_API_URL;

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${apiUrl}/subdirectorade/users/${userId}`);
                if (!response.ok) throw new Error('Error al obtener los datos del usuario');
                
                const data = await response.json();

                setFName(data.fName || "");
                setLastName1(data.lastName1 || "");
                setLastName2(data.lastName2 || "");
                setPrefix(data.prefix || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
                setPassword(data.password || "");
                setConfirmPassword(data.password || "");
                setInstitution(data.institution || "");
                setPositionWork(data.positionWork || "");
                setIsInResearchNetwork(data.researchNetwork === 1);
                setResearchNetworkName(data.researchNetworkName || "");
                setAcademicDegree(data.academicDegree || "");
                setLevelNumSNII(data.levelNumSNII || "");
                setLevelNumCOFFA(data.levelNumCOFFA || "");
                setLevelNumEDI(data.levelNumEDI || "");

            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                alert("Error al cargar los datos del usuario. Por favor, inténtalo de nuevo.");
                navigate('/Cuentas');
            }
        }

        if (formType === "edit" && userId) {
            fetchUserData();
        }
    }, [formType, userId, apiUrl, navigate])

    const handleCreateUser = async () => {

        if (!validateForm()) return;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const commonBody = {
            fName,
            lastName1,
            lastName2,
            prefix,
            email: email.toLowerCase(),
            phone,
            password,
            institution,
            positionWork,
            researchNetwork: isInResearchNetwork ? 1 : 0,
            researchNetworkName: isInResearchNetwork ? researchNetworkName : "",
            academicDegree,
            levelNumSNII,
            levelNumCOFFA,
            levelNumEDI
        };

        try {
            let response;

            if (role.toLowerCase() === "miembro") {
                const url = `${apiUrl}/committees/${committeeId}/secretaries/${currentUserId}/members`;
                response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commonBody)
                });
            } else {
                const body = {
                    ...commonBody,
                    userType_id: roles[role.toLowerCase()] || null
                };
                const url = `${apiUrl}/subdirectorade/users`;
                response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
            }

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

    const handleEditUser = async () => {
        if (!validateForm()) return;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const body = {
            fName,
            lastName1,
            lastName2,
            prefix,
            email: email.toLowerCase(),
            phone,
            password,
            institution,
            positionWork,
            researchNetwork: isInResearchNetwork ? 1 : 0,
            researchNetworkName: isInResearchNetwork ? researchNetworkName : "",
            academicDegree,
            levelNumSNII,
            levelNumCOFFA,
            levelNumEDI
        }

        try {
            const response = await fetch(`${apiUrl}/subdirectorade/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Error al editar el usuario');
            }

            alert("Usuario editado exitosamente.");
            navigate('/Cuentas');
        } catch (error) {
            console.error('Error al editar el usuario:', error);
            alert("Error al editar el usuario. Por favor, inténtalo de nuevo.");
        }
    }

    
    const formTitle = formType === "new" ? "Crear nuevo usuario " + role : "Editar usuario " + role;
    
    const [fName, setFName] = useState("");
    const [lastName1, setLastName1] = useState("");
    const [lastName2, setLastName2] = useState("");
    const [prefix, setPrefix] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [institution, setInstitution] = useState("");
    const [positionWork, setPositionWork] = useState("");
    const [isInResearchNetwork, setIsInResearchNetwork] = useState(null);
    const [researchNetworkName, setResearchNetworkName] = useState("");
    const [academicDegree, setAcademicDegree] = useState("");
    const [levelNumSNII, setLevelNumSNII] = useState("");
    const [levelNumCOFFA, setLevelNumCOFFA] = useState("");
    const [levelNumEDI, setLevelNumEDI] = useState("");

    const [errors, setErrors] = useState({});

    const handleFieldChange = (field, value, setter) => {
        setter(value);

        const errorMsg = validateField(field, value);
        setErrors(prev => ({
            ...prev,
            [field]: errorMsg
        }));
    };

    const handleYesNoChange = (value, setter, fieldName) => {
        setter(value);
        if (errors[fieldName] !== null) {
            setErrors(prev => ({ ...prev, [fieldName]: null }));
        }
    };

    const isValidName = (text) => {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,30}$/;
        return regex.test(text.trim()) && text === text.trim();
    };

    const isValidPrefix = (text) => {
        const regex = /^[A-Za-z. ]{1,10}$/;
        return regex.test(text.trim()) && text === text.trim();
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isValidPhone = (phone) => {
        // Formato: 10 dígitos y ya
        const regex =  /^\d{10}$/;
        return regex.test(phone);
    };

    const isValidPassword = (pass) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(pass);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isValidName(fName)) newErrors.fName = "El nombre debe tener entre 3 y 30 letras, sin números ni caracteres especiales.";
        if (!isValidName(lastName1)) newErrors.lastName1 = "El apellido paterno debe tener entre 3 y 30 letras, sin números ni caracteres especiales.";
        if (!isValidName(lastName2)) newErrors.lastName2 = "El apellido materno debe tener entre 3 y 30 letras, sin números ni caracteres especiales.";
        
        if (!isValidPrefix(prefix)) newErrors.prefix = "El prefijo debe tener entre 1 y 10 letras o puntos, sin números ni caracteres especiales.";
        if (!isValidEmail(email)) newErrors.email = "El correo no tiene un formato válido.";
        if (!isValidPhone(phone)) newErrors.phone = "El teléfono debe tener exactamente 10 dígitos sin guiones ni espacios.";
        
        if (!isValidPassword(password)) newErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
        if (confirmPassword !== password) newErrors.confirmPassword = "Las contraseñas no coinciden.";

        
        if (!isValidName(institution)) newErrors.institution = "La institución debe tener entre 3 y 30 letras, sin caracteres especiales.";
        if (!isValidName(positionWork)) newErrors.positionWork = "El puesto debe tener entre 3 y 30 letras, sin caracteres especiales.";

        if (isInResearchNetwork === null) newErrors.isInResearchNetwork = "Selecciona una opción.";
        if (isInResearchNetwork && !isValidName(researchNetworkName)) newErrors.researchNetworkName = "El nombre de la red de investigación debe tener entre 3 y 30 letras, sin números ni caracteres especiales.";
        
        if (!isValidName(academicDegree)) newErrors.academicDegree = "El grado académico debe tener entre 3 y 30 letras, sin caracteres especiales.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateField = (field, value) => {
        switch (field) {
            case "fName":
            case "lastName1":
            case "lastName2":
            case "institution":
            case "positionWork":
            case "researchNetworkName":
            case "academicDegree":
                if (!isValidName(value)) return "Debe tener entre 3 y 30 letras, sin caracteres especiales.";
                break;
            case "prefix":
                if (!isValidPrefix(value)) return "Debe tener entre 1 y 10 letras o puntos, sin números ni caracteres especiales.";
                break;
            case "email":
                if (!isValidEmail(value)) return "El correo no tiene un formato válido.";
                break;
            case "phone":
                if (!isValidPhone(value)) return "El teléfono debe tener exactamente 10 dígitos sin guiones ni espacios.";
                break;
            case "password":
                if (!isValidPassword(value)) return "Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
                break;
            case "confirmPassword":
                if (value !== password) return "Las contraseñas no coinciden.";
                break;
            default:
                return null;
        }
        return null;
    };

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

                        <div id="userFullNameContainer" className="flex flex-row items-center flex-wrap justify-between items-start">
                            {userTextInput("Nombre(s)", "name", "text", "Nombre(s) del usuario", null, fName,
                                (e) => handleFieldChange("fName", e.target.value, setFName),
                                () => setErrors(prev => ({ ...prev, fName: validateField("fName", fName) })),
                                errors.fName)}
                            {userTextInput("Apellido paterno", "firstLastName", "text", "Apellido paterno del usuario", null, lastName1,
                                (e) => handleFieldChange("lastName1", e.target.value, setLastName1),
                                () => setErrors(prev => ({ ...prev, lastName1: validateField("lastName1", lastName1) })),
                                errors.lastName1)}
                            {userTextInput("Apellido materno", "secondLastName", "text", "Apellido materno del usuario", null, lastName2,
                                (e) => handleFieldChange("lastName2", e.target.value, setLastName2),
                                () => setErrors(prev => ({ ...prev, lastName2: validateField("lastName2", lastName2) })),
                                errors.lastName2)}
                        </div>

                        <div id="userContactContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start items-start">
                            {userTextInput("Prefijo", "prefix", "text", "Prefijo del usuario (Dr., Mtro., Lic.)", null, prefix,
                                (e) => handleFieldChange("prefix", e.target.value, setPrefix),
                                () => setErrors(prev => ({ ...prev, prefix: validateField("prefix", prefix) })),
                                errors.prefix)}
                            {userTextInput("Correo electrónico", "email", "email", "Correo electrónico del usuario", null, email,
                                (e) => handleFieldChange("email", e.target.value, setEmail),
                                () => setErrors(prev => ({ ...prev, email: validateField("email", email) })),
                                errors.email)}
                            {userTextInput("Teléfono", "phone", "number", "Teléfono del usuario", null, phone,
                                (e) => handleFieldChange("phone", e.target.value, setPhone),
                                () => setErrors(prev => ({ ...prev, phone: validateField("phone", phone) })),
                                errors.phone)}
                        </div>


                        <div id="userPasswordContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start items-start">
                            {userTextInput("Contraseña", "password", "password", "Contraseña del usuario", null, password,
                                (e) => handleFieldChange("password", e.target.value, setPassword),
                                () => setErrors(prev => ({ ...prev, password: validateField("password", password) })),
                                errors.password, "new-password")}
                            {userTextInput("Confirmar contraseña", "confirmPassword", "password", "Confirmar contraseña del usuario", null, confirmPassword,
                                (e) => handleFieldChange("confirmPassword", e.target.value, setConfirmPassword),
                                () => setErrors(prev => ({ ...prev, confirmPassword: validateField("confirmPassword", confirmPassword) })),
                                errors.confirmPassword, "new-password")}
                        </div>
                    </div>

                    <Divider />

                    <div id="userAccountDetails">
                        <h2 className="text-2xl font-semibold">Detalles de la cuenta</h2>
                        <br />

                        <div id="userInstitutionContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start items-start">
                            {userTextInput("Institución a la que pertenece", "institution", "text", "Institución del usuario", "Ej. Universidad, empresa, organización, etc.", institution,
                                (e) => handleFieldChange("institution", e.target.value, setInstitution),
                                () => setErrors(prev => ({ ...prev, institution: validateField("institution", institution) })),
                                errors.institution)}
                            {userTextInput("Puesto que desempeña", "positionWorl", "text", "Puesto del usuario", "Ej. investigador, estudiante, directivo, etc.", positionWork,
                                (e) => handleFieldChange("positionWork", e.target.value, setPositionWork),
                                () => setErrors(prev => ({ ...prev, positionWork: validateField("positionWork", positionWork) })),
                                errors.positionWork)}
                            {userTextInput("Grado académico", "academicDegree", "text", "Grado académico del usuario", "Ej. Doctorado, Maestría, Licenciatura", academicDegree,
                                (e) => handleFieldChange("academicDegree", e.target.value, setAcademicDegree),
                                () => setErrors(prev => ({ ...prev, academicDegree: validateField("academicDegree", academicDegree) })),
                                errors.academicDegree)}
                        </div>

                        <div id="investigationNetworkContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start items-start">
                            {yesNoInput("¿Pertenece a alguna red de investigación?", "researchNetwork", isInResearchNetwork, (value) => handleYesNoChange(value, setIsInResearchNetwork, "isInResearchNetwork"), errors.isInResearchNetwork)}
                            <div>
                                
                            </div>
                            {isInResearchNetwork && userTextInput("Nombre de la red de investigación", "researchNetworkName", "text", "Nombre de la red de investigación", null, researchNetworkName,
                                (e) => handleFieldChange("researchNetworkName", e.target.value, setResearchNetworkName),
                                () => setErrors(prev => ({ ...prev, researchNetworkName: validateField("researchNetworkName", researchNetworkName) })),
                                errors.researchNetworkName)}
                        </div>

                        <div id="userLevel" className="flex flex-row items-center mb-6 flex-wrap justify-start items-start">
                            {userSelectInput("Nivel SNII", "levelNumSNII", [
                                { value: "Candidato", label: "Candidato" },
                                { value: "I", label: "I" },
                                { value: "II", label: "II" },
                                { value: "III", label: "III" },
                                { value: "Emérito", label: "Emérito" }
                            ], levelNumSNII,
                            (val) => handleFieldChange("levelNumSNII", val, setLevelNumSNII),
                            errors.levelNumSNII)}

                            {userSelectInput("Nivel COFFA", "levelNumCOFFA", [
                                { value: "I", label: "I" },
                                { value: "II", label: "II" },
                                { value: "III", label: "III" },
                                { value: "IV", label: "IV" },
                                { value: "V", label: "V" }
                            ], levelNumCOFFA,
                            (val) => handleFieldChange("levelNumCOFFA", val, setLevelNumCOFFA),
                            errors.levelNumCOFFA)}
                            {userSelectInput("Nivel EDI", "levelNumEDI", [
                                { value: "I", label: "I" },
                                { value: "II", label: "II" },
                                { value: "III", label: "III" },
                                { value: "IV", label: "IV" },
                                { value: "V", label: "V" },
                                { value: "VI", label: "VI" },
                                { value: "VII", label: "VII" },
                                { value: "VIII", label: "VIII" },
                                { value: "IX", label: "IX" }
                            ], levelNumEDI,
                            (val) => handleFieldChange("levelNumEDI", val, setLevelNumEDI),
                            errors.levelNumEDI)}
                        </div>

                    </div>
                </div>

                <div id="actionButtons" className="flex flex-row items-center gap-10 mb-6 flex-wrap justify-end">
                    <button
                        className="bg-[#FF4D4D] text-white font-semibold rounded hover:bg-[#FF0000] cursor-pointer"
                        style={{ padding: '10px 20px', width: '100%', maxWidth: '200px', textAlign: 'center' }}
                        onClick={() => navigate('/Cuentas')}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-[#5CB7E6] text-white font-semibold rounded hover:bg-[#1591D1] cursor-pointer"
                        style={{ padding: '10px 20px', width: '100%', maxWidth: '200px', textAlign: 'center' }}
                        onClick={formType === "edit" ? handleEditUser : handleCreateUser}
                    >
                        {formType === "edit" ? "Guardar cambios" : "Crear usuario"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ManageIndividualUserForm;