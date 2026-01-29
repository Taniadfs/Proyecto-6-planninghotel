const express = require('express')
const router = express.Router()
const authenticate = require('../../middlewares/authenticate')
const checkRole = require('../../middlewares/checkRole')

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController')

router.get('/', authenticate, checkRole('admin', 'user'), getAllDepartments)
router.get('/:id', authenticate, checkRole('admin', 'user'), getDepartmentById)
router.post('/', authenticate, checkRole('admin'), createDepartment)
router.put('/:id', authenticate, checkRole('admin'), updateDepartment)
router.delete('/:id', authenticate, checkRole('admin'), deleteDepartment)

module.exports = router
