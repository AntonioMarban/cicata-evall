-- Aqui se crean procedimientos almacenados y mas
SET NAMES utf8mb4;


-- login
DELIMITER //
CREATE PROCEDURE login(
    IN user_email VARCHAR(100),
    IN user_password VARCHAR(100))
BEGIN
    DECLARE _userId INT;
    DECLARE _committeeId INT DEFAULT NULL;

    SET _userId = (SELECT userId FROM users WHERE email = user_email AND password = SHA2(user_password,256) AND active = true );

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

-- Función para obtener datos resumen de un proyecto
-- @oaram projectId: Id del proyecto
-- @returns: Datos del proyecto
DELIMITER //
CREATE PROCEDURE getProjectSummary(
    IN projectId INT
)
BEGIN
    SELECT
        p.projectId,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
        p.title,
        p.startDate,
        p.endDate,
        p.folio,
        p.status
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE p.projectId = projectId;
END //
DELIMITER ;

-- Función para obtener el dictum de un proyecto
-- y datos extras para la generación del PDF del dictum
-- @param projectId: Id del proyecto
-- @returns: Datos del dictum y del proyecto
DELIMITER //
CREATE PROCEDURE getDictum(
    IN p_projectId INT
)
BEGIN
    -- Verificar si el proyecto tiene un dictum creado
    IF NOT EXISTS (
        SELECT 1 FROM dictums
        WHERE project_id = p_projectId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The project does not have a dictum';
    END IF;

    SELECT 
        d.folio as dictumFolio,
        d.decision,
        d.date as authorizationDate,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS authorizerName,
        u.academicDegree as authorizerAcademicDegree
    FROM dictums d
    JOIN projects p ON d.project_id = p.projectId
    JOIN users u ON d.authorizerId = u.userId
    WHERE d.project_id = p_projectId;

    SELECT
        p.title AS projectTitle,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS projectOwner,
        u.academicDegree AS projectOwnerAcademicDegree,
        p.folio AS projectFolio
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE p.projectId = p_projectId;
END //
DELIMITER ;

-- obtener proyectos activos
DELIMITER //
CREATE PROCEDURE getActiveProjects(IN userId INT)
BEGIN
    SELECT
        p.projectId,
        p.title,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
        p.startDate,
        p.endDate,
        p.folio,
        p.status,
        p.notification
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE (p.status = 'En revision' OR p.status = 'Pendiente de correcciones') AND up.user_id = userId;
END //
DELIMITER ;


-- obtener proyectos inactivos
DELIMITER //
CREATE PROCEDURE getInactiveProjects(IN userId INT)
BEGIN
    SELECT
        p.projectId,
        p.title,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
        p.startDate,
        p.endDate,
        p.folio,
        p.status
    FROM projects p
    LEFT JOIN usersProjects up ON p.projectId = up.project_id
    LEFT JOIN users u ON up.user_id = u.userId
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
    IN p_otherTypeResearch VARCHAR(100),
    IN p_alignsWithPNIorODS BOOLEAN,
    IN p_hasCollaboration BOOLEAN,
    IN p_collaborationJustification TEXT,
    IN p_otherEducationalDeliverable TEXT,
    IN p_otherDiffusionDeliverable TEXT,
    IN p_otherCurrentBudget TEXT,
    IN p_otherInvestmentBudget TEXT,

    -- Arreglos
    IN p_associatedProjectsJSON JSON,
    IN p_membersJSON JSON,
    IN p_collaborativeInstitutionsJSON JSON,
    IN p_specificObjectivesJSON JSON,
    IN p_scheduleActivitiesJSON JSON,
    IN p_deliverablesJSON JSON,
    IN p_budgetsJSON JSON,
    IN p_goalsJSON JSON,
    IN p_methodologiesJSON JSON,
    IN p_referencesJSON JSON,

    -- Extras para los entregabels
    IN p_extras1JSON JSON,
    IN p_extras2JSON JSON,
    IN p_extras3JSON JSON,

    -- Usuario
    IN p_userId INT
)
BEGIN
    DECLARE v_projectId INT;
    DECLARE i INT DEFAULT 0;
    DECLARE total INT;
    DECLARE v_customId INT;
    DECLARE j INT DEFAULT 0;
    DECLARE totalKeys INT;
    DECLARE keyName VARCHAR(50);
    DECLARE keyValue VARCHAR(50);
    DECLARE valuesJSON JSON;
    DECLARE nameValue VARCHAR(255);

    -- Insertar en projects
    INSERT INTO projects (
        title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary, introduction, background,
        statementOfProblem, justification, hypothesis, generalObjective, ethicalAspects, workWithHumans, workWithAnimals,
        biosecurityConsiderations, contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio,
        otherTypeResearch, alignsWithPNIorODS, hasCollaboration, collaborationJustification, formVersion,
        nextReview, preparedBy, reviewedBy, approvedBy, preparedDate, reviewedDate, approvedDate, 
        otherEducationalDeliverable, otherDiffusionDeliverable, otherCurrentBudget, otherInvestmentBudget
    )
    VALUES (
        p_title, p_startDate, p_endDate, p_typeResearch, p_topic, p_subtopic, p_alignmentPNIorODS, p_summary,
        p_introduction, p_background, p_statementOfProblem, p_justification, p_hypothesis, p_generalObjective,
        p_ethicalAspects, p_workWithHumans, p_workWithAnimals, p_biosecurityConsiderations, p_contributionsToIPNandCICATA,
        p_conflictOfInterest, p_aditionalComments, p_folio,
        p_otherTypeResearch, p_alignsWithPNIorODS, p_hasCollaboration, p_collaborationJustification,
        '03', 'septiembre 2025', 'Leslie Olmedo Nieva', 'Leslie Olmedo Nieva', 'Paul Mondragón Terán',
        '2024-06-01', '2024-07-08', '2024-11-04', p_otherEducationalDeliverable, p_otherDiffusionDeliverable,
        p_otherCurrentBudget, p_otherInvestmentBudget
    );

    SET v_projectId = LAST_INSERT_ID();

    -- associatedProjects
    SET i = 0;
    SET total = JSON_LENGTH(p_associatedProjectsJSON);
    WHILE i < total DO
        INSERT INTO associatedProjects (name, associationDate, project_type, externalRegister, SIPRegister, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].name'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].associationDate'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].project_type'))),
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
            fName, lastName1, lastName2, email, phone, institution, positionWork, researchNetwork, researchNetworkName,
            academicDegree, levelName, levelNum, tutorName, project_id
        )
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].fName'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].lastName1'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].lastName2'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].email'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].phone'))),
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

    -- specificObjectives
    SET i = 0;
    SET total = JSON_LENGTH(p_specificObjectivesJSON);
    WHILE i < total DO
        INSERT INTO specificObjectives (objectiveName, objectiveDescription, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_specificObjectivesJSON, CONCAT('$[', i, '].objectiveName'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_specificObjectivesJSON, CONCAT('$[', i, '].objectiveDescription'))),
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
        INSERT INTO budgets (investmentExpenditure, name, expenditure, project_id, budgetTypeId, budgetDate)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].idType'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].idName'))),
            JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].expenditure'))),
            v_projectId,
            JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].budgetTypeId'))),
            STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].budgetDate'))), '%Y-%m-%d')
        );
        SET i = i + 1;
    END WHILE;

    -- goals
    SET i = 0;
    SET total = JSON_LENGTH(p_goalsJSON);
    WHILE i < total DO
        INSERT INTO goals (goal, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_goalsJSON, CONCAT('$[', i, '].goal'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- methodologies
    SET i = 0;
    SET total = JSON_LENGTH(p_methodologiesJSON);
    WHILE i < total DO
        INSERT INTO methodologies (methodology, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_methodologiesJSON, CONCAT('$[', i, '].methodology'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- p_references
    SET i = 0;
    SET total = JSON_LENGTH(p_referencesJSON);
    WHILE i < total DO
        INSERT INTO p_references (reference, project_id)
        VALUES (
            JSON_UNQUOTE(JSON_EXTRACT(p_referencesJSON, CONCAT('$[', i, '].reference'))),
            v_projectId
        );
        SET i = i + 1;
    END WHILE;

    -- Relación con usuario
    INSERT INTO usersProjects (user_id, project_id)
    VALUES (p_userId, v_projectId);

    -- EXTRAS 1
    SET i = 0;
    WHILE i < JSON_LENGTH(p_extras1JSON) DO
        SET nameValue = JSON_UNQUOTE(JSON_EXTRACT(p_extras1JSON, CONCAT('$[', i, '].name')));
        SET valuesJSON = JSON_EXTRACT(p_extras1JSON, CONCAT('$[', i, '].values'));

        IF JSON_VALID(valuesJSON) THEN
            SET totalKeys = JSON_LENGTH(JSON_KEYS(valuesJSON));
            SET j = 0;
            WHILE j < totalKeys DO
                SET keyName = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(valuesJSON), CONCAT('$[', j, ']')));
                SET keyValue = JSON_UNQUOTE(JSON_EXTRACT(valuesJSON, CONCAT('$.\"', keyName, '\"')));
                INSERT INTO customDeliverables (name, quantity, deliverableTypeId, project_id)
                VALUES (nameValue, keyValue, keyName, v_projectId);
                SET j = j + 1;
            END WHILE;
        END IF;
        SET i = i + 1;
    END WHILE;

    -- EXTRAS 2
    SET i = 0;
    WHILE i < JSON_LENGTH(p_extras2JSON) DO
        SET nameValue = JSON_UNQUOTE(JSON_EXTRACT(p_extras2JSON, CONCAT('$[', i, '].name')));
        SET valuesJSON = JSON_EXTRACT(p_extras2JSON, CONCAT('$[', i, '].values'));

        IF JSON_VALID(valuesJSON) THEN
            SET totalKeys = JSON_LENGTH(JSON_KEYS(valuesJSON));
            SET j = 0;
            WHILE j < totalKeys DO
                SET keyName = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(valuesJSON), CONCAT('$[', j, ']')));
                SET keyValue = JSON_UNQUOTE(JSON_EXTRACT(valuesJSON, CONCAT('$.\"', keyName, '\"')));
                INSERT INTO customDeliverables (name, quantity, deliverableTypeId, project_id)
                VALUES (nameValue, keyValue, keyName, v_projectId);
                SET j = j + 1;
            END WHILE;
        END IF;
        SET i = i + 1;
    END WHILE;

    -- EXTRAS 3
    SET i = 0;
    WHILE i < JSON_LENGTH(p_extras3JSON) DO
        SET nameValue = JSON_UNQUOTE(JSON_EXTRACT(p_extras3JSON, CONCAT('$[', i, '].name')));
        SET valuesJSON = JSON_EXTRACT(p_extras3JSON, CONCAT('$[', i, '].values'));

        IF JSON_VALID(valuesJSON) THEN
            SET totalKeys = JSON_LENGTH(JSON_KEYS(valuesJSON));
            SET j = 0;
            WHILE j < totalKeys DO
                SET keyName = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(valuesJSON), CONCAT('$[', j, ']')));
                SET keyValue = JSON_UNQUOTE(JSON_EXTRACT(valuesJSON, CONCAT('$.\"', keyName, '\"')));
                INSERT INTO customDeliverables (name, quantity, deliverableTypeId, project_id)
                VALUES (nameValue, keyValue, keyName, v_projectId);
                SET j = j + 1;
            END WHILE;
        END IF;
        SET i = i + 1;
    END WHILE;  

    SELECT v_projectId AS projectId;
