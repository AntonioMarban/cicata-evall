-- Aqui se crean procedimientos almacenados y mas


-- login
DELIMITER //
CREATE PROCEDURE login(
    IN user_email VARCHAR(100),
    IN user_password VARCHAR(100))
BEGIN
    SELECT email FROM users WHERE email = user_email AND password = SHA2(user_password,256);
END //
DELIMITER ;

-- obtener proyectos activos
DELIMITER //
CREATE PROCEDURE getActiveProjects(IN userId INT)
BEGIN
    SELECT
        p.title AS Proyecto,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS Investigador,
        p.startDate AS FechaInicio,
        p.folio AS Folio
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE (p.status = 'En revisión' OR p.status = 'Pendiente de correcciones') AND up.user_id = userId;
END //
DELIMITER ;

-- obtener proyectos inactivos
DELIMITER //
CREATE PROCEDURE getInactiveProjects(IN userId INT)
BEGIN
    SELECT
        p.title AS Proyecto,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS Investigador,
        p.startDate AS FechaInicio,
        p.endDate AS FechaFin,
        p.folio AS Folio,
        p.status AS Estado
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE (p.status = 'Aprobado' OR p.status = 'No aprobado') AND up.user_id = userId;
END //
DELIMITER ;

-- crear un nuevo proyecto
DELIMITER //
CREATE PROCEDURE createProject(
    IN p_title VARCHAR(100),
    IN p_startDate DATE,
    IN p_endDate DATE,
    IN p_typeResearch VARCHAR(50),
    IN p_topic VARCHAR(50),
    IN p_subtopic VARCHAR(50),
    IN p_alignmentPNIorODS TEXT,
    IN p_summary TEXT,
    IN p_introduction TEXT,
    IN p_background TEXT,
    IN p_statementOfProblem TEXT,
    IN p_justification TEXT,
    IN p_hypothesis TEXT,
    IN p_generalObjective TEXT,
    IN p_ethicalAspects TEXT,
    IN p_workWithHumans BOOL,
    IN p_workWithAnimals BOOL,
    IN p_biosecurityConsiderations TEXT,
    IN p_contributionsToIPNandCICATA TEXT,
    IN p_conflictOfInterest TEXT,
    IN p_aditionalComments TEXT,
    IN p_folio VARCHAR(50),
    IN p_status VARCHAR(50),

    -- Datos para associatedProjects
    IN p_associatedProjectName VARCHAR(50),
    IN p_associationDate DATE,
    IN p_externalRegister VARCHAR(30),
    IN p_SIPRegister VARCHAR(30),

    -- Datos para members
    IN p_memberFName VARCHAR(50),
    IN p_memberLastName1 VARCHAR(50),
    IN p_memberLastName2 VARCHAR(50),
    IN p_memberEmail VARCHAR(255),
    IN p_memberInstitution VARCHAR(50),
    IN p_memberPositionWork VARCHAR(50),
    IN p_memberResearchNetwork BOOL,
    IN p_memberResearchNetworkName VARCHAR(50),
    IN p_memberAcademicDegree VARCHAR(50),
    IN p_memberLevelName VARCHAR(50),
    IN p_memberLevelNum INTEGER,
    IN p_memberTutorName VARCHAR(100),

    -- Datos para collaborativeInstitutions
    IN p_collabInstitutionName VARCHAR(50),
    IN p_partOfIPN BOOL,
    IN p_collaborationAgreement VARCHAR(30),
    IN p_agreementType VARCHAR(30),
    IN p_agreementNumber VARCHAR(30),

    -- Datos para scheduleActivities
    IN p_goal TEXT,
    IN p_institution VARCHAR(50),
    IN p_responsibleMember VARCHAR(100),
    IN p_scheduleStartDate DATE,
    IN p_scheduleEndDate DATE,

    -- Datos para deliverablesProjects
    IN p_deliverablesJSON JSON,

    -- Datos para budgets
    IN p_investmentExpenditure INTEGER,
    IN p_budgetName VARCHAR(50),
    IN p_expenditure INTEGER,

    -- Usuario
    IN p_userId INT

)
BEGIN
    DECLARE v_projectId INTEGER;
    DECLARE i INT DEFAULT 0;
    DECLARE total INT;

    -- Insertar en projects
    INSERT INTO projects (
        title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary, introduction, background,
        statementOfProblem, justification, hypothesis, generalObjective, ethicalAspects, workWithHumans, workWithAnimals,
        biosecurityConsiderations, contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio, status
    )
    VALUES (
        p_title, p_startDate, p_endDate, p_typeResearch, p_topic, p_subtopic, p_alignmentPNIorODS, p_summary,
        p_introduction, p_background, p_statementOfProblem, p_justification, p_hypothesis, p_generalObjective,
        p_ethicalAspects, p_workWithHumans, p_workWithAnimals, p_biosecurityConsiderations, p_contributionsToIPNandCICATA,
        p_conflictOfInterest, p_aditionalComments, p_folio, p_status
    );

    SET v_projectId = LAST_INSERT_ID();

    -- Insertar en associatedProjects
    INSERT INTO associatedProjects (name, associationDate, externalRegister, SIPRegister, project_id)
    VALUES (p_associatedProjectName, p_associationDate, p_externalRegister, p_SIPRegister, v_projectId);

    -- Insertar en members
    INSERT INTO members (
        fName, lastName1, lastName2, email, institution, positionWork, researchNetwork, researchNetworkName,
        academicDegree, levelName, levelNum, tutorName, project_id
    )
    VALUES (
        p_memberFName, p_memberLastName1, p_memberLastName2, p_memberEmail, p_memberInstitution, p_memberPositionWork,
        p_memberResearchNetwork, p_memberResearchNetworkName, p_memberAcademicDegree, p_memberLevelName,
        p_memberLevelNum, p_memberTutorName, v_projectId
    );

    -- Insertar en collaborativeInstitutions
    INSERT INTO collaborativeInstitutions (name, partOfIPN, collaborationAgreement, agreementType, agreementNumber, project_id)
    VALUES (p_collabInstitutionName, p_partOfIPN, p_collaborationAgreement, p_agreementType, p_agreementNumber, v_projectId);

    -- Insertar en scheduleActivities
    INSERT INTO scheduleActivities (goal, insitution, responsibleMember, startDate, endDate, project_id)
    VALUES (p_goal, p_institution, p_responsibleMember, p_scheduleStartDate, p_scheduleEndDate, v_projectId);

    -- Insertar en deliverablesProjects
    SET total = JSON_LENGTH(p_deliverablesJSON);

    WHILE i < total
        DO
            INSERT INTO deliverablesProjects (quantity, projectId, deliverableId, deliverableTypeId)
            VALUES (JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].quantity'))),
                    v_projectId,
                    JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].deliverableId'))),
                    JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].deliverableTypeId'))));
            SET i = i + 1;
        END WHILE;


    -- Insertar en budgets
    INSERT INTO budgets (investmentExpenditure, name, expenditure, project_id)
    VALUES (p_investmentExpenditure, p_budgetName, p_expenditure, v_projectId);

    -- Insertar en usersProjects
    INSERT INTO usersProjects (user_id, project_id)
    VALUES (p_userId, v_projectId);


