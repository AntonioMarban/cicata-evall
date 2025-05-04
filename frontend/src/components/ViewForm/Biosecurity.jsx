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
                    <span className='subtitle-text'>
                        (Describir el tipo de riesgo que presenta la investigación, así como mencionar las acciones que 
                        se llevarán a cabo para salvaguardar a los pacientes, animales de laboratorio, el ambiente, estudiantes,
                            investigadores o cualquier involucrado en el desarrollo del proyecto)
                        </span>
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
