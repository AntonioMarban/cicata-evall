const express = require('express')
const router = express.Router()
const { 
    createUser, 
    getActiveProjectsSub,
    getInactiveProjectsSub 
} = require('../controllers/subdirectorateController')
const middleware = require('../middleware/jwt.middleware')

router.post('/users', createUser)
router.get('/projects/inactive', getInactiveProjectsSub)
router.get('/projects/active', getActiveProjectsSub)

module.exports = router