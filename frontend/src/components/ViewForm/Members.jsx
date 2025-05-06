import React from 'react';
import "../../styles/viewcompleteforms.css"
const Members = ({members}) => {  
    return (
    <>
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
                    <div className='participant-tag-data'>
                        <p>IPN</p>
                    </div>
                </div>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>Puesto que desempeña en dicha institución</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>Investigador</p>
                    </div>                       
                </div>
            </div>
            <div className='participant-institution'>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>¿Pertenece a alguna red de investigación?</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>SI</p>
                    </div>
                </div>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>En caso afirmativo ¿Cuál?</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>SNI</p>    
                    </div>                    
                </div>
            </div>
            <div className='participant-institution'>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>Grado Académico</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>Alto</p>
                    </div>
                </div>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>Nivel</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>IV</p>
                    </div>                        
                </div>
            </div>
            <div className='participant-data'>
                <div className='participant-data-subname'>
                    <p className='participant-tag'>Datos del contacto</p>
                </div>
                <div className='participant-row'>
                    <p>luisnavarro2004@yahoo.com.mx</p>
                    <p className='participant-label'>email</p>
                </div>
                <div>
                    <p>5521334433</p>
                    <p className='participant-label'>Teléfono</p> 
                </div>
            </div>
        </div>

        {Array.isArray(members) && members.map((member, index) => (
            <div key={index+1} className='backgroundParticipants'>
                <div className='participant_title'>
                    <p>Datos del participante</p>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Nombre Completo</p>
                    </div>
                    <div>
                        <p>{member.lastname1}</p>
                        <p className='participant-label'>Apellido paterno</p>
                    </div>
                    <div>
                        <p>{member.lastname2}</p>
                        <p className='participant-label'>Apellido materno</p>                  
                    </div>
                    <div>
                        <p>{member.fName}</p>
                        <p className='participant-label'>Nombre(s)</p>     
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Institución a la que pertenece</p>
                        </div>
                        <div>
                            <p>{member.institution}</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Puesto que desempeña en dicha institución</p>
                        </div>
                        <div>
                            <p>{member.positionWork}</p>
                        </div>                       
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>¿Pertenece a alguna red de investigación?</p>
                        </div>
                        <div>
                            <p>{member.researchNetwork === 1 ? 'Sí' : 'No'}</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>En caso afirmativo ¿Cuál?</p>
                        </div>
                        <div>
                            <p>{member.researchNetworkName}</p>    
                        </div>                    
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Tutores</p>
                        </div>
                        <div>
                            <p>{member.tutorName}</p>
                        </div>
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Grado Académico</p>
                        </div>
                        <div>
                            <p>{member.academicDegree}</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Nivel</p>
                        </div>
                        <div>
                            <p>{member.levelName} - {member.levelNum}</p>
                        </div>                        
                    </div>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Datos del contacto</p>
                    </div>
                    <div>
                        <p>{member.email}</p>
                        <p className='participant-label'>email</p>
                    </div>
                </div>
            </div>
        ))}
    </>
  );
};

export default Members;
