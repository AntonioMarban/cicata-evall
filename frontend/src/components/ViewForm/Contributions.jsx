import React from 'react';
import "../../styles/viewcompleteforms.css"
const Contributions = ({contributions}) => {  
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Aportaciones del proyecto al IPN y al CICATA Unidad Morelos</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{contributions}</td>
                </tr>
            </tbody>
        </table>
    </>
  );
};

export default Contributions;
