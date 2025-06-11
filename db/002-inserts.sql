-- Nombre del archivo: 002-inserts.sql
-- Descripción: Este archivo contiene los inserts necesarios para el correcto funcionamiento de EVALL

-- UTF8MB4 nos permite almacenar caracteres especiales
SET NAMES utf8mb4;

-- =============== INSERTS USER TYPES  ===============
INSERT INTO userTypes(userTypeName)
VALUES
    ('Investigador'),
    ('Administrador'),
    ('Presidente de comité'),
    ('Secretario de comité'),
    ('Integrante de comité');

-- =============== INSERTS USERS PRINCIPALES  ===============
INSERT INTO users (fname, lastName1, lastName2, prefix, email, password, userType_id)
VALUES 
-- Usuario de tipo administrador
('Administrador', 'de','Evall', '', 'administrador@gmail.com', SHA2('adminCICATA#2025', 256), 2),
-- Presidente de comité CIP
('Presidente', 'del','CIP', '', 'presidente_cip@gmail.com', SHA2('preCIP%678', 256), 3),
-- Secretario de comité CIP
('Secretario', 'del','CIP', '', 'secretario_cip@gmail.com', SHA2('secCIP%483', 256), 4),
-- Presidente de comité CI
('Presidente', 'del','CI', '', 'presidente_ci@gmail.com', SHA2('preCI%489', 256), 3),
-- Secretario de comité CI
('Secretario', 'del','CI', '', 'secretario_ci@gmail.com', SHA2('secCI%756', 256), 4),
-- Presidente de comité CEI
('Presidente', 'del','CEI', '', 'presidente_cei@gmail.com', SHA2('preCEI%306', 256), 3),
-- Secretario de comité CEI
('Secretario', 'del','CEI', '', 'secretario_cei@gmail.com', SHA2('secCEI%945', 256), 4),
-- Presidente de comité CB
('Presidente', 'del','CB', '', 'presidente_cb@gmail.com', SHA2('preCB%870', 256), 3),
-- Secretario de comité CB
('Secretario', 'del','CB', '', 'secretario_cb@gmail.com', SHA2('secCB%953', 256), 4),
-- Presidente de comité CICUAL
('Presidente', 'del','CICUAL', '', 'presidente_cicual@gmail.com', SHA2('preCICUAL%973', 256), 3),
-- Secretario de comité CICUAL
('Secretario', 'del','CICUAL', '', 'secretario_cicual@gmail.com', SHA2('secCICUAL%547', 256), 4);


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
-- Presidente y secretario del comité CIP
(1, 2), -- Presidente de comité CIP
(1, 3), -- Secretario de comité CIP
-- Presidente y secretario del comité CI
(2, 4), -- Presidente de comité CI
(2, 5), -- Secretario de comité CI
-- Presidente y secretario del comité CEI
(3, 6), -- Presidente de comité CEI
(3, 7), -- Secretario de comité CEI
-- Presidente y secretario del comité CB
(4, 8), -- Presidente de comité CB
(4, 9), -- Secretario de comité CB
-- Presidente y secretario del comité CICUAL
(5, 10), -- Presidente de comité CICUAL
(5, 11); -- Secretario de comité CICUAL

-- ================ INSERTS DE EVALUATION TYPES =============
INSERT INTO evaluationTypes (type_name, description)
VALUES 
('Individual', 'Evaluación por parte del integrante de comité asignado'),
('Comité', 'Evaluación por parte del comité asignado al proyecto');

-- =============== INSERTS DE DELIVERABLES ===============
INSERT INTO deliverables (name)
VALUES
('Tesis (Alumnos titulados)'), ('Practicantes profesionales'), ('Alumnos PIFI'),
('Prestante del servicio social'), ('Otro (especificar)'),
('Artículo de divulgación'), ('Congresos'), ('Cursos'), ('Libros'),
('Conferencias o ponencias'), ('Artículos científico'), ('Seminarios'),
('Manuales'), ('Programas de Radio y/o TV'), ('Otro (especificar)'),
('Proceso'), ('Patente'), ('Hardware'), ('Prototipo'),
('Certificado de inversión'), ('Software');

-- ============== INSERTS DE DELIVERABLE TYPES ===============
INSERT INTO deliverableTypes (name)
VALUES
('Medio'), ('Superior'), ('Posgrado'),
('Nacional'), ('Internacional'),
('Piloto'), ('Laboratorio');

-- ============== INSERTS DE BUDGET SECTIONS ===============
INSERT INTO budgetSections (name) VALUES
('Gasto de Inversión'),
('Gasto Corriente'),
('Obtención presupuesto interno'),
('Obtención presupuesto externo');

-- ============== INSERTS DE BUDGET TYPES ===============
INSERT INTO budgetTypes (type_name, budgetSectionId) VALUES 
-- Primera tabla
('Equipo de laboratorio', 1),
('Equipo de cómputo', 1),
('Herramientas y accesorios', 1),
('Otros (especifique)', 1),
('Artículos, materiales y útiles diversos', 2),
('Gastos de trabajo de campo', 2),
('Difusión de los resultados de investigación', 2),
('Pago por servicios externos', 2),
('Viáticos, pasajes y gastos de transportación', 2),
('Gastos de atención a profesores visitantes, técnicos o expertos visitantes', 2),
('Compra de libros y suscripción a revistas', 2),
('Gastos de publicación en revistas nacionales e internacionales', 2),
('Registro de patentes y propiedad intelectual', 2),
('Validación de concepto tecnológico', 2),
('Animales para protocolos de investigación', 2),
('Otros (especifique)', 2),
-- Segunda tabla
('Proyectos de Investigación Científica y Desarrollo Tecnológico', 3),
('Proyectos de Investigación en el Programa Especial de Consolidación de Investigadores', 3),
('Proyectos de Desarrollo Tecnológico o Innovación en el IPN', 3),
('Proyectos de Investigación Multidisciplinarios y Transdisciplinarios de Investigación Científica y Desarrollo Tecnológico', 3),
('Proyecto transdiciplinario', 3),
('Proyectos de Desarrollo Tecnológico o Innovación para alumnos del IPN', 3),
('Externas', 4),
('Otros (especifique)', 3);
