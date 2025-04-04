const pool = require('../helpers/mysql_config');

/*
 Función para o btener proyectos pendientes a evaluar para un integrante en particular
*/
const getPendingProjects = (req, res) => {
    const { committeId, userId } = req.params;

    const sql = `SELECT p.title, p.startDate, p.endDate, p.status FROM projects p 
                WHERE p.projectId IN 
                (SELECT pe.projectId FROM evaluations pe 
                WHERE pe.committeeId = ? AND pe.userId = ?) 
                AND p.status = 'En revisión'`;

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
