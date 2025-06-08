const express = require('express')
const router = express.Router()
const { getActiveProjects, getInactiveProjects, createProject, uploadDocuments, 
        getProjectDocuments, getCommitteeComments, updateProject } = require('../controllers/researcher.controller')
const middleware = require('../middleware/jwt.middleware')
const upload  = require('../middleware/multer.middleware') //Solucion Chapucera, por alguna razon funciona para multiples documentos, bienvenida sea esa opcion, yo no me quejo

router.get('/:userId/projects/active', middleware, getActiveProjects)
router.get('/:userId/projects/inactive', middleware, getInactiveProjects)
router.post('/projects', middleware, createProject)
router.post('/projects/upload', middleware, upload, uploadDocuments)
router.get('/projects/:projectId/documents', middleware, getProjectDocuments)
router.get('/projects/:projectId/comments', middleware, getCommitteeComments);
router.patch('/projects/:projectId/update', middleware, updateProject);

module.exports = router