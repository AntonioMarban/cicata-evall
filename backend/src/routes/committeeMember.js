const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMember.controller');

const { 
    getPendingProjects,
    getCommitteeRubric,
    saveEvaluationResults
} = committeeMemberController;
const middleware = require('../middleware/jwt.middleware')

router.get('/committees/:committeeId/members/:userId/projects', middleware, getPendingProjects); // Obtiene los proyectos pendientes de evaluación (individuales)
router.get('/committees/:committeeId/members/:userId/rubric', middleware, getCommitteeRubric);
router.patch('/committees/:committeeId/members/:userId/projects/:projectId/evaluations', middleware, saveEvaluationResults);


module.exports = router;