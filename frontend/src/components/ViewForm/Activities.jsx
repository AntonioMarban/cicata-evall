import React from 'react';
import "../../styles/viewcompleteforms.css"
const Activities = ({Activities}) => {  
    return (
    <>
        <table className='BackgroundTable'>
                <caption className="table-form-caption">Relación de Proyectos Asociados al proyecto principal</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No.</th>
                        <th>Meta</th>
                        <th>Institución donde se realiza</th>
                        <th>Participante responsable</th>
                        <th>Mes y año de inicio</th>
                        <th>Mes y año de término</th>
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

export default Activities;
