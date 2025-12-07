const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Por favor ingrese un email válido']
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [8, 'La contraseña debe tener mínimo 8 caracteres'],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v)
        },
        message:
          'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número'
      }
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} no es un rol válido'
      },
      default: 'user'
    },
    departement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Departement'
    }
  },
  { timestamps: true }
)
const User = mongoose.model('User', userSchema)

module.exports = User
