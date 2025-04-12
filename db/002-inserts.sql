-- Este archivo contiene los inserts para poblar las tablas de la base de datos

-- =============== INSERTS USER TYPES  ===============
INSERT INTO userTypes(userTypeName)
VALUES
    ('Investigador'),
    ('Administrador'),
    ('Presidente de comité'),
    ('Secretario de comité'),
    ('Integrante de comité')
;

-- =============== INSERTS USERS ===============
INSERT INTO users (fName, lastName1, lastName2, email, password, institution, positionWork, researchNetwork, researchNetworkName, academicDegree, levelName, levelNum, userType_id)
VALUES 
-- Usuarios de tipo investigador con Id 1 y 2
('Luis', 'Navarro', 'Vivas','investigador1@gmail.com', SHA2('investigador', 256), 'IPN', 'Blood Spatter', TRUE, 'Forensics', 'Advanced Jiu-Jitsu', 'The bullet', 1, 1),
('Carolina', 'Figueroa', 'Orihuela','investigador2@gmail.com', SHA2('investigador', 256), 'IPN', 'Blood Spatter', TRUE, 'Forensics', 'Advanced Jiu-Jitsu', 'The bullet', 1, 1),
-- Usuario de tipo administrador con Id 3
('Ana', 'Pérez', 'López', 'admin@gmail.com', SHA2('admin123', 256), 'IPN', 'Profesor', TRUE, 'RedBio', 'Doctorado', 'SNI I', 1, 2),
-- --------------
-- Usuario de tipo presidente de comité con Id 4
('Luis', 'Martínez', 'Gómez', 'presidente1@gmail.com', SHA2('presidente', 256), 'UNAM', 'Investigador', FALSE, '', 'Maestría', 'SNI II', 2, 3),
-- Usuario de tipo secretario de comité con Id 5
('Pablo', 'Martínez', 'Pérez', 'secretario1@gmail.com', SHA2('secretario', 256), 'UNAM', 'Investigador', FALSE, '', 'Maestría', 'SNI II', 2, 4),
-- Usuario de tipo integrante de comité con Id 6
('María', 'Ramírez', 'Díaz', 'integrante1@gmail.com', SHA2('integrante', 256), 'CICATA', 'Coordinadora', TRUE, 'RedTec', 'Doctorado', 'SNI III', 3, 5),
-- --------------
-- Usuario de tipo presidente de comité con Id 7
('José', 'Martínez', 'Gómez', 'presidente2@gmail.com', SHA2('presidente', 256), 'UNAM', 'Investigador', FALSE, '', 'Maestría', 'SNI II', 2, 3),
-- Usuario de tipo secretario de comité con Id 8
('Sebastián', 'Martínez', 'Pérez', 'secretario2@gmail.com', SHA2('secretario', 256), 'UNAM', 'Investigador', FALSE, '', 'Maestría', 'SNI II', 2, 4),
-- Usuario de tipo integrante de comité con Id 9
('Carlos', 'Ramírez', 'Díaz', 'integrante2@gmail.com', SHA2('integrante', 256), 'CICATA', 'Coordinador', TRUE, 'RedTec', 'Doctorado', 'SNI III', 3, 5);


