-- Aqui se crean procedimientos almacenados y mas


-- login
DELIMITER //
CREATE PROCEDURE login(
    IN user_email VARCHAR(100),
    IN user_password VARCHAR(100))
BEGIN
    DECLARE _userId INT;
    DECLARE _committeeId INT DEFAULT NULL;
    
    SET _userId = (SELECT userId FROM users WHERE email = user_email AND password = SHA2(user_password,256));
    
    SET _committeeId = (SELECT committeeId 
                        FROM committeeUsers 
                        WHERE userId = _userId
                        LIMIT 1);
                        
    IF _committeeId IS NULL THEN
        SELECT 
            userId, 
            email,
            CONCAT(fName, ' ', lastName1, ' ', lastName2) AS fullName,
            userType_id
        FROM users 
        WHERE userId = _userId;
    ELSE
        SELECT 
            u.userId, 
            u.email,
            CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
            u.userType_id,
            cu.committeeId
        FROM users u
        JOIN committeeUsers cu ON u.userId = cu.userId
        WHERE u.userId = _userId;
    END IF;
END //
DELIMITER ;

-- obtener proyectos activos
DELIMITER //
CREATE PROCEDURE getActiveProjects(IN userId INT)
BEGIN
    SELECT
        p.projectId,
        p.title AS Proyecto,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS Investigador,
        p.startDate AS FechaInicio,
        p.folio AS Folio,
        p.notification AS Notificacion
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
        p.projectId,
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

-- procedimiento almacenado para subir documentos relacionados con el proyecto 
DELIMITER //
CREATE PROCEDURE uploadDocument(
  IN p_document LONGBLOB,
  IN p_projectId INT
)
BEGIN
  INSERT INTO annexes (document, projectId)
  VALUES (p_document, p_projectId);
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


