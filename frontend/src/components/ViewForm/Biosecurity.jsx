import React from 'react';
import "../../styles/viewcompleteforms.css"
const Biosecurity = ({biosecurityConsiderations}) => {  
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Consideraciones de bioseguridad de la investigación
                    <br/>
                    </th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{biosecurityConsiderations}</td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default Biosecurity;