-- =============== INSERTS PROJECTS ===============
INSERT INTO projects (title, startDate, endDate, typeResearch, topic, subtopic, alignmentPNIorODS, summary, introduction, background, statementOfProblem, justification, hypothesis, generalObjective, ethicalAspects, workWithHumans, workWithAnimals, biosecurityConsiderations, contributionsToIPNandCICATA, conflictOfInterest, aditionalComments, folio, status)
VALUES 
-- Proyecto en status "En revisión" con id 1
('Proyecto prueba 1', '2025-01-01', '2025-12-31', 'Científica', 'Biotecnología', 'Genética', 'ODS 3, ODS 9', 'Resumen del proyecto Alfa...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-001', 'En revisión'),
-- Proyecto en status "Pendiente de correcciones" con id 2
('Proyecto prueba 2', '2025-01-01', '2025-12-31', 'Tecnológica', 'Nanotecnología', 'Materiales', 'ODS 7, ODS 12', 'Resumen del proyecto Beta...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-002', 'Pendiente de correcciones'),
-- Proyecto en status "Aprobado" con id 3
('Proyecto prueba 3', '2025-01-01', '2025-12-31', 'Científica', 'Biomedicina', 'Farmacología', 'ODS 3, ODS 9', 'Resumen del proyecto Gama...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-003', 'Aprobado'),
-- Proyecto en status "No aprobado" con id 4
('Proyecto prueba 4', '2025-01-01', '2025-12-31', 'Tecnológica', 'Robótica', 'Inteligencia Artificial', 'ODS 4, ODS 8', 'Resumen del proyecto Delta...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-004', 'No aprobado'),
-- Proyecto en status "En revisión" con id 5
('Proyecto prueba 5', '2025-01-01', '2025-12-31', 'Científica', 'Biotecnología', 'Genética', 'ODS 3, ODS 9', 'Resumen del proyecto Alfa...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-001', 'En revisión'),
-- Proyecto en status "Pendiente de correcciones" con id 6
('Proyecto prueba 6', '2025-01-01', '2025-12-31', 'Tecnológica', 'Nanotecnología', 'Materiales', 'ODS 7, ODS 12', 'Resumen del proyecto Beta...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-002', 'Pendiente de correcciones'),
-- Proyecto en status "Aprobado" con id 7
('Proyecto prueba 7', '2025-01-01', '2025-12-31', 'Científica', 'Biomedicina', 'Farmacología', 'ODS 3, ODS 9', 'Resumen del proyecto Gama...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-003', 'Aprobado'),
-- Proyecto en status "No aprobado" con id 8
('Proyecto prueba 8', '2025-01-01', '2025-12-31', 'Tecnológica', 'Robótica', 'Inteligencia Artificial', 'ODS 4, ODS 8', 'Resumen del proyecto Delta...', 'Introducción...', 'Antecedentes...', 'Problema...', 'Justificación...', 'Hipótesis...', 'Objetivo general...', 'Aspectos éticos...', TRUE, FALSE, 'Consideraciones de bioseguridad...', 'Contribuciones...', 'Ninguno', 'Ninguno', 'FOL-004', 'No aprobado');



-- =============== INSERTS DE USERS - PROJECTS ===============
-- Aquí tenemos la relación entre usuarios de tipo investigador y proyectos
-- En este caso, el usuario 1 (Luis Navarro) está relacionado con los proyectos 1, 2, 3 y 4 (teniendo uno de cada tipo de status)
-- El usuario 2 (Carolina Figueroa) está relacionado con los proyectos 5, 6, 7 y 8 (teniendo uno de cada tipo de status)
INSERT INTO usersProjects (project_id, user_id) VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 2),
(6, 2),
(7, 2),
(8, 2);

-- =============== INSERTS DE COMMITTEES ===============
INSERT INTO committees (name) VALUES 
('Comité Interno de Proyectos'),
('Comité de Investigación'),
('Comité de Ética en Investigación'),
('Comité de Bioseguridad'),
('Comité Interno para el Cuidado y Uso de los Animales de Laboratorio');



-- =============== INSERTS DE USERS - COMMITTEES ===============
-- Aquí tenemos la relación entre usuarios de tipo presidente, secretario y integrante de comités
INSERT INTO committeeUsers (committeeId, userId) VALUES 
-- Integrantes del comité 1 (Comité Interno de Proyectos)
(1, 4),
(1, 5),
(1, 6),
-- Integrantes del comité 2 (Comité de Investigación)
(2, 7),
(2, 8),
(2, 9);


-- =============== INSERTS DE EVALUATION TYPES ===============
INSERT INTO evaluationTypes (type_name, description)
VALUES 
('Individual', 'Evaluación por parte del integrante de comité asignado'),
('Comité', 'Evaluación por parte del comité asignado al proyecto');

