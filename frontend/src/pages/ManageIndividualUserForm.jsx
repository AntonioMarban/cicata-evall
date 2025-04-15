import { useState } from "react";

const userTextInput = (label, id, type, placeholder, sublabel) => {
    let subtitle = sublabel || null;

    return (
        <div className="flex flex-col gap-2 mb-4 basis-1/3 min-w-[250px]" style={{ boxSizing: 'border-box', padding: '0 1%', margin: '1% 0' }}>
            <label htmlFor={id} className="text-xl font-semibold">
                {label}:
                <span className="text-[#FF4D4D] text-lg"> *</span>
            </label>
            {subtitle && <span className="text-gray-500 text-sm">{subtitle}</span>}
            <input
                type={type || "text"}
                id={id}
                className="border border-gray-300 rounded-lg w-full"
                style={{ padding: '15px' }}
                placeholder={placeholder}
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

const ManageIndividualUserForm = (formType, role) => {

    const [isInResearchNetwork, setIsInResearchNetwork] = useState(null);
    const formTitle = formType === "new" ? "Crear nuevo usuario " + role : "Editar usuario " + role;

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
                            {userTextInput("Nombre(s)", "name", "text", "Nombre(s) del usuario")}
                            {userTextInput("Apellido paterno", "firstLastName", "text", "Apellido paterno del usuario")}
                            {userTextInput("Apellido materno", "secondLastName", "text", "Apellido materno del usuario")}
                        </div>

                        <div id="userEmailContainer" className="flex flex-row items-center gap-10 mb-6 flex-wrap justify-between">
                            {userTextInput("Correo electrónico", "email", "email", "Correo electrónico del usuario")}
                        </div>


                        <div id="userPasswordContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {userTextInput("Contraseña", "password", "password", "Contraseña del usuario")}
                            {userTextInput("Confirmar contraseña", "confirmPassword", "password", "Confirmar contraseña del usuario")}
                        </div>
                    </div>

                    {divider()}

                    <div id="userAccountDetails">
                        <h2 className="text-2xl font-semibold mb-4">Detalles de la cuenta</h2>
                        <br />

                        <div id="userInstitutionContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {userTextInput("Institución a la que pertenece", "institution", "text", "Institución del usuario", "Ej. Universidad, empresa, organización, etc.")}
                            {userTextInput("Puesto que desempeña", "positionWorl", "text", "Puesto del usuario", "Ej. investigador, estudiante, directivo, etc.")}
                        </div>

                        <div id="investigationNetworkContainer" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {yesNoInput("¿Pertenece a alguna red de investigación?", "researchNetwork", isInResearchNetwork, setIsInResearchNetwork)}
                            {isInResearchNetwork && userTextInput("Nombre de la red de investigación", "researchNetworkName", "text", "Nombre de la red de investigación")}
                        </div>

                        <div id="userAcademicDegree" className="flex flex-row items-center mb-6 flex-wrap justify-start">
                            {userTextInput("Grado académico", "academicDegree", "text", "Grado académico del usuario", "Ej. Doctorado, Maestría, Licenciatura, etc.")}
                            {userTextInput("Nivel académico", "levelName", "text", "Nivel académico del usuario", "Ej. SNII, COFFA, EDI, etc.")}
                            {userTextInput("Número de cédula", "levelNum", "text", "Número de cédula del usuario", "Ej. 1, 2, 3, etc.")}
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
                    >
                        {formType === "new" ? "Crear" : "Guardar"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default ManageIndividualUserForm;