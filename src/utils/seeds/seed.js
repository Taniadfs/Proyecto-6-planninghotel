const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const Department = require('../models/department')
const User = require('../models/user')
const Planning = require('../models/planning')

const seedData = require('./data')

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Conectado a MongoDB')

    await Department.deleteMany({})
    await User.deleteMany({})
    await Planning.deleteMany({})

    console.log('Colecciones limpiadas')

    const departments = await Department.insertMany(seedData.departments)
    console.log(`${departments.length} departamentos creados`)

    // 4. Crear Users (con referencias a Departments)
    const usersToCreate = await Promise.all(
      seedData.users.map(async (userData) => {
        const department = departments.find(
          (d) => d.nombre === userData.departmentName
        )
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        return {
          nombre: userData.nombre,
          email: userData.email,
          role: userData.role,
          password: hashedPassword,
          department: department._id
        }
      })
    )

    const users = await User.insertMany(usersToCreate)
    console.log(`${users.length} usuarios creados`)

    // 5. Crear Plannings (con referencias a Users)
    const planningsToCreate = seedData.plannings.map((planningData) => {
      const user = users.find((u) => u.email === planningData.userEmail)
      return {
        user: user._id,
        semanaInicio: planningData.semanaInicio,
        semanaFin: planningData.semanaFin,
        turnos: planningData.turnos
      }
    })

    const plannings = await Planning.insertMany(planningsToCreate)
    console.log(`${plannings.length} plannings creados`)

    console.log(' Seed completado exitosamente')
  } catch (error) {
    console.error('Error en el seed:', error)
  } finally {
    // 6. Cerrar conexión
    await mongoose.connection.close()
    console.log('👋 Conexión cerrada')
  }
}

seedDatabase()
