import "../../styles/viewcompleteforms.css"
const Members = ({members ,investigator}) => {  
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
                    <p>{investigator.lastName1}</p>
                    <p className='participant-label'>Apellido paterno</p>
                </div>
                <div>
                    <p>{investigator.lastName2}</p>
                    <p className='participant-label'>Apellido materno</p>                  
                </div>
                <div>
                <p>{investigator.fName}</p>
                    <p className='participant-label'>Nombre(s)</p>     
                </div>
            </div>
            <div className='participant-institution'>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>Institución a la que pertenece</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>{investigator.institution}</p>
                    </div>
                </div>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>Puesto que desempeña en dicha institución</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>{investigator.positionWork}</p>
                    </div>                       
                </div>
            </div>
            <div className='participant-institution' style={{backgroundColor: "#E9E9E9"}} >
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>¿Pertenece a alguna red de investigación?</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>{investigator.researchNetwork === 1 ? 'Sí' : 'No'}</p>
                    </div>
                </div>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>En caso afirmativo ¿Cuál?</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>{investigator.researchNetworkName}</p>  
                    </div>                    
                </div>
            </div>
            <div className='participant-institution'>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>Grado Académico</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>{investigator.academicDegree}</p>  
                    </div>
                </div>
                <div className='participant-institution-inner'>
                    <div>
                        <p className='participant-tag'>Nivel</p>
                    </div>
                    <div className='participant-tag-data'>
                        <p>{investigator.levelName} - {investigator.levelNum}</p>  
                    </div>                        
                </div>
            </div>
            <div className='participant-data'>
                <div className='participant-data-subname'>
                    <p className='participant-tag'>Datos del contacto</p>
                </div>
                <div className='participant-row'>
                    <p>{investigator.email}</p>
                    <p className='participant-label'>email</p>
                </div>
                <div>
                    <p>{investigator.phone === null ? 'Sin número' : investigator.phone}</p>
                    <p className='participant-label'>Teléfono</p> 
                </div>
            </div>
        </div>

        {Array.isArray(members.members) && members.members.map((member, index) => (
            <div key={index+1} className='backgroundParticipants'>
                <div className='participant_title'>
                    <p>Datos del participante</p>
                </div>
                <div className='participant-data'>
                    <div className='participant-data-subname'>
                        <p className='participant-tag'>Nombre Completo</p>
                    </div>
                    <div>
                        <p>{member.lastName1}</p>
                        <p className='participant-label'>Apellido paterno</p>
                    </div>
                    <div>
                        <p>{member.lastName2}</p>
                        <p className='participant-label'>Apellido materno</p>                  
                    </div>
                    <div>
                        <p>{member.fName}</p>
                        <p className='participant-label'>Nombre(s)</p>     
                    </div>
                </div>
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div className='participant-tag-data'>
                            <p className='participant-tag-title'>Institución a la que pertenece</p>
                        </div>
                        <div className='participant-tag-data'>
                            <p>{member.institution}</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Puesto que desempeña en dicha institución</p>
                        </div>
                        <div className='participant-tag-data'>
                            <p>{member.positionWork}</p>
                        </div>                       
                    </div>
                </div>
                <div className='participant-institution' style={{backgroundColor: "#E9E9E9"}}>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>¿Pertenece a alguna red de investigación?</p>
                        </div>
                        <div className='participant-tag-data'>
                            <p>{member.researchNetwork === 1 ? 'Sí' : 'No'}</p>
                        </div>
                    </div>
                    {member.researchNetworkName === 1 && (
                    <div className='participant-institution-inner'>
                        <div>
                        <p className='participant-tag'>En caso afirmativo ¿Cuál?</p>
                        </div>
                        <div className='participant-tag-data'>
                        <p>{member.researchNetworkName}</p>    
                        </div>                    
                    </div>
                    )}
                </div>
                {member.tutorName && (
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Tutores</p>
                        </div>
                        <div className='participant-tag-data'>
                            <p>{member.tutorName}</p>
                        </div>
                    </div>
                </div>
                )}
                <div className='participant-institution'>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Grado Académico</p>
                        </div>
                        <div className='participant-tag-data'>
                            <p>{member.academicDegree}</p>
                        </div>
                    </div>
                    <div className='participant-institution-inner'>
                        <div>
                            <p className='participant-tag'>Nivel</p>
                        </div>
                        <div className='participant-tag-data'>
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
