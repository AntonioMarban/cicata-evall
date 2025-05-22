const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { 
    getAgreementSignature,
    updateAgreementSignature,
    getProjectSummary
} = usersController;

router.get('/:userId/projects/:projectId/agreement', getAgreementSignature);
router.patch('/:userId/projects/:projectId/agreement', updateAgreementSignature);
router.get('/projects/:projectId/summary', getProjectSummary);

module.exports = router;