import React from 'react';
import "../../styles/viewcompleteforms.css"
const CollaborativeInstitutions = ({generalData}) => {  
    return (
    <>
    <table className='BackgroundTable'>
            <caption className="table-form-caption">Relación de Proyectos Asociados al proyecto principal</caption>
            <thead className='table-form-header'>
                <tr>
                    <th>No. </th>
                    <th>Nombre de la Institución</th>
                    <th>¿Es parte del IPN?</th>
                    <th>¿Ya cuenta con Convenio de Colaboración? (General/Específico)</th>
                    <th>¿El convenio es Nacional o Extranjero? (Si aplica)</th>
                    <th>Número de convenio (Si aplica)</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>1</td>
                    <td>Nombre</td>
                    <td>Tipo del proyecto</td>
                    <td>232</td>
                    <td>4324</td>
                    <td>4324</td>
                </tr>
            </tbody>
    </table>
    </>
  );
};

export default CollaborativeInstitutions;
