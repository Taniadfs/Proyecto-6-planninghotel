const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController')

router.get('/', authenticate, checkRole('admin'), getAllUsers)
router.get('/:id', authenticate, checkRole('admin', 'user'), getUserById)
router.put('/:id', authenticate, checkRole('admin', 'user'), updateUser)
router.delete('/:id', authenticate, checkRole('admin'), deleteUser)

module.exports = router
