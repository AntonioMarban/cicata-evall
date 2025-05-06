import React from 'react';
import "../../styles/viewcompleteforms.css"
const Desglose = ({desglose, goals, methodologies, references}) => {  
    return (
    <>
        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Introducción</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.introduction}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Antecedentes</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.background}</td>
                </tr>
            </tbody>
        </table>


        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Planteamiento del Problema</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.statementOfProblem}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Justificación</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.justification}</td>
                </tr>
            </tbody>
        </table>


        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Hipótesis</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.hypothesis}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Objetivo general</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                <tr>
                    <td>{desglose.generalObjective}</td>
                </tr>
            </tbody>
        </table>

        <table className='BackgroundTable'>
                <caption className="table-form-caption">Objetivos Específicos</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No.</th>
                        <th>Nombre del objetivo</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    {/*{Array.isArray(scheduleActivities) && sObjectives.map((scheduleActivities, index) => (
                    <tr>
                        <td>{index}</td>
                        <td>{sObjectives.objective}</td>
                    </tr>
                    ))}*/}
                </tbody>
        </table>

        <table className='BackgroundTable'>
                <caption className="table-form-caption">Metas</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No.</th>
                        <th>Metas del proyecto</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    {Array.isArray(goals) && goals.map((goal, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{goal.name}</td>
                        </tr>
                    ))}
                </tbody>
        </table>

        <table className='BackgroundTable'>
                <caption className="table-form-caption">Metas</caption>
                <thead className='table-form-header'>
                    <tr>
                        <th>No.</th>
                        <th>Metodología <br/><span className='subtitle-text'>(Detallar en la meta que corresponda: tipo de estudio, población de estudio, 
                            criterios de inclusión, exclusión y eliminación, tipo de muestreo, cálculo del tamaño de muestra,
                                controles, variables a analizar, técnicas, materiales y equipos a utilizar, análisis estadístico 
                                a realizar, etc. La intención es dar una idea precisa de lo que se va a realizar)</span></th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    {Array.isArray(methodologies) && goals.map((methodology, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{methodology.name}</td>
                        </tr>
                    ))}
                </tbody>
        </table>


        <table className='BackgroundTable'>
            <thead className='table-form-header'>
                <tr>
                    <th>Referencias</th>
                </tr>
            </thead>
            <tbody className='table-form-body'>
                {Array.isArray(references) && references.map((reference, index) => (
                    <tr>
                        <td>{index+1}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
  );
};

export default Desglose;