-- =============== INSERTS DE EVALUATIONS ===============
INSERT INTO evaluations (comments, score, result, evaluation_type_id, user_id, project_id)
VALUES 
-- ====== Evaluaciones tipo comité ligados al secretario del comité 1 y 2 ======
-- Evaluación del proyecto 1 que está en status "En revisión"
('Proyecto aprobado', NULL, 'Aprobado', 1, 5, 1), -- Secretario del comité 1 (evaluado)
(NULL, NULL, NULL, 2, 8, 1), -- Secretario del comité 2 (sin evaluar)

-- Evaluación del proyecto 2 que está en status "Pendiente de correcciones"
('Corregir', NULL, 'Pendiente de correcciones', 1, 5, 2), -- Secretario del comité 1 (evaluado)
('Corregir', NULL, 'Pendiente de correcciones', 2, 8, 2), -- Secretario del comité 2 (evaluado)

-- Evaluación del proyecto 3 que está en status "Aprobado"
('Proyecto aprobado', NULL, 'Aprobado', 1, 5, 3), -- Secretario del comité 1 (evaluado)
('Proyecto aprobado', NULL, 'Aprobado', 1, 8, 3), -- Secretario del comité 1 (evaluado)

-- Evaluación del proyecto 4 que está en status "No aprobado"
('Proyecto no aprobado', NULL, 'No aprobado', 1, 5, 4), -- Secretario del comité 1 (evaluado)
('Proyecto no aprobado', NULL, 'No aprobado', 2, 8, 4), -- Secretario del comité 2 (evaluado)

-- Evaluación del proyecto 5 que está en status "En revisión"
('Proyecto aprobado', NULL, 'Aprobado', 1, 5, 5), -- Secretario del comité 1 (evaluado)
(NULL, NULL, NULL, 2, 8, 5), -- Secretario del comité 2 (sin evaluar)

-- Evaluación del proyecto 6 que está en status "Pendiente de correcciones"
('Corregir', NULL, 'Pendiente de correcciones', 1, 5, 6), -- Secretario del comité 1 (evaluado)
('Corregir', NULL, 'Pendiente de correcciones', 2, 8, 6), -- Secretario del comité 2 (evaluado)

-- Evaluación del proyecto 7 que está en status "Aprobado"
('Proyecto aprobado', NULL, 'Aprobado', 1, 5, 7), -- Secretario del comité 1 (evaluado)
('Proyecto aprobado', NULL, 'Aprobado', 1, 8, 7), -- Secretario del comité 1 (evaluado)

-- Evaluación del proyecto 8 que está en status "No aprobado"
('Proyecto no aprobado', NULL, 'No aprobado', 1, 5, 8), -- Secretario del comité 1 (evaluado)
('Proyecto no aprobado', NULL, 'No aprobado', 2, 8, 8), -- Secretario del comité 2 (evaluado)


-- ====== Evaluaciones tipo individual ligados a los integrantes del comité 1 y 2 ======
-- Proyecto 1 que está en status "En revisión"
('Proyecto aprobado', 100, 'Aprobado', 1, 6, 1), -- Integrante del comité 1 (evaluado)
('Proyecto aprobado', NULL, 'Aprobado', 1, 9, 1), -- Integrante del comité 2 (evaluado)

-- Proyecto 2 que está en status "Pendiente de correcciones"
('Corregir, proyecto no aprobado', 40, 'Pendiente de correcciones', 1, 6, 2), -- Integrante del comité 1 (evaluado)
('Corregir, proyecto no aprobado', NULL, 'Pendiente de correcciones', 1, 9, 2), -- Integrante del comité 2 (evaluado)

-- Proyecto 3 que está en status "Aprobado"
('Proyecto aprobado', 100, 'Aprobado', 1, 6, 3), -- Integrante del comité 1 (evaluado)
('Proyecto aprobado', NULL, 'Aprobado', 1, 9, 3), -- Integrante del comité 2 (evaluado)

-- Proyecto 4 que está en status "No aprobado"
('Proyecto no aprobado', 40, 'No aprobado', 1, 6, 4), -- Integrante del comité 1 (evaluado)
('Proyecto no aprobado', NULL, 'No aprobado', 1, 9, 4), -- Integrante del comité 2 (evaluado)

