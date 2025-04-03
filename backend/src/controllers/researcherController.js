const pool = require('../helpers/mysql_config'); 

const getActiveProjects = (req, res) => {
    const query = 'CALL getActiveProjects()';

    pool.query(query, (err, results) => {
        if(err){
            return res.status(404).json({ error: 'There is no active projects' });
        }
        res.status(200).json( results[0] )
    })
}

module.exports = { getActiveProjects }