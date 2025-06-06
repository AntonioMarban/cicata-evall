import "../../styles/viewcompleteforms.css"
import formatValue from '../../hooks/formatValue'
const Activities = ({scheduleActivities}) => {  
    return (
    <>
        <table className='BackgroundTable'>
                <caption className="table-form-caption">Relación de Proyectos asociados al proyecto principal</caption>
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
                {Array.isArray(scheduleActivities.scheduleActivities) && scheduleActivities.scheduleActivities.map((scheduleActivity, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{scheduleActivity.goal}</td>
                        <td>{scheduleActivity.institution}</td>
                        <td>{scheduleActivity.responsibleMember}</td>
                        <td>{formatValue(scheduleActivity.startDate)}</td>
                        <td>{formatValue(scheduleActivity.endDate)}</td>
                    </tr>
                ))}
                </tbody>
        </table>
    </>
  );
};

export default Activities;
