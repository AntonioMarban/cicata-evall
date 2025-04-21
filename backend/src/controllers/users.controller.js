const pool = require('../helpers/mysql_config'); 

/*
    Función para obtener la firma del acuerdo de un proyecto de un usuario que sea evaluador
    Se hace uso de un procedimiento almacena getAgreementSignature
    @param userId: Id del miembro del comité
    @param projectId: Id del proyecto
    @returns: Dato booleano que indica si el evaluador ha firmado el acuerdo, 
    además del nombre del proyecto y el investigador a cargo
*/
const getAgreementSignature = (req, res) => {
    const { userId, projectId } = req.params;
  
    const sql = `CALL getAgreementSignature(?, ?)`;
    const values = [ userId, projectId];
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
    Función para firmar el acuerdo de un proyecto de cualquier usuario que sea evaluador
    Se hace uso de un procedimiento almacena updateAgreementSignature
    @param userId: Id del miembro del comité
    @param projectId: Id del proyecto
    @returns: Mensaje de éxito o error
*/
const updateAgreementSignature = (req, res) => {
    const { email, password } = req.body;
    const { userId, projectId } = req.params;
  
    const sql = `CALL updateAgreementSignature(?, ?, ?, ?)`;
    const values = [ userId, projectId, email, password];
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
  
  
module.exports = {
    updateAgreementSignature,
    getAgreementSignature
};