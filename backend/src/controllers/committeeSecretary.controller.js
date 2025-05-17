const pool = require("../helpers/mysql_config");


/*
  Función para obtener los proyectos pendientes a enviar evaluación del comité
  Se hace uso de un procedimiento almacena getPendingCommitteeEvaluations
  @param userId: Id del presidente o secretario deñ comité
  @returns: Lista de proyectos pendientes
*/
const getPendingCommitteeEvaluations = (req, res) => {
  const { userId, committeeId } = req.params;
  const sql = `CALL getPendingCommitteeEvaluations(?, ?)`;
  const values = [userId, committeeId];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error getting pending committee evaluations:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res.status(200).json(results[0]);
  }
  );
};

/*
    Función para actualizar la rúbrica de evaluación de un comité en específico
    Se hace uso de un procedimiento almacena updateCommitteeRubric
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité, en este caso el secretario
    body: { 
      rubric: Base64 de la rúbrica de evaluación del comité 
    }
    @returns: Mensaje de éxito o error
*/

const updateCommitteeRubric = (req, res) => {
  const { committeeId, userId } = req.params;
  let { rubric } = req.body;

  if(rubric){
    rubric = Buffer.from(rubric, 'base64');
  }

  const sql = `CALL updateCommitteeRubric(?, ?, ?)`;
  const values = [committeeId, userId, rubric];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error updating committee rubric:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res
      .status(200)
      .json({ message: "Committee rubric updated successfully" });
  });
};


/*
    Función para obtener a los integrantes de un comité que no son evaluadores de un proyecto en específico
    Se hace uso de un procedimiento almacena getProjectNonEvaluators
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité, en este caso el secretario
    @param projectId: Id del proyecto
    @returns: Lista de integrantes del comité que no son evaluadores del proyecto
*/
const getProjectNonEvaluators = (req, res) => {
  const { committeeId, userId, projectId } = req.params;

  const sql = `CALL getProjectNonEvaluators(?, ?, ?)`;
  const values = [committeeId, userId, projectId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error getting project non-evaluators:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res.status(200).json(results[0]);
  });
}

/*
    Función para agregar integrantes como evaluador de un proyecto en específico
    Se hace uso de un procedimiento almacena createProjectEvaluator
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité, en este caso el secretario
    @param projectId: Id del proyecto
    body: { 
      evaluatorId: Id del evaluador que se va a agregar al proyecto
    }
    @returns: Mensaje de éxito o error
*/

const createProjectEvaluator = (req, res) => {
  const { committeeId, userId, projectId } = req.params;
  const { evaluatorId } = req.body;

  const sql = `CALL addEvaluatorToProject(?, ?, ?, ?)`;
  const values = [committeeId, userId, projectId, evaluatorId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error creating project evaluator:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res
      .status(200)
      .json({ message: "Project evaluator created successfully" });
  });
};


/*
    Función para obtener las evaluaciones de un proyecto en específico
    Se hace uso de un procedimiento almacena getProjectEvaluations
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité, en este caso el secretario
    @param projectId: Id del proyecto
    @returns: Lista de evaluaciones del proyecto
*/
const getProjectEvaluations = (req, res) => {
  const { committeeId, userId, projectId } = req.params;

  const sql = `CALL getProjectEvaluations(?, ?, ?)`;
  const values = [committeeId, userId, projectId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error getting project evaluations:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res.status(200).json(results[0]);
  });
};
/*
  Función para simular enviar el resultado de la evaluación del comité
  Se hace uso de un procedimiento almacena sendCommitteeEvaluationResult
  @param commitee_id: id del comité
  @param user_id: id del usuario
  @param project_id: id del proyecto
  @param result: resultado de la evaluación
  @param comments: comentarios de la evaluación
  @returns: Lista de proyectos pendientes
*/
const sendCommitteeEvaluationResult = (req, res) => {
  const { committeeId, userId, projectId } = req.params;
  const { result, comments } = req.body;

  const sql = `CALL sendCommitteeEvaluationResult(?, ?, ?, ?, ?)`;
  const values = [committeeId, userId, projectId, result, comments];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error sending committee evaluation result:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res
      .status(200)
      .json({ message: "Committee evaluation result sent successfully" });
  });
};

/*
  Función para obtener a todos los integrantes de un comité
  Se hace uso de un procedimiento almacena getAllCommitteeMembers
  @param committeeId: Id del comité
  @param userId: Id del miembro del comité, en este caso del presidente o secretario
  @returns: Lista de integrantes del comité
*/
const getAllCommitteeMembers = (req, res) => {
  const { committeeId, userId } = req.params;

  const sql = `CALL getAllCommitteeMembers(?, ?)`;
  const values = [committeeId, userId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error getting all committee members:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res.status(200).json(results[0]);
  });
};

/*
  Función para obtener a un integrante de un comité
  Se hace uso de un procedimiento almacena getCommitteeMember
  @param committeeId: Id del comité
  @param userId: Id del miembro del comité, en este caso el presidente o secretario
  @param memberId: Id del miembro del comité
  @returns: Todos los datos del miembro del comité
*/
const getCommitteeMember = (req, res) => {
  const { committeeId, userId, memberId } = req.params;

  const sql = `CALL getCommitteeMember(?, ?, ?)`;
  const values = [committeeId, userId, memberId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error getting committee member:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res.status(200).json(results[0]);
  });
};

/*
  Función para crear un nuevo integrante de un comité
  Se hace uso de un procedimiento almacenado createCommitteeMember
  @param committeeId: Id del comité
  @param userId: Id del miembro del comité, en este caso el presidente o secretario

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
  @param levelName: Nombre del nivel del usuario
  @param levelNum: Número del nivel del usuario
  @returns: Mensaje de éxito o error
*/
const createCommitteeMember = (req, res) => {
  const { committeeId, userId } = req.params;
  const {
    fName,
    lastName1,
    lastName2,
    email,
    phone,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelName,
    levelNum
  } = req.body;

  const sql = `CALL createCommitteeMember(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    userId,
    committeeId,
    fName,
    lastName1,
    lastName2,
    email,
    phone,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelName,
    levelNum
  ];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error creating committee member:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res
      .status(200)
      .json({ message: "Committee member created successfully" });
  });
}

/*
  Función para actualizar un integrante de un comité
  Se hace uso de un procedimiento almacenado updateCommitteeMember
  @param committeeId: Id del comité
  @param userId: Id del miembro del comité, en este caso el presidente o secretario

  @param memberId: Id del miembro del comité
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
  @param levelName: Nombre del nivel del usuario
  @param levelNum: Número del nivel del usuario
  @returns: Mensaje de éxito o error
*/
const updateCommitteeMember = (req, res) => {
  const { committeeId, userId, memberId } = req.params;
  const {
    fName,
    lastName1,
    lastName2,
    email,
    phone,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelName,
    levelNum
  } = req.body;

  const sql = `CALL updateCommitteeMember(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    userId,
    committeeId,
    memberId,
    fName,
    lastName1,
    lastName2,
    email,
    phone,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelName,
    levelNum
  ];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error updating committee member:", err);
      return res.status(400).json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Resource does not exist" });
    }
    return res
      .status(200)
      .json({ message: "Committee member updated successfully" });
  });
}


module.exports = {
  getPendingCommitteeEvaluations,
  updateCommitteeRubric,
  getProjectNonEvaluators,
  createProjectEvaluator,
  getProjectEvaluations,
  sendCommitteeEvaluationResult,
  getAllCommitteeMembers,
  getCommitteeMember,
  createCommitteeMember,
  updateCommitteeMember
};