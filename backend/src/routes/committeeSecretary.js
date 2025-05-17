const express = require('express');
const router = express.Router();
const committeeSecretaryController = require('../controllers/committeeSecretary.controller');

const {
    getPendingCommitteeEvaluations,
    updateCommitteeRubric,
    getProjectNonEvaluators,
    createProjectEvaluator,
    getProjectEvaluations,
    sendCommitteeEvaluationResult,
    getAllCommitteeMembers,
    getCommitteeMember,
    createCommitteeMember,
    updateCommitteeMember
} = committeeSecretaryController;

router.get('/committees/:committeeId/secretaries/:userId/evaluations', getPendingCommitteeEvaluations);
router.put('/committees/:committeeId/secretaries/:userId/rubric', updateCommitteeRubric);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/non-evaluators', getProjectNonEvaluators);
router.post('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/evaluators', createProjectEvaluator);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId', getProjectEvaluations);
router.patch('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/verdict', sendCommitteeEvaluationResult);
router.get('/committees/:committeeId/secretaries/:userId/members', getAllCommitteeMembers);
router.get('/committees/:committeeId/secretaries/:userId/members/:memberId', getCommitteeMember);
router.post('/committees/:committeeId/secretaries/:userId/members', createCommitteeMember);
router.patch('/committees/:committeeId/secretaries/:userId/members/:memberId', updateCommitteeMember);

module.exports = router;