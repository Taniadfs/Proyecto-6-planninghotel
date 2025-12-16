const Department = require('../models/department')
const User = require('../models/user')

const createDepartment = async (req, res) => {
  try {
    const newDepartment = await Department.create(req.body)
    return res.status(201).json(newDepartment)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Ya existe un departamento con ese nombre'
      })
    }
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Datos inválidos. Verifica los campos requeridos' })
    }
    return res.status(500).json({ message: 'Error al crear el departamento' })
  }
}

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find()

    return res.status(200).json(departments)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener departamentos' })
  }
}

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)

    if (!department) {
      return res.status(404).json({ message: 'Departamento no encontrado' })
    }
    return res.status(200).json(department)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de departamento inválido' })
    }
    return res.status(500).json({ message: 'Error al obtener el departamento' })
  }
}

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No hay datos para actualizar' })
    }

    const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    })

    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Departamento no encontrado' })
    }

    return res.status(200).json(updatedDepartment)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de departamento inválido' })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Datos inválidos. El nombre debe ser "Recepción" o "Pisos"'
      })
    }

    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Ya existe un departamento con ese nombre'
      })
    }
    return res
      .status(500)
      .json({ message: 'Error al actualizar el departamento' })
  }
}

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params

    const count = await User.countDocuments({ department: id })
    if (count > 0) {
      return res.status(409).json({
        message:
          'No se puede eliminar. Hay empleados asignados a este departamento'
      })
    }

    const deletedDepartment = await Department.findByIdAndDelete(id)

    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Departamento no encontrado' })
    }

    return res.status(200).json({
      message: 'Departamento eliminado correctamente',
      department: deletedDepartment
    })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de departamento inválido' })
    }
    return res
      .status(500)
      .json({ message: 'Error al eliminar el departamento' })
  }
}
module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
}
