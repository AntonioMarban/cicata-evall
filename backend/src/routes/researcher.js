const express = require('express')
const router = express.Router()
const { getActiveProjects, getInactiveProjects, createProject, uploadDocuments, 
        getProjectDocuments, getCommitteeComments, updateProject } = require('../controllers/researcher.controller')
const middleware = require('../middleware/jwt.middleware')
const upload  = require('../middleware/multer.middleware') //Solucion Chapucera, por alguna razon funciona para multiples documentos, bienvenida sea esa opcion, yo no me quejo

router.get('/:userId/projects/active', getActiveProjects)
router.get('/:userId/projects/inactive', getInactiveProjects)
router.post('/projects', createProject)
router.post('/projects/upload', upload, uploadDocuments)
router.get('/projects/:projectId/documents', getProjectDocuments)
router.get('/projects/:projectId/comments', getCommitteeComments);
router.patch('/projects/:projectId/update', updateProject);

module.exports = router