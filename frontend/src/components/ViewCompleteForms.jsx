import React, { useState, useEffect } from 'react';
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
import Budget from './ViewForm/Budget'
import { useParams  } from 'react-router-dom'
const ViewCompleteForms = () => {  
    const { id }  = useParams();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [completeForm, setCompleteForm] = useState(null);

    const fetchData = (url,setData) =>{
        fetch(url,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
            },
        })
        .then(data => data.json())
        .then((data) => {
            setData(data);
        });
    };

    const handlePrint = () => {
        window.print();
        };
    useEffect(()=>{
        fetchData(`${apiUrl}/researchers/projects/${id}`,setCompleteForm);
    },[]);
    return (
    <div className='fullTable-background'>
        <div className='div-button'>
            <button className='button-download' onClick={handlePrint}>Descargar proyecto</button>
        </div>
        {completeForm && (
        <div className='fullTable-body'>
            <h1>1. DATOS GENERALES DEL PROYECTO</h1>
            
            <ViewGeneralData generalData={completeForm.project[0]} associatedProjects={completeForm.associatedProjects} />

            <h1>2. DATOS DE LOS PARTICIPANTES</h1>
            
            <Members members={completeForm.members}/>
            
            <h1>3. COLABORACIÓN CON OTRAS INSTITUCIONES</h1>

            <CollaborativeInstitutions collaborativeInstitutions={completeForm.collaborativeInstitutions}/>

            <h1>4. DESGLOSE</h1>

             <Desglose desglose={completeForm.project[0]}/>


            <h1>5. ASPECTOS ÉTICOS</h1>

             <EthicalAspects EthicalAspects={completeForm.project[0].ethicalAspects}/>

            <h1>6. CONSIDERACIONES DE BIOSEGURIDAD</h1>

             <Biosecurity biosecurityConsiderations={completeForm.project[0].biosecurityConsiderations}/>

            <h1>7. CRONOGRAMA DE ACTIVIDADES</h1>

            <Activities scheduleActivities={completeForm.scheduleActivities}/>

            <h1>8. ENTREGABLES</h1>

            {/*<Deliverables/>*/}

            <h1>9. APORTACIONES</h1>

            <Contributions contributions={completeForm.project[0].contributionsToIPNandCICATA}/>

            <h1>10. DESCRIPCIÓN DE PRESUPUESTO REQUERIDO Y POSIBLES FUENTES DE OBTENCIÓN</h1>

            {/*<Budget/>*/}

            <h1>11. CONFLICTO DE INTERÉS</h1>
            <ConflictInterest conflictOfInterest={completeForm.project[0].conflictOfInterest}/>
        </div>
        )}
    </div>
  );
};

export default ViewCompleteForms;
