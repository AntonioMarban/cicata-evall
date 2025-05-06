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
    <p>*SICIT. Subdirección de investigación Científica e Innovación Tecnológica.</p>

    <table className='BackgroundTable'>
        <tbody>
            <tr className='second-table-form-header'>
                <th rowSpan={2}>Pertiodo del proyecto</th>
                <th>Mes y año de inicio</th>
                <th>Mes y año de fin</th>
                <th>Años totales</th>
            </tr>
            <tr className='second-table-form-body'>
                <td>{generalData.startDate}</td>
                <td>{generalData.endDate}</td>
                <td>generalData.endDate-generalData.startDate</td>
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
                <td>{generalData.typeResearch}</td>
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


    <table >
        <tbody>
            <tr>
                <td>¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de desarrollo sostenible?</td>
                <td>{generalData.ods}</td>
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
                    <br/><span className='subtitle-text'>(p.e. Tesis maestría, convocatoria interna innovación, convocatoria externa fronteras, etc.)</span>
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
            {Array.isArray(associatedProjects) && associatedProjects.map((associatedProject, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{associatedProject.name}</td>
                    <td>Tipo del proyecto</td>
                    <td>{associatedProject.externalRegister}</td>
                    <td>{associatedProject.SIPRegister}</td>
                    <td>{associatedProject.associationDate}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  );
};

export default ViewGeneralData;