-- Función para obtener la firma del acuerdo de un proyecto de cualquier usuario
-- @param userId: Id del usuario que es evaluador
-- @param projectId: Id del proyecto
-- @returns: Dato booleano que indica si el evaluador ha firmado el acuerdo,
-- además del nombre del proyecto y el investigador a cargo
DELIMITER //
CREATE PROCEDURE getAgreementSignature( IN p_userId INT, IN p_projectId INT)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM evaluations 
        WHERE user_id = p_userId AND project_id = p_projectId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user is not an evaluator for this project';
    ELSE    
        SELECT
            DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
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
-- @param userId: Id del miembro del comité
-- @param projectId: Id del proyecto
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE updateAgreementSignature(
    IN p_userId INT, 
    IN p_projectId INT, 
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(100)
)
BEGIN
    IF NOT EXISTS(
        SELECT 1 FROM users 
        WHERE userId = p_userId AND email = p_email AND password = SHA2(p_password,256)
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Invalid credentials';
    ELSEIF NOT EXISTS (
        SELECT 1 FROM evaluations 
        WHERE user_id = p_userId AND project_id = p_projectId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user is not an evaluator for this project';
    ELSE    
        UPDATE 
            agreements
        SET
            agreed = TRUE,
            date = NOW()
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




-- --------------------------- Subdireccion ----------------------------

-- crear usuario
DELIMITER //
CREATE PROCEDURE createUser (
  IN p_fName VARCHAR(50),
  IN p_lastName1 VARCHAR(50),
  IN p_lastName2 VARCHAR(50),
  IN p_email VARCHAR(255),
  IN p_password VARCHAR(255),
  IN p_institution VARCHAR(50),
  IN p_positionWork VARCHAR(50),
  IN p_researchNetwork BOOLEAN,
  IN p_researchNetworkName VARCHAR(50),
  IN p_academicDegree VARCHAR(50),
  IN p_levelName VARCHAR(50),
  IN p_levelNum INT,
  IN p_userType_id INT
)
BEGIN
  INSERT INTO users (
    fName,
    lastName1,
    lastName2,
    email,
    password,
    institution,
    positionWork,
    researchNetwork,
    researchNetworkName,
    academicDegree,
    levelName,
    levelNum,
    userType_id
  ) VALUES (
    p_fName,
    p_lastName1,
    p_lastName2,
    p_email,
    SHA2(p_password, 256),
    p_institution,
    p_positionWork,
    p_researchNetwork,
    p_researchNetworkName,
    p_academicDegree,
    p_levelName,
    p_levelNum,
    p_userType_id
  );
END //
DELIMITER ;

-- Función para obtener todos los proyectos inactivos existentes, es decir,
-- en status 'Aprobado' o 'No aprobado'
-- Se hace uso de un procedimiento almacena getCommitteeRubric
-- @param status: Estado inactivo del proyecto
-- @returns: Lista de proyectos inactivos
DELIMITER //
CREATE PROCEDURE getActiveProjectsSub()
BEGIN
    SELECT
        p.projectId,
        p.title AS Proyecto,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS Investigador,
        p.startDate AS FechaInicio,
        p.endDate AS FechaFin,
        p.folio AS Folio,
        p.status AS Estado
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE (p.status = 'En revisión' OR p.status = 'Pendiente de correcciones');
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getInactiveProjectsSub()
BEGIN
    SELECT
        p.projectId,
        p.title AS Proyecto,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS Investigador,
        p.startDate AS FechaInicio,
        p.endDate AS FechaFin,
        p.folio AS Folio,
        p.status AS Estado
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE (p.status = 'Aprobado' OR p.status = 'No aprobado');
END //
DELIMITER ;

-- Procedimiento para guardar resultados de evaluación y comentarios
DELIMITER //
CREATE PROCEDURE saveEvaluationResults(
    IN p_projectId INT,
    IN p_userId INT,
    IN p_evaluationTypeId INT,
    IN p_score INT,
    IN p_result VARCHAR(50),
    IN p_comments TEXT
)
BEGIN
    DECLARE v_committeeId INT;
    
    -- Insertar los resultados de la evaluación
    INSERT INTO evaluations (project_id, user_id, evaluation_type_id, score, result, comments)
    VALUES (p_projectId, p_userId, p_evaluationTypeId, p_score, p_result, p_comments);
END //



-- Función para obtener usuarios del rol de la petición
-- Se hace uso de un procedimiento almacena getUsersByRole
-- @query userType_id: id del rol de usuario
-- @return users: lista de usuarios con el rol solicitado
DELIMITER //
CREATE PROCEDURE getUsersByRole(IN p_userType_id INT)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM userTypes 
        WHERE userTypeId = p_userType_id
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user type does not exist';
    END IF;
    SELECT 
        u.userId,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
        u.email
    FROM 
        users u
    WHERE 
        u.userType_id = p_userType_id;
END //
DELIMITER ;



-- Función para obtener todos los comités existentes
-- Se hace uso de un procedimiento almacena getAllCommittees
-- @return users: lista de comités existentes
DELIMITER //
CREATE PROCEDURE getAllCommittees()
BEGIN
    SELECT 
        c.committeeId,
        c.name
    FROM 
        committees c;
END //
DELIMITER ;



-- Función para obtener el secretario de un comité
-- Se hace uso de un procedimiento almacena getCommitteeSecretary
-- @param committee_id: id del comité
-- @return secretary: secretario del comité
DELIMITER //
CREATE PROCEDURE getCommitteeSecretaryPresident(IN p_committee_id INT)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committees 
        WHERE committeeId = p_committee_id
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The committee does not exist';
    ELSE
        SELECT 
            u.userId,
            CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS secretary,
            u.email
        FROM 
            committeeUsers cu
        JOIN users u ON cu.userId = u.userId
        WHERE 
            cu.committeeId = p_committee_id AND u.userType_id = 4;

        SELECT 
            u.userId,
            CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS president,
            u.email
        FROM 
            committeeUsers cu
        JOIN users u ON cu.userId = u.userId
        WHERE 
            cu.committeeId = p_committee_id AND u.userType_id = 3;
    END IF;
END //
DELIMITER ;



-- Función para obtener a los integrantes de un comité que no son evaluadores de un proyecto en específico
-- Se hace uso de un procedimiento almacena getProjectNonEvaluators
-- @param committeeId: Id del comité
-- @param userId: Id del miembro del comité, en este caso el secretario
-- @param projectId: Id del proyecto
-- @returns: Lista de integrantes del comité que no son evaluadores del proyecto
DELIMITER //
CREATE PROCEDURE getProjectNonEvaluators(
    IN p_committeeId INT, 
    IN p_userId INT, 
    IN p_projectId INT
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
            u.userId,
            CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName
        FROM 
            committeeUsers cu
        JOIN users u ON cu.userId = u.userId
        WHERE 
            cu.committeeId = p_committeeId AND u.userType_id = 4 AND u.userId NOT IN (
                SELECT user_id FROM evaluations WHERE project_id = p_projectId
            );
    END IF;
END //

-- Función para agregar integrantes como evaluador de un proyecto en específico
-- Se hace uso de un procedimiento almacena createProjectEvaluator
-- @param committeeId: Id del comité
-- @param userId: Id del miembro del comité, en este caso el secretario
-- @param projectId: Id del proyecto
-- body: { 
--   evaluatorId: Id del evaluador que se va a agregar al proyecto
-- }
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE addEvaluatorToProject(
    IN p_committeeId INT, 
    IN p_userId INT, 
    IN p_projectId INT,
    IN p_evaluatorId INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers 
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    ELSE    
        INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
        VALUES (p_evaluatorId, p_projectId, 1);
    END IF;
END //
DELIMITER ;


-- Función para obtener las evaluaciones de un proyecto en específico
-- Se hace uso de un procedimiento almacena getProjectEvaluations
-- @param committeeId: Id del comité
-- @param userId: Id del miembro del comité, en este caso el secretario
-- @param projectId: Id del proyecto
-- @returns: Lista de evaluaciones del proyecto
DELIMITER //
CREATE PROCEDURE getProjectEvaluations(
    IN p_committeeId INT, 
    IN p_userId INT, 
    IN p_projectId INT
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
            u.userId,
            CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
            e.score,
            e.result,
            e.comments
        FROM 
            evaluations e
        JOIN users u ON e.user_id = u.userId
        JOIN committeeUsers cu ON u.userId = cu.userId
        WHERE 
            e.project_id = p_projectId
            AND e.evaluation_type_id = 1
            AND cu.committeeId = p_committeeId;
    END IF;
END //
DELIMITER ;



-- Función para crear las evaluaciones de la primera etapa, en este caso del 
-- CIP, relacionadas a un proyecto
-- Se hace uso de un procedimiento almacena createFirstStageEvaluations
-- @param projectId: Id del proyecto
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE createFirstStageEvaluations(
    IN p_projectId INT
)
BEGIN
    DECLARE v_committeeId INT;
    DECLARE v_userId INT;

    -- Obtener el ID del primer comite y el ID del usuario (presidente)
    SELECT cu.committeeId, u.userId INTO v_committeeId, v_userId
    FROM committeeUsers cu
    JOIN users u ON cu.userId = u.userId
    WHERE cu.committeeId = 1 AND u.userType_id = 3
    LIMIT 1;

    -- Verificar si el proyecto ya tiene evaluaciones de la primera etapa
    IF EXISTS (
        SELECT 1 FROM evaluations 
        WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_userId
    ) THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'The project already has evaluations of the first stage';
    END IF;
    -- Insertar la evaluación de la primera etapa, de tipo comité para el comité 1 (CIP), 
    -- relacionada al secretario del comité
    INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
    VALUES (v_userId, p_projectId, 2);
END //
DELIMITER ;


-- Función para crear las evaluaciones de la segunda etapa, en este caso de los comités CEI, CB y CI. 
-- En caso de que el proyecto tenga marcado el uso de animales se crea la evaluación del comité CIQUAL
-- Se hace uso de un procedimiento almacena createSecondStageEvaluations
-- @param projectId: Id del proyecto
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE createSecondStageEvaluations(
    IN p_projectId INT
)
BEGIN
    DECLARE v_committeeCI INT;
    DECLARE v_committeeCB INT;
    DECLARE v_committeeCEI INT;
    DECLARE v_committeeCIQUAL INT;

    DECLARE v_userIdCI INT;
    DECLARE v_userIdCB INT;
    DECLARE v_userIdCEI INT;
    DECLARE v_userIdCIQUAL INT;

    DECLARE v_workWithAnimals BOOLEAN;

    -- Obtener el ID del comité CI y el ID del usuario (presidente)
    SELECT cu.committeeId, u.userId INTO v_committeeCI, v_userIdCI
    FROM committeeUsers cu
    JOIN users u ON cu.userId = u.userId
    WHERE cu.committeeId = 2 AND u.userType_id = 3
    LIMIT 1;
    -- Obtener el ID del comité CB y el ID del usuario (presidente)
    SELECT cu.committeeId, u.userId INTO v_committeeCB, v_userIdCB
    FROM committeeUsers cu
    JOIN users u ON cu.userId = u.userId
    WHERE cu.committeeId = 3 AND u.userType_id = 3
    LIMIT 1;
    -- Obtener el ID del comité CEI y el ID del usuario (presidente)
    SELECT cu.committeeId, u.userId INTO v_committeeCEI, v_userIdCEI
    FROM committeeUsers cu
    JOIN users u ON cu.userId = u.userId
    WHERE cu.committeeId = 4 AND u.userType_id = 3
    LIMIT 1;

    -- Verificar si el proyecto ya tiene evaluaciones del comité CI
    IF NOT EXISTS (
        SELECT 1 FROM evaluations 
        WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_userIdCI
    ) THEN
        -- Insertar la evaluación de la segunda etapa, de tipo comité para el comité 2 (CI),
        INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
        VALUES (v_userIdCI, p_projectId, 2);
    END IF;

    -- Verificar si el proyecto ya tiene evaluaciones del comité CB
    IF NOT EXISTS (
        SELECT 1 FROM evaluations 
        WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_userIdCB
    ) THEN
        -- Insertar la evaluación de la segunda etapa, de tipo comité para el comité 3 (CB),
        INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
        VALUES (v_userIdCB, p_projectId, 2);
    END IF;
    
    -- Verificar si el proyecto ya tiene evaluaciones del comité CEI
    IF NOT EXISTS (
        SELECT 1 FROM evaluations 
        WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_userIdCEI
    ) THEN
        -- Insertar la evaluación de la segunda etapa, de tipo comité para el comité 4 (CEI),
        INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
        VALUES (v_userIdCEI, p_projectId, 2);
    END IF;

    -- Verificar si el proyecto tiene marcado el uso de animales
    SELECT workWithAnimals INTO v_workWithAnimals
    FROM projects
    WHERE projectId = p_projectId;

    -- Si el proyecto tiene marcado el uso de animales, insertar la evaluación del comité CIQUAL
    IF v_workWithAnimals THEN
        SELECT cu.committeeId, u.userId INTO v_committeeCIQUAL, v_userIdCIQUAL
        FROM committeeUsers cu
        JOIN users u ON cu.userId = u.userId
        WHERE cu.committeeId = 5 AND u.userType_id = 3
        LIMIT 1;

        IF NOT EXISTS (
            SELECT 1 FROM evaluations 
            WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_userIdCIQUAL
        ) THEN
            INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
            VALUES (v_userIdCIQUAL, p_projectId, 2);
        END IF;
    END IF;
END //
DELIMITER ;

