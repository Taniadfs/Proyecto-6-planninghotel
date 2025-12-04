const express = require('express')
const app = express()

app.use(express.json())

//rutas
const authRoutes = require('./src/api/routes/authRoutes')
const userRoutes = require('./src/api/routes/userRoutes')
const departmentRoutes = require('./src/api/routes/departmentRoutes')
const planningRoutes = require('./src/api/routes/planningRoutes')

//usar las routas
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/plannings', planningRoutes)

module.exports = app
