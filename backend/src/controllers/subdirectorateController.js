const pool = require('../helpers/mysql_config'); 


/*
    Función para obtener usuarios del rol de la petición
    Se hace uso de un procedimiento almacena getUsersByRole
    @query userType_id: id del rol de usuario
    @return users: lista de usuarios con el rol solicitado
*/

const getUsersByRole = async (req, res) => {
    const { userType_id } = req.query;
    const query = 'CALL getUsersByRole(?)';
    const values = [userType_id];
    pool.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(400).json({ error: 'Invalid query parameters' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Resource does not exist' });
        }
        const users = results[0]; 
        res.status(200).json(users);
    });
};

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

      const inactiveProjects = results[0]; 
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

        const inactiveProjects = results[0]; 
        res.status(200).json(inactiveProjects);
    });
}


/*
    Función para obtener todos los comités existentes
    Se hace uso de un procedimiento almacena getAllCommittees
    @return users: lista de comités existentes
*/
const getAllCommittees = async (req, res) => {
    const query = 'CALL getAllCommittees()';
    pool.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error fetching committees' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No committees found' });
        }
        const committees = results[0]; 
        res.status(200).json(committees);
    });
}

/*
    Función para obtener el presidente y secretario de un comité
    Se hace uso de un procedimiento almacena getCommitteeSecretaryPresident
    @param committee_id: id del comité
    @return secretary: secretario del comité y presidente del mismo
*/
const getCommitteeSecretaryPresident = async (req, res) => {
    const { committeeId } = req.params;
    const query = 'CALL getCommitteeSecretaryPresident(?)';
    const values = [committeeId];
    pool.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(400).json({ error: 'Invalid query parameters' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Resource does not exist' });
        }
        const secretary = results[0][0];
        const president = results[1][0];
        res.status(200).json({ president, secretary });
    });
}


/*
    Función para crear las evaluaciones de la primera etapa, en este caso del 
    CIP, relacionadas a un proyecto
    Se hace uso de un procedimiento almacena createFirstStageEvaluations
    @param projectId: Id del proyecto
    @returns: Mensaje de éxito o error
*/
const createFirstStageEvaluations = async (req, res) => {
    const { projectId } = req.params;
    const query = 'CALL createFirstStageEvaluations(?)';
    const values = [projectId];
    pool.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(400).json({ error: 'Invalid query parameters' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Resource does not exist' });
        }
        res.status(200).json({ message: 'First stage evaluations created successfully' });
    });
}

module.exports = { 
  getUsersByRole,
  createUser,
  getInactiveProjectsSub,
  getActiveProjectsSub,
  getAllCommittees,
  getCommitteeSecretaryPresident,
createFirstStageEvaluations
}