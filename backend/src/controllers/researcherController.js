const pool = require('../helpers/mysql_config'); 

const getActiveProjects = (req, res) => {
    const userId = req.params.userId
    const query = 'CALL getActiveProjects(?)';

    pool.query(query, [userId], (err, results) => {
        if(err){
            return res.status(404).json({ error: 'There is no active projects' });
        }
        res.status(200).json( results[0] )
    })
}

const getInactiveProjects = (req, res) => {
    const userId = req.params.userId
    const query = 'CALL getInactiveProjects(?)';

    pool.query(query, [userId], (err, results) => {
        if(err){
            return res.status(404).json({ error: 'There is no inactive projects' });
        }
        res.status(200).json( results[0] )
    })
}

const createProject = async (req, res) => {
    const {
        //proyecto
        title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary,
        introduction, background, statementOfProblem, justification, hypothesis, generalObjective,
        ethicalAspects, workWithHumans, workWithAnimals, biosecurityConsiderations,
        contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio, status,

        // Arreglos
        associatedProjects,
        members,
        collaborativeInstitutions,
        scheduleActivities,
        deliverables,
        budgets, 

        // Usuario
        userId 
    } = req.body;

    // Convertir arreglos a JSON string
    const associatedProjectsJSON = JSON.stringify(associatedProjects);
    const membersJSON = JSON.stringify(members);
    const collaborativeInstitutionsJSON = JSON.stringify(collaborativeInstitutions);
    const scheduleActivitiesJSON = JSON.stringify(scheduleActivities);
    const deliverablesJSON = JSON.stringify(deliverables);
    const budgetsJSON = JSON.stringify(budgets); 

    // Nueva query con 31 parámetros
    const query = `CALL createProject(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
        // Proyecto
        title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary,
        introduction, background, statementOfProblem, justification, hypothesis, generalObjective,
        ethicalAspects, workWithHumans, workWithAnimals, biosecurityConsiderations,
        contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio, status,

        // JSONs
        associatedProjectsJSON,
        membersJSON,
        collaborativeInstitutionsJSON,
        scheduleActivitiesJSON,
        deliverablesJSON,
        budgetsJSON,

        // Usuario
        userId
    ];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating project' });
        }

        res.status(201).json({ message: 'Project created successfully' });
    });
};

module.exports = { getActiveProjects, getInactiveProjects, createProject }