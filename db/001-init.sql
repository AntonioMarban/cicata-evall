-- Aqui se crean procedimientos almacenados y mas


DELIMITER //
CREATE PROCEDURE getActiveProjects()
BEGIN
    SELECT
        p.title AS Proyecto,
        CONCAT(u.fName, ' ', u.lastName1, ' ', u.lastName2) AS Nombre
    FROM projects p
    JOIN usersProjects up ON p.projectId = up.project_id
    JOIN users u ON up.user_id = u.userId;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE login(
    IN user_email VARCHAR(100),
    IN user_password VARCHAR(100))
BEGIN
    SELECT email FROM users WHERE email = user_email AND password = SHA2(user_password,256);
END //
DELIMITER ;