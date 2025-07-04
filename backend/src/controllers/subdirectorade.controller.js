const pool = require("../helpers/mysql_config");

/*
    Función para obtener usuarios del rol de la petición
    Se hace uso de un procedimiento almacena getUsersByRole
    @query userType_id: id del rol de usuario
    @return users: lista de usuarios con el rol solicitado
*/

const getUsersByRole = async (req, res) => {
  const { userType_id } = req.query;
  const query = "CALL getUsersByRole(?)";
  const values = [userType_id];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    const users = results[0];
    res.status(200).json(users);
  });
};

/*
    Función para crear un nuevo usuario
    Se hace uso de un procedimiento almacena createUser
    @param fName: Nombre del usuario
    @param lastName1: Primer apellido del usuario
    @param lastName2: Segundo apellido del usuario
    @param email: Correo electrónico del usuario
    @param phone: Teléfono del usuario
    @param password: Contraseña del usuario
    @param institution: Institución del usuario
    @param positionWork: Puesto de trabajo del usuario
    @param researchNetwork: Red de investigación del usuario
    @param researchNetworkName: Nombre de la red de investigación del usuario
    @param academicDegree: Grado académico del usuario
    @param levelNumSNII: Nivel del SNII del usuario
    @param levelNumCOFFA: Nivel del COFFA del usuario
    @param levelNumEDI: Nivel del EDI del usuario
    @param userType_id: Id del rol de usuario
    @return message: Mensaje de éxito o error
*/
const createUser = async (req, res) => {
  const {
    fName,
    lastName1,
    lastName2,
    prefix,
    email,
    phone,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelNumSNII,
    levelNumCOFFA,
    levelNumEDI,
    userType_id,
  } = req.body;

  const query = "CALL createUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    fName,
    lastName1,
    lastName2,
    prefix,
    email,
    phone,	
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelNumSNII,
    levelNumCOFFA,
    levelNumEDI,
    userType_id,
  ];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Email already exists" });
    }
    res.status(201).json({ message: "User created successfully" });
  });
};

/*
 Función para obtener todos los datos de un usuario
 @param userId: Id del usuario
 @returns: Todos los datos de ese usuario
*/
const getUser = async (req, res) => {
  const { userId } = req.params;
  const query = "CALL getUser(?)";
  const values = [userId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res.status(200).json(results[0][0]);
  });
};

/*
  Función para actualizar datos de un usuario 
  @param userId: Id del usuario
  @param fName: Nombre del usuario
  @param lastName1: Primer apellido del usuario
  @param lastName2: Segundo apellido del usuario
  @param email: Correo electrónico del usuario
  @param phone: Teléfono del usuario
  @param password: Contraseña del usuario
  @param institution: Institución del usuario
  @param positionWork: Puesto de trabajo del usuario
  @param researchNetwork: Red de investigación del usuario
  @param researchNetworkName: Nombre de la red de investigación del usuario
  @param academicDegree: Grado académico del usuario
  @param levelNumSNII: Nivel del SNII del usuario
  @param levelNumCOFFA: Nivel del COFFA del usuario
  @param levelNumEDI: Nivel del EDI del usuario
  @return message: Mensaje de éxito o error
*/
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const {
    fName,
    lastName1,
    lastName2,
    prefix,
    email,
    phone,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelNumSNII,
    levelNumCOFFA,
    levelNumEDI
  } = req.body;
  const query =
    "CALL updateUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    userId,
    fName,
    lastName1,
    lastName2,
    prefix,
    email,
    phone,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelNumSNII,
    levelNumCOFFA,
    levelNumEDI
  ];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error updating user" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res.status(200).json({ message: "User updated successfully" });
  });
};

/*
    Función para inactivar un usuario
    Se hace uso de un procedimiento almacena setUserInactive
    @param userId: id del usuario
    @return message: Mensaje de éxito o error
*/
const setUserInactive = async (req, res) => {
  const { userId } = req.params;
  const query = "CALL setUserInactive(?)";
  const values = [userId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error inactivating user" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res.status(200).json({ message: "User inactivated successfully" });
  });
};

