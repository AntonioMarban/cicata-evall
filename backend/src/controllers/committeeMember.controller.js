const pool = require("../helpers/mysql_config");

/*
    Función para obtener proyectos pendientes de evaluación de un miembro del comité
    Se hace uso de un procedimiento almacena getPendingProjects 
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité
    @returns: Lista de proyectos pendientes de evaluación
*/
const getPendingProjects = (req, res) => {
  const { committeeId, userId } = req.params;

  const sql = `CALL getPendingProjects(?, ?)`;
  const values = [committeeId, userId];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error getting pending projects:", err);
      return res
        .status(400)
        .json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({
          error: "Resource does not exist",
        });
    }
    return res.status(200).json({ projects: results[0] });
  });
};


/*
    Función para obtener la firma del acuerdo de un proyecto de un miembro del comité
    Se hace uso de un procedimiento almacena getAgreementSignature
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité
    @param projectId: Id del proyecto
    @returns: Dato booleano que indica si el miembro del comité ha firmado el acuerdo, 
    además del nombre del proyecto y el investigador a cargo
*/
const getAgreementSignature = (req, res) => {
  const { committeeId, userId, projectId } = req.params;

  const sql = `CALL getAgreementSignature(?, ?, ?)`;
  const values = [committeeId, userId, projectId];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error obtaining agreement signature:", err);
      return res
        .status(400)
        .json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({
          error: "Resource does not exist",
        });
    }
    return res.status(200).json(results[0]);
  });
};

/*
    Función firma el acuerdo de un proyecto de un miembro del comité de un proyecto en específico
    Se hace uso de un procedimiento almacena updateAgreementSignature
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité
    @param projectId: Id del proyecto
    @returns: Mensaje de éxito o error
*/
const updateAgreementSignature = (req, res) => {
  const { email, password } = req.body;
  const { committeeId, userId, projectId } = req.params;

  const sql = `CALL updateAgreementSignature(?, ?, ?, ?, ?)`;
  const values = [committeeId, userId, projectId, email, password];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error updating agreement signature:", err);
      return res
        .status(400)
        .json({ error: "Invalid credentials" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({
          error: "Resource does not exist",
        });
    }
    return res
      .status(200)
      .json({ message: "Agreement signed" });
  });
};



/*
    Función para obtener la rúbrica de evaluación de un comite en específico
    Se hace uso de un procedimiento almacena getCommitteeRubric
    @param committeeId: Id del comité
    @param userId: Id del miembro del comité
    @returns: Base64 de la rúbrica de evaluación del comité
*/

const getCommitteeRubric = (req, res) => {
  const { committeeId, userId } = req.params;

  const sql = `CALL getCommitteeRubric(?, ?)`;
  const values = [committeeId, userId];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error obtaining committee rubric:", err);
      return res
        .status(400)
        .json({ error: "Invalid query parameters" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({
          error: "Resource does not exist",
        });
    }
    // Convertir la rúbrica a base64 si existe
    // La rúbrica se encuentra en la primera fila y primera columna del resultado
    if (results[0][0].rubric){
      results[0][0].rubric = Buffer.from(results[0][0].rubric).toString('base64');
    }

    return res.status(200).json(results[0]);
  });
};


module.exports = { 
    getPendingProjects,
    getAgreementSignature,
    updateAgreementSignature,
    getCommitteeRubric
};
