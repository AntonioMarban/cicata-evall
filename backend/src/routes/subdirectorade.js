const express = require('express')
const router = express.Router()
const { 
    getUsersByRole,
    createUser, 
    getUser,
    updateUser,
    setUserInactive,
    getActiveProjectsSub,
    getInactiveProjectsSub,
    getAllCommittees,
    getCommitteeSecretaryPresident,
    getFirstStageEvaluations,
    createFirstStageEvaluations,
    getSecondStageEvaluations,
    createSecondStageEvaluations,
    getResultThirdStage,
    sendEvaluationResult,
    createDictum,
    setProjectStatusToRevision
} = require('../controllers/subdirectorade.controller')
const middleware = require('../middleware/jwt.middleware')

router.get('/users', middleware, getUsersByRole)
router.post('/users', middleware, createUser)
router.get('/users/:userId', middleware, getUser)
router.patch('/users/:userId', middleware, updateUser)
router.patch('/users/:userId/inactive', middleware, setUserInactive)
router.get('/projects/inactive', middleware, getInactiveProjectsSub)
router.get('/projects/active', middleware, getActiveProjectsSub)
router.get('/committees', middleware, getAllCommittees)
router.get('/committees/:committeeId/secretary-and-president', middleware, getCommitteeSecretaryPresident)
router.get('/projects/:projectId/evaluations/stage1', middleware, getFirstStageEvaluations)
router.post('/projects/:projectId/evaluations/stage1', middleware, createFirstStageEvaluations)
router.get('/projects/:projectId/evaluations/stage2', middleware, getSecondStageEvaluations)
router.post('/projects/:projectId/evaluations/stage2', middleware, createSecondStageEvaluations)
router.get('/projects/:projectId/evaluations/stage3', middleware, getResultThirdStage)
router.patch('/projects/:projectId/evaluations/stage3', middleware, sendEvaluationResult)
router.post('/projects/:projectId/dictum', middleware, createDictum),
router.patch('/projects/:projectId/status/revision', middleware, setProjectStatusToRevision);

module.exports = router