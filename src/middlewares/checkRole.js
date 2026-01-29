const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' })
    }

    const userRole = req.user.role

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: 'Acceso denegado: rol insuficiente' })
    }
    next()
  }
}
module.exports = checkRole
