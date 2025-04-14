const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMember.controller');

const { 
    getPendingProjects,
    getAgreementSignature,
    getCommitteeRubric
} = committeeMemberController;

router.get('/committees/:committeeId/members/:userId/projects', getPendingProjects);
router.get('/committees/:committeeId/members/:userId/projects/:projectId/agreement', getAgreementSignature);
router.get('/committees/:committeeId/members/:userId/rubric', getCommitteeRubric);

module.exports = router;