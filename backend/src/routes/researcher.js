const express = require('express')
const router = express.Router()
const { getActiveProjects, getInactiveProjects, createProject } = require('../controllers/researcherController')
const middleware = require('../middleware/jwt.middleware')

router.get('/:userId/projects/active', getActiveProjects)
router.get('/:userId/projects/inactive', getInactiveProjects)
router.post('/projects/create', createProject)

module.exports = router