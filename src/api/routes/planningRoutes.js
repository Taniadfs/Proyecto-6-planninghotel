const express = require('express')
const router = express.Router()

// TODO: Agregar controllers más adelante
router.get('/', (req, res) => {
  res.json({ message: 'Get all plannings - TODO' })
})

module.exports = router
