import "../../styles/viewcompleteforms.css"
const ViewGeneralData = ({generalData,associatedProjects}) => {
    return (
    <>
    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>Evaluación por primera vez</th>
                <th>Reevaluación
                    <br/>
                    <span className='subtitle-text'>
                        {generalData.firstEvaluation === 1 ? '' : '(Número de reevaluación)'}
                    </span>
                </th>
                <th>Comité o comités que solicitaron modificaciones</th>
                <th>Número de registro en CICATA Unidad Morelos</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>
                    {generalData.firstEvaluation === 1 ? 'X' : '-'}
                </td>
                <td>{generalData.reevaluation === "" ? '-' : generalData.reevaluation}</td>
                <td>{generalData.committiesModify}</td>
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
                <th>Periodo total en meses</th>
            </tr>
            <tr className='second-table-form-body'>
                <td>{generalData.startDate}</td>
                <td>{generalData.endDate}</td>
                <td>  
                    {(() => {
                        const start = new Date(generalData.startDate);
                        const end = new Date(generalData.endDate);
                        const years = end.getFullYear() - start.getFullYear();
                        const months = end.getMonth() - start.getMonth();
                        const totalMonths = years * 12 + months;
                        return isNaN(totalMonths) ? '' : totalMonths;
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
                <td>¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de Desarrollo Sostenible?</td>
                <td className='table-alginPNIODS'>{generalData.alignsWithPNIorODS === 1 ? 'Sí' : 'No'}</td>
            </tr>
        </tbody>
    </table>

    <table className='BackgroundTable'>
        <thead className='table-form-header'>
            <tr>
                <th>
                    {generalData.alignsWithPNIorODS === 1 ? '¿Con cuál o cuáles?' : 'No se considera. ¿Por qué?'}
                </th>
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
                <th>Resumen del proyecto</th>
            </tr>
        </thead>
        <tbody className='table-form-body'>
            <tr>
                <td>{generalData.summary}</td>
            </tr>
        </tbody>
    </table>
    <table className='BackgroundTable TableWithFootnote'>
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
            {Array.isArray(associatedProjects.associatedProjects) && associatedProjects.associatedProjects.map((associatedProject, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{associatedProject.name}</td>
                    <td>{associatedProject.project_type}</td>
                    <td>{associatedProject.externalRegister === "" ? "No aplica" : associatedProject.externalRegister}</td>
                    <td>{associatedProject.SIPRegister === "" ? "No aplica" : associatedProject.SIPRegister}</td>
                    <td>{associatedProject.associationDate}</td>
                </tr>
            ))}
        </tbody>
    </table>
    <p className='message-after-data'>
        *SIP. Secretaría de Investigación y Posgrado
    </p>
    </>
  );
};

export default ViewGeneralData;
