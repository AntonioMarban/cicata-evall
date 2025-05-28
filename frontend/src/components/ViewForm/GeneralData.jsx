import React from 'react';
import "../../styles/viewcompleteforms.css"
const ViewGeneralData = ({generalData,associatedProjects}) => {
    return (
    <>
    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>Evaluación por primera vez</th>
                <th>Reevaluación <br/><span className='subtitle-text'>(Número de reevaluación)</span></th>
                <th>Comité o comités que solicitaron modificaciones<br/><span className='subtitle-text'>(Si aplica)</span></th>
                <th>Número de registro en CICATA Unidad Morelos <br/><span className='subtitle-text'>(En las solicitudes de primera vez, este campo será llenado por la SICIT*)</span></th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>{generalData.firstTime}</td>
                <td>{generalData.numberR}</td>
                <td>{generalData.committee}</td>
                <td>{generalData.folio}</td>
            </tr>
        </tbody>
    </table>
    <p className='message-after-data'>*SICIT. Subdirección de investigación Científica e Innovación Tecnológica.</p>

    <table className='BackgroundTable'>
        <tbody>
            <tr className='second-table-form-header'>
                <th rowSpan={2}>Periodo del proyecto</th>
                <th>Mes y año de inicio</th>
                <th>Mes y año de fin</th>
                <th>Años totales (Días totales)</th>
            </tr>
            <tr className='second-table-form-body'>
                <td>{generalData.startDate}</td>
                <td>{generalData.endDate}</td>
                <td>{(() => {
                        const start = new Date(generalData.startDate);
                        const end = new Date(generalData.endDate);
                        const diffInMs = end - start;
                        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                        return diffInDays;
                    })()} 
                </td>
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
                <td>{generalData.title}</td>
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
                <td>
                    {{
                        1: 'Básica',
                        2: 'Aplicada clínica',
                        3: 'Desarrollo tecnológico',
                        4: 'Otro',
                        }[generalData.typeResearch] || 'Desconocido'}
                    </td>
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
                <td>{generalData.topic}</td>
                <td>{generalData.subtopic}</td>
            </tr>
        </tbody>
    </table>


    <table className='BackgroundTable'>
        <tbody className='table-form-body'>
            <tr>
                <td>¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de desarrollo sostenible?</td>
                <td className='table-alginPNIODS'>{generalData.alignsWithPNIorODS === 1 ? 'Sí' : 'No'}</td>
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
                <td>{generalData.alignmentPNIorODS}</td>
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
                <td>{generalData.summary}</td>
            </tr>
        </tbody>
    </table>
    <table className='BackgroundTable'>
        <caption className="table-form-caption">Relación de Proyectos Asociados al proyecto principal</caption>
        <thead className='table-form-header'>
            <tr>
                <th>No. 1</th>
                <th>Nombre del proyecto</th>
                <th>Tipo de proyecto
                </th>
                <th>Número de registro externo
                    <br/><span className='subtitle-text'>(Si aplica)</span>
                </th>
                <th>Número de registro SIP*
                <br/><span className='subtitle-text'>(Si aplica)</span>
                </th>
                <th>Fecha de asociación</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            {Array.isArray(associatedProjects.associatedProjects) && associatedProjects.associatedProjects.map((associatedProject, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{associatedProject.name}</td>
                    <td>{associatedProject.project_type}</td>
                    <td>{associatedProject.externalRegister}</td>
                    <td>{associatedProject.SIPRegister}</td>
                    <td>{associatedProject.associationDate}</td>
                </tr>
            ))}
        </tbody>
    </table>
    <p className='message-after-data'>Agregar el número de filas necesarias para todos los proyectos asociados al proyecto principal
        <br/>
        *SIP. Secretaría de Investigación y Posgrado
    </p>
    </>
  );
};

export default ViewGeneralData;
