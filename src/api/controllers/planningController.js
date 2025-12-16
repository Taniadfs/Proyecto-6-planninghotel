const Planning = require('../models/planning')
const User = require('../models/user')

const createPlanning = async (req, res) => {
  try {
    const { user, semanaInicio, semanaFin } = req.body

    const userExists = await User.findById(user)
    if (!userExists) {
      return res.status(404).json({ message: 'El usuario no existe' })
    }

    const inicio = new Date(semanaInicio)
    const fin = new Date(semanaFin)
    if (fin <= inicio) {
      return res.status(400).json({
        message: 'La fecha de fin debe ser posterior a la fecha de inicio'
      })
    }

    const planningExists = await Planning.findOne({
      user,
      semanaInicio,
      semanaFin
    })
    if (planningExists) {
      return res
        .status(400)
        .json({ message: 'Ya existe un planning para este usuario y semana' })
    }

    const newPlanning = await Planning.create({
      user,
      semanaInicio,
      semanaFin,
      turnos: []
    })

    return res.status(201).json(newPlanning)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Datos inválidos. Verifica los campos requeridos' })
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de usuario inválido' })
    }
    return res.status(500).json({ message: 'Error al crear el planning' })
  }
}

const getAllPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find().populate('user')
    return res.status(200).json(plannings)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener plannings' })
  }
}

const getPlanningById = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id).populate('user')
    if (!planning)
      return res.status(404).json({ message: 'Planning no encontrado' })
    return res.status(200).json(planning)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de planning inválido' })
    }
    return res.status(500).json({ message: 'Error al obtener el planning' })
  }
}

const getPlanningsByUser = async (req, res) => {
  try {
    const { userId } = req.params

    const userExists = await User.findById(userId)
    if (!userExists) {
      return res.status(404).json({ message: 'El usuario no existe' })
    }
    const plannings = await Planning.find({ user: userId }).populate('user')
    return res.status(200).json(plannings)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de usuario inválido' })
    }
    return res.status(500).json({ message: 'Error al obtener los plannings' })
  }
}

const updatePlanning = async (req, res) => {
  try {
    const { id } = req.params
    const { turnos, semanaInicio, semanaFin, ...otrosDatos } = req.body

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No hay datos para actualizar' })
    }

    if (semanaInicio && semanaFin) {
      const inicio = new Date(semanaInicio)
      const fin = new Date(semanaFin)

      if (fin <= inicio) {
        return res.status(400).json({
          message: 'La fecha de fin debe ser posterior a la fecha de inicio'
        })
      }
    }

    const updatedPlanning = await Planning.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate('user')

    if (!updatedPlanning) {
      return res.status(404).json({ message: 'Planning no encontrado' })
    }

    return res.status(200).json(updatedPlanning)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de planning inválido' })
    }
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Datos inválidos. Verifica los campos requeridos' })
    }
    return res.status(500).json({ message: 'Error al actualizar el planning' })
  }
}

const deletePlanning = async (req, res) => {
  try {
    const { id } = req.params
    const planning = await Planning.findById(id)
    if (!planning) {
      return res.status(404).json({ message: 'Planning no encontrado' })
    }
    if (planning.publicado) {
      return res
        .status(400)
        .json({ message: 'No se puede eliminar un planning publicado' })
    }
    await Planning.findByIdAndDelete(id)

    return res.status(200).json({
      message: 'Planning eliminado correctamente',
      planning: planning
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de planning inválido' })
    }
    return res.status(500).json({ message: 'Error al eliminar el planning' })
  }
}

const publishPlanning = async (req, res) => {
  try {
    const { id } = req.params

    const planning = await Planning.findByIdAndUpdate(
      id,
      { publicado: true },
      { new: true }
    ).populate('user')
    if (!planning) {
      return res.status(404).json({ message: 'Planning no encontrado' })
    }

    return res.status(200).json({
      message: 'Planning publicado correctamente',
      planning: planning
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de planning inválido' })
    }
    return res.status(500).json({ message: 'Error al publicar el planning' })
  }
}

module.exports = {
  createPlanning,
  getAllPlannings,
  getPlanningById,
  getPlanningsByUser,
  updatePlanning,
  deletePlanning,
  publishPlanning
}
