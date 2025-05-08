const express = require('express')
const router = express.Router()
const { 
    getUsersByRole,
    createUser, 
    getActiveProjectsSub,
    getInactiveProjectsSub,
    getAllCommittees,
    getCommitteeSecretaryPresident,
    getFirstStageEvaluations,
    createFirstStageEvaluations,
    getSecondStageEvaluations,
    createSecondStageEvaluations,
    getResultThirdStage,
    sendEvaluationResult
} = require('../controllers/subdirectorade.controller')

router.get('/users', getUsersByRole)
router.post('/users', createUser)
router.get('/projects/inactive', getInactiveProjectsSub)
router.get('/projects/active', getActiveProjectsSub)
router.get('/committees', getAllCommittees)
router.get('/committees/:committeeId/secretary-and-president', getCommitteeSecretaryPresident)
router.get('/projects/:projectId/evaluations/stage1', getFirstStageEvaluations)
router.post('/projects/:projectId/evaluations/stage1', createFirstStageEvaluations)
router.get('/projects/:projectId/evaluations/stage2', getSecondStageEvaluations)
router.post('/projects/:projectId/evaluations/stage2', createSecondStageEvaluations)
router.get('/projects/:projectId/evaluations/stage3', getResultThirdStage)
router.patch('/projects/:projectId/evaluations/stage3', sendEvaluationResult)

module.exports = router