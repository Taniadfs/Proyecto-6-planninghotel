const seedData = {
  departments: [{ nombre: 'Recepción' }, { nombre: 'Pisos' }],
  users: [
    {
      nombre: 'Admin Principal',
      email: 'admin@example.com',
      role: 'admin',
      password: 'AdminPass123',
      departmentName: 'Recepción'
    },
    {
      nombre: 'Maria Mendez',
      email: 'mariamendez@example.com',
      role: 'user',
      password: 'CamareraPass123',
      departmentName: 'Pisos'
    },
    {
      nombre: 'Elisa Gómez',
      email: 'elisagomez@example.com',
      role: 'user',
      password: 'ElisaPass123',
      departmentName: 'Recepción'
    }
  ],
  plannings: [
    {
      userEmail: 'mariamendez@example.com',
      semanaInicio: '2026-07-01',
      semanaFin: '2026-07-07',
      turnos: [
        {
          dia: 'Lunes',
          tipo: 'Mañana',
          horaInicio: '08:00',
          horaFin: '16:00',
          pausaComida: true
        },
        {
          dia: 'Martes',
          tipo: 'Tarde',
          horaInicio: '08:00',
          horaFin: '16:00',
          pausaComida: false
        },
        {
          dia: 'Miércoles',
          tipo: 'Mañana',
          horaInicio: '08:00',
          horaFin: '16:00',
          pausaComida: true
        },
        {
          dia: 'Jueves',
          tipo: 'Tarde',
          horaInicio: '15:00',
          horaFin: '20:00',
          pausaComida: false
        },
        {
          dia: 'Viernes',
          tipo: 'Mañana',
          horaInicio: '08:00',
          horaFin: '16:00',
          pausaComida: true
        },
        {
          dia: 'Sábado',
          tipo: 'Tarde',
          horaInicio: '09:00',
          horaFin: '17:00',
          pausaComida: true
        },
        { dia: 'Domingo', tipo: 'Descanso' }
      ]
    },
    {
      userEmail: 'elisagomez@example.com',
      semanaInicio: '2026-07-01',
      semanaFin: '2026-07-07',
      turnos: [
        {
          dia: 'Lunes',
          tipo: 'Mañana',
          horaInicio: '09:00',
          horaFin: '17:00',
          pausaComida: true
        },
        {
          dia: 'Martes',
          tipo: 'Mañana',
          horaInicio: '09:00',
          horaFin: '17:00',
          pausaComida: true
        },
        {
          dia: 'Miércoles',
          tipo: 'Tarde',
          horaInicio: '14:00',
          horaFin: '22:00',
          pausaComida: true
        },
        {
          dia: 'Jueves',
          tipo: 'Descanso'
        },
        {
          dia: 'Viernes',
          tipo: 'Mañana',
          horaInicio: '09:00',
          horaFin: '17:00',
          pausaComida: true
        },
        {
          dia: 'Sábado',
          tipo: 'Tarde',
          horaInicio: '12:00',
          horaFin: '20:00',
          pausaComida: true
        },
        {
          dia: 'Domingo',
          tipo: 'Descanso'
        }
      ]
    }
  ]
}

module.exports = seedData