END //
DELIMITER ;

-- procedimiento almacenado para subir documentos relacionados con el proyecto
DELIMITER //
CREATE PROCEDURE uploadDocument(
  IN p_document LONGBLOB,
  IN p_projectId INT,
  IN p_tag VARCHAR(100)
)
BEGIN
  INSERT INTO annexes (document, projectId, tag)
  VALUES (p_document, p_projectId, p_tag);
END //
DELIMITER ;

-- procedimiento almacenado para obtener los detalles de un proyecto
DELIMITER //
CREATE PROCEDURE getProjectDetails(IN p_projectId INT)
BEGIN
    -- datos principales del proyecto
    SELECT
        p.title,
        DATE_FORMAt(p.startDate, '%Y-%m-%d') AS startDate,
        DATE_FORMAT(p.endDate, '%Y-%m-%d') AS endDate,
        p.typeResearch, p.otherTypeResearch,
        p.topic, p.subtopic, p.alignmentPNIorODS, p.alignsWithPNIorODS,
        p.summary, p.introduction, p.background, p.statementOfProblem,
        p.justification, p.hypothesis, p.generalObjective, p.ethicalAspects,
        p.workWithHumans, p.workWithAnimals, p.biosecurityConsiderations,
        p.contributionsToIPNandCICATA, p.conflictOfInterest, p.aditionalComments,
        p.folio, p.status, p.hasCollaboration, p.collaborationJustification,
        p.formVersion, p.nextReview, p.preparedBy,
        p.reviewedBy, p.approvedBy,
        DATE_FORMAT(p.preparedDate, '%Y-%m-%d') AS preparedDate,
        DATE_FORMAT(p.reviewedDate, '%Y-%m-%d') AS reviewedDate,
        DATE_FORMAT(p.approvedDate, '%Y-%m-%d') AS approvedDate,
        p.otherEducationalDeliverable,
        p.otherDiffusionDeliverable,
        p.otherCurrentBudget, 
        p.otherInvestmentBudget
    FROM projects p
    WHERE p.projectId = p_projectId;

    -- associatedProjects
    SELECT
        name,
        DATE_FORMAT(associationDate, '%Y-%m-%d') AS associationDate,
        project_type, externalRegister, SIPRegister
    FROM associatedProjects
    WHERE project_id = p_projectId;

    -- members
    SELECT
        fName, lastName1, lastName2, email, phone, institution, positionWork, researchNetwork,
        researchNetworkName, academicDegree, levelName, levelNum, tutorName
    FROM members
    WHERE project_id = p_projectId;

    -- collaborativeInstitutions
    SELECT
        name, partOfIPN, collaborationAgreement, agreementType, agreementNumber
    FROM collaborativeInstitutions
    WHERE project_id = p_projectId;

    -- specificObjectives
    SELECT
        objectiveName, objectiveDescription 
    FROM specificObjectives
    WHERE project_id = p_projectId;

    -- scheduleActivities
    SELECT
        goal, institution, responsibleMember,
        DATE_FORMAt(startDate, '%Y-%m-%d') AS startDate,
        DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate
    FROM scheduleActivities
    WHERE project_id = p_projectId;

    -- deliverablesProjects
    SELECT
        dp.quantity,
        d.deliverableId,
        dt.deliverableTypeId,
        d.name
    FROM deliverablesProjects dp
    JOIN deliverables d ON dp.deliverableId = d.deliverableId
    JOIN deliverableTypes dt ON dp.deliverableTypeId = dt.deliverableTypeId
    WHERE dp.projectId = p_projectId;

    -- EXTRAS 1
    SELECT name, quantity, deliverableTypeId
    FROM customDeliverables
    WHERE project_id = p_projectId AND deliverableTypeId IN (1, 2, 3); -- educativo

    -- EXTRAS 2
    SELECT name, quantity, deliverableTypeId
    FROM customDeliverables
    WHERE project_id = p_projectId AND deliverableTypeId IN (4, 5); -- difusión

    -- EXTRAS 3
    SELECT name, quantity, deliverableTypeId
    FROM customDeliverables
    WHERE project_id = p_projectId AND deliverableTypeId IN (6, 7); -- tecnológico

    -- budgets
    SELECT
       *
    FROM budgets b
    WHERE b.project_id = p_projectId;

    -- goals
    SELECT goal
    FROM goals
    WHERE project_id = p_projectId;

    -- methodologies
    SELECT methodology
    FROM methodologies
    WHERE project_id = p_projectId;

    -- references
    SELECT reference
    FROM p_references
    WHERE project_id = p_projectId;

    -- investigador (usuario que registró el proyecto)
    SELECT u.fName, u.lastName1, u.lastName2, u.email, u.phone, u.institution, u.positionWork, u.researchNetwork,
        u.researchNetworkName, u.academicDegree, u.levelName, u.levelNum
    FROM usersProjects up
    JOIN users u ON up.user_id = u.userId
    WHERE up.project_id = p_projectId;

END //
DELIMITER ;

