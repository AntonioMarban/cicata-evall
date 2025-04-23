import React from 'react';
import { useState,useRef } from "react";
import "../styles/viewcompleteforms.css"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ViewCompleteForms = ({cards, slice,handleDeleteFile,handleEditModal}) => {  
    const [deliverablesF, setDeliverablesF] = useState(
        {
            idF: 9
        }
        );
    const pdfRef = useRef();


    

    const deliverables3 = [
        "Proceso",
        "Patente",
        "Hardware",
        "Prototipo",
        "Certificado de inversión",
        "Software",
        "Otro"
      ];
    const deliverables2 = [
        "Artículo de divulgación",
        "Congresos",
        "Cursos",
        "Libros",
        "Conferencias o ponencias",
        "Articulos cientifico",
        "Seminarios",
        "Manuales",
        "Programas de Radio y/o TV",
        "Otro"
      ];
    const deliverables = [
    "Tesis (Alumnos titulados)",
    "Practicantes profesionales",
    "Alumnos PIFI",
    "Prestante del servicio social",
    "Otro",
    ];
    const categories = ["Nacional", "Internacional"];
    const categories2 = ["Medio", "Superior","Posgrado"];
    return (
    <div className='fullTable-background'>
        <div className='div-button'>
            <button className='button-download'>Descargar proyecto</button>
        </div>
        <div ref={pdfRef}>
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
                <tr>
                    <td>¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de desarrollo sostenible?</td>
                    <td>
                        <tr>
                            <td>SI / NO</td>
                        </tr>
                    </td>
                </tr>
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

            <h1>2. DATOS DE LOS PARTICIPANTES</h1>
            
            <div className='backgroundParticipants'>
                <div className='participant_title'>
                    <p>Datos del Investigador principal</p>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Nombre Completo</p>
                    </div>
                    <div>
                        <p>Navarro</p>
                        <p className='participant-label'>Apellido paterno</p>
                    </div>
                    <div>
                        <p>Vivas</p>
                        <p className='participant-label'>Apellido materno</p>                  
                    </div>
                    <div>
                        <p>Luis</p>
                        <p className='participant-label'>Nombre(s)</p>     
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Institución a la que pertenece</p>
                        </div>
                        <div>
                            <p>IPN</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Puesto que desempeña en dicha institución</p>
                        </div>
                        <div>
                            <p>Investigador</p>
                        </div>                       
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>¿Pertenece a alguna red de investigación?</p>
                        </div>
                        <div>
                            <p>SI</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>En caso afirmativo ¿Cuál?</p>
                        </div>
                        <div>
                            <p>SNI</p>    
                        </div>                    
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Grado Académico</p>
                        </div>
                        <div>
                            <p>Alto</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Nivel</p>
                        </div>
                        <div>
                            <p>IV</p>
                        </div>                        
                    </div>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Datos del contacto</p>
                    </div>
                    <div>
                        <p>luisnavarro2004@yahoo.com.mx</p>
                        <p className='participant-label'>email</p>
                    </div>
                    <div>
                        <p>5521334433</p>
                        <p className='participant-label'>Teléfono</p> 
                    </div>
                </div>
            </div>
            <div className='backgroundParticipants'>
                <div className='participant_title'>
                    <p>Datos del Investigador principal</p>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Nombre Completo</p>
                    </div>
                    <div>
                        <p>Navarro</p>
                        <p className='participant-label'>Apellido paterno</p>
                    </div>
                    <div>
                        <p>Vivas</p>
                        <p className='participant-label'>Apellido materno</p>                  
                    </div>
                    <div>
                        <p>Luis</p>
                        <p className='participant-label'>Nombre(s)</p>     
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Institución a la que pertenece</p>
                        </div>
                        <div>
                            <p>IPN</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Puesto que desempeña en dicha institución</p>
                        </div>
                        <div>
                            <p>Investigador</p>
                        </div>                       
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>¿Pertenece a alguna red de investigación?</p>
                        </div>
                        <div>
                            <p>SI</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>En caso afirmativo ¿Cuál?</p>
                        </div>
                        <div>
                            <p>SNI</p>    
                        </div>                    
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Grado Académico</p>
                        </div>
                        <div>
                            <p>Alto</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Nivel</p>
                        </div>
                        <div>
                            <p>IV</p>
                        </div>                        
                    </div>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Datos del contacto</p>
                    </div>
                    <div>
                        <p>luisnavarro2004@yahoo.com.mx</p>
                        <p className='participant-label'>email</p>
                    </div>
                    <div>
                        <p>5521334433</p>
                        <p className='participant-label'>Teléfono</p> 
                    </div>
                </div>
            </div>

            <div className='backgroundParticipants'>
                <div className='participant_title'>
                    <p>Datos del Investigador principal</p>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Nombre Completo</p>
                    </div>
                    <div>
                        <p>Navarro</p>
                        <p className='participant-label'>Apellido paterno</p>
                    </div>
                    <div>
                        <p>Vivas</p>
                        <p className='participant-label'>Apellido materno</p>                  
                    </div>
                    <div>
                        <p>Luis</p>
                        <p className='participant-label'>Nombre(s)</p>     
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Institución a la que pertenece</p>
                        </div>
                        <div>
                            <p>IPN</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Puesto que desempeña en dicha institución</p>
                        </div>
                        <div>
                            <p>Investigador</p>
                        </div>                       
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>¿Pertenece a alguna red de investigación?</p>
                        </div>
                        <div>
                            <p>SI</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>En caso afirmativo ¿Cuál?</p>
                        </div>
                        <div>
                            <p>SNI</p>    
                        </div>                    
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Grado Académico</p>
                        </div>
                        <div>
                            <p>Alto</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Nivel</p>
                        </div>
                        <div>
                            <p>IV</p>
                        </div>                        
                    </div>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Datos del contacto</p>
                    </div>
                    <div>
                        <p>luisnavarro2004@yahoo.com.mx</p>
                        <p className='participant-label'>email</p>
                    </div>
                    <div>
                        <p>5521334433</p>
                        <p className='participant-label'>Teléfono</p> 
                    </div>
                </div>
            </div>
            
            <h1>3. COLABORACIÓN CON OTRAS INSTITUCIONES</h1>

            <table className='BackgroundTable'>
                    <caption className="table-form-caption">Relación de Proyectos Asociados al proyecto principal</caption>
                    <thead className='table-form-header'>
                        <tr>
                            <th>No. </th>
                            <th>Nombre de la Institución</th>
                            <th>¿Es parte del IPN?</th>
                            <th>¿Ya cuenta con Convenio de Colaboración? (General/Específico)</th>
                            <th>¿El convenio es Nacional o Extranjero? (Si aplica)</th>
                            <th>Número de convenio (Si aplica)</th>
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

            <h1>4. DESGLOSE</h1>


            <table className='BackgroundTable'>
                <thead className='table-form-header'>
                    <tr>
                        <th>Introducción</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    <tr>
                        <td>Introdhdjfsa</td>
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
                        <td>Introdhdjfsa</td>
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
                        <td>Introdhdjfsa</td>
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
                        <td>Introdhdjfsa</td>
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
                        <td>Introdhdjfsa</td>
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
                        <td>Introdhdjfsa</td>
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
                        <td>Introdhdjfsa</td>
                    </tr>
                </tbody>
            </table>
            
            <table className='BackgroundTable'>
                <thead className='table-form-header'>
                    <tr>
                        <th>Objetivos Específicos</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    <tr>
                        <td>Introdhdjfsa</td>
                    </tr>
                </tbody>
            </table>

            <table className='BackgroundTable'>
                    <caption className="table-form-caption">Objetivos Específicos</caption>
                    <thead className='table-form-header'>
                        <tr>
                            <th>No.</th>
                            <th>Nombre del proyecto</th>
                        </tr>
                    </thead>
                    <tbody className='table-form-body'>
                        <tr>
                            <td>1</td>
                            <td>Nombre</td>
                        </tr>
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
                        <tr>
                            <td>1</td>
                            <td>Nombre</td>
                        </tr>
                    </tbody>
            </table>

            <table className='BackgroundTable'>
                    <caption className="table-form-caption">Metas</caption>
                    <thead className='table-form-header'>
                        <tr>
                            <th>No.</th>
                            <th>Metodología <span>(Detallar en la meta que corresponda: tipo de estudio, población de estudio, 
                                criterios de inclusión, exclusión y eliminación, tipo de muestreo, cálculo del tamaño de muestra,
                                 controles, variables a analizar, técnicas, materiales y equipos a utilizar, análisis estadístico 
                                 a realizar, etc. La intención es dar una idea precisa de lo que se va a realizar)</span></th>
                        </tr>
                    </thead>
                    <tbody className='table-form-body'>
                        <tr>
                            <td>1</td>
                            <td>Nombre</td>
                        </tr>
                    </tbody>
            </table>


            <table className='BackgroundTable'>
                <thead className='table-form-header'>
                    <tr>
                        <th>Referencias</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    <tr>
                        <td>Introdhdjfsa</td>
                    </tr>
                </tbody>
            </table>

            <h1>5. ASPECTOS ÉTICOS</h1>

            <table className='BackgroundTable'>
                <thead className='table-form-header'>
                    <tr>
                        <th>Aspectos éticos de la investigación
                            <span>
                                Describir cómo el proyecto se apega a los principios bioéticos especificados en la Declaración de Helsinki y otros aspectos bioéticos que sea importante mencionar. En caso de trabajar con humanos o muestras de humanos, adjuntar el consentimiento informado y el aviso de privacidad) 
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    <tr>
                        <td>Introdhdjfsa</td>
                    </tr>
                </tbody>
            </table>

            <h1>6. CONSIDERACIONES DE BIOSEGURIDAD</h1>

            <table className='BackgroundTable'>
                <thead className='table-form-header'>
                    <tr>
                        <th>Consideraciones de bioseguridad de la investigación
                            <span>
                            (Describir el tipo de riesgo que presenta la investigación, así como mencionar las acciones que 
                            se llevarán a cabo para salvaguardar a los pacientes, animales de laboratorio, el ambiente, estudiantes,
                             investigadores o cualquier involucrado en el desarrollo del proyecto)
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    <tr>
                        <td>Introdhdjfsa</td>
                    </tr>
                </tbody>
            </table>

            <h1>7. CRONOGRAMA DE ACTIVIDADES</h1>

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

            <h1>8. ENTREGABLES</h1>

            <table className="table-form-show">
                <caption>
                    <div >
                        <p>Clasificación de entregables</p>
                        <p>Metas para cumplir durante todo el proyecto</p>
                    </div>
                </caption>
                <thead className='table-form-show-head'>
                    <tr>
                        <td></td>
                        {categories2.map((category) => (
                            <td key={category}>{category}</td>
                        ))}
                    </tr>
                </thead>
                <tbody className='table-form-show-body'>
                    {deliverables.map((deliverable) => (
                    <tr key={deliverable}>
                        <td data-label="Entregable">{deliverable}</td>
                        {categories2.map((category) => (
                        <td key={category} data-label={category}>
                            <p></p>
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>

            <table className="table-form-show">
                <thead className='table-form-show-head'>
                    <tr >
                        <td></td>
                        {categories.map((category) => (
                            <td key={category}>{category}</td>
                        ))}
                    </tr>
                </thead>
                <tbody className='table-form-show-body'>
                    {deliverables2.map((deliverable) => (
                    <tr key={deliverable}>
                        <td data-label="Entregable">{deliverable}</td>
                        {categories.map((category) => (
                        <td key={category} data-label={category}>
                            <p></p>
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>

            <table className="table-form-show">
                <thead className='table-form-show-head'>
                    <tr>
                        <td></td>
                        {categories.map((category) => (
                            <td key={category}>{category}</td>
                        ))}
                    </tr>
                </thead>
                <tbody className='table-form-show-body'>
                    {deliverables3.map((deliverable) => (
                    <tr key={deliverable}>
                        <td data-label="Entregable">{deliverable}</td>
                        {categories.map((category) => (
                            <td key={category} data-label={category}>
                                <p></p>
                            </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>

            <h1>9. APORTACIONES</h1>

            <table className='BackgroundTable'>
                <thead className='table-form-header'>
                    <tr>
                        <th>Aportaciones del proyecto al IPN y al CICATA Unidad Morelos</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    <tr>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>

            <table >
                <tr>
                    <tr >
                        <th>Aportaciones del proyecto al IPN y al CICATA Unidad Morelos</th>
                    </tr>
                    <tr>
                        <td>Tipo de</td>
                    </tr>
                </tr>
            </table>

            <h1>10. DESCRIPCIÓN DE PRESUPUESTO REQUERIDO Y POSIBLES FUENTES DE OBTENCIÓN</h1>

            <h1>11. CONFLICTO DE INTERÉS</h1>

            <table className='BackgroundTable'>
                <thead className='table-form-header'>
                    <tr>
                        <th>Conflicto de interés</th>
                    </tr>
                </thead>
                <tbody className='table-form-body'>
                    <tr>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default ViewCompleteForms;
