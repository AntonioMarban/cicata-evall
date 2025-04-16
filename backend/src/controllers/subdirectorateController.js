const pool = require('../helpers/mysql_config'); 

const createUser = async (req, res) => {
    const {
      fName,
      lastName1,
      lastName2,
      email,
      password,
      institution,
      positionWork,
      researchNetwork,
      researchNetworkName,
      academicDegree,
      levelName,
      levelNum,
      userType_id
    } = req.body;

    const query = 'CALL createUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [
        fName,
        lastName1,
        lastName2,
        email,
        password,
        institution,
        positionWork,
        researchNetwork,
        researchNetworkName,
        academicDegree,
        levelName,
        levelNum,
        userType_id
      ]

      pool.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating user' });
        }

        res.status(201).json({ message: 'User created successfully' });
    });
};

const getActiveProjectsSub = async (req, res) => {
  const query = 'CALL getActiveProjectsSub()';
  pool.query(query, (error, results) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error fetching inactive projects' });
      }

      const inactiveProjects = results[0]; // Assuming the first result set contains the data
      res.status(200).json(inactiveProjects);
  });
}


const getInactiveProjectsSub = async (req, res) => {
    const query = 'CALL getInactiveProjectsSub()';
    pool.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching inactive projects' });
        }

        const inactiveProjects = results[0]; // Assuming the first result set contains the data
        res.status(200).json(inactiveProjects);
    });
}


module.exports = { 
  createUser,
  getInactiveProjectsSub,
  getActiveProjectsSub
}