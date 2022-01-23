require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)


global.__basedir = __dirname


mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


app.use(morgan('combined'))
app.use(helmet({
  contentSecurityPolicy: false,
}))
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('dist'))
require('./routes')(app, io)
server.listen(process.env.PORT)