const getActiveProjectsSub = async (req, res) => {
  const query = "CALL getActiveProjectsSub()";
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error fetching inactive projects" });
    }

    const activeProjects = results[0];
    res.status(200).json(activeProjects);
  });
};

const getInactiveProjectsSub = async (req, res) => {
  const query = "CALL getInactiveProjectsSub()";
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error fetching inactive projects" });
    }

    const inactiveProjects = results[0];
    res.status(200).json(inactiveProjects);
  });
};

/*
    Función para obtener todos los comités existentes
    Se hace uso de un procedimiento almacena getAllCommittees
    @return users: lista de comités existentes
*/
const getAllCommittees = async (req, res) => {
  const query = "CALL getAllCommittees()";
  pool.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching committees" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No committees found" });
    }
    const committees = results[0];
    res.status(200).json(committees);
  });
};

/*
    Función para obtener el presidente y secretario de un comité
    Se hace uso de un procedimiento almacena getCommitteeSecretaryPresident
    @param committee_id: id del comité
    @return secretary: secretario del comité y presidente del mismo
*/
const getCommitteeSecretaryPresident = async (req, res) => {
  const { committeeId } = req.params;
  const query = "CALL getCommitteeSecretaryPresident(?)";
  const values = [committeeId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    const secretary = results[0][0];
    const president = results[1][0];
    res.status(200).json({ president, secretary });
  });
};

/*
 Función para obtener las evaluaciones de la segunda etapa, en este caso de los comités CIP
 En caso de que el proyecto tenga marcado el uso de animales se obtiene la evaluación del comité CIQUAL
 Se hace uso de un procedimiento almacenado getFirstStageEvaluations
 @param projectId: Id del proyecto
 @returns: Lista de evaluaciones de la segunda etapa: nombre del comité, resultado y comentarios
           stageCompleted: indica si la etapa se ha completado, jumpThirdStage: indica si se salta la tercera etapa
*/
const getFirstStageEvaluations = async (req, res) => {
  const { projectId } = req.params;
  const query = "CALL getFirstStageEvaluations(?)";
  const values = [projectId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    const response = {
      evaluations: [],
      controlVariables: {}
    };
    response.evaluations = results[0]
    response.controlVariables = results[1][0]
    res.status(200).json(response); 
  })
};  


/*
    Función para crear las evaluaciones de la primera etapa, en este caso del 
    CIP, relacionadas a un proyecto
    Se hace uso de un procedimiento almacena createFirstStageEvaluations
    @param projectId: Id del proyecto
    @returns: Mensaje de éxito o error
*/
const createFirstStageEvaluations = async (req, res) => {
  const { projectId } = req.params;
  const query = "CALL createFirstStageEvaluations(?)";
  const values = [projectId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res
      .status(200)
      .json({ message: "First stage evaluations created successfully" });
  });
};


/*
    Función para obtener las evaluaciones de la segunda etapa, en este caso del comité CIQUAL
    Se hace uso de un procedimiento almacena getSecondStageEvaluations
    @param projectId: Id del proyecto
*/

const getSecondStageEvaluations = async (req, res) => {
  const { projectId } = req.params;
  const query = "CALL getSecondStageEvaluations(?)";
  const values = [projectId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    const response = {
      evaluations: [],
      controlVariables: {}
    };
    for (let i = 0; i < results.length - 2; i++) {
      if (results[i].length > 0) {
          response.evaluations.push(results[i][0]);
      }
    }
    if (results[results.length - 2].length > 0) {
      response.controlVariables = results[results.length - 2][0];
    }
    res.status(200).json(response);
  });
}


/*
    Función para crear las evaluaciones de la segunda etapa, en este caso de los comités CEI, CB y CI. 
    En caso de que el proyecto tenga marcado el uso de animales se crea la evaluación del comité CIQUAL
    Se hace uso de un procedimiento almacena createSecondStageEvaluations
    @param projectId: Id del proyecto
    @returns: Mensaje de éxito o error
*/
const createSecondStageEvaluations = async (req, res) => {
  const { projectId } = req.params;
  const query = "CALL createSecondStageEvaluations(?)";
  const values = [projectId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res
      .status(200)
      .json({ message: "Second stage evaluations created successfully" });
  });
};

