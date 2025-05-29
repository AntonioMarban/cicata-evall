import React from 'react';
import "../../styles/viewcompleteforms.css"
const CollaborativeInstitutions = ({collaborativeInstitutions}) => {  
    console.log(collaborativeInstitutions)
    return (
    <>
    {collaborativeInstitutions.hasCollaboration===1 ? (
        <table className='BackgroundTable'>
                <caption className="table-form-caption">Relación de Proyectos Asociados al proyecto principal</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No. </th>
                        <th>Nombre de la institución</th>
                        <th>¿Es parte del IPN?</th>
                        <th>¿Ya cuenta con Convenio de Colaboración?
                        <br/><span className='subtitle-text'>(General / Específico)</span>
                        </th>
                        <th>¿El convenio es Nacional o Internacional? 
                        <br/><span className='subtitle-text'>(Si aplica)</span>
                        </th>
                        <th>Número de convenio 
                            <br/><span className='subtitle-text'>(Si aplica)</span>
                        </th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                {Array.isArray(collaborativeInstitutions.collaborativeInstitutions) && collaborativeInstitutions.collaborativeInstitutions.map((collaborativeInstitution, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{collaborativeInstitution.name}</td>
                        <td>{collaborativeInstitution.partOfIPN === 1 ? 'Sí' : 'No'}</td>
                        <td>{collaborativeInstitution.collaborationAgreement}</td>
                        <td>{collaborativeInstitution.agreementType}</td>
                        <td>{collaborativeInstitution.agreementNumber}</td>
                    </tr>
                ))}
                </tbody>
        </table>
    )
    :
    (
         <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>¿El proyecto cuenta  con colaboración de otras instituciones?</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{collaborativeInstitutions.collaborationJustification}</td>
                </tr>
            </tbody>
        </table>
    )
    }
    </>
  );
};

export default CollaborativeInstitutions;