-- Proyecto 5 que está en status "En revisión"
('Proyecto aprobado', 100, 'Aprobado', 1, 6, 5), -- Integrante del comité 1 (evaluado)
(NULL, NULL, NULL, 1, 9, 5), -- Integrante del comité 2 (evaluado)

-- Proyecto 6 que está en status "Pendiente de correcciones"
('Corregir, proyecto no aprobado', 40, 'Pendiente de correcciones', 1, 6, 6), -- Integrante del comité 1 (evaluado)
('Corregir, proyecto no aprobado', NULL, 'Pendiente de correcciones', 1, 9, 6), -- Integrante del comité 2 (evaluado)

-- Proyecto 7 que está en status "Aprobado"
('Proyecto aprobado', 100, 'Aprobado', 1, 6, 7), -- Integrante del comité 1 (evaluado)
('Proyecto aprobado', NULL, 'Aprobado', 1, 9, 7), -- Integrante del comité 2 (evaluado)

-- Proyecto 8 que está en status "No aprobado"
('Proyecto no aprobado', 40, 'No aprobado', 1, 6, 8), -- Integrante del comité 1 (evaluado)
('Proyecto no aprobado', NULL, 'No aprobado', 1, 9, 8), -- Integrante del comité 2 (evaluado)


-- ====== Evaluaciones tipo individual ligados a los secretarios del comité 1 y 2 ======
-- Proyecto 1 - En revisión (sin evaluar)
(NULL, NULL, NULL, 1, 5, 1),
(NULL, NULL, NULL, 1, 8, 1),

-- Proyecto 2 - Pendiente de correcciones
('Corregir, proyecto no aprobado', 40, 'Pendiente de correcciones', 1, 5, 2),
('Corregir, proyecto no aprobado', 40, 'Pendiente de correcciones', 1, 8, 2),

-- Proyecto 3 - Aprobado
('Proyecto aprobado', 100, 'Aprobado', 1, 5, 3),
('Proyecto aprobado', 100, 'Aprobado', 1, 8, 3),

-- Proyecto 4 - No aprobado
('Proyecto no aprobado', 40, 'No aprobado', 1, 5, 4),
('Proyecto no aprobado', 40, 'No aprobado', 1, 8, 4),

-- Proyecto 5 - En revisión (sin evaluar)
(NULL, NULL, NULL, 1, 5, 5),
(NULL, NULL, NULL, 1, 8, 5),

-- Proyecto 6 - Pendiente de correcciones
('Corregir, proyecto no aprobado', 40, 'Pendiente de correcciones', 1, 5, 6),
('Corregir, proyecto no aprobado', 40, 'Pendiente de correcciones', 1, 8, 6),

-- Proyecto 7 - Aprobado
('Proyecto aprobado', 100, 'Aprobado', 1, 5, 7),
('Proyecto aprobado', 100, 'Aprobado', 1, 8, 7),

-- Proyecto 8 - No aprobado
('Proyecto no aprobado', 40, 'No aprobado', 1, 5, 8),
('Proyecto no aprobado', 40, 'No aprobado', 1, 8, 8);



INSERT INTO deliverables (name)
VALUES
('Tesis (Alumnos titulados)'), ('Practicantes profesionales'), ('Alumnos PIFI'),
('Prestante del servicio social'), ('Otro (especificar)'),
('Artículo de divulgación'), ('Congresos'), ('Cursos'), ('Libros'),
('Conferencias o ponencias'), ('Artículos científico'), ('Seminarios'),
('Manuales'), ('Programas de Radio y/o TV'), ('Otro (especificar)'),
('Proceso'), ('Patente'), ('Hardware'), ('Prototipo'),
('Certificado de inversión'), ('Software');

-- deliverableTypes
INSERT INTO deliverableTypes (name)
VALUES
('Medio'), ('Superior'), ('Posgrado'),
('Nacional'), ('Internacional'),
('Piloto'), ('Laboratorio');



