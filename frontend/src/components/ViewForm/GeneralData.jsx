import React from 'react';
import "../../styles/viewcompleteforms.css"
const ViewGeneralData = ({generalData}) => {  
    return (
    <>
    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>Evaluación por primera vez</th>
                <th>Reevaluación (Número de reevaluación)</th>
                <th>Comité o comités que solicitaron modificaciones(Si aplica)</th>
                <th>Número de registro en CICATA Unidad Morelos (En las solicitudes de primera vez, este campo será llenado por la SICIT*)</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>Eva</td>
                <td>Ree</td>
                <td>Comite</td>
                <td>Número</td>
            </tr>
        </tbody>
    </table>


    <table className='BackgroundTable'>
        <tbody>
            <tr className='second-table-form-header'>
                <th rowSpan={2}>Pertiodo del proyecto</th>
                <th>Mes y año de inicio</th>
                <th>Mes y año de fin</th>
                <th>Años totales</th>
            </tr>
            <tr className='second-table-form-body'>
                <td>JKAS2</td>
                <td>JKAS2</td>
                <td>JKAS2</td>
            </tr>
        </tbody>
    </table>
    
    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>Título del proyecto</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>Título</td>
            </tr>
        </tbody>
    </table>


    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>Tipo de investigación</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>Tipo de</td>
            </tr>
        </tbody>
    </table>


    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>Tema de especialidad</th>
                <th>Subtema de especialidad</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>Tipo</td>
                <td>SYVBTipo</td>
            </tr>
        </tbody>
    </table>


    <table >
        <tbody>
            <tr>
                <td>¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de desarrollo sostenible?</td>
                <td>SI / NO</td>
            </tr>
        </tbody>
    </table>

    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>En caso afirmativo ¿Con cuál? / No se considera ¿Por qué?</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>Tipo</td>
            </tr>
        </tbody>
    </table>


    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>Resumen del proyecto <br/>(Máximo 1500 caracteres con espacios)</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>Tipo de</td>
            </tr>
        </tbody>
    </table>

    <table className='BackgroundTable'>
            <caption className="table-form-caption">Relación de Proyectos Asociados al proyecto principal</caption>
            <thead className='table-form-header'>
                <tr>
                    <th>No. 1</th>
                    <th>Nombre del proyecto</th>
                    <th>Tipo de proyecto</th>
                    <th>Número de registro externo</th>
                    <th>Número de registro SIP*</th>
                    <th>Fecha de asociación</th>
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

export default ViewGeneralData;
