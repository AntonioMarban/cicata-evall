const pool = require('../helpers/mysql_config');

/*
    Función para obtener la firma del acuerdo de un proyecto de un usuario que sea evaluador
    Se hace uso de un procedimiento almacena getAgreementSignature
    @param userId: Id del miembro del comité
    @param projectId: Id del proyecto
    @returns: Dato booleano que indica si el evaluador ha firmado el acuerdo, 
    además del nombre del proyecto y el investigador a cargo
*/
const getAgreementSignature = (req, res) => {
    const { userId, projectId } = req.params;

    const sql = `CALL getAgreementSignature(?, ?)`;
    const values = [userId, projectId];
    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error obtaining agreement signature:", err);
            return res
                .status(400)
                .json({ error: "Invalid query parameters" });
        }
        if (results.length === 0) {
            return res
                .status(404)
                .json({
                    error: "Resource does not exist",
                });
        }
        return res.status(200).json(results[0]);
    });
};

/*
    Función para firmar el acuerdo de un proyecto de cualquier usuario que sea evaluador
    Se hace uso de un procedimiento almacena updateAgreementSignature
    @param userId: Id del miembro del comité
    @param projectId: Id del proyecto
    @returns: Mensaje de éxito o error
*/
const updateAgreementSignature = (req, res) => {
    const { email, password } = req.body;
    const { userId, projectId } = req.params;

    const sql = `CALL updateAgreementSignature(?, ?, ?, ?)`;
    const values = [userId, projectId, email, password];
    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error updating agreement signature:", err);
            return res
                .status(400)
                .json({ error: "Invalid credentials" });
        }
        if (results.length === 0) {
            return res
                .status(404)
                .json({
                    error: "Resource does not exist",
                });
        }
        return res
            .status(200)
            .json({ message: "Agreement signed" });
    });
};

/* 
  Función para obtener datos resumen de un proyecto
  Se hace uso de un procedimiento almacena getProjectSummary
  @param projectId: Id del proyecto
  @returns: Datos resumen del proyecto
*/
const getProjectSummary = (req, res) => {
    const { projectId } = req.params;

    const sql = `CALL getProjectSummary(?)`;
    const values = [projectId];
    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error obtaining project summary:", err);
            return res
                .status(400)
                .json({ error: "Invalid query parameters" });
        }
        if (results.length === 0) {
            return res
                .status(404)
                .json({
                    error: "Resource does not exist",
                });
        }
        return res.status(200).json(results[0]);
    });
}


const groupDeliverables = (deliverables) => {
    const deliverables1 = [
        'Tesis (Alumnos titulados)', 'Practicantes profesionales', 'Alumnos PIFI',
        'Prestante del servicio social', 'Otro (especificar)'
    ];
    const deliverables2 = [
        'Artículo de divulgación', 'Congresos', 'Cursos', 'Libros',
        'Conferencias o ponencias', 'Artículos científico', 'Seminarios',
        'Manuales', 'Programas de Radio y/o TV', 'Otro, especificar'
    ];
    const deliverables3 = [
        'Proceso','Patente', 'Hardware', 'Prototipo', 'Certificado de inversión',
        'Software', 'Otro (especificar)'
    ];

    const grouped = {
        deliverables1: new Map(),
        deliverables2: new Map(),
        deliverables3: new Map()
    };

    deliverables.forEach(item => {
        const group =
            deliverables1.includes(item.name) ? 'deliverables1' :
                deliverables2.includes(item.name) ? 'deliverables2' :
                    deliverables3.includes(item.name) ? 'deliverables3' : null;

        if (!group) return;

        const key = item.deliverableId;

        if (!grouped[group].has(key)) {
            grouped[group].set(key, {
                id: item.id,
                name: item.name,
                values: {}
            });
        }

        grouped[group].get(key).values[item.deliverableTypeId] = item.quantity;
    });

    return {
        deliverables1: Array.from(grouped.deliverables1.values()),
        deliverables2: Array.from(grouped.deliverables2.values()),
        deliverables3: Array.from(grouped.deliverables3.values())
    };
};

