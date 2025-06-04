const express = require('express');
const router = express.Router();
const committeeSecretaryController = require('../controllers/committeeSecretary.controller');

const {
    getPendingCommitteeEvaluations,
    updateCommitteeRubric,
    getProjectNonEvaluators,
    createProjectEvaluator,
    removeEvaluatorFromProject,
    getProjectEvaluations,
    sendCommitteeEvaluationResult,
    getAllCommitteeMembers,
    getCommitteeMember,
    createCommitteeMember,
    updateCommitteeMember,
    setCommitteeMemberInactive
} = committeeSecretaryController;

router.get('/committees/:committeeId/secretaries/:userId/evaluations', getPendingCommitteeEvaluations);
router.put('/committees/:committeeId/secretaries/:userId/rubric', updateCommitteeRubric);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/non-evaluators', getProjectNonEvaluators);
router.post('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/evaluators', createProjectEvaluator);
router.delete('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/evaluators/:evaluatorId', removeEvaluatorFromProject);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId', getProjectEvaluations);
router.patch('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/verdict', sendCommitteeEvaluationResult);
router.get('/committees/:committeeId/secretaries/:userId/members', getAllCommitteeMembers);
router.get('/committees/:committeeId/secretaries/:userId/members/:memberId', getCommitteeMember);
router.post('/committees/:committeeId/secretaries/:userId/members', createCommitteeMember);
router.patch('/committees/:committeeId/secretaries/:userId/members/:memberId', updateCommitteeMember);
router.patch('/committees/:committeeId/secretaries/:userId/members/:memberId/inactive', setCommitteeMemberInactive);


module.exports = router;