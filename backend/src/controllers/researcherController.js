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

        //proyecto asociado
        associatedProjectName, associationDate, externalRegister, SIPRegister,

        //miembros
        memberFName, memberLastName1, memberLastName2, memberEmail, memberInstitution, memberPositionWork,
        memberResearchNetwork, memberResearchNetworkName, memberAcademicDegree, memberLevelName,
        memberLevelNum, memberTutorName,

        //instituciones colaboradoras
        collabInstitutionName, partOfIPN, collaborationAgreement, agreementType, agreementNumber,

        //actividades
        goal, institution, responsibleMember, scheduleStartDate, scheduleEndDate,

        //entregables (arreglo)
        deliverables,

        //presupuesto
        investmentExpenditure, budgetName, expenditure,

        //usuario
        userId 
    } = req.body;

    const deliverablesJSON = JSON.stringify(deliverables);

    const query = `CALL createProject(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
                                        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const values = [
        //proyecto
        title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary, introduction, background,
        statementOfProblem, justification, hypothesis, generalObjective, ethicalAspects, workWithHumans, workWithAnimals,
        biosecurityConsiderations, contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio, status,

        //proyecto asociado
        associatedProjectName, associationDate, externalRegister, SIPRegister,

        //miembros
        memberFName, memberLastName1, memberLastName2, memberEmail, memberInstitution, memberPositionWork,
        memberResearchNetwork, memberResearchNetworkName, memberAcademicDegree, memberLevelName,
        memberLevelNum, memberTutorName,

        //instituciones colaboradoras
        collabInstitutionName, partOfIPN, collaborationAgreement, agreementType, agreementNumber,

        //actividades
        goal, institution, responsibleMember, scheduleStartDate, scheduleEndDate,

        //entregables
        deliverablesJSON,

        //presupuesto
        investmentExpenditure, budgetName, expenditure,

        //usuario
        userId 
    ];

    pool.query(query, values, (error, results) => {
        if (error) {
            //console.log('lo que envio:', values);
            return res.status(500).json({ error: 'Error creating project' });
        }

        res.status(201).json({ message: 'Project created successfully' });
    });
};

module.exports = { getActiveProjects, getInactiveProjects, createProject }