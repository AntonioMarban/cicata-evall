-- Para hacer inserts 

INSERT INTO userTypes(userTypeName)
VALUES
    ('Investigador'),
    ('Secretario'),
    ('Subsecretario'),
    ('Admin');

INSERT INTO users(fName, lastName1, lastName2, email, password, institution, positionWork, researchNetwork,researchNetworkName, academicDegree, levelName, levelNum, userType_id)
VALUES
    ('Luis', 'Navarro', 'Vivas','Gordinho13@gmail.com', 'Numero12345$.', 'IPN', 'Blood Spatter', TRUE, 'Forensics', 'Advanced Jiu-Jitsu', 'The bullet', 1, 1);

INSERT INTO projects(title)
VALUES
    ('This is not a project');

INSERT INTO usersProjects(project_id, user_id)
VALUES
    (1,1);