END //
DELIMITER ;



-- Procedimiento almacenado para obtener los proyectos pendientes de evaluación
-- por parte de un comité específico y un usuario específico
-- @param p_committeeId: Id del comité
-- @param p_userId: Id del usuario
-- @return: Proyectos pendientes de evaluación

DELIMITER //
CREATE PROCEDURE getPendingProjects(
    IN p_committeeId INT, 
    IN p_userId INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers 
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'El usuario no pertenece al comité';
    ELSE    
        SELECT 
            p.title,
            p.startDate,
            p.endDate,
            p.status 
        FROM 
            projects p 
        INNER JOIN evaluations e ON p.projectId = e.project_id
        WHERE 
            e.user_id = p_userId
            AND e.result IS NULL;
    END IF;
END //

DELIMITER ;


-- Función para obtener la firma del acuerdo de un proyecto de un miembro del comité
-- @param committeeId: Id del comité
-- @param userId: Id del miembro del comité
-- @param projectId: Id del proyecto
-- @returns: Dato booleano que indica si el miembro del comité ha firmado el acuerdo

DELIMITER //
CREATE PROCEDURE getAgreementSignature(IN p_committeeId INT, IN p_userId INT, IN p_projectId INT)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers 
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'El usuario no pertenece al comité';
    ELSE    
        SELECT 
            a.agreed
        FROM 
            agreements a
        WHERE 
            a.user_id = p_userId
            AND a.project_id = p_projectId;
    END IF;
END //
DELIMITER ;