-- deliverablesProjects
INSERT INTO deliverablesProjects (quantity, projectId, deliverableId, deliverableTypeId)
VALUES
    (1, 1, 1, 1),
    (2, 1, 2, 2),
    (3, 2, 3, 4),
    (4, 2, 4, 7),
    (5, 3, 5, 2),
    (6, 3, 6, 6),
    (7, 4, 7, 1),
    (8, 4, 8, 7),
    (9, 5, 9, 6),
    (1, 5, 10, 7),
    (2, 6, 11, 2),
    (3, 6, 12, 4),
    (4, 7, 13, 3),
    (5, 7, 14, 5),
    (6, 8, 15, 5),
    (7, 8, 16, 7);


-- associatedProjects
INSERT INTO associatedProjects (name, associationDate, externalRegister, SIPRegister, project_id)
VALUES 
('Proyecto Beta', '2025-01-15', 'EXT123', 'SIP456', 1),
('Proyecto Gama', '2025-02-20', 'EXT789', 'SIP012', 3),
('Proyecto Delta', '2025-03-10', 'EXT345', 'SIP678', 5),
('Proyecto Epsilon', '2025-04-05', 'EXT901', 'SIP234', 8);


-- collaborativeInstitutions
INSERT INTO collaborativeInstitutions (name, partOfIPN, collaborationAgreement, agreementType, agreementNumber, project_id)
VALUES 
('Universidad de Colaboración', FALSE, 'Acuerdo A', 'Convenio Marco', 'AC123', 1),
('Instituto de Colaboración', TRUE, 'Acuerdo B', 'Convenio Específico', 'AC456', 2),
('Centro de Colaboración', FALSE, 'Acuerdo C', 'Convenio Marco', 'AC789', 3),
('Universidad de Colaboración 2', TRUE, 'Acuerdo D', 'Convenio Específico', 'AC012', 4);

-- specificObjectives
INSERT INTO specificObjectives (objective, project_id)
VALUES 
('Desarrollar un prototipo funcional', 1),
('Realizar pruebas de laboratorio', 2),
('Analizar los resultados obtenidos', 3), ('Publicar los hallazgos en una revista científica', 4),
('Colaborar con instituciones externas para validar el proyecto', 5);

-- scheduleActivities
INSERT INTO scheduleActivities (goal, institution, responsibleMember, startDate, endDate, project_id)
VALUES 
('Diseño de prototipo', 'IPN', 'Ana Pérez', '2025-02-01', '2025-03-31', 1),    
('Pruebas de laboratorio', 'IPN', 'Luis Martínez', '2025-04-01', '2025-06-30', 2),
('Análisis de datos', 'IPN', 'Pablo Martínez', '2025-07-01', '2025-09-30', 3),
('Redacción del informe final', 'IPN', 'María Ramírez', '2025-10-01', '2025-12-31', 4),
('Presentación de resultados', 'IPN', 'Ana Pérez', '2025-11-01', '2025-12-31', 5),
('Colaboración con instituciones externas', 'IPN', 'Luis Martínez', '2025-01-01', '2025-12-31', 6),
('Validación del proyecto', 'IPN', 'Pablo Martínez', '2025-01-01', '2025-12-31', 7),
('Publicación de resultados', 'IPN', 'María Ramírez', '2025-01-01', '2025-12-31', 8);

-- budgets
INSERT INTO budgets (investmentExpenditure, name, expenditure, project_id)
VALUES 
(50000, 'Equipo de laboratorio', 50000, 1),
(30000, 'Materiales', 30000, 2),
(20000, 'Servicios externos', 20000, 3), 
(10000, 'Gastos administrativos', 1000, 4),
(15000, 'Viajes y transporte', 2300, 5), 
(25000, 'Honorarios', 10200, 6),
(35000, 'Publicidad y difusión', 20000, 7), 
(40000, 'Otros gastos', 40300, 8);

-- members
INSERT INTO members (fName, lastName1, lastName2, email, institution, positionWork, researchNetwork, researchNetworkName, academicDegree, levelName, levelNum, tutorName, project_id)
VALUES 
('Carlos', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 1),
('José', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 2),
('José', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 2),
('José', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 2),
('José', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 3),
('José', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 5),
('José', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 6),
('José', 'Jiménez', 'Torres', 'carlos.jt@example.com', 'IPN', 'Estudiante', TRUE, 'RedBio', 'Licenciatura', 'NA', 0, 'Ana Pérez', 7);


