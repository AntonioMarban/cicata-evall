import React from 'react';
import "../../styles/viewcompleteforms.css"
const ConflictInterest = ({conflictOfInterest}) => {  
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Conflicto de interés
                    <br/>
                    <span className='subtitle-text'>
                    (Declarar si existe un interés laboral, personal, profesional, familiar o el proyecto está ligado a la industria farmacéutica, que pueda afectar el desempeño imparcial de alguno de los participantes)
                    </span>
                    </th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{conflictOfInterest}</td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default ConflictInterest;
