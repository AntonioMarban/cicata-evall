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
    createSecondStageEvaluations
} = require('../controllers/subdirectorateController')

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

module.exports = router