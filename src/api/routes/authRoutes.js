const express = require('express')
const router = express.Router()

// TODO: Agregar controllers más adelante
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint - TODO' })
})

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint - TODO' })
})

module.exports = router
