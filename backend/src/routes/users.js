const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { 
    getAgreementSignature,
    updateAgreementSignature
} = usersController;

router.get('/:userId/projects/:projectId/agreement', getAgreementSignature);
router.patch('/:userId/projects/:projectId/agreement', updateAgreementSignature);

module.exports = router;