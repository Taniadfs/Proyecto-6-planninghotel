const express = require('express')
const router = express.Router()

// TODO: Agregar controllers más adelante
router.get('/', (req, res) => {
  res.json({ message: 'Get all users - TODO' })
})

module.exports = router
