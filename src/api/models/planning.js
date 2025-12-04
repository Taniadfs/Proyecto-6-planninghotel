const mongoose = require('mongoose')

const turnoSchema = new mongoose.Schema(
  {
    dia: {
      type: String,
      enum: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo'
      ],
      required: true
    },
    tipo: {
      type: String,
      enum: ['Mañana', 'Tarde', 'Descanso'],
      required: true
    },
    horaInicio: {
      type: String,
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        'Formato de hora inválido (HH:MM)'
      ]
    },
    horaFin: {
      type: String,
      match: [
        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
        'Formato de hora inválido (HH:MM)'
      ]
    },
    pausaComida: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
)

const planningSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio']
    },
    semanaInicio: {
      type: Date,
      required: [true, 'La fecha de inicio de la semana es obligatoria']
    },
    semanaFin: {
      type: Date,
      required: [true, 'La fecha de fin de la semana es obligatoria']
    },
    turnos: {
      type: [turnoSchema],
      validate: {
        validator: function (v) {
          return v.length === 7
        },
        message:
          'Debe haber exactamente 7 turnos, uno para cada día de la semana'
      }
    },
    publicado: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)
const Planning = mongoose.model('Planning', planningSchema)

module.exports = Planning