-- procedimiento almacenado para obtener los documentos de un proyecto
DELIMITER //
CREATE PROCEDURE getProjectDocuments(
  IN p_projectId INT
)
BEGIN
  SELECT
    annexeId,
    projectId,
    document,
    tag
  FROM annexes
  WHERE projectId = p_projectId;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE getCommitteeComments(
    IN p_projectId INT
)
BEGIN
    SELECT 
        c.name AS committeeName,
        e.comments
    FROM evaluations e
    JOIN users u ON e.user_id = u.userId
    JOIN committeeUsers cu ON cu.userId = u.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.evaluation_type_id = 2
      AND e.project_id = p_projectId
      AND e.comments IS NOT NULL
    GROUP BY c.name, e.comments;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE updateProject(
    IN p_projectId INT,

    -- Campos del proyecto
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
    IN p_otherTypeResearch VARCHAR(100),
    IN p_alignsWithPNIorODS BOOLEAN,
    IN p_hasCollaboration BOOLEAN,
    IN p_collaborationJustification TEXT,
    IN p_otherEducationalDeliverable TEXT,
    IN p_otherDiffusionDeliverable TEXT,
    IN p_otherCurrentBudget TEXT,
    IN p_otherInvestmentBudget TEXT,

    -- Arreglos
    IN p_associatedProjectsJSON JSON,
    IN p_membersJSON JSON,
    IN p_collaborativeInstitutionsJSON JSON,
    IN p_scheduleActivitiesJSON JSON,
    IN p_deliverablesJSON JSON,
    IN p_budgetsJSON JSON,
    IN p_goalsJSON JSON,
    IN p_methodologiesJSON JSON,
    IN p_referencesJSON JSON,
    IN p_specificObjectivesJSON JSON,
    IN p_extras1JSON JSON,
    IN p_extras2JSON JSON,
    IN p_extras3JSON JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE j INT DEFAULT 0;
    DECLARE total INT;
    DECLARE totalKeys INT;
    DECLARE keyName VARCHAR(50);
    DECLARE keyValue VARCHAR(50);
    DECLARE valuesJSON JSON;
    DECLARE nameValue VARCHAR(255);

    -- Actualizar solo campos provistos
    UPDATE projects
    SET 
        title = IFNULL(p_title, title),
        startDate = IFNULL(p_startDate, startDate),
        endDate = IFNULL(p_endDate, endDate),
        typeResearch = IFNULL(p_typeResearch, typeResearch),
        topic = IFNULL(p_topic, topic),
        subtopic = IFNULL(p_subtopic, subtopic),
        alignmentPNIorODS = IFNULL(p_alignmentPNIorODS, alignmentPNIorODS),
        summary = IFNULL(p_summary, summary),
        introduction = IFNULL(p_introduction, introduction),
        background = IFNULL(p_background, background),
        statementOfProblem = IFNULL(p_statementOfProblem, statementOfProblem),
        justification = IFNULL(p_justification, justification),
        hypothesis = IFNULL(p_hypothesis, hypothesis),
        generalObjective = IFNULL(p_generalObjective, generalObjective),
        ethicalAspects = IFNULL(p_ethicalAspects, ethicalAspects),
        workWithHumans = IFNULL(p_workWithHumans, workWithHumans),
        workWithAnimals = IFNULL(p_workWithAnimals, workWithAnimals),
        biosecurityConsiderations = IFNULL(p_biosecurityConsiderations, biosecurityConsiderations),
        contributionsToIPNandCICATA = IFNULL(p_contributionsToIPNandCICATA, contributionsToIPNandCICATA),
        conflictOfInterest = IFNULL(p_conflictOfInterest, conflictOfInterest),
        aditionalComments = IFNULL(p_aditionalComments, aditionalComments),
        folio = IFNULL(p_folio, folio),
        otherTypeResearch = IFNULL(p_otherTypeResearch, otherTypeResearch),
        alignsWithPNIorODS = IFNULL(p_alignsWithPNIorODS, alignsWithPNIorODS),
        hasCollaboration = IFNULL(p_hasCollaboration, hasCollaboration),
        collaborationJustification = IFNULL(p_collaborationJustification, collaborationJustification),
        otherEducationalDeliverable = IFNULL(p_otherEducationalDeliverable, otherEducationalDeliverable),
        otherDiffusionDeliverable = IFNULL(p_otherDiffusionDeliverable, otherDiffusionDeliverable),
        otherCurrentBudget = IFNULL(p_otherCurrentBudget, otherCurrentBudget),
        otherInvestmentBudget = IFNULL(p_otherInvestmentBudget, otherInvestmentBudget)
    WHERE projectId = p_projectId;

    -- Reemplazar secciones si son enviadas

    IF p_associatedProjectsJSON IS NOT NULL THEN
        DELETE FROM associatedProjects WHERE project_id = p_projectId;
        SET i = 0; SET total = JSON_LENGTH(p_associatedProjectsJSON);
        WHILE i < total DO
            INSERT INTO associatedProjects (name, associationDate, project_type, externalRegister, SIPRegister, project_id)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].name'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].associationDate'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].project_type'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].externalRegister'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_associatedProjectsJSON, CONCAT('$[', i, '].SIPRegister'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- members
    SET i = 0;
    IF p_membersJSON IS NOT NULL THEN
        DELETE FROM members WHERE project_id = p_projectId;
        SET total = JSON_LENGTH(p_membersJSON);
        WHILE i < total DO
            INSERT INTO members (
                fName, lastName1, lastName2, email, phone, institution, positionWork, researchNetwork, researchNetworkName,
                academicDegree, levelName, levelNum, tutorName, project_id
            )
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].fName'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].lastName1'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].lastName2'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].email'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].phone'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].institution'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].positionWork'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].researchNetwork'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].researchNetworkName'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].academicDegree'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].levelName'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].levelNum'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_membersJSON, CONCAT('$[', i, '].tutorName'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- collaborativeInstitutions
    SET i = 0;
    IF p_collaborativeInstitutionsJSON IS NOT NULL THEN
        DELETE FROM collaborativeInstitutions WHERE project_id = p_projectId;
        SET total = JSON_LENGTH(p_collaborativeInstitutionsJSON);
        WHILE i < total DO
            INSERT INTO collaborativeInstitutions (name, partOfIPN, collaborationAgreement, agreementType, agreementNumber, project_id)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].name'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].partOfIPN'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].collaborationAgreement'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].agreementType'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_collaborativeInstitutionsJSON, CONCAT('$[', i, '].agreementNumber'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- scheduleActivities
    SET i = 0;
    IF p_scheduleActivitiesJSON IS NOT NULL THEN
        DELETE FROM scheduleActivities WHERE project_id = p_projectId;
        SET total = JSON_LENGTH(p_scheduleActivitiesJSON);
        WHILE i < total DO
            INSERT INTO scheduleActivities (goal, institution, responsibleMember, startDate, endDate, project_id)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].goal'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].institution'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].responsibleMember'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].startDate'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_scheduleActivitiesJSON, CONCAT('$[', i, '].endDate'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- deliverables
    SET i = 0;
    IF p_deliverablesJSON IS NOT NULL THEN
        DELETE FROM deliverablesProjects WHERE projectId = p_projectId;
        SET total = JSON_LENGTH(p_deliverablesJSON);
        WHILE i < total DO
            INSERT INTO deliverablesProjects (quantity, projectId, deliverableId, deliverableTypeId)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].quantity'))),
                p_projectId,
                JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].deliverableId'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_deliverablesJSON, CONCAT('$[', i, '].deliverableTypeId')))
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- budgets
    SET i = 0;
    IF p_budgetsJSON IS NOT NULL THEN
        DELETE FROM budgets WHERE project_id = p_projectId;
        SET total = JSON_LENGTH(p_budgetsJSON);
        WHILE i < total DO
            INSERT INTO budgets (investmentExpenditure, name, expenditure, project_id, budgetTypeId)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].investmentExpenditure'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].name'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].expenditure'))),
                p_projectId,
                JSON_UNQUOTE(JSON_EXTRACT(p_budgetsJSON, CONCAT('$[', i, '].budgetTypeId')))
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- goals
    SET i = 0;
    IF p_goalsJSON IS NOT NULL THEN
        DELETE FROM goals WHERE project_id = p_projectId;
        SET total = JSON_LENGTH(p_goalsJSON);
        WHILE i < total DO
            INSERT INTO goals (goal, project_id)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_goalsJSON, CONCAT('$[', i, '].goal'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- methodologies
    SET i = 0;
    IF p_methodologiesJSON IS NOT NULL THEN
        DELETE FROM methodologies WHERE project_id = p_projectId;
        SET total = JSON_LENGTH(p_methodologiesJSON);
        WHILE i < total DO
            INSERT INTO methodologies (methodology, project_id)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_methodologiesJSON, CONCAT('$[', i, '].methodology'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- references
    SET i = 0;
    IF p_referencesJSON IS NOT NULL THEN
        DELETE FROM p_references WHERE project_id = p_projectId;
        SET total = JSON_LENGTH(p_referencesJSON);
        WHILE i < total DO
            INSERT INTO p_references (reference, project_id)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_referencesJSON, CONCAT('$[', i, '].reference'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;
    -- specificObjectives
    IF p_specificObjectivesJSON IS NOT NULL THEN
        DELETE FROM specificObjectives WHERE project_id = p_projectId;
        SET i = 0;
        SET total = JSON_LENGTH(p_specificObjectivesJSON);
        WHILE i < total DO
            INSERT INTO specificObjectives (objectiveName, objectiveDescription, project_id)
            VALUES (
                JSON_UNQUOTE(JSON_EXTRACT(p_specificObjectivesJSON, CONCAT('$[', i, '].objectiveName'))),
                JSON_UNQUOTE(JSON_EXTRACT(p_specificObjectivesJSON, CONCAT('$[', i, '].objectiveDescription'))),
                p_projectId
            );
            SET i = i + 1;
        END WHILE;
    END IF;

    -- EXTRAS 1
    IF p_extras1JSON IS NOT NULL THEN
        DELETE FROM customDeliverables WHERE project_id = p_projectId AND deliverableTypeId IN (1,2,3);
        SET i = 0;
        WHILE i < JSON_LENGTH(p_extras1JSON) DO
            SET nameValue = JSON_UNQUOTE(JSON_EXTRACT(p_extras1JSON, CONCAT('$[', i, '].name')));
            SET valuesJSON = JSON_EXTRACT(p_extras1JSON, CONCAT('$[', i, '].values'));
            IF JSON_VALID(valuesJSON) THEN
                SET totalKeys = JSON_LENGTH(JSON_KEYS(valuesJSON));
                SET j = 0;
                WHILE j < totalKeys DO
                    SET keyName = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(valuesJSON), CONCAT('$[', j, ']')));
                    SET keyValue = JSON_UNQUOTE(JSON_EXTRACT(valuesJSON, CONCAT('$."', keyName, '"')));
                    INSERT INTO customDeliverables (name, quantity, deliverableTypeId, project_id)
                    VALUES (nameValue, keyValue, keyName, p_projectId);
                    SET j = j + 1;
                END WHILE;
            END IF;
            SET i = i + 1;
        END WHILE;
    END IF;

    -- EXTRAS 2
    IF p_extras2JSON IS NOT NULL THEN
        DELETE FROM customDeliverables WHERE project_id = p_projectId AND deliverableTypeId IN (4,5);
        SET i = 0;
        WHILE i < JSON_LENGTH(p_extras2JSON) DO
            SET nameValue = JSON_UNQUOTE(JSON_EXTRACT(p_extras2JSON, CONCAT('$[', i, '].name')));
            SET valuesJSON = JSON_EXTRACT(p_extras2JSON, CONCAT('$[', i, '].values'));
            IF JSON_VALID(valuesJSON) THEN
                SET totalKeys = JSON_LENGTH(JSON_KEYS(valuesJSON));
                SET j = 0;
                WHILE j < totalKeys DO
                    SET keyName = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(valuesJSON), CONCAT('$[', j, ']')));
                    SET keyValue = JSON_UNQUOTE(JSON_EXTRACT(valuesJSON, CONCAT('$."', keyName, '"')));
                    INSERT INTO customDeliverables (name, quantity, deliverableTypeId, project_id)
                    VALUES (nameValue, keyValue, keyName, p_projectId);
                    SET j = j + 1;
                END WHILE;
            END IF;
            SET i = i + 1;
        END WHILE;
    END IF;

    -- EXTRAS 3
    IF p_extras3JSON IS NOT NULL THEN
        DELETE FROM customDeliverables WHERE project_id = p_projectId AND deliverableTypeId IN (6,7);
        SET i = 0;
        WHILE i < JSON_LENGTH(p_extras3JSON) DO
            SET nameValue = JSON_UNQUOTE(JSON_EXTRACT(p_extras3JSON, CONCAT('$[', i, '].name')));
            SET valuesJSON = JSON_EXTRACT(p_extras3JSON, CONCAT('$[', i, '].values'));
            IF JSON_VALID(valuesJSON) THEN
                SET totalKeys = JSON_LENGTH(JSON_KEYS(valuesJSON));
                SET j = 0;
                WHILE j < totalKeys DO
                    SET keyName = JSON_UNQUOTE(JSON_EXTRACT(JSON_KEYS(valuesJSON), CONCAT('$[', j, ']')));
                    SET keyValue = JSON_UNQUOTE(JSON_EXTRACT(valuesJSON, CONCAT('$."', keyName, '"')));
                    INSERT INTO customDeliverables (name, quantity, deliverableTypeId, project_id)
                    VALUES (nameValue, keyValue, keyName, p_projectId);
                    SET j = j + 1;
                END WHILE;
            END IF;
            SET i = i + 1;
        END WHILE;
    END IF;

    SELECT 'Proyecto actualizado correctamente' AS message;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getProjectForm(
  IN p_projectId INT
)
BEGIN
  SELECT 
    projectId,
    formVersion,
    nextReview,
    preparedBy,
    reviewedBy,
    approvedBy,
    DATE_FORMAT(preparedDate, '%Y-%m-%d') AS preparedDate,
    DATE_FORMAT(reviewedDate, '%Y-%m-%d') AS reviewedDate,
    DATE_FORMAT(approvedDate, '%Y-%m-%d') AS approvedDate
  FROM project_form
  WHERE projectId = p_projectId;
