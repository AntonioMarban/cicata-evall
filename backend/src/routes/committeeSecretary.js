const express = require('express');
const router = express.Router();
const committeeSecretaryController = require('../controllers/committeeSecretary.controller');

const {
    getPendingCommitteeEvaluations,
    updateCommitteeRubric,
    getProjectNonEvaluators,
    createProjectEvaluator,
    getProjectEvaluations
} = committeeSecretaryController;

router.get('/committees/:committeeId/secretaries/:userId/evaluations', getPendingCommitteeEvaluations);
router.put('/committees/:committeeId/secretaries/:userId/rubric', updateCommitteeRubric);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/non-evaluators', getProjectNonEvaluators);
router.post('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/evaluators', createProjectEvaluator);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId', getProjectEvaluations);

module.exports = router;