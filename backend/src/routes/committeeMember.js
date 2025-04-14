const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMember.controller');

const { 
    getPendingProjects,
    getAgreementSignature,
    updateAgreementSignature,
    getCommitteeRubric
} = committeeMemberController;

router.get('/committees/:committeeId/members/:userId/projects', getPendingProjects);
router.get('/committees/:committeeId/members/:userId/projects/:projectId/agreement', getAgreementSignature);
router.put('/committees/:committeeId/members/:userId/projects/:projectId/agreement', updateAgreementSignature);
router.get('/committees/:committeeId/members/:userId/rubric', getCommitteeRubric);

module.exports = router;