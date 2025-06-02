import { useState, useEffect } from 'react';
import "../styles/viewcompleteforms.css"
import ViewGeneralData from './ViewForm/GeneralData';
import Members from './ViewForm/Members';
import CollaborativeInstitutions from './ViewForm/CollaborativeInstitutions';
import Desglose from './ViewForm/Desglose';
import EthicalAspects from './ViewForm/EthicalAspects';
import Biosecurity from './ViewForm/Biosecurity';
import Activities from './ViewForm/Activities';
import Deliverables from './ViewForm/Deliverables';
import Contributions from './ViewForm/Contributions';
import ConflictInterest from './ViewForm/ConflictInterest';
import Header from './ViewForm/Header';
import Budget from './ViewForm/Budget'
import { useLocation  } from 'react-router-dom'
import Files from './ViewForm/Files';
import Annexes from './ViewForm/Annexes';


const ViewCompleteForms = () => {  
    const { state } = useLocation();
    const id = state?.projectId
    const apiUrl = import.meta.env.VITE_API_URL;
    const [completeForm, setCompleteForm] = useState(null);
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const [formRes, filesRes] = await Promise.all([
                    fetch(`${apiUrl}/users/projects/${id}`, { 
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
                        }, 
                    }),
                    fetch(`${apiUrl}/researchers/projects/${id}/documents`, { 
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
                        }, 
                    }),
                ]);

                if (!formRes.ok || !filesRes.ok) {
                    throw new Error('Error al cargar los datos');
                }

                const completeForm = await formRes.json();
                const files = await filesRes.json();
                
                setCompleteForm(completeForm);
                setFiles(files);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [id, apiUrl]);

    if (!id) {
        console.error("ID del proyecto no proporcionado. Redirigiendo a /Inicio.");
        window.location.href = "/Inicio";
        return null;
    }

    const handlePrint = () => {
        alert("Por favor, marca 'Encabezados y pies de página y gráficos de fondo' en las opciones de impresión para una mejor visualización.");
        window.print();
    };
    const handlePrint2 = () => {
    if (Array.isArray(files.documents)) {
        files.documents.forEach((file) => {
        const link = document.createElement('a');
        link.href = `data:application/octet-stream;base64,${file.document}`;
        link.download = file.name || `archivo-${file.annexeId}.pdf`; // ajusta el nombre o extensión si sabes el tipo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        });
    }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
    <div className='fullTable-background'>
        <div className='div-button'>
            <button onClick={handlePrint2}>Descargar anexos</button>
            <button onClick={handlePrint}>Descargar proyecto</button>
        </div>
        {(completeForm && files) ? (
        <div className='fullTable-body'>

            <Header generalData={completeForm.idf34}/>

            <h1>1. DATOS GENERALES DEL PROYECTO</h1>
            
            <ViewGeneralData generalData={completeForm.idf20} associatedProjects={completeForm.idf21} />

            <h1>2. DATOS DE LOS PARTICIPANTES</h1>
            
            <Members investigator={completeForm.investigator} members={completeForm.idf22}/>
            <h1>3. COLABORACIÓN CON OTRAS INSTITUCIONES</h1>

            <CollaborativeInstitutions collaborativeInstitutions={completeForm.idf23}/>
            <h1>4. DESGLOSE</h1>

            <Desglose references={completeForm.idf25.references} methodologies={completeForm.idf25.methodologies} goals={completeForm.idf25.goals} desglose={completeForm.idf24}/>
            <h1>5. ASPECTOS ÉTICOS</h1>

            <EthicalAspects EthicalAspects={completeForm.idf26}/>
            <h1>6. CONSIDERACIONES DE BIOSEGURIDAD</h1>

            <Biosecurity biosecurityConsiderations={completeForm.idf27}/>
            
            <h1>7. CRONOGRAMA DE ACTIVIDADES</h1>

            <Activities scheduleActivities={completeForm.idf28}/>

            <h1>8. ENTREGABLES</h1>

            <Deliverables Deliverables={completeForm.idf29}/>

            <h1>9. APORTACIONES</h1>

            <Contributions contributions={completeForm.idf30.contributionsToIPNandCICATA}/>

            <h1>10. DESCRIPCIÓN DE PRESUPUESTO REQUERIDO Y POSIBLES FUENTES DE OBTENCIÓN</h1>

            <Budget Budget={completeForm.idf31.budgets}/>
            
            <h1>11. CONFLICTO DE INTERÉS</h1>
            
            <ConflictInterest conflictOfInterest={completeForm.idf32.conflictOfInterest}/>

            <h1>12. ANEXOS</h1>
            <Annexes Annexes={completeForm.idf33.aditionalComments}/>
            <div className='files-no-print'>
                <Files files={files}/> 
            </div>  
        </div>
        )
        :
        (
            <p>Cargando...</p>
        )}
    </div>
  );
};

export default ViewCompleteForms;
