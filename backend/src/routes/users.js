const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { 
    getAgreementSignature,
    updateAgreementSignature,
    getProjectSummary,
    getDictum,
    getProjectDetails
} = usersController;
const middleware = require('../middleware/jwt.middleware')

router.get('/:userId/projects/:projectId/agreement', middleware, getAgreementSignature);
router.patch('/:userId/projects/:projectId/agreement', middleware, updateAgreementSignature);
router.get('/projects/:projectId/summary', middleware, getProjectSummary);
router.get('/projects/:projectId', middleware, getProjectDetails)
router.get('/projects/:projectId/dictum', middleware, getDictum);

module.exports = router;