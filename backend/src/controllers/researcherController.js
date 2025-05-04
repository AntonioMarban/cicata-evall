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
        contributionsToIPNandCICATA, conflictOfInterest, aditionalComments,
        otherTypeResearch, alignsWithPNIorODS, hasCollaboration, collaborationJustification,

        // Arreglos
        associatedProjects,
        members,
        collaborativeInstitutions,
        scheduleActivities,
        deliverables,
        budgets, 
        goals,
        methodologies,
        references,

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
    const goalsJSON = JSON.stringify(goals);
    const methodologiesJSON = JSON.stringify(methodologies);
    const referencesJSON = JSON.stringify(references);

    const projectStartDate = new Date(startDate);
    const year = projectStartDate.getFullYear();
    const month = String(projectStartDate.getMonth()).padStart(2, '0');    

    const countQuery = `SELECT COUNT(*) AS count FROM projects WHERE YEAR(startDate) = ? AND MONTH(startDate) = ?`;

    pool.query(countQuery, [year, month], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error generating folio' });
        }

        const count = result[0].count + 1;
        const consecutivo = String(count).padStart(4, '0');
        const folio = `CICATAMOR/SICIT/${year}/${month}/${consecutivo}`;

        const query = `CALL createProject(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [
            // Proyecto
            title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary,
            introduction, background, statementOfProblem, justification, hypothesis, generalObjective,
            ethicalAspects, workWithHumans, workWithAnimals, biosecurityConsiderations,
            contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio, status,
            otherTypeResearch, alignsWithPNIorODS, hasCollaboration, collaborationJustification,

            // JSONs
            associatedProjectsJSON,
            membersJSON,
            collaborativeInstitutionsJSON,
            scheduleActivitiesJSON,
            deliverablesJSON,
            budgetsJSON,
            goalsJSON,
            methodologiesJSON,
            referencesJSON,

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
    });
};


const uploadDocuments = (req, res) => {
    const projectId = req.body.projectId;
    const documents = req.files; //se obtienen del multer.array()

    if (!documents || documents.length === 0) {
        return res.status(400).json({ error: 'No documents were uploaded' });
    }

    const query = 'CALL uploadDocument(?, ?)';

    documents.forEach((doc) => {
        pool.query(query, [doc.buffer, projectId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error uploading documents' });
            }
        });
    });

    res.status(200).json({ message: 'Documents uploaded successfully' });
};

const groupDeliverables = (deliverables) => {
    const educativos = [
        'Tesis (Alumnos titulados)', 'Practicantes profesionales', 'Alumnos PIFI',
        'Prestante de servicio social', 'Otro (especificar)'
    ];

    const difusion = [
        'Artículo de divulgación', 'Congresos', 'Cursos', 'Libros',
        'Conferencias o ponencias', 'Artículo científico', 'Seminarios',
        'Manuales', 'Programas de Radio y/o TV', 'Otro, especificar'
    ];

    const tecnologicos = [
        'Patente', 'Hardware', 'Prototipo', 'Certificado de invención',
        'Software', 'Otro (especificar)'
    ];

    const grouped = {
        educativos: [],
        difusion: [],
        tecnologicos: []
    };

    deliverables.forEach(item => {
        if (educativos.includes(item.name)) {
        grouped.educativos.push(item);
        } else if (difusion.includes(item.name)) {
        grouped.difusion.push(item);
        } else if (tecnologicos.includes(item.name)) {
        grouped.tecnologicos.push(item);
        }
    });

    return grouped;
};

const getProjectDetails = (req, res) => {
    const projectId = req.params.projectId;
    const query = 'CALL getProjectDetails(?)';

    pool.query(query, [projectId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching project details' });
        }

        const [
            projectInfo,
            associatedProjects,
            members,
            collaborativeInstitutions,
            scheduleActivities,
            deliverables,
            budgets,
            goals,
            methodologies,
            references,
            investigator
        ] = results;
        
        // todo se obtiene como arreglos de objetos(esto de los arreglos le ahorraba tiempo a Gordinho)
        res.status(200).json({
            project: projectInfo.length > 0 ? [projectInfo[0]] : [], // meto el objeto dentro de un arreglo
            associatedProjects: associatedProjects || [],
            members: members || [],
            collaborativeInstitutions: collaborativeInstitutions || [],
            scheduleActivities: scheduleActivities || [],
            deliverables: groupDeliverables(deliverables) || [],
            budgets: budgets || [],
            goals: goals || [],
            methodologies: methodologies || [],
            references: references || [],
            investigator: investigator.length > 0 ? investigator[0] : null
        });
    });
};


module.exports = { getActiveProjects, getInactiveProjects, createProject, uploadDocuments, getProjectDetails }