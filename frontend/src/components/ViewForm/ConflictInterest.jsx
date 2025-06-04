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
                    </th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{conflictOfInterest || "No hay conflicto de interés"}</td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default ConflictInterest;
