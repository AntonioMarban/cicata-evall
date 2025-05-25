import { useState, useEffect } from "react";
import "../styles/commentscommittee.css";
import ProjectHeader from "../components/ProjectHeader";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { saveMultipleForms  } from "../db/index";
const CommentsCommittee = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [projectData, setProjectData] = useState(null);

    const fetchData = (url, setData) => {
    fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
    })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
    if (!id) return;

    fetchData(`${apiUrl}/projects/${id}/comments`, setComments);

    async function fetchProjectData() {
        try {
        const response = await fetch(`${apiUrl}/researchers/projects/${id}`);
        const data = await response.json();
        if (data.project && data.project.length > 0) {
            setProjectData(data.project[0]);
        }
        } catch (error) {
        console.error("Error fetching project data:", error);
        } finally {
        setLoading(false);
        }
    }

    fetchProjectData();
    }, [id]);

    if (loading) {
        return <div className="background-comments">Cargando...</div>;
    }
    const formsToSave = {
    idf1: {
        idF: 1,
        title: '543543',
        startDate: '2025-05-13',
        endDate: '2025-05-23',
        typeResearch: 1,
        alignmentPNIorODS: "345",
        alignsWithPNIorODS: 1,
        otherTypeResearch: "",
        subtopic: "435",
        summary: "34534543",
        topic: "53453"
    },
    idf2: {
        idF: 2,
        associatedProjects: [
            {
                SIPRegister: "rwerwe",
                associationDate: "2025-05-15",
                externalRegister: "erwer",
                name: "werwe",
                project_type: "werw"
            }
        ]
    },
    idf3: {
        idF: 3,
        members: [
            {
                academicDegree: "werwer",
                email: "werwer",
                fName: "werew",
                institution: "werwer",
                lastName1: "r",
                lastName2: "wer",
                levelName: "EDI",
                levelNum: "III",
                positionWork: "rwe",
                researchNetwork: 1,
                researchNetworkName: "wer",
                tutorName: "werwer"
            }
        ]
    },
    idf4: {
        idF: 4,
        hasCollaboration: 1,
        collaborationJustification: "",
        collaborativeInstitutions: [
            {
                agreementNumber: "rwerwe",
                agreementType: "rwerwe",
                collaborationAgreement: "werwe",
                institutionName: "rwer",
                partOfIPN: 1
            }
        ]
    },
    idf5: {
        idF: 5,
        introduction: 'wer',
        background: 'werwe',
        statementOfProblem: 'rwe',
        justification: 'wer',
        generalObjective: "rwerwer",
        hypothesis: "werwe",
        sObjectives: [
            {
                objectiveName: "rwwerwer"
            }
        ]
    },
    idf6: {
        idF: 6,
        goals: [
            {
                goalName: "werwer"
            }
        ],
        references: [
            {
                referenceName: "werwerwe"
            }
        ],
        methodologies: [
            {
                methodologyName: "rwetgwetwe"
            }
        ]
    },
    idf7: {
        idF: 7,
        ethicalAspects: 'twetwetwe',
        workWithHumans: 1,
        workWithAnimals: 0,
        efilesSend: [
            {
                name: 'archivo-9.pdf',
                lastModified: 1747326606336,
                size: 157737
            }
        ]
    },
    idf8: {
        idF: 8,
        biosecurityConsiderations: 'twetewtwetew'
    },
    idf9: {
        idF: 9,
        scheduleActivities: [
            {
                endDate: "2025-05-29",
                goal: "wetwe",
                institution: "twetwetw",
                responsibleMember: "werew r wer",
                startDate: "2025-05-28"
            }
        ]
    },
    idf10: {
        idF: 10,
        deliverables1: [
            {
                id: 1,
                name: "Tesis (Alumnos titulados)",
                values: {1: 423}
            },
            {
                id: 2,
                name: "Practicantes profesionales",
                values: {1: 32}
            },
            {
                id: 3,
                name: "Alumnos PIFI",
                values: {1: 23}
            },
            {
                id: 4,
                name: "Prestante del servicio social"
            }
        ],
        deliverables2: [
            {
                id:5, 
                name:"Artículo de divulgación",
                values: {1: 2,2:2,3:3}
            },
            {
                id:6, 
                name:"Congresos",
                values: {1: 2,2:2,3:3}
            },
            {
                id:7, 
                name:"Cursos",
                values: {1: 2,2:2,3:3}
            },
            {
                id:8, 
                name:"Libros",
                values: {1: 2,2:2,3:3}
            },
            {
                id:9, 
                name:"Conferencias o ponencias",
                values: {1: 2,2:2,3:3}
            },
            {
                id:10, 
                name:"Articulos cientifico",
                values: {1: 2,2:2,3:3}
            },
            {
                id:11, 
                name:"Seminarios",
                values: {1: 2,2:2,3:3}
            },
            {
                id:12, 
                name:"Manuales",
                values: {1: 2,2:2,3:3}
            },
            {
                id:13, 
                name:"Programas de Radio y/o TV",
                values: {1: 4}
            }
        ],
        deliverables3: [
            {
                id: 5,
                name: "Proceso",
                values: {1: 6}
            },
            {
                id: 6,
                name: "Patente",
                values: {1: 6}
            },
            {
                id: 7,
                name: "Hardware",
                values: {1: 6}
            },
            {
                id: 8,
                name: "Prototipo",
                values: {1: 7}
            },
            {
                id: 9,
                name: "Certificado de inversión",
                values: {1: 6}
            },
            {
                id: 10,
                name: "Software",
                values: {1: 6}
            }
        ],
        extras1: [
            {
                id: 1,
                name: "Entregable1",
                values: {1: 4324, 2: 54, 3: 5}
            }
        ],
        extras2: [
            {
                id: 1,
                name: "Otro entregable",
                values: {1: 54}
            }
        ],
        extras3: [
            {
                id: 1,
                name: "otro por aca",
                values: {2:10}
            }
        ]
    },
    idf11: {
        idF: 11,
        contributionsToIPNandCICATA: '423423423'
    },
    idf12: {
        idF: 12,
        budgets: [
            {
                expenditure: "2423",
                idName: 8,
                idType: 2,
                name: "Pago por servicios externos",
                nameType: "Gasto Corriente",
                otherName: "23423"
            },
            {
                budgetDate: "",
                expenditure: "4234",
                idName: 2,
                idType: 1,
                name: "Equipo de cómputo",
                nameType: "Gasto de Inversión",
                otherName: ""
            }
        ]
    },
    idf13: {
        idF: 13,
        conflictOfInterest: '534534534'
    },
    idf14: {
        idF: 14,
        aditionalComments: '34534543',
        afilesSend: [
            {
                name: 'archivo-9.pdf',
                lastModified: 1747326606336,
                size: 157737
            }
        ]
    }
    };
    const navigateToForms = () => {
        saveMultipleForms(formsToSave)
        .then(result => {
            if (result.success) {
                console.log("Todos los formularios guardados:", result.results);
            } else {
                console.error("Error al guardar:", result.error);
            }
        });
        navigate('/CrearProyecto');
    }
  return (
    <div className="background-comments">
        {projectData && (
        <ProjectHeader
          title={projectData.title}
          startDate={projectData.startDate}
          endDate={projectData.endDate}
          folio={projectData.folio}
          status={projectData.status}
        />
      )}
      <div>
        <h2>Comentarios</h2>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-box">
              <p><strong>Comité:</strong> {comment.committeeName}</p>
              <p>{comment.comments}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>

      <div className="footer-comments">
        <button onClick={navigateToForms} className="info-button">Realizar correcciones</button>
      </div>
    </div>
  );
};

export default CommentsCommittee;
