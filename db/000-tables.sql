-- mysql -u root -p
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS mydb;
CREATE DATABASE mydb;
USE mydb;


CREATE TABLE `userTypes` (
  `userTypeId` integer PRIMARY KEY AUTO_INCREMENT,
  `UserTypeName` varchar(50)
);

CREATE TABLE `users` (
  `userId` integer PRIMARY KEY AUTO_INCREMENT,
  `fName` varchar(50),
  `lastName1` varchar(50),
  `lastName2` varchar(50),
  `email` varchar(255),
  `phone` varchar(255),
  `password` varchar(255),
  `institution` varchar(50),
  `positionWork` varchar(50),
  `researchNetwork` bool,
  `researchNetworkName` varchar(50),
  `academicDegree` varchar(50),
  `levelName` varchar(50),
  `levelNum` integer,
  `userType_id` integer,
  `active` bool default true
);

CREATE TABLE `committees` (
  `committeeId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100)
);

CREATE TABLE `committeeUsers` (
  `committeeUserId` integer PRIMARY KEY AUTO_INCREMENT,
  `committeeId` integer,
  `userId` integer
);

CREATE TABLE `projects` (
  `projectId` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(100),
  `startDate` date,
  `endDate` date,
  `typeResearch` varchar(50),
  `topic` varchar(50),
  `subtopic` varchar(50),
  `alignmentPNIorODS` TEXT,
  `summary` TEXT,
  `introduction` TEXT,
  `background` TEXT,
  `statementOfProblem` TEXT,
  `justification` TEXT,
  `hypothesis` TEXT,
  `generalObjective` TEXT,
  `ethicalAspects` TEXT,
  `workWithHumans` bool,
  `workWithAnimals` bool,
  `biosecurityConsiderations` TEXT,
  `contributionsToIPNandCICATA` TEXT,
  `conflictOfInterest` TEXT,
  `aditionalComments` TEXT,
  `folio` varchar(50),
  `status` varchar(50) DEFAULT 'En revisión'
);

CREATE TABLE `deliverables` (
  `deliverableId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(30)
);

CREATE TABLE `deliverableTypes` (
  `deliverableTypeId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(30)
);
  
CREATE TABLE `deliverablesProjects` (
  `deliverableProjectId` integer PRIMARY KEY AUTO_INCREMENT,
  `quantity` integer,
  `projectId` integer,
  `deliverableId` integer,
  `deliverableTypeId` integer
);

CREATE TABLE `associatedProjects` (
  `associatedProjectId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `associationDate` date,
  `project_type` TEXT,
  `externalRegister` varchar(30),
  `SIPRegister` varchar(30),
  `project_id` integer
);

CREATE TABLE `collaborativeInstitutions` (
  `collaborativeInstitutionId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `partOfIPN` bool,
  `collaborationAgreement` varchar(30),
  `agreementType` varchar(30),
  `agreementNumber` varchar(30),
  `project_id` integer
);

CREATE TABLE `specificObjectives` (
  `specificObjectiveId` integer PRIMARY KEY AUTO_INCREMENT,
  `objectiveName` TEXT,
  `objectiveDescription` TEXT,
  `project_id` integer
);


CREATE TABLE `scheduleActivities` (
  `scheduleActivityId` integer PRIMARY KEY AUTO_INCREMENT,
  `goal` text,
  `institution` varchar(50),
  `responsibleMember` varchar(100),
  `startDate` date,
  `endDate` date,
  `project_id` integer
);

CREATE TABLE `budgets` (
  `budgetstId` integer PRIMARY KEY AUTO_INCREMENT,
  `investmentExpenditure` integer,
  `name` varchar(50),
  `expenditure` integer,
  `budgetDate` date,
  `otherName` varchar(50),
  `project_id` integer
);

CREATE TABLE `members` (
  `memberId` integer PRIMARY KEY AUTO_INCREMENT,
  `fName` varchar(50),
  `lastName1` varchar(50),
  `lastName2` varchar(50),
  `email` varchar(255),
  `phone` varchar(255),
  `institution` varchar(50),
  `positionWork` varchar(50),
  `researchNetwork` bool,
  `researchNetworkName` varchar(50),
  `academicDegree` varchar(50),
  `levelNumSNI` varchar(50),
  `levelNumCOFFA` varchar(50),
  `levelNumEDI` varchar(50),
  `tutorName` varchar(100),
  `project_id` integer
);

CREATE TABLE `usersProjects` (
  `userProjectId` integer PRIMARY KEY AUTO_INCREMENT,
  `project_id` integer,
  `user_id` integer
);

CREATE TABLE `annexes` (
  `annexeId` integer PRIMARY KEY AUTO_INCREMENT,
  `document` LONGBLOB,
  `filename` VARCHAR(255),
  `projectId` integer
);

CREATE TABLE `evaluationTypes` (
  `evaluationTypeId` integer PRIMARY KEY AUTO_INCREMENT,
  `type_name` varchar(50),
  `description` varchar(255)
);

CREATE TABLE `evaluations` (
  `evaluationId` integer PRIMARY KEY AUTO_INCREMENT,
  `comments` TEXT,
  `score` integer,
  `result` varchar(50),
  `evaluation_type_id` integer,
  `user_id` integer,
  `project_id` integer
);

CREATE TABLE `dictums` (
  `dictumId` integer PRIMARY KEY AUTO_INCREMENT,
  `folio` varchar(100),
  `decision` varchar(50),
  `date` date,
  `authorizerId` integer,
  `project_id` integer
);

CREATE TABLE `agreements` (
  `agreement_id` integer PRIMARY KEY AUTO_INCREMENT,
  `date` date,
  `agreed` bool,
  `user_id` integer,
  `project_id` integer
);

CREATE TABLE `rubrics` (
  `rubric_id` integer PRIMARY KEY AUTO_INCREMENT,
  `rubric` longblob,
  `committee_id` integer
);

CREATE TABLE `goals` (
  `goal_id` integer PRIMARY KEY AUTO_INCREMENT,
  `goal` TEXT,
  `project_id` integer
);

CREATE TABLE `methodologies` (
  `methodology_id` integer PRIMARY KEY AUTO_INCREMENT,
  `methodology` TEXT,
  `project_id` integer
);

CREATE TABLE `p_references` (
  `references_id` integer PRIMARY KEY AUTO_INCREMENT,
  `reference` TEXT,
  `project_id` integer
);

CREATE TABLE `budgetTypes` (
  `budgetTypeId` integer PRIMARY KEY AUTO_INCREMENT,
  `type_name` varchar(150),
  `budgetSectionId` INT
);

CREATE TABLE `customDeliverables` (
  `customDeliverables_id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE budgetSections (
  `budgetSectionId` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100)
);

