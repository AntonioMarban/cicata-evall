const express = require('express')
const router = express.Router()
const { getActiveProjects, getInactiveProjects, createProject, uploadDocuments, getProjectDetails, getProjectDocuments } = require('../controllers/researcher.controller')
const middleware = require('../middleware/jwt.middleware')
const upload  = require('../middleware/multer.middleware') //Solucion Chapucera, por alguna razon funciona para multiples documentos, bienvenida sea esa opcion, yo no me quejo

router.get('/:userId/projects/active', getActiveProjects)
router.get('/:userId/projects/inactive', getInactiveProjects)
router.post('/projects', createProject)
router.post('/projects/upload', upload, uploadDocuments)
router.get('/projects/:projectId', getProjectDetails)
router.get('/projects/:projectId/documents', getProjectDocuments)

module.exports = router