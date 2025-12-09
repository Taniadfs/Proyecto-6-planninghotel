const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { nombre, email, password, department } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await user.create({
      nombre,
      email,
      password: hashedPassword,
      department
    })
    return res.status(201).json({
      newUser: 'Usuario registrado exitosamente',
      user: {
        _id: newUser._id,
        nombre: newUser.nombre,
        email: newUser.email,
        department: newUser.department,
        rol: newUser.rol
      }
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El email ya está registrado' })
    }
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Datos inválidos. Verifica los campos requeridos' })
    }

    return res.status(500).json({ message: 'Error al registrar usuario' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Datos incorrectos' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Datos incorrectos' })

    const token = jwt.sign(
      { userId: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        department: user.department,
        rol: user.rol
      }
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión' })
  }
}

module.exports = {
  register,
  login
}
