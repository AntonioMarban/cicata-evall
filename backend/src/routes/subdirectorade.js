const express = require('express')
const router = express.Router()
const { createUser } = require('../controllers/subdirectorateController')
const middleware = require('../middleware/jwt.middleware')

router.post('/users/create', createUser)

module.exports = router