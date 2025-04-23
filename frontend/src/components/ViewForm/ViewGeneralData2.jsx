import React from 'react';
import "../../styles/viewcompleteforms.css"
const ViewGeneralData = () => {  
    return (
    <div className='FullTable'>
        <div className='FullTable-header'>
            <p>Evaluación por primera vez</p>
            <p>Reevaluación <br/> (Número de reevaluación)</p>
            <p>Comité o comités que solicitaron modificaciones <br/>(Si aplica)</p>
            <p>Número de registro en CICATA Unidad Morelos(En las solicitudes de primera vez, este campo será llenado por la SICIT*)</p>
        </div>
        <div className='FullTable-content'>
            <p>Campo 1</p>
            <p>Campo 2</p>
            <p>Campo 3</p>
            <p>Campo 4</p>
        </div>
    </div>
  );
};

export default ViewGeneralData;
