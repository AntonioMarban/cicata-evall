const express = require('express')
const router = express.Router()
const { getActiveProjects, getInactiveProjects, createProject, uploadDocuments } = require('../controllers/researcherController')
const middleware = require('../middleware/jwt.middleware')
const uploadMultiple = require('../middleware/multer.middleware')

router.get('/:userId/projects/active', getActiveProjects)
router.get('/:userId/projects/inactive', getInactiveProjects)
router.post('/projects', createProject)
router.post('/projects/upload', uploadMultiple, uploadDocuments)

module.exports = router