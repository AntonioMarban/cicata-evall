const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMember.controller');

const { 
    getPendingProjects,
    getCommitteeRubric,
    saveEvaluationResults
} = committeeMemberController;

router.get('/committees/:committeeId/members/:userId/projects', getPendingProjects); // Obtiene los proyectos pendientes de evaluación (individuales)
router.get('/committees/:committeeId/members/:userId/rubric', getCommitteeRubric);
router.patch('/committees/:committeeId/members/:userId/projects/:projectId/evaluations', saveEvaluationResults);


module.exports = router;