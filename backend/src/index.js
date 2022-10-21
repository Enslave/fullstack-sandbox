require('dotenv/config')
const express = require('express')
const cors = require('cors')
const app = express()

const db = require('./db')
const routes = require('./api/routes')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

db.connect(process.env.DATABASE_CONNECTION_STRING, (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  }
  console.log('DB Connected')
  routes(app)
})

app.listen(PORT, () => console.log(`Sellpy demo listening to ${PORT}!`))