ALTER TABLE `users` ADD FOREIGN KEY (`userType_id`) REFERENCES `userTypes` (`userTypeId`);

ALTER TABLE `committeeUsers` ADD FOREIGN KEY (`committeeId`) REFERENCES `committees` (`committeeId`);

ALTER TABLE `committeeUsers` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `deliverablesProjects` ADD FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`);

ALTER TABLE `deliverablesProjects` ADD FOREIGN KEY (`deliverableId`) REFERENCES `deliverables` (`deliverableId`);

ALTER TABLE `deliverablesProjects` ADD FOREIGN KEY (`deliverableTypeId`) REFERENCES `deliverableTypes` (`deliverableTypeId`);

ALTER TABLE `associatedProjects` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `collaborativeInstitutions` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `specificObjectives` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `scheduleActivities` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `budgets` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `members` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `usersProjects` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `usersProjects` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`);

ALTER TABLE `annexes` ADD FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`);

ALTER TABLE `evaluations` ADD FOREIGN KEY (`evaluation_type_id`) REFERENCES `evaluationTypes` (`evaluationTypeId`);

ALTER TABLE `evaluations` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`);

ALTER TABLE `evaluations` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `dictums` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `agreements` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`);

ALTER TABLE `agreements` ADD FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`);

ALTER TABLE `rubrics` ADD FOREIGN KEY (`committee_id`) REFERENCES `committees` (`committeeId`);

-- Modificaciones a tablas

-- Para la parte de notificaciones
ALTER TABLE `projects` ADD COLUMN `notification` BOOLEAN DEFAULT FALSE;

-- Para cuando selecciona "Otro" en el tipo de investigación
ALTER TABLE projects ADD COLUMN otherTypeResearch VARCHAR(100);
ALTER TABLE projects MODIFY typeResearch VARCHAR(50) NULL;

-- Booleano para saber si el proyecto se alinea con el PNI o los ODS
ALTER TABLE projects ADD COLUMN alignsWithPNIorODS BOOLEAN DEFAULT NULL;

-- En caso de que el proyecto no necesite colaboración, se agrega un campo para justificarlo
ALTER TABLE projects ADD COLUMN hasCollaboration BOOLEAN DEFAULT TRUE, ADD COLUMN collaborationJustification TEXT;

-- Para la parte de presupuesto, se agrega un campo para el tipo de presupuesto
ALTER TABLE budgets ADD COLUMN budgetTypeId INT, ADD CONSTRAINT fk_budgetType FOREIGN KEY (budgetTypeId) REFERENCES budgetTypes(budgetTypeId);

-- Se agrega id de comité a la tabla evaluaciones
ALTER TABLE evaluations ADD COLUMN committee_id INT, ADD CONSTRAINT fk_committee FOREIGN KEY (committee_id) REFERENCES committees(committeeId);

ALTER TABLE projects 
ADD otherEducationalDeliverable TEXT,
ADD otherDiffusionDeliverable TEXT;

ALTER TABLE projects
ADD COLUMN otherCurrentBudget TEXT,
ADD COLUMN otherInvestmentBudget TEXT;

ALTER TABLE customDeliverables 
ADD COLUMN quantity INT,
ADD COLUMN deliverableTypeId INT,
ADD COLUMN project_id INT;

ALTER TABLE budgetTypes
ADD CONSTRAINT fk_budgetSections
FOREIGN KEY (budgetSectionId) REFERENCES budgetSections(budgetSectionId);

ALTER TABLE annexes ADD COLUMN tag VARCHAR(100);

ALTER TABLE projects
ADD COLUMN firstEvaluation BOOLEAN DEFAULT TRUE,
ADD COLUMN reevaluation INT DEFAULT 0,
ADD COLUMN committiesModify TEXT;

ALTER TABLE projects MODIFY COLUMN endDate DATE NULL;

-- Datos estaticos para la parte superior del formulario
ALTER TABLE projects
ADD COLUMN formVersion VARCHAR(10) DEFAULT '03',
ADD COLUMN nextReview VARCHAR(20) DEFAULT 'septiembre 2025',
ADD COLUMN preparedBy VARCHAR(100) DEFAULT 'Leslie Olmedo Nieva',
ADD COLUMN reviewedBy VARCHAR(100) DEFAULT 'Leslie Olmedo Nieva',
ADD COLUMN approvedBy VARCHAR(100) DEFAULT 'Paul Mondragón Terán',
ADD COLUMN preparedDate DATE DEFAULT '2024-06-01',
ADD COLUMN reviewedDate DATE DEFAULT '2024-07-08',
ADD COLUMN approvedDate DATE DEFAULT '2024-11-04';
