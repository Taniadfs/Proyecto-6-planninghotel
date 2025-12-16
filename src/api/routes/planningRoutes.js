const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const checkRole = require('../middlewares/checkRole')

const {
  createPlanning,
  getAllPlannings,
  getPlanningById,
  getPlanningsByUser,
  updatePlanning,
  deletePlanning,
  publishPlanning
} = require('../controllers/planningController')

router.post('/', authenticate, checkRole('admin'), createPlanning)
router.get('/', authenticate, checkRole('admin', 'user'), getAllPlannings)
router.get('/:id', authenticate, checkRole('admin', 'user'), getPlanningById)
router.get(
  '/user/:userId',
  authenticate,
  checkRole('admin', 'user'),
  getPlanningsByUser
)
router.put('/:id', authenticate, checkRole('admin'), updatePlanning)
router.delete('/:id', authenticate, checkRole('admin'), deletePlanning)
router.patch('/:id/publish', authenticate, checkRole('admin'), publishPlanning)

module.exports = router
