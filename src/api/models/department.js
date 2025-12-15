const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del departamento es obligatorio'],
      unique: true,
      trim: true,
      enum: {
        values: ['Recepción', 'Pisos'],
        message: '{VALUE} no es un departamento válido'
      }
    }
  },
  { timestamps: true }
)