-- annexes
INSERT INTO annexes (document, projectId) VALUES 
(NULL, 1),
(NULL, 2),
(NULL, 3),
(NULL, 4),
(NULL, 5),
(NULL, 6),
(NULL, 7),
(NULL, 8);


-- =============== INSERTS DE DICTUMS ===============
INSERT INTO dictums (decision, comments, document, project_id)
VALUES 
-- Proyecto 3: Aprobado
('Aprobado', 'El proyecto ha sido aprobado por el comité', NULL, 3),
-- Proyecto 4: No aprobado
('No aprobado', 'El proyecto ha sido rechazado por el comité', NULL, 4),
-- Proyecto 7: Aprobado
('Aprobado', 'El proyecto ha sido aprobado por el comité', NULL, 7),
-- Proyecto 8: No aprobado
('No aprobado', 'El proyecto ha sido rechazado por el comité', NULL, 8);


-- =============== INSERTS DE AGREEMENTS ===============
INSERT INTO agreements (agreed, user_id, project_id)
VALUES 
-- Proyecto 1

(TRUE, 6, 1),    -- Integrante comité 1: evaluó individual
(TRUE, 9, 1),    -- Integrante comité 2: evaluó individual
(FALSE, 5, 1),   -- Secretario comité 1: no ha evaluado individual
(FALSE, 8, 1),   -- Secretario comité 2: no ha evaluado individual

-- Proyecto 2

(TRUE, 6, 2),    -- Integrante comité 1: evaluó individual
(TRUE, 9, 2),    -- Integrante comité 2: evaluó individual
(TRUE, 5, 2),    -- Secretario comité 1: evaluó individual
(TRUE, 8, 2),    -- Secretario comité 2: evaluó individual

-- Proyecto 3

(TRUE, 6, 3),    -- Integrante comité 1: evaluó individual
(TRUE, 9, 3),    -- Integrante comité 2: evaluó individual
(TRUE, 5, 3),    -- Secretario comité 1: evaluó individual
(TRUE, 8, 3),    -- Secretario comité 2: evaluó individual

-- Proyecto 4

(TRUE, 6, 4),    -- Integrante comité 1: evaluó individual
(TRUE, 9, 4),    -- Integrante comité 2: evaluó individual
(TRUE, 5, 4),    -- Secretario comité 1: evaluó individual
(TRUE, 8, 4),    -- Secretario comité 2: evaluó individual

-- Proyecto 5
(TRUE, 6, 5),    -- Integrante comité 1: evaluó individual
(FALSE, 9, 5),   -- Integrante comité 2: no ha evaluado individual
(FALSE, 5, 5),   -- Secretario comité 1: no ha evaluado individual
(FALSE, 8, 5),   -- Secretario comité 2: no ha evaluado individual

-- Proyecto 6
(TRUE, 6, 6),    -- Integrante comité 1: evaluó individual
(TRUE, 9, 6),    -- Integrante comité 2: evaluó individual
(TRUE, 5, 6),    -- Secretario comité 1: evaluó individual
(TRUE, 8, 6),    -- Secretario comité 2: evaluó individual

-- Proyecto 7
(TRUE, 6, 7),    -- Integrante comité 1: evaluó individual
(TRUE, 9, 7),    -- Integrante comité 2: evaluó individual
(TRUE, 5, 7),    -- Secretario comité 1: evaluó individual
(TRUE, 8, 7),    -- Secretario comité 2: evaluó individual

-- Proyecto 8
(TRUE, 6, 8),    -- Integrante comité 1: evaluó individual
(TRUE, 9, 8),    -- Integrante comité 2: evaluó individual
(TRUE, 5, 8),    -- Secretario comité 1: evaluó individual
(TRUE, 8, 8);    -- Secretario comité 2: evaluó individual


-- =============== INSERTS DE AGREEMENTS ===============
INSERT INTO rubrics (rubric, committee_id)
VALUES 
(NULL, 1), -- Rubrica del comité 1
(NULL, 2); -- Rubrica del comité 2
