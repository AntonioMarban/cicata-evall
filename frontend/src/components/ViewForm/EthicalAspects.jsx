import React from 'react';
import "../../styles/viewcompleteforms.css"
const EthicalAspects = ({EthicalAspects}) => {  
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Aspectos éticos de la investigación
                        <br/>
                    </th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{EthicalAspects.ethicalAspects}</td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default EthicalAspects;
