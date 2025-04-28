import React from 'react';
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

const ViewCompleteForms = () => {  

    const handlePrint = () => {
        window.print();
        };

    return (
    <div className='fullTable-background'>
        <div className='div-button'>
            <button className='button-download' onClick={handlePrint}>Descargar proyecto</button>
        </div>
        <div className='fullTable-body'>
            <h1>1. DATOS GENERALES DEL PROYECTO</h1>
            
            <ViewGeneralData/>

            <h1>2. DATOS DE LOS PARTICIPANTES</h1>
            
            <Members/>
            
            <h1>3. COLABORACIÓN CON OTRAS INSTITUCIONES</h1>

            <CollaborativeInstitutions/>

            <h1>4. DESGLOSE</h1>

            <Desglose/>

            <h1>5. ASPECTOS ÉTICOS</h1>

            <EthicalAspects/>

            <h1>6. CONSIDERACIONES DE BIOSEGURIDAD</h1>

            <Biosecurity/>

            <h1>7. CRONOGRAMA DE ACTIVIDADES</h1>

            <Activities/>

            <h1>8. ENTREGABLES</h1>

            <Deliverables/>

            <h1>9. APORTACIONES</h1>

            <Contributions/>

            <h1>10. DESCRIPCIÓN DE PRESUPUESTO REQUERIDO Y POSIBLES FUENTES DE OBTENCIÓN</h1>

            <Budget/>

            <h1>11. CONFLICTO DE INTERÉS</h1>

            <ConflictInterest/>
        </div>
    </div>
  );
};

export default ViewCompleteForms;
