const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Token no proporcionado. Acceso denegado' })
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError')
      return res.status(401).json({ message: 'Token expirado' })
    if (error.name === 'JsonWebTokenError')
      return res.status(401).json({ message: 'Token invalido' })

    res.status(500).json({ message: 'Error del servidor' })
  }
}

module.exports = authenticate
