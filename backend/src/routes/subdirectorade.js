const express = require('express')
const router = express.Router()
const { 
    getUsersByRole,
    createUser, 
    getActiveProjectsSub,
    getInactiveProjectsSub,
    getAllCommittees,
    getCommitteeSecretary
} = require('../controllers/subdirectorateController')

router.get('/users', getUsersByRole)
router.post('/users', createUser)
router.get('/projects/inactive', getInactiveProjectsSub)
router.get('/projects/active', getActiveProjectsSub)
router.get('/committees', getAllCommittees)
router.get('/committees/:committeeId/secretary', getCommitteeSecretary)

module.exports = router