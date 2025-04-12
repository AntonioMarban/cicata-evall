const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMember.controller');

const { 
    getPendingProjects,
    getAgreementSignature
} = committeeMemberController;

router.get('/committees/:committeeId/members/:userId/projects', getPendingProjects);
router.get('/committees/:committeeId/members/:userId/projects/:projectId/agreement', getAgreementSignature);

module.exports = router;