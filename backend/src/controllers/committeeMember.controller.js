const pool = require('../helpers/mysql_config');

/*
 Función para obtener proyectos pendientes de evaluación de un miembro del comité
 Se hace uso de un procedimiento almacena getPendingProjects 
 @param committeeId: Id del comité
    @param userId: Id del miembro del comité
    @returns: Lista de proyectos pendientes de evaluación


*/
const getPendingProjects = (req, res) => {
    const { committeId, userId } = req.params;

    const sql = `CALL getPendingProjects(?, ?)`;
    const values = [committeId, userId];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error al obtener proyectos pendientes:', err);
            return res.status(400).json({ error: 'Parámetros de consulta inválidos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron proyectos pendientes para este usuario' });
        }
        return res.status(200).json({ projects: results });
    })
};

module.exports = { getPendingProjects };
