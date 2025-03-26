DROP DATABASE IF EXISTS mydb;
CREATE DATABASE mydb;
USE mydb;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE
);

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
  `password` varchar(255),
  `institution` varchar(50),
  `positionWork` varchar(50),
  `researchNetwork` bool,
  `researchNetworkName` varchar(50),
  `academicDegree` varchar(50),
  `levelName` varchar(50),
  `levelNum` integer,
  `userType_id` integer
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
  `status` varchar(50)
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
  `objective` TEXT,
  `project_id` integer
);

CREATE TABLE `scheduleActivities` (
  `scheduleActivityId` integer PRIMARY KEY AUTO_INCREMENT,
  `goal` text,
  `insitution` varchar(50),
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
  `project_id` integer
);

CREATE TABLE `members` (
  `memberId` integer PRIMARY KEY AUTO_INCREMENT,
  `fName` varchar(50),
  `lastName1` varchar(50),
  `lastName2` varchar(50),
  `email` varchar(255),
  `institution` varchar(50),
  `positionWork` varchar(50),
  `researchNetwork` bool,
  `researchNetworkName` varchar(50),
  `academicDegree` varchar(50),
  `levelName` varchar(50),
  `levelNum` integer,
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
  `document` blob,
  `projectId` integer
);

CREATE TABLE `evaluationTypes` (
  `evaluationTypeId` integer PRIMARY KEY AUTO_INCREMENT,
  `type_name` varchar(50),
  `description` varchar(255)
);

CREATE TABLE `evaluations` (
  `evaluationId` integer PRIMARY KEY AUTO_INCREMENT,
  `comments` varchar(255),
  `score` integer,
  `result` varchar(50),
  `evaluation_type_id` integer,
  `user_id` integer,
  `project_id` integer
);

CREATE TABLE `dictums` (
  `dictum_id` integer PRIMARY KEY AUTO_INCREMENT,
  `decision` varchar(50),
  `comments` varchar(255),
  `document` blob,
  `project_id` integer
);

CREATE TABLE `agreements` (
  `agreement_id` integer PRIMARY KEY AUTO_INCREMENT,
  `agreed` bool,
  `user_id` integer,
  `project_id` integer
);

CREATE TABLE `rubrics` (
  `rubric_id` integer PRIMARY KEY AUTO_INCREMENT,
  `rubric` blob,
  `committee_id` integer
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