import React from 'react';
import "../../styles/viewcompleteforms.css"
const ViewGeneralData = () => {  
    return (
    <>
    <div className='FullTable'>
        <div className='FullTable-header'>
            <p>Evaluación por primera vez</p>
            <p>Reevaluación <br/> (Número de reevaluación)</p>
            <p>Comité o comités que solicitaron modificaciones <br/>(Si aplica)</p>
            <p>Número de registro en CICATA Unidad Morelos(En las solicitudes de primera vez, este campo será llenado por la SICIT*)</p>
        </div>
        <div className='FullTable-content'>
            <p>Campo 1</p>
            <p>Campo 2</p>
            <p>Campo 3</p>
            <p>Campo 4</p>
        </div>
    </div>

    <div className='FullTable'>
        <div className='Inner-table'>
            <div>
                <p>Periodo del proyecto</p>
            </div>
            <div>
                <p>Mes y año de inicio</p>
                <p>Espacio</p>
            </div>
            <div>
                <p>Mes y año de fin</p>
                <p>Espacio</p>
            </div>
            <div>
                <p>Años totales</p>
                <p>Espacio</p>
            </div>
        </div>
    </div>

    <div>
        <div>
            <p>Titulo del proyecto</p>
        </div>
        <div>
            <p>Espacio</p>
        </div>
    </div>

    <div>
        <div>
            <p>Tipo de investigación</p>
        </div>
        <div>
            <p>Espacio</p>
        </div>
    </div>

    <div>
        <div>
            <p>Tema de especialidad</p>
            <p>Subtema de especialidad</p>
        </div>
        <div>
            <p>Espacio</p>
            <p>Espacio</p>
        </div>
    </div>

    <div>
        <p>
            ¿El proyecto se alinea con las Prioridades Nacionales de Investigación y/o con los objetivos de la Agenda de desarrollo sostenible?
        </p>
        <p>
            SI / NO
        </p>
    </div>

    <div>
        <p>
            En caso afirmativo ¿Con cuál? / No se considera ¿Por qué?
        </p>
        <p>
            Espacio
        </p>
    </div>

    <div>
        <p>
        Resumen del proyecto
        <br/>(Máximo 1500 caracteres con espacios)
        </p>
        <p>
            Espacio
        </p>
    </div>
    </>
  );
};

export default ViewGeneralData;
