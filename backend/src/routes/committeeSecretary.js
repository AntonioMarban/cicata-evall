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
const middleware = require('../middleware/jwt.middleware')

router.get('/committees/:committeeId/secretaries/:userId/evaluations', middleware, getPendingCommitteeEvaluations);
router.put('/committees/:committeeId/secretaries/:userId/rubric', middleware, updateCommitteeRubric);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/non-evaluators', middleware, getProjectNonEvaluators);
router.post('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/evaluators', middleware, createProjectEvaluator);
router.delete('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/evaluators/:evaluatorId', middleware, removeEvaluatorFromProject);
router.get('/committees/:committeeId/secretaries/:userId/evaluations/:projectId', middleware, getProjectEvaluations);
router.patch('/committees/:committeeId/secretaries/:userId/evaluations/:projectId/verdict', middleware, sendCommitteeEvaluationResult);
router.get('/committees/:committeeId/secretaries/:userId/members', middleware, getAllCommitteeMembers);
router.get('/committees/:committeeId/secretaries/:userId/members/:memberId', middleware, getCommitteeMember);
router.post('/committees/:committeeId/secretaries/:userId/members', middleware, createCommitteeMember);
router.patch('/committees/:committeeId/secretaries/:userId/members/:memberId', middleware, updateCommitteeMember);
router.patch('/committees/:committeeId/secretaries/:userId/members/:memberId/inactive', middleware, setCommitteeMemberInactive);


module.exports = router;