/*
  Función para obtener resultados de evaluación de un proyecto en específico
  Se hace uso de un procedimiento almacenado getResultThirdStage
  @param projectId: Id del proyecto
  @returns: finalResult: resultado de las evaluaciones de comités
           stageCompleted: indica si la etapa se ha completado, jumpThirdStage: indica si se salta la tercera etapa
*/

const getResultThirdStage = async (req, res) => {
  const { projectId } = req.params;
  const query = "CALL getResultThirdStage(?)";
  const values = [projectId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res.status(200).json(results[0][0]);
  })
}

/*
  Función para simular el envío de resultados de evaluación a un investigador
  actualizando el status de este de acuerdo al resultado global dado por los comités
  Se hace uso de un procedimiento almacenado sendEvaluationResult
  @param projectId: Id del proyecto
  @returns: mensaje de éxito o error       
*/
const sendEvaluationResult = async (req, res) => {
  const { projectId } = req.params;
  const query = "CALL sendEvaluationResult(?)";
  const values = [projectId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res.status(200).json({ message: "Evaluation result sent successfully" });
  })
};

/*
  Función para crear dictum de un proyecto
  Se hace uso de un procedimiento almacenado createDictum
  @param projectId: Id del proyecto
  @param folio: Folio del dictum
  @param authorizingAdminId: Id del administrador que autoriza el dictum
  @returns: mensaje de éxito o error
*/
const createDictum = async (req, res) => {
  const { projectId } = req.params;
  const { folio, authorizerId } = req.body;
  const query = "CALL createDictum(?, ?, ?)";
  const values = [projectId, folio, authorizerId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    res.status(200).json({ message: "Dictum created successfully" });
  })
}

/*
Funcion para mandar un proyecto a "En revision"
Se hace uso de un procedimiento almacenado setProjectToRevision
@param projectId: Id del proyecto
*/
const setProjectStatusToRevision = (req, res) => {
    const projectId = req.params.projectId;

    const query = `CALL setProjectToRevision(?)`;

    pool.query(query, [projectId], (err, result) => {
        if (err) {
            console.error('Error al ejecutar el procedimiento:', err);
            return res.status(500).json({ error: 'Error al cambiar el estado del proyecto' });
        }

        res.status(200).json({ message: 'El estado del proyecto se cambió' });
    });
};

/*
  Función para obtener los acuerdos de confidencialidad de un proyecto
  organizados por comité
  Se hace uso de un procedimiento almacenado getProjectAgreements
  @param projectId: Id del proyecto
  @returns: lista de acuerdos de confidencialidad por comité
*/
const getProjectAgreements = async (req, res) => {
  const { projectId } = req.params;
  const query = "CALL getProjectAgreements(?)";
  const values = [projectId];
  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results[0].length === 0) {
      return res.status(404).json({ error: "Resource does not exist" });
    }
    const response = {};
    for (let i = 0; i < results[0].length; i++) {
        const row = {
            fullName: results[0][i].fullName,
            email: results[0][i].email,
            agreed: results[0][i].agreed,
            agreedDate: results[0][i].agreedDate,
        }
        const committeeName = results[0][i].committeeName;
        if (!response[committeeName]) {
            response[committeeName] = [];
        }
        response[committeeName].push(row);
    }
    res.status(200).json(response);
  });
};

module.exports = {
  getUsersByRole,
  createUser,
  getUser,
  updateUser,
  setUserInactive,
  getInactiveProjectsSub,
  getActiveProjectsSub,
  getAllCommittees,
  getCommitteeSecretaryPresident,
  getFirstStageEvaluations,
  createFirstStageEvaluations,
  getSecondStageEvaluations,
  createSecondStageEvaluations,
  getResultThirdStage,
  sendEvaluationResult,
  createDictum,
  setProjectStatusToRevision,
  getProjectAgreements
};
