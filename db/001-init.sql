-- Aqui se crean procedimientos almacenados y mas

DELIMITER //

CREATE PROCEDURE GetAllTasks()
BEGIN
    SELECT * FROM tasks;
END //

DELIMITER ;