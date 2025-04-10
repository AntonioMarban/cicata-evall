-- Para hacer inserts 

INSERT INTO userTypes(userTypeName)
VALUES
    ('Investigador'),
    ('Secretario'),
    ('Subsecretario'),
    ('Admin');

INSERT INTO users(fName, lastName1, lastName2, email, password, institution, positionWork, researchNetwork,researchNetworkName, academicDegree, levelName, levelNum, userType_id)
VALUES
    ('Luis', 'Navarro', 'Vivas','Gordinho13@gmail.com', SHA2('Numero12345$.', 256), 'IPN', 'Blood Spatter', TRUE, 'Forensics', 'Advanced Jiu-Jitsu', 'The bullet', 1, 1),
    ('Carolina', 'Figueroa', 'Orihuela','yubbyx@gmail.com', SHA2('Numero12345$.', 256), 'IPN', 'Blood Spatter', TRUE, 'Forensics', 'Advanced Jiu-Jitsu', 'The bullet', 1, 1);


INSERT INTO projects(title, startDate, folio, status)
VALUES

    ('This is a project', '2004-04-24', '0424', 'active'),
    ('This is not a project', '2004-03-13', 'guivina', 'active'),
    ('This is not a project', '2004-03-28', 'yubbyx', 'active');


INSERT INTO projects(title, startDate, endDate, folio, status)
VALUES
    ('This is not a project', '2004-03-24', '2023-12-31', 'tonystudios', 'inactive'),
    ('This is a project', '2005-05-11', '2023-12-31', 'laloquero', 'inactive');


INSERT INTO usersProjects(project_id, user_id)
VALUES
    (1,1),
    (1,2),
    (2,1),
    (2,2),
    (3,1),
    (3,2),
    (4,1),
    (4,2),
    (5,1),
    (5,2);

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
