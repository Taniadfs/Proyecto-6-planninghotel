require('dotenv').config()
const app = require('./app')
const connectBD = require('./src/config/db')

connectBD()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
