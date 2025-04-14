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

module.exports = { createUser }