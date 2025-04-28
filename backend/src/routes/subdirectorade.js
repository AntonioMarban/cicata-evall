const express = require('express')
const router = express.Router()
const { 
    getUsersByRole,
    createUser, 
    getActiveProjectsSub,
    getInactiveProjectsSub,
    getAllCommittees,
    getCommitteeSecretaryPresident,
    createFirstStageEvaluations,
    createSecondStageEvaluations
} = require('../controllers/subdirectorateController')

router.get('/users', getUsersByRole)
router.post('/users', createUser)
router.get('/projects/inactive', getInactiveProjectsSub)
router.get('/projects/active', getActiveProjectsSub)
router.get('/committees', getAllCommittees)
router.get('/committees/:committeeId/secretary-and-president', getCommitteeSecretaryPresident)
router.post('/projects/:projectId/evaluations/stage1', createFirstStageEvaluations)
router.post('/projects/:projectId/evaluations/stage2', createSecondStageEvaluations)

module.exports = router