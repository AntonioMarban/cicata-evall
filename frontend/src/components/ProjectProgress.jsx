import { useState, useEffect } from "react";
import "../styles/commentscommittee.css";
import { useNavigate } from "react-router-dom";
import { saveMultipleForms, hasFormsInRange  } from "../db/index";
import useLoadFormData from "../hooks/useLoadFormData";
import { toast } from 'sonner'

export default function ProjectProgress({ projectId,status }) {
    const [isEnabledButton, setIsEnabledButton] = useState();
    const [isAvailableToModify, setIsAvailableToModify] = useState();
    const [generalData, setGeneralData] = useState(
        {   idF: 20,
            projectId
        });
    const [deliverables, setDeliverables] = useState({
        idF: 29,
        deliverables1: [
        {id:1, name:"Tesis (Alumnos titulados)"},
        {id:2, name:"Practicantes profesionales"},
        {id:3, name:"Alumnos PIFI"},
        {id:4, name:"Prestante del servicio social"},
        ],
        deliverables2: [
        {id:6, name:"Artículo de divulgación"},
        {id:7, name:"Congresos"},
        {id:8, name:"Cursos"},
        {id:9, name:"Libros"},
        {id:10, name:"Conferencias o ponencias"},
        {id:11, name:"Articulos cientifico"},
        {id:12, name:"Seminarios"},
        {id:13, name:"Manuales"},
        {id:14, name:"Programas de Radio y/o TV"},
        ],
        deliverables3: [
        {id:16, name:"Proceso"},
        {id:17, name:"Patente"},
        {id:18, name:"Hardware"},
        {id:19, name:"Prototipo"},
        {id:20, name:"Certificado de inversión"},
        {id:21, name:"Software"},
        ],
        extras1:[],
        extras2:[],
        extras3:[]
    });
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState([]);
    const [projectData, setProjectData] = useState();
    const [files,setFiles] = useState()
    const fetchData = (url, setData) => {
    fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        },
    })
        .then(res => res.json())
        .then(data => {
            setData(data); 
        const flattened = Object.values(data.idf31.budgets).flat();

        setData(prev => ({
            ...prev,
            idf31: {
                ...prev.idf31,
                budgets: flattened
            }
            }));
        setData(prev => ({
            ...prev,
            idf26: {
                ...prev.idf26,
                efilesSend: []
            }
            }));
        setData(prev => ({
            ...prev,
            idf33: {
                ...prev.idf33,
                afilesSend: []
            }
            }));
        })
        
        .catch(error => console.error("Error fetching data:", error));
    };    

    const navigateToForms = async (files, e) => {
        if(generalData.projectId != projectId){
            return toast.error("Primero debes terminar de editar el primer proyecto")
        }
        try {
            const { idf26, idf33 } = await readFiles(files, e);
            const { idf29 } = await handleClic();

            const updatedProjectData = {
                ...projectData,
                idf26: {
                    ...projectData.idf26,
                    efilesSend: [...projectData.idf26.efilesSend, ...idf26.efilesSend]
                },
                idf29: {
                    ...projectData.idf29,
                    deliverables1: idf29.deliverables1,
                    deliverables2: idf29.deliverables2, 
                    deliverables3: idf29.deliverables3,                  
                },
                idf33: {
                    ...projectData.idf33,
                    afilesSend: [...projectData.idf33.afilesSend, ...idf33.afilesSend]
                }
            };

            const result = await saveMultipleForms(updatedProjectData);
            if (result) {
                navigate('/Editar-proyecto');
            } else {
                console.error("Save error:", result.error);
            }
        } catch (error) {
            console.error("Processing error:", error);
        }
    };
    const readFiles = (files, e) => {
        return new Promise((resolve) => {
            e.preventDefault();
            const updates = {
                idf26: { efilesSend: [] },
                idf33: { afilesSend: [] }
            };

            Object.values(files).forEach(fileList => {
                fileList.forEach(file => {
                    if (file.tag === "anexos") {
                        updates.idf33.afilesSend.push(file);
                    } else if (file.tag === "eticos") {
                        updates.idf26.efilesSend.push(file);
                    }
                });
            });

            setProjectData(prev => {
                const newState = {
                    ...prev,
                    idf26: {
                        ...prev.idf26,
                        efilesSend: [...(prev.idf26.efilesSend || []), ...updates.idf26.efilesSend]
                    },
                    idf33: {
                        ...prev.idf33,
                        afilesSend: [...(prev.idf33.afilesSend || []), ...updates.idf33.afilesSend]
                    }
                };
                return newState;
            });

            resolve(updates);
        });
    };
    useEffect(() => {
        fetchData(`${apiUrl}/researchers/projects/${projectId}/comments`, setComments);
        fetchData(`${apiUrl}/users/projects/${projectId}`, setProjectData);
        fetchData(`${apiUrl}/researchers/projects/${projectId}/documents`,setFiles);
    }, [projectId]);
    
    useEffect(()=>{
        status === "Pendiente de correcciones" ? setIsEnabledButton(true) : setIsEnabledButton(false)
        const result = async () =>{
            const resultArray = await hasFormsInRange(20, 33);
            setIsAvailableToModify(resultArray)
        }
        result()
    },[])
    
    useLoadFormData(generalData.idF,setGeneralData);
    
    const checkForms = async () => {
        const forms = await hasFormsInRange(20, 33);
        console.log("Formularios encontrados:", forms);
        if(forms){
            if(generalData.projectId != projectId){
                 return toast.error("Primero debes terminar de editar el primer proyecto")
            }
            else{
                navigate("/Editar-proyecto")
            }
        }
        else{
            toast.error("No hay datos para editar")
        }
    };

    const handleClic = () =>{
        return new Promise((resolve) => {
            const deliverables1 = deliverables.deliverables1.map(item => {
                const match = projectData.idf29.deliverables1.find(val => val.id === item.id);
                return match ? { ...item, values: match.values } : item;
            });

            const deliverables2 = deliverables.deliverables2.map(item => {
                const match = projectData.idf29.deliverables2.find(val => val.id === item.id);
                return match ? { ...item, values: match.values } : item;
            });

            const deliverables3 = deliverables.deliverables3.map(item => {
                const match = projectData.idf29.deliverables3.find(val => val.id === item.id);
                return match ? { ...item, values: match.values } : item;
            });
        const updates = {
            idf29: { deliverables1, deliverables2, deliverables3 }
        };
            resolve(updates)
        });
    }
    return (
    <main className="w-[100%] flex justify-center">
        <div className="w-[100%] !p-14">
            <div>
                <h2 className="font-semibold text-lg !mb-10">Comentarios</h2>
                {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className="!mb-10">
                    <p className="font-medium text-lg">{comment.committeeName}</p>
                    <p className="font-light">{comment.comments}</p>
                    </div>
                ))
                ) : (
                <p>No hay comentarios aún.</p>
                )}
            </div>
            {isEnabledButton && (
                <div className="flex w-full justify-end">
                    {isAvailableToModify &&(
                    <button onClick={checkForms} className="bg-[#5cb7e6] text-white border-none py-2.5 px-5 rounded-[10px] cursor-pointer text-base mr-5 hover:bg-[#47a2d3]">Continuar con correcciones</button>
                    )}
                    {!isAvailableToModify &&(
                    <button onClick={(e)=>{navigateToForms(files,e)}} className="bg-[#5cb7e6] text-white border-none py-2.5! px-5! rounded-[10px] cursor-pointer text-base mr-5 hover:bg-[#47a2d3]">Realizar correcciones</button>
                    )}
                </div>
            )}
        </div>
    </main>
    );
}
