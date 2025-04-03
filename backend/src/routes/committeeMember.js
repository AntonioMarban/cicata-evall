const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMember.controller');

const { getPendingProjects } = committeeMemberController;

router.get('/committees/:commiteeId/members/:userId/projects', getPendingProjects);

module.exports = router;