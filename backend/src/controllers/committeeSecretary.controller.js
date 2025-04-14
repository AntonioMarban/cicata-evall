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

module.exports = {
  updateCommitteeRubric,
};