/*
    Función para obtener dictum de un proyecto
    Se hace uso de un procedimiento almacena getDictum
    @param projectId: Id del proyecto
    @returns: Dictum del proyecto
*/
const getDictum = (req, res) => {
    const { projectId } = req.params;
    const sql = `CALL getDictum(?)`;
    const values = [projectId];
    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error obtaining project dictum:", err);
            return res
                .status(400)
                .json({ error: "Invalid query parameters" });
        }
        if (results.length === 0) {
            return res
                .status(404)
                .json({
                    error: "Resource does not exist",
                });
        }
        const response = {
            dictumFolio: results[0][0].dictumFolio,
            decision: results[0][0].decision,
            authorizationDate: results[0][0].authorizationDate,
            authorizerAcademicDegree: results[0][0].authorizerAcademicDegree,
            authorizerName: results[0][0].authorizerName,
            projectFolio: results[1][0].projectFolio,
            projectTitle: results[1][0].projectTitle,
            projectOwnerAcademicDegree: results[1][0].projectOwnerAcademicDegree,
            projectOwner: results[1][0].projectOwner
        };
        return res.status(200).json(response);
    });
};

const groupExtras = (extras) => {
    const map = new Map();

    extras.forEach(({ name, quantity, deliverableTypeId }) => {
        if (!map.has(name)) {
            map.set(name, {
                name,
                values: {}
            });
        }
        map.get(name).values[deliverableTypeId] = quantity;
    });

    return Array.from(map.values());
};

