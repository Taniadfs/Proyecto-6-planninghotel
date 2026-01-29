const express = require('express')
const router = express.Router()
const {
  register,
  login,
  changePassword
} = require('../controllers/authController')
const authenticate = require('../../middlewares/authenticate')

router.post('/register', register)

router.post('/login', login)
router.post('/change-password', authenticate, changePassword)

module.exports = router
