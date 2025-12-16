const User = require('../models/user')
const Department = require('../models/department')
const Planning = require('../models/planning')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('department')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener usuarios' })
  }
}
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('department')
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.status(200).json(user)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de usuario inválido' })
    }
    return res.status(500).json({ message: 'Error al obtener el usuario' })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { password, ...datosActualizables } = req.body
    if (Object.keys(datosActualizables).length === 0) {
      return res.status(400).json({ message: 'No hay datos para actualizar' })
    }

    if (datosActualizables.department) {
      const departmentExists = await Department.findById(
        datosActualizables.department
      )
      if (!departmentExists) {
        return res.status(404).json({ message: 'El departamento no existe' })
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, datosActualizables, {
      new: true,
      runValidators: true
    }).populate('department')
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de usuario inválido' })
    }
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Datos inválidos. Verifica los campos requeridos' })
    }
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Ya existe un usuario con ese email'
      })
    }
    return res.status(500).json({ message: 'Error al actualizar el usuario' })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    await Planning.deleteMany({ user: id })
    await User.findByIdAndDelete(id)
    return res
      .status(200)
      .json({ message: 'Usuario y sus plannings eliminados correctamente' })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'ID de usuario inválido' })
    }
    return res.status(500).json({ message: 'Error al eliminar el usuario' })
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
