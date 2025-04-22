const pool = require("../helpers/mysql_config");

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

  const sql = `CALL createProjectEvaluator(?, ?, ?, ?)`;
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


module.exports = {
  updateCommitteeRubric,
  getProjectNonEvaluators,
  createProjectEvaluator,
  getProjectEvaluations
};