const groupBudgets = (budgets) => {
    const grouped = {
        gastoInversion: [],
        gastoCorriente: [],
        internas: [],
        externas: []
    };

    // Mapear cada tipo de budgetTypeId a su categoría
    const typeMap = {
        // Gasto de Inversión
        1: 'gastoInversion',
        2: 'gastoInversion',
        3: 'gastoInversion',
        4: 'gastoInversion',

        // Gasto Corriente
        5: 'gastoCorriente',
        6: 'gastoCorriente',
        7: 'gastoCorriente',
        8: 'gastoCorriente',
        9: 'gastoCorriente',
        10: 'gastoCorriente',
        11: 'gastoCorriente',
        12: 'gastoCorriente',
        13: 'gastoCorriente',
        14: 'gastoCorriente',
        15: 'gastoCorriente',
        16: 'gastoCorriente',

        // Internas
        17: 'internas',
        18: 'internas',
        19: 'internas',
        20: 'internas',
        21: 'internas',
        22: 'internas',
        24: 'internas',

        // Externas
        23: 'externas'
    };
    console.log(budgets)
    budgets.forEach(budget => {
        const groupKey = typeMap[budget.budgetTypeId];
        if (!groupKey) return;

        grouped[groupKey].push({
        budgetTypeId: budget.budgetTypeId,
        idType: budget.budgetSectionId,
        nameType: budget.type_name || budget.name || '',
        nameSection: budget.section_name || '',
        expenditure: budget.expenditure,
        //idType: budget.budgetstId,
        budgetDate: budget.budgetDate ? new Date(budget.budgetDate).toISOString().split('T')[0] : '',
        otherName: budget.otherName || '',
        investmentExpenditure: budget.investmentExpenditure || 0,
        project_id: budget.project_id || null
        });
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
            specificObjectives,
            scheduleActivities,
            deliverables,
            extras1,
            extras2,
            extras3,
            budgets,
            goals,
            methodologies,
            references,
            investigator,
            annexes
        ] = results;

        // todo se obtiene como arreglos de objetos(esto de los arreglos le ahorraba tiempo a Gordinho)
        const grouped = groupDeliverables(deliverables || []);
        const groupedBudgets = groupBudgets(budgets || []);
        const response = {
            idf20: {
                idF: 20,
                title: projectInfo[0]?.title || '',
                startDate: projectInfo[0]?.startDate || '',
                endDate: projectInfo[0]?.endDate || '',
                folio: projectInfo[0]?.folio || '',
                typeResearch: parseInt(projectInfo[0]?.typeResearch) || '',
                alignmentPNIorODS: projectInfo[0]?.alignmentPNIorODS || '',
                alignsWithPNIorODS: projectInfo[0]?.alignsWithPNIorODS || '',
                otherTypeResearch: projectInfo[0]?.otherTypeResearch || '',
                subtopic: projectInfo[0]?.subtopic || '',
                summary: projectInfo[0]?.summary || '',
                topic: projectInfo[0]?.topic || '',
                status: projectInfo[0]?.status || ''
            },
            idf21: {
                idF: 21,
                associatedProjects: associatedProjects || []
            },
            idf22: {
                idF: 22,
                members: members || []
            },
            idf23: {
                idF: 23,
                hasCollaboration: projectInfo[0]?.hasCollaboration || 0,
                collaborationJustification: projectInfo[0]?.collaborationJustification || '',
                collaborativeInstitutions: collaborativeInstitutions || []
            },
            idf24: {
                idF: 24,
                introduction: projectInfo[0]?.introduction || '',
                background: projectInfo[0]?.background || '',
                statementOfProblem: projectInfo[0]?.statementOfProblem || '',
                justification: projectInfo[0]?.justification || '',
                generalObjective: projectInfo[0]?.generalObjective || '',
                hypothesis: projectInfo[0]?.hypothesis || '',
                specificObjectives: specificObjectives || []
            },
            idf25: {
                idF: 25,
                goals: goals || [],
                references: references || [],
                methodologies: methodologies || []
            },
            idf26: {
                idF: 26,
                ethicalAspects: projectInfo[0]?.ethicalAspects || '',
                workWithHumans: projectInfo[0]?.workWithHumans || 0,
                workWithAnimals: projectInfo[0]?.workWithAnimals || 0
            },
            idf27: {
                idF: 27,
                biosecurityConsiderations: projectInfo[0]?.biosecurityConsiderations || ''
            },
            idf28: {
                idF: 28,
                scheduleActivities: scheduleActivities || []
            },
            idf29: {
                idF: 29,
                ...grouped,
                extras1: groupExtras(extras1 || []),
                extras2: groupExtras(extras2 || []),
                extras3: groupExtras(extras3 || [])
            },
            idf30: {
                idF: 30,
                contributionsToIPNandCICATA: projectInfo[0]?.contributionsToIPNandCICATA || ''
            },
            idf31: {
                idF: 31,
                budgets: groupedBudgets || []
            },
            idf32: {
                idF: 32,
                conflictOfInterest: projectInfo[0]?.conflictOfInterest || ''
            },
            idf33: {
                idF: 33,
                aditionalComments: projectInfo[0]?.aditionalComments || ''
            },
            idf34: {
                idF: 34,
                formVersion: projectInfo[0]?.formVersion || '',
                nextReview: projectInfo[0]?.nextReview || '',
                preparedBy: projectInfo[0]?.preparedBy || '',
                reviewedBy: projectInfo[0]?.reviewedBy || '',
                approvedBy: projectInfo[0]?.approvedBy || '',
                preparedDate: projectInfo[0]?.preparedDate || '',
                reviewedDate: projectInfo[0]?.reviewedDate || '',
                approvedDate: projectInfo[0]?.approvedDate || ''
            },
            investigator: investigator.length > 0 ? investigator[0] : null,
            idf35: {
                idF: 35,
                annexes: annexes || []
            }
        };

        res.status(200).json(response);
    });
};


module.exports = {
    updateAgreementSignature,
    getAgreementSignature,
    getProjectSummary,
    getDictum,
    getProjectDetails
};