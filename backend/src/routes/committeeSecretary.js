const express = require('express');
const router = express.Router();
const committeeSecretaryController = require('../controllers/committeeSecretary.controller');

const {
    updateCommitteeRubric
} = committeeSecretaryController;

router.put('/committees/:committeeId/secretaries/:userId/rubric', updateCommitteeRubric);

module.exports = router;