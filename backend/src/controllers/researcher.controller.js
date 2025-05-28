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
        otherEducationalDeliverable, otherDiffusionDeliverable, otherCurrentBudget,
        otherInvestmentBudget,

        // Arreglos
        associatedProjects,
        members,
        collaborativeInstitutions,
        specificObjectives,
        scheduleActivities,
        deliverables1,
        deliverables2,
        deliverables3,
        budgets, 
        goals,
        methodologies,
        references,
        extras1, 
        extras2, 
        extras3,


        // Usuario
        userId 
    } = req.body;
    const transformDeliverables = (deliverablesArray) => {
        return deliverablesArray.map(deliv => {
            const { id: deliverableId, values } = deliv;
            if (values && typeof values === 'object') {
                return Object.entries(values).map(([deliverableTypeId, quantity]) => ({
                    deliverableId,
                    deliverableTypeId: Number(deliverableTypeId),
                    quantity
                }));
            }
            return [];
        }).flat();
    };

    // Combinar y transformar todos los deliverables
    const transformedDeliverables = [
        ...transformDeliverables(deliverables1 || []),
        ...transformDeliverables(deliverables2 || []),
        ...transformDeliverables(deliverables3 || [])
    ];


    // Convertir arreglos a JSON string
    const associatedProjectsJSON = JSON.stringify(associatedProjects);
    const membersJSON = JSON.stringify(members);
    const collaborativeInstitutionsJSON = JSON.stringify(collaborativeInstitutions);
    const specificObjectivesJSON = JSON.stringify(specificObjectives);
    const scheduleActivitiesJSON = JSON.stringify(scheduleActivities);
    const deliverablesJSON = JSON.stringify(transformedDeliverables);
    const budgetsJSON = JSON.stringify(budgets); 
    const goalsJSON = JSON.stringify(goals);
    const methodologiesJSON = JSON.stringify(methodologies);
    const referencesJSON = JSON.stringify(references);
    const extras1JSON = JSON.stringify(extras1);
    const extras2JSON = JSON.stringify(extras2);
    const extras3JSON = JSON.stringify(extras3);


    const projectStartDate = new Date(startDate);
    const year = projectStartDate.getFullYear();
    const month = String(projectStartDate.getMonth() + 1).padStart(2, '0');

    const countQuery = `SELECT COUNT(*) AS count FROM projects WHERE YEAR(startDate) = ? AND MONTH(startDate) = ?`;

    pool.query(countQuery, [year, month], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error generating folio' });
        }

        const count = result[0].count + 1;
        const consecutivo = String(count).padStart(4, '0');
        const folio = `CICATAMOR/SICIT/${year}/${month}/${consecutivo}`;

        const query = `CALL createProject(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        const values = [
            // Proyecto
            title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary,
            introduction, background, statementOfProblem, justification, hypothesis, generalObjective,
            ethicalAspects, workWithHumans, workWithAnimals, biosecurityConsiderations,
            contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio,
            otherTypeResearch, alignsWithPNIorODS, hasCollaboration, collaborationJustification,
            otherEducationalDeliverable,otherDiffusionDeliverable, otherCurrentBudget, otherInvestmentBudget,

            // JSONs
            associatedProjectsJSON,
            membersJSON,
            collaborativeInstitutionsJSON,
            specificObjectivesJSON,
            scheduleActivitiesJSON,
            deliverablesJSON,
            budgetsJSON,
            goalsJSON,
            methodologiesJSON,
            referencesJSON,
            extras1JSON,
            extras2JSON,
            extras3JSON,

            // Usuario
            userId
        ];

        pool.query(query, values, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error creating project' });
            }
            
            const projectId = results[0][0].projectId;
            res.status(201).json({ message: 'Project created successfully', projectId});
        });
    });
};


const uploadDocuments = (req, res) => {
    const projectId = req.body.projectId;
    const tag = req.body.tag;
    const documents = req.files; //se obtienen del multer.array()

    if (!documents || documents.length === 0) {
        return res.status(400).json({ error: 'No documents were uploaded' });
    }

    const query = 'CALL uploadDocument(?, ?, ?, ?)';

    documents.forEach((doc) => {
        const filename = doc.originalname.split('.').slice(0, -1).join('.')
        pool.query(query, [doc.buffer, projectId, tag, filename], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error uploading documents' });
            }
        });
    });

    res.status(200).json({ message: 'Documents uploaded successfully' });
};

const getProjectDocuments = (req, res) => {
    const { projectId } = req.params;
    const query = 'CALL getProjectDocuments(?)';
  
    pool.query( query, [projectId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener documentos del proyecto' });
      }
  
      const documents = results[0].map(row => ({
        annexeId: row.annexeId,
        projectId: row.projectId,
        tag: row.tag,
        filename: row.filename,
        document: row.document ? Buffer.from(row.document).toString('base64') : null
      }));
      res.status(200).json({ documents });
    });
};

const getCommitteeComments = (req, res) => {
  const { projectId } = req.params;
  const sql = 'CALL getCommitteeComments(?)';

  pool.query(sql, [projectId], (err, results) => {
    if (err) {
      console.error("Error fetching committee comments:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const [comments] = results;
    if (!comments.length) {
      return res.status(404).json({ message: "No comments found" });
    }

    return res.status(200).json(comments);
  });
};


const updateProject = (req, res) => {
  const projectId = req.params.projectId;
  const {
    // Datos principales
    title, startDate, endDate, typeResearch, otherTypeResearch, topic, subtopic, alignmentPNIorODS,
    alignsWithPNIorODS, summary, introduction, background, statementOfProblem,
    justification, hypothesis, generalObjective, ethicalAspects, workWithHumans,
    workWithAnimals, biosecurityConsiderations, contributionsToIPNandCICATA,
    conflictOfInterest, aditionalComments, folio, hasCollaboration,
    collaborationJustification, otherEducationalDeliverable, otherDiffusionDeliverable,
    otherCurrentBudget, otherInvestmentBudget,

    // Arreglos (pueden ser nulos)
    associatedProjects = null,
    members = null,
    collaborativeInstitutions = null,
    scheduleActivities = null,
    deliverables1 = null,
    deliverables2 = null,
    deliverables3 = null,
    budgets = null,
    goals = null,
    methodologies = null,
    references = null,
    specificObjectives = null,
    extras1 = null,
    extras2 = null,
    extras3 = null,
  } = req.body;

    const transformDeliverables = (deliverablesArray) => {
        return deliverablesArray.map(deliv => {
            const { id: deliverableId, values } = deliv;
            if (values && typeof values === 'object') {
                return Object.entries(values).map(([deliverableTypeId, quantity]) => ({
                    deliverableId,
                    deliverableTypeId: Number(deliverableTypeId),
                    quantity
                }));
            }
            return [];
        }).flat();
    };

    // Combinar y transformar todos los deliverables
    const transformedDeliverables = [
        ...transformDeliverables(deliverables1 || []),
        ...transformDeliverables(deliverables2 || []),
        ...transformDeliverables(deliverables3 || [])
    ];

  const sql = `CALL updateProject(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    projectId,
    title,
    startDate,
    endDate,
    typeResearch,
    topic,
    subtopic,
    alignmentPNIorODS,
    summary,
    introduction,
    background,
    statementOfProblem,
    justification,
    hypothesis,
    generalObjective,
    ethicalAspects,
    workWithHumans,
    workWithAnimals,
    biosecurityConsiderations,
    contributionsToIPNandCICATA,
    conflictOfInterest,
    aditionalComments,
    folio,
    otherTypeResearch,               
    alignsWithPNIorODS,
    hasCollaboration,
    collaborationJustification,
    otherEducationalDeliverable,
    otherDiffusionDeliverable,
    otherCurrentBudget,
    otherInvestmentBudget,

    // Los JSON deben convertirse a strings
    associatedProjects ? JSON.stringify(associatedProjects) : null,
    members ? JSON.stringify(members) : null,
    collaborativeInstitutions ? JSON.stringify(collaborativeInstitutions) : null,
    scheduleActivities ? JSON.stringify(scheduleActivities) : null,
    JSON.stringify(transformedDeliverables),
    budgets ? JSON.stringify(budgets) : null,
    goals ? JSON.stringify(goals) : null,
    methodologies ? JSON.stringify(methodologies) : null,
    references ? JSON.stringify(references) : null,
    specificObjectives ? JSON.stringify(specificObjectives) : null,
    extras1 ? JSON.stringify(extras1) : null,
    extras2 ? JSON.stringify(extras2) : null,
    extras3 ? JSON.stringify(extras3) : null
  ];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error al actualizar el proyecto:', err);
      return res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
    return res.status(200).json({ message: 'Proyecto actualizado correctamente',projectId: values[0] });
  });
};


module.exports = { getActiveProjects, getInactiveProjects, createProject, uploadDocuments, 
                 getProjectDocuments, getCommitteeComments, updateProject }