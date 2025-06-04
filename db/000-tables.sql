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
  `prefix` varchar(10),
  `email` varchar(255),
  `phone` varchar(255),
  `password` varchar(255),
  `institution` varchar(50),
  `positionWork` varchar(50),
  `researchNetwork` bool,
  `researchNetworkName` varchar(50),
  `academicDegree` varchar(50),
  `levelNumSNII` varchar(50),
  `levelNumCOFFA` varchar(50),
  `levelNumEDI` varchar(50),
  `userType_id` integer,
  `active` bool default true,
  FOREIGN KEY (`userType_id`) REFERENCES `userTypes` (`userTypeId`)
);

CREATE TABLE `committees` (
  `committeeId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100)
);

CREATE TABLE `committeeUsers` (
  `committeeUserId` integer PRIMARY KEY AUTO_INCREMENT,
  `committeeId` integer,
  `userId` integer,
  FOREIGN KEY (`committeeId`) REFERENCES `committees` (`committeeId`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);

CREATE TABLE `projects` (
  `projectId` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(100),
  `startDate` date,
  `endDate` date NULL,
  `typeResearch` varchar(50) NULL,
  `otherTypeResearch` VARCHAR(100),
  `topic` varchar(50),
  `subtopic` varchar(50),
  `alignmentPNIorODS` TEXT,
  `alignsWithPNIorODS` BOOLEAN DEFAULT NULL,
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
  `status` varchar(50) DEFAULT 'En revisión',
  `notification` BOOLEAN DEFAULT FALSE,
  `hasCollaboration` BOOLEAN DEFAULT TRUE,
  `collaborationJustification` TEXT,
  `otherEducationalDeliverable` TEXT,
  `otherDiffusionDeliverable` TEXT,
  `otherCurrentBudget` TEXT,
  `otherInvestmentBudget` TEXT,
  `firstEvaluation` BOOLEAN DEFAULT TRUE,
  `reevaluation` INT DEFAULT 0,
  `committiesModify` TEXT,
  `formVersion` VARCHAR(10) DEFAULT '03',
  `nextReview` VARCHAR(20) DEFAULT 'septiembre 2025',
  `preparedBy` VARCHAR(100) DEFAULT 'Leslie Olmedo Nieva',
  `reviewedBy` VARCHAR(100) DEFAULT 'Leslie Olmedo Nieva',
  `approvedBy` VARCHAR(100) DEFAULT 'Paul Mondragón Terán',
  `preparedDate` DATE DEFAULT '2024-06-01',
  `reviewedDate` DATE DEFAULT '2024-07-08',
  `approvedDate` DATE DEFAULT '2024-11-04'
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
  `deliverableTypeId` integer,
  FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`),
  FOREIGN KEY (`deliverableId`) REFERENCES `deliverables` (`deliverableId`),
  FOREIGN KEY (`deliverableTypeId`) REFERENCES `deliverableTypes` (`deliverableTypeId`)
);

CREATE TABLE `customDeliverables` (
  `customDeliverables_id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `quantity` INT,
  `deliverableTypeId` INT,
  `project_id` INT,
  FOREIGN KEY (`deliverableTypeId`) REFERENCES `deliverableTypes` (`deliverableTypeId`),
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);

CREATE TABLE `associatedProjects` (
  `associatedProjectId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `associationDate` date,
  `project_type` TEXT,
  `externalRegister` varchar(30),
  `SIPRegister` varchar(30),
  `project_id` integer,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);

CREATE TABLE `collaborativeInstitutions` (
  `collaborativeInstitutionId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` TEXT,
  `partOfIPN` bool,
  `collaborationAgreement` varchar(30),
  `agreementType` varchar(30),
  `agreementNumber` varchar(30),
  `project_id` integer,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);

CREATE TABLE `specificObjectives` (
  `specificObjectiveId` integer PRIMARY KEY AUTO_INCREMENT,
  `objectiveName` TEXT,
  `objectiveDescription` TEXT,
  `project_id` integer,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);


CREATE TABLE `scheduleActivities` (
  `scheduleActivityId` integer PRIMARY KEY AUTO_INCREMENT,
  `goal` text,
  `institution` varchar(50),
  `responsibleMember` varchar(100),
  `startDate` date,
  `endDate` date,
  `project_id` integer,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);

CREATE TABLE `budgetSections` (
  `budgetSectionId` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100)
);

CREATE TABLE `budgetTypes` (
  `budgetTypeId` integer PRIMARY KEY AUTO_INCREMENT,
  `type_name` varchar(150),
  `budgetSectionId` INT,
  FOREIGN KEY (`budgetSectionId`) REFERENCES `budgetSections` (`budgetSectionId`)
);

CREATE TABLE `budgets` (
  `budgetstId` integer PRIMARY KEY AUTO_INCREMENT,
  `investmentExpenditure` DOUBLE,
  `name` varchar(50),
  `expenditure` DOUBLE,
  `budgetDate` date,
  `otherName` varchar(50),
  `project_id` integer,
  `budgetTypeId` INT,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`),
  FOREIGN KEY (`budgetTypeId`) REFERENCES `budgetTypes` (`budgetTypeId`)
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
  `levelNumSNII` varchar(50),
  `levelNumCOFFA` varchar(50),
  `levelNumEDI` varchar(50),
  `tutorName` varchar(100),
  `project_id` integer,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);

CREATE TABLE `usersProjects` (
  `userProjectId` integer PRIMARY KEY AUTO_INCREMENT,
  `project_id` integer,
  `user_id` integer,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`)
);

CREATE TABLE `annexes` (
  `annexeId` integer PRIMARY KEY AUTO_INCREMENT,
  `document` LONGBLOB,
  `filename` VARCHAR(255),
  `tag` VARCHAR(100),
  `projectId` integer,
  FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`)
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
  `project_id` integer,
  `committee_id` INT,
  FOREIGN KEY (`evaluation_type_id`) REFERENCES `evaluationTypes` (`evaluationTypeId`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`),
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`),
  FOREIGN KEY (`committee_id`) REFERENCES `committees` (`committeeId`)
);

CREATE TABLE `dictums` (
  `dictumId` integer PRIMARY KEY AUTO_INCREMENT,
  `folio` varchar(100),
  `decision` varchar(50),
  `date` date,
  `authorizerId` integer,
  `project_id` integer,
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);

CREATE TABLE `agreements` (
  `agreement_id` integer PRIMARY KEY AUTO_INCREMENT,
  `date` date,
  `agreed` bool,
  `user_id` integer,
  `project_id` integer,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`),
  FOREIGN KEY (`project_id`) REFERENCES `projects` (`projectId`)
);

CREATE TABLE `rubrics` (
  `rubric_id` integer PRIMARY KEY AUTO_INCREMENT,
  `rubric` longblob,
  `committee_id` integer,
  FOREIGN KEY (`committee_id`) REFERENCES `committees` (`committeeId`)
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
