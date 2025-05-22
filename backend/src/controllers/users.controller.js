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
    const values = [ userId, projectId];
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
    const values = [ userId, projectId, email, password];
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
    const values = [ projectId];
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

/*
    Función para obtener dictum de un proyecto
    Se hace uso de un procedimiento almacena getDictum
    @param projectId: Id del proyecto
    @returns: Dictum del proyecto
*/
const getDictum = (req, res) => {
    const { projectId } = req.params;
    const sql = `CALL getDictum(?)`;
    const values = [ projectId];
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
            investigator
        ] = results;
        
        // todo se obtiene como arreglos de objetos(esto de los arreglos le ahorraba tiempo a Gordinho)
        const grouped = groupDeliverables(deliverables || []);
        const response = {
            id1: {
                id: 1,
                title: projectInfo[0]?.title || '',
                startDate: projectInfo[0]?.startDate || '',
                endDate: projectInfo[0]?.endDate || '',
                typeResearch: projectInfo[0]?.typeResearch || '',
                alignmentPNIorODS: projectInfo[0]?.alignmentPNIorODS || '',
                alignsWithPNIorODS: projectInfo[0]?.alignsWithPNIorODS || '',
                otherTypeResearch: projectInfo[0]?.otherTypeResearch || '',
                subtopic: projectInfo[0]?.subtopic || '',
                summary: projectInfo[0]?.summary || '',
                topic: projectInfo[0]?.topic || ''
            },
            id2: {
                id: 2,
                associatedProjects: associatedProjects || []
            },
            id3: {
                id: 3,
                members: members || []
            },
            id4: {
                id: 4,
                hasCollaboration: projectInfo[0]?.hasCollaboration || 0,
                collaborationJustification: projectInfo[0]?.collaborationJustification || '',
                collaborativeInstitutions: collaborativeInstitutions || []
            },
            id5: {
                id: 5,
                introduction: projectInfo[0]?.introduction || '',
                background: projectInfo[0]?.background || '',
                statementOfProblem: projectInfo[0]?.statementOfProblem || '',
                justification: projectInfo[0]?.justification || '',
                generalObjective: projectInfo[0]?.generalObjective || '',
                hypothesis: projectInfo[0]?.hypothesis || '',
                specificObjectives: specificObjectives || []
            },
            id6: {
                id: 6,
                goals: goals || [],
                references: references || [],
                methodologies: methodologies || []
            },
            id7: {
                id: 7,
                ethicalAspects: projectInfo[0]?.ethicalAspects || '',
                workWithHumans: projectInfo[0]?.workWithHumans || 0,
                workWithAnimals: projectInfo[0]?.workWithAnimals || 0
            },
            id8: {
                id: 8,
                biosecurityConsiderations: projectInfo[0]?.biosecurityConsiderations || ''
            },
            id9: {
                id: 9,
                scheduleActivities: scheduleActivities || []
            },
            id10: {
                id: 10,
                ...grouped,
                extras1: groupExtras(extras1 || []),
                extras2: groupExtras(extras2 || []),
                extras3: groupExtras(extras3 || [])
            },
            id11: {
                id: 11,
                contributionsToIPNandCICATA: projectInfo[0]?.contributionsToIPNandCICATA || ''
            },
            id12: {
                id: 12,
                budgets: budgets || []
            },
            idf13: {
                idF: 13,
                conflictOfInterest: projectInfo[0]?.conflictOfInterest || ''
            },
            idf14: {
                idF: 14,
                aditionalComments: projectInfo[0]?.aditionalComments || ''
            },
            investigator: investigator.length > 0 ? investigator[0] : null
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