END //
DELIMITER ;


-- Miembro de comité -> Pantalla de inicio de proyectos pendientes
-- Procedimiento almacenado para obtener los proyectos pendientes de evaluación
-- por parte de un comité específico y un usuario específico
-- @param p_committeeId: Id del comité
-- @param p_userId: Id del usuario
-- @return: Proyectos pendientes de evaluación

DELIMITER //
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
                p.projectId,
                p.title,
                CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
                p.startDate,
                p.folio,
                p.status
            FROM
                projects p
            JOIN evaluations e ON p.projectId = e.project_id
            JOIN users u ON e.user_id = u.userId
            WHERE
                e.user_id = p_userId
                AND e.evaluation_type_id = 1
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
    IF NOT(
        EXISTS (
            SELECT 1
            FROM evaluations
            WHERE user_id = p_userId
              AND project_id = p_projectId
        )
        OR EXISTS (
            SELECT 1
            FROM evaluations e
            JOIN users u ON u.userId = e.user_id
            JOIN committeeUsers cu ON cu.userId = u.userId
            WHERE cu.committeeId IN (
                SELECT committeeId
                FROM committeeUsers
                WHERE userId = p_userId
            )
            AND e.result IS NULL
            AND e.project_id = p_projectId
        )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user is not an evaluator for this project';
    END IF;
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
    ELSEIF NOT (
        EXISTS (
            SELECT 1
            FROM evaluations
            WHERE user_id = p_userId
              AND project_id = p_projectId
        )
        OR EXISTS (
            SELECT 1
            FROM evaluations e
            JOIN users u ON u.userId = e.user_id
            JOIN committeeUsers cu ON cu.userId = u.userId
            WHERE cu.committeeId IN (
                SELECT committeeId
                FROM committeeUsers
                WHERE userId = p_userId
            )
            AND e.result IS NULL
            AND e.project_id = p_projectId
        )
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


-- Función para obtener los proyectos pendientes a enviar evaluación del comité
-- @param userId: Id del presidente o secretario deñ comité
-- @returns: Lista de proyectos pendientes
DELIMITER //
CREATE PROCEDURE getPendingCommitteeEvaluations(
    IN p_userId INT,
    IN p_committeeId INT
)
BEGIN
    DECLARE presidentId INT;

    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    END IF;
    SELECT u.userId INTO presidentId
    FROM committeeUsers cu
    JOIN users u ON cu.userId = u.userId
    WHERE cu.committeeId = p_committeeId AND u.userType_id = 3
    LIMIT 1;

    SELECT
        p.projectId,
        p.title,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
        p.startDate,
        p.endDate,
        p.folio,
        p.status
    FROM
        projects p
    JOIN evaluations e ON p.projectId = e.project_id
    JOIN users u ON e.user_id = u.userId
    WHERE
        e.user_id = presidentId AND e.evaluation_type_id = 2 AND e.result IS NULL;
END //
DELIMITER ;

-- Función para simular enviar el resultado de la evaluación del comité
-- @param commitee_id: id del comité
-- @param user_id: id del usuario
-- @param project_id: id del proyecto
-- @param result: resultado de la evaluación
-- @param comments: comentarios de la evaluación
-- @returns: Lista de proyectos pendientes
    DELIMITER //
CREATE PROCEDURE sendCommitteeEvaluationResult(
    IN p_committeeId INT,
    IN p_userId INT,
    IN p_project_id INT,
    IN p_result VARCHAR(50),
    IN p_comments VARCHAR(100)
)
BEGIN
    DECLARE v_presidentId INT;
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    ELSE
        SELECT
            u.userId INTO v_presidentId
        FROM
            committeeUsers cu
        JOIN users u ON cu.userId = u.userId
        WHERE
            cu.committeeId = p_committeeId AND u.userType_id = 3;
        UPDATE evaluations
        SET comments = p_comments, result = p_result
        WHERE evaluation_type_id = 2
             AND project_id = p_project_id
             AND user_id = v_presidentId;
    END IF;
END //
DELIMITER ;

-- Función para obtener todos los integrantes de un comité
-- @param userId: Id del presidente o secretario
-- @param committeeId: Id del comité
-- @returns: Lista de integrantes del comité

DELIMITER //
CREATE PROCEDURE getAllCommitteeMembers(
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
            cu.userId,
            CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName
        FROM committeeUsers cu
        JOIN users u ON cu.userId = u.userId
        WHERE committeeId = p_committeeId AND u.userType_id = 5 and active = true;
    END IF;
END //
DELIMITER ;

-- Función para obtener todos los datos de un integrante de comité
-- @param userId: Id del presidente o secretario
-- @param committeeId: Id del comité
-- @returns: Todos los datos de ese usuario
DELIMITER //
CREATE PROCEDURE getCommitteeMember(
    IN p_committeeId INT,
    IN p_userId INT, -- Del presidente o secretario
    IN p_memberId INT -- Del miembro del comité a obtener
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    END IF;
    SELECT
        u.userId,
        u.userType_id,
        u.fName,
        u.lastName1,
        u.lastName2,
        u.email,
        u.phone,
        u.institution,
        u.positionWork,
        u.researchNetwork,
        u.researchNetworkName,
        u.academicDegree,
        u.levelName,
        u.levelNum
    FROM users u
    JOIN committeeUsers cu ON u.userId = cu.userId
    WHERE cu.committeeId = p_committeeId AND u.userId = p_memberId AND u.userType_id = 5;
END //
DELIMITER ;

-- Función para crear un nuevo integrante de comité
-- @param userId: Id del presidente o secretario
-- @param committeeId: Id del comité
-- @param ...
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE createCommitteeMember(
    IN p_userId INT, -- Del presidente o secretario
    IN p_committeeId INT,

    IN p_fName varchar(50),
    IN p_lastName1 varchar(50),
    IN p_lastName2 varchar(50),
    IN p_email varchar(255),
    IN p_phone varchar(255),
    IN p_password varchar(255),
    IN p_institution varchar(50),
    IN p_positionWork varchar(50),
    IN p_researchNetwork BOOLEAN,
    IN p_researchNetworkName varchar(50),
    IN p_academicDegree varchar(50),
    IN p_levelName varchar(50),
    IN p_levelNum INT
)
BEGIN
    DECLARE newUserId INT;

    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    ELSE
        INSERT INTO users (
            fName,
            lastName1,
            lastName2,
            email,
            phone,
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
            p_phone,
            SHA2(p_password, 256),
            p_institution,
            p_positionWork,
            p_researchNetwork,
            p_researchNetworkName,
            p_academicDegree,
            p_levelName,
            p_levelNum,
            5
        );

        SET newUserId = LAST_INSERT_ID();

        INSERT INTO committeeUsers (userId, committeeId)
        VALUES (newUserId, p_committeeId);
    END IF;

END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE updateCommitteeMember(
    IN p_userId INT, -- Del presidente o secretario
    IN p_committeeId INT,

    IN p_memberId INT, -- Del miembro del comité a actualizar
    IN p_fName VARCHAR(50),
    IN p_lastName1 VARCHAR(50),
    IN p_lastName2 VARCHAR(50),
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_institution VARCHAR(50),
    IN p_positionWork VARCHAR(50),
    IN p_researchNetwork BOOLEAN,
    IN p_researchNetworkName VARCHAR(50),
    IN p_academicDegree VARCHAR(50),
    IN p_levelName VARCHAR(50),
    IN p_levelNum INT
)
BEGIN
    -- Validar que el usuario pertenece al comité
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM users
        WHERE userId = p_memberId AND userType_id = 5 AND active = true
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user is not a committee member or is inactive';
    END IF;

    -- Actualizar campos individualmente si no son NULL
    IF p_fName IS NOT NULL THEN
        UPDATE users SET fName = p_fName WHERE userId = p_memberId;
    END IF;

    IF p_lastName1 IS NOT NULL THEN
        UPDATE users SET lastName1 = p_lastName1 WHERE userId = p_memberId;
    END IF;

    IF p_lastName2 IS NOT NULL THEN
        UPDATE users SET lastName2 = p_lastName2 WHERE userId = p_memberId;
    END IF;

    IF p_email IS NOT NULL THEN
        UPDATE users SET email = p_email WHERE userId = p_memberId;
    END IF;

    IF p_phone IS NOT NULL THEN
        UPDATE users SET phone = p_phone WHERE userId = p_memberId;
    END IF;

    IF p_password IS NOT NULL THEN
        UPDATE users SET password = SHA2(p_password, 256) WHERE userId = p_memberId;
    END IF;

    IF p_institution IS NOT NULL THEN
        UPDATE users SET institution = p_institution WHERE userId = p_memberId;
    END IF;

    IF p_positionWork IS NOT NULL THEN
        UPDATE users SET positionWork = p_positionWork WHERE userId = p_memberId;
    END IF;

    IF p_researchNetwork IS NOT NULL THEN
        UPDATE users SET researchNetwork = p_researchNetwork WHERE userId = p_memberId;
    END IF;

    IF p_researchNetworkName IS NOT NULL THEN
        UPDATE users SET researchNetworkName = p_researchNetworkName WHERE userId = p_memberId;
    END IF;

    IF p_academicDegree IS NOT NULL THEN
        UPDATE users SET academicDegree = p_academicDegree WHERE userId = p_memberId;
    END IF;

    IF p_levelName IS NOT NULL THEN
        UPDATE users SET levelName = p_levelName WHERE userId = p_memberId;
    END IF;

    IF p_levelNum IS NOT NULL THEN
        UPDATE users SET levelNum = p_levelNum WHERE userId = p_memberId;
    END IF;
END //
DELIMITER ;

-- Función para eliminar un integrante de comité
-- modificando el atributo active a false
-- @param userId: Id del presidente o secretario
-- @param committeeId: Id del comité
-- @param memberId: Id del miembro del comité a eliminar
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE setCommitteeMemberInactive(
    IN p_userId INT, -- Del presidente o secretario
    IN p_committeeId INT,
    IN p_memberId INT -- Del miembro del comité a eliminar
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM committeeUsers
        WHERE userId = p_userId AND committeeId = p_committeeId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not belong to this committee';
    END IF;

    UPDATE users
    SET active = false
    WHERE userId = p_memberId AND userType_id = 5;
END //
DELIMITER ;

-- --------------------------- Subdireccion ----------------------------
-- Función auxiliar para obtener id de presidente de un comité
-- @param committeeId: id del comité
-- @returns: id del presidente del comité
DELIMITER //
CREATE FUNCTION getCommitteePresidentId(p_committeeId INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_presidentId INT;
    SELECT u.userId INTO v_presidentId
    FROM committeeUsers cu
    JOIN users u ON cu.userId = u.userId
    WHERE cu.committeeId = p_committeeId AND u.userType_id = 3
    LIMIT 1;
    RETURN v_presidentId;
END //
DELIMITER ;

-- Función auxiliar para obtener id de secretario de un comité
-- @param committeeId: id del comité
-- @returns: id del secretario del comité
DELIMITER //
CREATE FUNCTION getCommitteeSecretaryId(p_committeeId INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE v_secretaryId INT;
    SELECT u.userId INTO v_secretaryId
    FROM committeeUsers cu
    JOIN users u ON cu.userId = u.userId
    WHERE cu.committeeId = p_committeeId AND u.userType_id = 4
    LIMIT 1;
    RETURN v_secretaryId;
END //
    DELIMITER ;

-- Función para crear un nuevo usuario
-- @param fName: Nombre del usuario
-- @param lastName1: Primer apellido del usuario
-- @param lastName2: Segundo apellido del usuario
-- @param email: Correo electrónico del usuario
-- @param phone: Teléfono del usuario
-- @param password: Contraseña del usuario
-- @param institution: Institución del usuario
-- @param positionWork: Puesto de trabajo del usuario
-- @param researchNetwork: Red de investigación del usuario
-- @param researchNetworkName: Nombre de la red de investigación del usuario
-- @param academicDegree: Grado académico del usuario
-- @param levelName: Nombre del nivel académico del usuario
-- @param userType_id: Tipo de usuario (1: Investigador, 2: Evaluador, 3: Presidente, 4: Secretario, 5: Miembro de comité)
-- @returns: Lista de proyectos activos
DELIMITER //
CREATE PROCEDURE createUser (
  IN p_fName VARCHAR(50),
  IN p_lastName1 VARCHAR(50),
  IN p_lastName2 VARCHAR(50),
  IN p_email VARCHAR(255),
  IN p_phone VARCHAR(255),
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
    phone,
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
    p_phone,
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

-- Función para obtener todos los datos de un usuario
-- @param userId: Id del usuario
-- @returns: Todos los datos de ese usuario
DELIMITER //
CREATE PROCEDURE getUser(IN p_userId INT)
BEGIN
    SELECT
        u.userId,
        u.userType_id,
        u.fName,
        u.lastName1,
        u.lastName2,
        u.email,
        u.phone,
        u.institution,
        u.positionWork,
        u.researchNetwork,
        u.researchNetworkName,
        u.academicDegree,
        u.levelName,
        u.levelNum
    FROM users u
    WHERE userId = p_userId;
END //
DELIMITER ;

-- Función para actualizar los datos de un usuario
-- @param userId: Id del usuario
-- @param fName: Nombre del usuario
-- @param lastName1: Primer apellido del usuario
-- @param lastName2: Segundo apellido del usuario
-- @param email: Correo electrónico del usuario
-- @param phone: Teléfono del usuario
-- @param password: Contraseña del usuario
-- @param institution: Institución del usuario
-- @param positionWork: Puesto de trabajo del usuario
-- @param researchNetwork: Red de investigación del usuario
-- @param researchNetworkName: Nombre de la red de investigación del usuario
-- @param academicDegree: Grado académico del usuario
-- @param levelName: Nombre del nivel académico del usuario
-- @param levelNum: Número del nivel académico del usuario
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE updateUser (
  IN p_userId INT,
  IN p_fName VARCHAR(50),
  IN p_lastName1 VARCHAR(50),
  IN p_lastName2 VARCHAR(50),
  IN p_email VARCHAR(255),
  IN p_phone VARCHAR(255),
  IN p_password VARCHAR(255),
  IN p_institution VARCHAR(50),
  IN p_positionWork VARCHAR(50),
  IN p_researchNetwork BOOLEAN,
  IN p_researchNetworkName VARCHAR(50),
  IN p_academicDegree VARCHAR(50),
  IN p_levelName VARCHAR(50),
  IN p_levelNum INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users
        WHERE userId = p_userId and active = true
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not exist or is inactive';
    END IF;

    IF p_fName IS NOT NULL THEN
        UPDATE users SET fName = p_fName WHERE userId = p_userId;
    END IF;

    IF p_lastName1 IS NOT NULL THEN
        UPDATE users SET lastName1 = p_lastName1 WHERE userId = p_userId;
    END IF;

    IF p_lastName2 IS NOT NULL THEN
        UPDATE users SET lastName2 = p_lastName2 WHERE userId = p_userId;
    END IF;

    IF p_email IS NOT NULL THEN
        UPDATE users SET email = p_email WHERE userId = p_userId;
    END IF;

    IF p_phone IS NOT NULL THEN
        UPDATE users SET phone = p_phone WHERE userId = p_userId;
    END IF;

    IF p_password IS NOT NULL THEN
        UPDATE users SET password = SHA2(p_password, 256) WHERE userId = p_userId;
    END IF;

    IF p_institution IS NOT NULL THEN
        UPDATE users SET institution = p_institution WHERE userId = p_userId;
    END IF;

    IF p_positionWork IS NOT NULL THEN
        UPDATE users SET positionWork = p_positionWork WHERE userId = p_userId;
    END IF;

    IF p_researchNetwork IS NOT NULL THEN
        UPDATE users SET researchNetwork = p_researchNetwork WHERE userId = p_userId;
    END IF;

    IF p_researchNetworkName IS NOT NULL THEN
        UPDATE users SET researchNetworkName = p_researchNetworkName WHERE userId = p_userId;
    END IF;

    IF p_academicDegree IS NOT NULL THEN
        UPDATE users SET academicDegree = p_academicDegree WHERE userId = p_userId;
    END IF;

    IF p_levelName IS NOT NULL THEN
        UPDATE users SET levelName = p_levelName WHERE userId = p_userId;
    END IF;

    IF p_levelNum IS NOT NULL THEN
        UPDATE users SET levelNum = p_levelNum WHERE userId = p_userId;
    END IF;
END //

-- Función para simular la eliminación de un usuario
-- modificando su estado a inactivo
-- @param userId: Id del usuario
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE setUserInactive(IN p_userId INT)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM users
        WHERE userId = p_userId AND active = true
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The user does not exist or is already inactive';
    ELSE
        UPDATE users SET active = false WHERE userId = p_userId;
    END IF;
END //
DELIMITER ;

-- Función para obtener todos los proyectos activos existentes, es decir,
-- en status "En revisión" o "Pendiente de correcciones"
-- Se hace uso de un procedimiento almacena getCommitteeRubric
-- @param status: Estado activo del proyecto
-- @returns: Lista de proyectos activos
DELIMITER //
CREATE PROCEDURE getActiveProjectsSub()
BEGIN
    SELECT
        p.projectId,
        p.title,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
        p.startDate,
        p.endDate,
        p.folio,
        p.status
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId
    WHERE (p.status = 'En revision' OR p.status = 'Pendiente de correcciones');
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE getInactiveProjectsSub()
BEGIN
    SELECT
        p.projectId,
        p.title,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS fullName,
        p.startDate,
        p.endDate,
        p.folio,
        p.status
    FROM projects p
    LEFT JOIN usersProjects up ON p.projectId = up.project_id
    LEFT JOIN users u ON up.user_id = u.userId
    WHERE (p.status = 'Aprobado' OR p.status = 'No aprobado');
END //
DELIMITER ;

-- Procedimiento para guardar resultados de evaluación y comentarios
DELIMITER //
CREATE PROCEDURE saveEvaluationResults(
    IN p_committeeId INT,
    IN p_projectId INT,
    IN p_userId INT,
    IN p_score INT,
    IN p_result VARCHAR(50),
    IN p_comments TEXT
)
BEGIN
    UPDATE evaluations
        SET score = p_score,
            result = p_result,
            comments = p_comments
        WHERE project_id = p_projectId
            AND user_id = p_userId
            AND evaluation_type_id = 1;
END //
DELIMITER ;



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
        u.userType_id = p_userType_id AND u.active = true;
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
            cu.committeeId = p_committeeId AND u.userId NOT IN (
                SELECT user_id FROM evaluations WHERE project_id = p_projectId and evaluation_type_id = 1
            ) AND u.active = true;
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
    END IF;
    IF NOT EXISTS (
        SELECT 1 FROM users
        WHERE userId = p_evaluatorId AND active = true
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The evaluator does not exist or is inactive';
    END IF;
    INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
    VALUES (p_evaluatorId, p_projectId, 1);
    IF NOT EXISTS (
        SELECT 1 FROM agreements WHERE user_id = p_evaluatorId AND project_id = p_projectId
    ) THEN
        INSERT INTO agreements (agreed, user_id, project_id)
        VALUES (false, p_evaluatorId, p_projectId);
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

-- Función para obtener las evaluaciones de la primera etapa, en este caso del
-- CIP, relacionadas a un proyecto
-- Se hace uso de un procedimiento almacena getFirstStageEvaluations
-- @param projectId: Id del proyecto
-- @returns: Lista de evaluaciones de la primera etapa: nombre del comité, resultado y comentarios
--           stageCompleted: indica si la etapa se ha completado, jumpThirdStage: indica si se salta la tercera etapa
DELIMITER //
CREATE PROCEDURE getFirstStageEvaluations(
    IN p_projectId INT
)
BEGIN
    DECLARE v_committeeCIP INT;
    DECLARE v_presidentId INT;
    DECLARE v_result VARCHAR(50);
    DECLARE stageCompleted BOOLEAN DEFAULT FALSE;
    DECLARE jumpThirdStage BOOLEAN DEFAULT FALSE;
    DECLARE sendingPending BOOLEAN DEFAULT FALSE;

    SET v_committeeCIP = 1;

    -- Obtener el ID del primer comite y el ID del usuario (presidente)
    SET v_presidentId = getCommitteePresidentId(v_committeeCIP);

    -- Obtener el resultado de la evaluación
    SELECT e.result INTO v_result FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentId
    LIMIT 1;

    IF ROW_COUNT() = 0
    THEN
        SET sendingPending = TRUE;
    ELSE
        IF v_result = 'Aprobado' THEN
            SET stageCompleted = TRUE;
        ELSEIF v_result = 'No aprobado' OR v_result = 'Pendiente de correcciones' THEN
            SET jumpThirdStage = TRUE;
        END IF;
    END IF;

    SELECT c.name, e.result, e.comments FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentId
    LIMIT 1;

    SELECT stageCompleted, jumpThirdStage, sendingPending;

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
    DECLARE v_committeeCIP INT;
    DECLARE v_presidentId INT;
    DECLARE v_secretaryId INT;
    SET v_committeeCIP = 1;

    SET v_presidentId = getCommitteePresidentId(v_committeeCIP);
    SET v_secretaryId = getCommitteeSecretaryId(v_committeeCIP);

    -- Verificar si el proyecto ya tiene evaluaciones de la primera etapa
    IF EXISTS (
        SELECT 1 FROM evaluations
        WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_presidentId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The project already has evaluations of the first stage';
    END IF;

    -- Insertar la evaluación de la primera etapa, de tipo comité para el comité 1 (CIP),
    -- relacionada con secretario del comité
    INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
    VALUES (v_presidentId, p_projectId, 2);

    -- Creamos los acuerdos de confidencialidad para el presidente y secretario de ese comité
    INSERT INTO agreements (agreed, user_id, project_id)
    VALUES(false, v_presidentId, p_projectId),
          (false, v_secretaryId, p_projectId);
END //
DELIMITER ;


-- Función para crear las evaluaciones de la segunda etapa, en este caso de los comités CEI, CB y CI.
-- En caso de que el proyecto tenga marcado el uso de animales se crea la evaluación del comité CIQUAL
-- Se hace uso de un procedimiento almacenado createSecondStageEvaluations
-- @param projectId: Id del proyecto
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE createSecondStageEvaluations(
    IN p_projectId INT
)
BEGIN
    DECLARE v_committeeCIP INT;
    DECLARE v_committeeCI INT;
    DECLARE v_committeeCB INT;
    DECLARE v_committeeCEI INT;
    DECLARE v_committeeCIQUAL INT;

    DECLARE v_presidentIdCI INT;
    DECLARE v_presidentIdCB INT;
    DECLARE v_presidentIdCEI INT;
    DECLARE v_presidentIdCIQUAL INT;

    DECLARE v_secretaryIdCI INT;
    DECLARE v_secretaryIdCB INT;
    DECLARE v_secretaryIdCEI INT;
    DECLARE v_secretaryIdCIQUAL INT;

    DECLARE v_workWithAnimals BOOLEAN;

    DECLARE v_presidentIdCIP INT;

    SET v_committeeCIP = 1;
    SET v_committeeCI = 2;
    SET v_committeeCB = 3;
    SET v_committeeCEI = 4;
    SET v_committeeCIQUAL = 5;

    -- Obtener el ID del comité CIP y el ID del usuario (presidente)
    SET v_presidentIdCIP = getCommitteePresidentId(v_committeeCIP);

    -- Verificar si el proyecto ya tiene evaluaciones de la primera etapa
    IF EXISTS (
        SELECT 1 FROM evaluations
        WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_presidentIdCIP AND result = 'Aprobado'
    ) THEN
        -- Obtener el ID del comité CI y el ID del usuario presidente y secretario
        SET v_presidentIdCI = getCommitteePresidentId(v_committeeCI);
        SET v_secretaryIdCI = getCommitteeSecretaryId(v_committeeCI);
        -- Obtener el ID del comité CB y el ID del usuario presidente y secretario
        SET v_presidentIdCB = getCommitteePresidentId(v_committeeCB);
        SET v_secretaryIdCB = getCommitteeSecretaryId(v_committeeCB);
        -- Obtener el ID del comité CEI y el ID del usuario presidente y secretario
        SET v_presidentIdCEI = getCommitteePresidentId(v_committeeCEI);
        SET v_secretaryIdCEI = getCommitteeSecretaryId(v_committeeCEI);


        -- Verificar si el proyecto ya tiene evaluaciones del comité CI
        IF NOT EXISTS (
            SELECT 1 FROM evaluations
            WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_presidentIdCI
        ) THEN
            -- Insertar la evaluación de la segunda etapa, de tipo comité para el comité 2 (CI),
            INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
            VALUES (v_presidentIdCI, p_projectId, 2);
            -- Insertar acuerdo de confidencialidad del secretario y presidente de ese comité
            INSERT INTO agreements (agreed, user_id, project_id)
            VALUES(false, v_presidentIdCI, p_projectId),
                  (false, v_secretaryIdCI, p_projectId);
        END IF;

        -- Verificar si el proyecto ya tiene evaluaciones del comité CB
        IF NOT EXISTS (
            SELECT 1 FROM evaluations
            WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_presidentIdCB
        ) THEN
            -- Insertar la evaluación de la segunda etapa, de tipo comité para el comité 3 (CB),
            INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
            VALUES (v_presidentIdCB, p_projectId, 2);
            INSERT INTO agreements (agreed, user_id, project_id)
            VALUES(false, v_presidentIdCB, p_projectId),
                  (false, v_secretaryIdCB, p_projectId);
        END IF;

        -- Verificar si el proyecto ya tiene evaluaciones del comité CEI
        IF NOT EXISTS (
            SELECT 1 FROM evaluations
            WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_presidentIdCEI
        ) THEN
            -- Insertar la evaluación de la segunda etapa, de tipo comité para el comité 4 (CEI),
            INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
            VALUES (v_presidentIdCEI, p_projectId, 2);

            INSERT INTO agreements (agreed, user_id, project_id)
            VALUES(false, v_presidentIdCEI, p_projectId),
                  (false, v_secretaryIdCEI, p_projectId);
        END IF;

        -- Verificar si el proyecto tiene marcado el uso de animales
        SELECT workWithAnimals INTO v_workWithAnimals
        FROM projects
        WHERE projectId = p_projectId;

        -- Si el proyecto tiene marcado el uso de animales, insertar la evaluación del comité CIQUAL
        IF v_workWithAnimals THEN
            SET v_presidentIdCIQUAL = getCommitteePresidentId(v_committeeCIQUAL);
            SET v_secretaryIdCIQUAL = getCommitteeSecretaryId(v_committeeCIQUAL);

            IF NOT EXISTS (
                SELECT 1 FROM evaluations
                WHERE project_id = p_projectId AND evaluation_type_id = 2 AND user_id = v_presidentIdCIQUAL
            ) THEN
                INSERT INTO evaluations (user_id, project_id, evaluation_type_id)
                VALUES (v_presidentIdCIQUAL, p_projectId, 2);
                INSERT INTO agreements (agreed, user_id, project_id)
                VALUES(false, v_presidentIdCIQUAL, p_projectId),
                      (false, v_secretaryIdCIQUAL, p_projectId);
            END IF;
        END IF;
    ELSE
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The project does not have evaluations approved from first stage by the CIP committee';
    END IF;
END //
DELIMITER ;

-- Función para obtener las evaluaciones de la segunda etapa, en este caso de los comités CEI, CB y CI.
-- En caso de que el proyecto tenga marcado el uso de animales se obtiene la evaluación del comité CIQUAL
-- Se hace uso de un procedimiento almacenado getSecondStageEvaluations
-- @param projectId: Id del proyecto
-- @returns: Lista de evaluaciones de la segunda etapa: nombre del comité, resultado y comentarios
--           stageCompleted: indica si la etapa se ha completado, jumpThirdStage: indica si se salta la tercera etapa
DELIMITER //
CREATE PROCEDURE getSecondStageEvaluations(
    IN p_projectId INT
)
BEGIN
    DECLARE stageCompleted BOOLEAN DEFAULT FALSE;
    DECLARE jumpThirdStage BOOLEAN DEFAULT FALSE;
    DECLARE pendingEvaluations BOOLEAN DEFAULT FALSE;
    DECLARE sendingPending BOOLEAN DEFAULT FALSE;

    DECLARE v_committeeCI INT;
    DECLARE v_resultCI VARCHAR(50);
    DECLARE v_presidentIdCI INT;

    DECLARE v_committeeCB INT;
    DECLARE v_resultCB VARCHAR(50);
    DECLARE v_presidentIdCB INT;

    DECLARE v_committeeCEI INT;
    DECLARE v_resultCEI VARCHAR(50);
    DECLARE v_presidentIdCEI INT;

    DECLARE v_committeeCIQUAL INT;
    DECLARE v_resultCIQUAL VARCHAR(50);
    DECLARE v_presidentIdCIQUAL INT;

    DECLARE v_workWithAnimals BOOLEAN;

    SET v_committeeCI = 2;
    SET v_committeeCB = 3;
    SET v_committeeCEI = 4;
    SET v_committeeCIQUAL = 5;

    -- Obtener el ID del comité CI y el ID del usuario (presidente)
    SET v_presidentIdCI = getCommitteePresidentId(v_committeeCI);
    -- Guardamos el resultado de la evaluación del CI
    SELECT e.result INTO v_resultCI FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCI
    LIMIT 1;
    -- Seleccionamos para devolver el nombre del comité, su resultado y comentarios
    SELECT c.name, e.result, e.comments  FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCI
    LIMIT 1;

    IF FOUND_ROWS() = 0
    THEN
        SET sendingPending = TRUE;
    END IF;
    -- Obtener el ID del comité CB y el ID del usuario (presidente)
    SET v_presidentIdCB = getCommitteePresidentId(v_committeeCB);
    -- Guardamos el resultado de la evaluación CB
    SELECT e.result INTO v_resultCB  FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCB
    LIMIT 1;
    -- Seleccionamos para devolver el nombre del comité, su resultado y comentarios
    SELECT c.name, e.result, e.comments  FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCB
    LIMIT 1;
    IF FOUND_ROWS() = 0
    THEN
        SET sendingPending = TRUE;
    END IF;
    -- Obtener el ID del comité CEI y el ID del usuario (presidente)
    SET v_presidentIdCEI = getCommitteePresidentId(v_committeeCEI);
    -- Guardamos el resultado de evaluación del CEI
    SELECT e.result INTO v_resultCEI FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCEI
    LIMIT 1;
    -- Seleccionamos para devolver el nombre, resultado y comentarios del CEI
    SELECT c.name, e.result, e.comments  FROM evaluations e
    JOIN committeeUsers cu ON e.user_id = cu.userId
    JOIN committees c ON cu.committeeId = c.committeeId
    WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCEI
    LIMIT 1;
    IF FOUND_ROWS() = 0
    THEN
        SET sendingPending = TRUE;
    END IF;
    -- Verificar si el proyecto tiene marcado el uso de animales
    SELECT workWithAnimals INTO v_workWithAnimals
    FROM projects
    WHERE projectId = p_projectId;

    -- Si el proyecto tiene marcado el uso de animales, guardamos el resultado y devolvemos la información de la evaluación
    IF v_workWithAnimals THEN
        SET v_presidentIdCIQUAL = getCommitteePresidentId(v_committeeCIQUAL);
        SELECT e.result INTO v_resultCIQUAL  FROM evaluations e
        JOIN committeeUsers cu ON e.user_id = cu.userId
        JOIN committees c ON cu.committeeId = c.committeeId
        WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCIQUAL
        LIMIT 1;
        SELECT c.name, e.result, e.comments  FROM evaluations e
        JOIN committeeUsers cu ON e.user_id = cu.userId
        JOIN committees c ON cu.committeeId = c.committeeId
        WHERE e.project_id = p_projectId AND e.evaluation_type_id = 2 AND e.user_id = v_presidentIdCIQUAL
        LIMIT 1;
        IF FOUND_ROWS() = 0
        THEN
            SET sendingPending = TRUE;
        END IF;
        -- Si el resultado es nulo es que la evaluación sigue pendiente
        IF v_resultCIQUAL IS NULL
        THEN
            SET pendingEvaluations = TRUE;
        END IF;
    END IF;

    -- Si los resultados son nulos es que hay evaluaciones pendientes
    IF v_resultCB IS NULL
       OR v_resultCI IS NULL
       OR v_resultCEI IS NULL
    THEN
        SET pendingEvaluations = True;
    END IF;
    -- Si ya no hay evaluaciones pendientes entonces la etapa fue completada y saltamos a la tercera y última etapa
    IF !pendingEvaluations
    THEN
        SET stageCompleted = True;
        SET jumpThirdStage = True;
    END IF;

    SELECT stageCompleted, jumpThirdStage, sendingPending;
END //
DELIMITER ;

-- Función para obtener resultados de evaluación de un proyecto en específico
-- @param projectId: Id del proyecto
-- @returns: @finalResult: resultado de las evaluaciones de comités
DELIMITER //
CREATE PROCEDURE getResultThirdStage(
    IN p_projectId INT
)
BEGIN
    DECLARE sendingPending BOOLEAN DEFAULT FALSE;

    DECLARE v_result VARCHAR(50);
    DECLARE found INTEGER DEFAULT 1;
    DECLARE resultCursor CURSOR FOR
        SELECT result FROM evaluations WHERE project_id = p_projectId AND evaluation_type_id = 2;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET found = 0;
    OPEN resultCursor;
    SET @finalResult = 'Aprobado';
    bucle: LOOP
        FETCH resultCursor INTO v_result;
        IF NOT found THEN
            LEAVE bucle;
        END IF;
        IF v_result = 'No aprobado' THEN
            SET @finalResult = 'No aprobado';
        ELSEIF v_result = 'Pendiente de correcciones' THEN
            SET @finalResult = 'Pendiente de correcciones';
        ELSEIF v_result IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'The project has pending evaluations';
        END IF;
    END LOOP bucle;
    CLOSE resultCursor;
    IF (SELECT status COLLATE utf8mb4_unicode_ci FROM projects WHERE projectId = p_projectId) != @finalResult COLLATE utf8mb4_unicode_ci
    THEN
        SET sendingPending = TRUE;
    END IF;
    SELECT @finalResult, sendingPending;
END //
DELIMITER ;

-- Función para simular el envío de resultados de evaluación a un investigador
-- actualizando el status de este de acuerdo al resultado global dado por los comités
-- @param projectId: Id del proyecto
-- @returns: mensaje de éxito o error

DELIMITER //
CREATE PROCEDURE sendEvaluationResult(
    IN p_projectId INT
)
BEGIN
    CALL getResultThirdStage(p_projectId);
    UPDATE projects SET status = @finalResult WHERE projectId = p_projectId;
END //
DELIMITER ;


-- Función para crear dictum de un proyecto
-- @param projectId: Id del proyecto
-- @returns: Mensaje de éxito o error
DELIMITER //
CREATE PROCEDURE createDictum(
    IN p_projectId INT,
    IN p_folio VARCHAR(100),
    IN p_authorizerId INT
)
BEGIN
    -- Verificar si el proyecto ya tiene un dictum creado
    IF EXISTS (
        SELECT 1 FROM dictums
        WHERE project_id = p_projectId
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The project already has a dictum';
    END IF;
    -- Verificar si el proyecto tiene un resultado de evaluación válido para crear un dictum
    -- (Aprobado o No aprobado)
    IF NOT EXISTS (
        SELECT 1 FROM projects
        WHERE projectId = p_projectId AND ( status = 'Aprobado' OR status = 'No aprobado' )
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The project is not in a status to create a dictum';
    END IF;
    CALL getResultThirdStage(p_projectId);
    -- Insertar el dictum
    INSERT INTO dictums (
        project_id,
        folio,
        decision,
        date,
        authorizerId
    ) VALUES (
        p_projectId,
        p_folio,
        @finalResult,
        NOW(),
        p_authorizerId
    );
END //
DELIMITER ;

