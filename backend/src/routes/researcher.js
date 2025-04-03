const express = require('express')
const router = express.Router()
const { getActiveProjects } = require('../controllers/researcherController')
const middleware = require('../middleware/jwt.middleware')

router.get('/:userId/projects', getActiveProjects)

module.exports = router