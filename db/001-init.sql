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

/*
    Procedimiento almacenado para obtener los proyectos pendientes de evaluación
    por parte de un comité específico y un usuario específico
    @param p_committeeId: Id del comité
    @param p_userId: Id del usuario
    @return: Proyectos pendientes de evaluación
*/
DELIMITER //
CREATE PROCEDURE getPendingProject(IN p_committeeId INT, IN p_userId INT)
BEGIN
    SELECT 
        p.title,
        p.startDate,
        p.endDate,
        p.status 
    FROM 
        projects p 
    INNER JOIN evaluations e ON p.projectId = e.project_id
    WHERE 
        e.commiteeId = p_committeeId 
            AND e.userId = p_userId
            AND e.result = NULL;
                
END //
DELIMITER ;