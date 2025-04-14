-- Aqui se crean procedimientos almacenados y mas


-- login
DELIMITER //
CREATE PROCEDURE login(
    IN user_email VARCHAR(100),
    IN user_password VARCHAR(100))
BEGIN
    SELECT 
        userId, 
        email,
        CONCAT(fName, ' ', lastName1, ' ', lastName2) AS fullName,
        userType_id
     FROM users WHERE email = user_email AND password = SHA2(user_password,256);
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

    -- Arreglos
    IN p_associatedProjectsJSON JSON,
    IN p_membersJSON JSON,
    IN p_collaborativeInstitutionsJSON JSON,
    IN p_scheduleActivitiesJSON JSON,
    IN p_deliverablesJSON JSON,
    IN p_budgetsJSON JSON,

    -- Usuario
    IN p_userId INT
)
BEGIN
    DECLARE v_projectId INT;
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

    -- associatedProjects
    SET i = 0;
    SET total = JSON_LENGTH(p_associatedProjectsJSON);
    WHILE i < total DO
        INSERT INTO associatedProjects (name, associationDate, externalRegister, SIPRegister, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].name'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].associationDate'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].externalRegister'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].SIPRegister'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- members
    SET i = 0;
    SET total = JSON_LENGTH(p_membersJSON);
    WHILE i < total DO
        INSERT INTO members (
            fName, lastName1, lastName2, email, institution, positionWork, researchNetwork, researchNetworkName,
            academicDegree, levelName, levelNum, tutorName, project_id
        )
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].fName'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].lastName1'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].lastName2'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].email'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].institution'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].positionWork'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].researchNetwork'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].researchNetworkName'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].academicDegree'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].levelName'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].levelNum'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].tutorName'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- collaborativeInstitutions
    SET i = 0;
    SET total = JSON_LENGTH(p_collaborativeInstitutionsJSON);
    WHILE i < total DO
        INSERT INTO collaborativeInstitutions (name, partOfIPN, collaborationAgreement, agreementType, agreementNumber, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].name'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].partOfIPN'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].collaborationAgreement'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].agreementType'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].agreementNumber'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- scheduleActivities
    SET i = 0;
    SET total = JSON_LENGTH(p_scheduleActivitiesJSON);
    WHILE i < total DO
        INSERT INTO scheduleActivities (goal, institution, responsibleMember, startDate, endDate, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].goal'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].institution'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].responsibleMember'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].startDate'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].endDate'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- deliverablesProjects
    SET i = 0;
    SET total = JSON_LENGTH(p_deliverablesJSON);
    WHILE i < total DO
        INSERT INTO deliverablesProjects (quantity, projectId, deliverableId, deliverableTypeId)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].quantity'))),
            v_projectId,
            JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].deliverableId'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].deliverableTypeId')))
        );
        SET i = i + 1;
    END WHILE;

    -- budgets (JSON ARRAY)
    SET i = 0;
    SET total = JSON_LENGTH(p_budgetsJSON);
    WHILE i < total DO
        INSERT INTO budgets (investmentExpenditure, name, expenditure, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].investmentExpenditure'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].budgetName'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].expenditure'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- Relación con usuario
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
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
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
-- @returns: Dato booleano que indica si el miembro del comité ha firmado el acuerdo,
-- además del nombre del proyecto y el investigador a cargo
DELIMITER //
CREATE PROCEDURE getAgreementSignature(IN p_committeeId INT, IN p_userId INT, IN p_projectId INT)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers 
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    ELSE    
        SELECT 
            a.agreed,
            p.title,
            CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS researcher
        FROM 
            agreements a
        JOIN users u ON a.user_id = u.userId
        JOIN projects p ON a.project_id = p.projectId
        WHERE 
            a.user_id = p_userId
            AND a.project_id = p_projectId;
    END IF;
END //
DELIMITER ;

-- Función para firmar el acuerdo de un proyecto de un miembro del comité de un proyecto en específico
-- @param committeeId: Id del comité
-- @param userId: Id del miembro del comité
-- @param projectId: Id del proyecto
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE updateAgreementSignature(
    IN p_committeeId INT, 
    IN p_userId INT, 
    IN p_projectId INT, 
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(100)
)
BEGIN
    IF NOT EXISTS(
        SELECT 1 FROM users 
        WHERE email = p_email AND password = SHA2(p_password,256)
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Invalid credentials';
    ELSEIF NOT EXISTS (
        SELECT 1 FROM committeeUsers 
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    ELSE    
        UPDATE 
            agreements
        SET
            agreed = TRUE
        WHERE 
            user_id = p_userId
            AND project_id = p_projectId;
    END IF;
END //
DELIMITER ;


-- Función para obtener la rúbrica de evaluación de un comite en específico
-- Se hace uso de un procedimiento almacena getCommitteeRubric
-- @param committeeId: Id del comité
-- @param userId: Id del miembro del comité
-- @returns: Buffer con la rúbrica de evaluación del comité
DELIMITER //
CREATE PROCEDURE getCommitteeRubric(IN p_committeeId INT, IN p_userId INT)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers 
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    ELSE    
        SELECT 
            rubric
        FROM 
            rubrics 
        WHERE 
            committee_id = p_committeeId;
    END IF;
END //
DELIMITER ;


-- Función para editar la rúbrica de evaluación de un comite en específico
-- Se hace uso de un procedimiento almacena getCommitteeRubric
-- @param committeeId: Id del comité
-- @param userId: Id del miembro del comité
-- @param rubric: Buffer con la rúbrica de evaluación del comité
-- @returns: Buffer con la rúbrica de evaluación del comité
DELIMITER //
CREATE PROCEDURE updateCommitteeRubric(IN p_committeeId INT, IN p_userId INT, IN p_rubric LONGBLOB)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers 
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    ELSE    
        UPDATE 
            rubrics
        SET 
            rubric = p_rubric
        WHERE 
            committee_id = p_committeeId;
    END IF;
END //
DELIMITER ;


