require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const User = require('./models/user.model')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

global.__basedir = __dirname
// vuTgeYC8WVM3wxzjLAn7
// sistavorti@vusra.com
// sure
// echo -e "hello world" >>  /freqtrade/user_data/myconfig.json && freqtrade trade --config /freqtrade/user_data/config.json

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

User.findOne({ email: process.env.ADMIN_EMAIL_ADDRESS }, function (err, admin) {
  if (!(!err && admin)) {
    try {
      const newAdmin = new User()
      newAdmin.email = process.env.ADMIN_EMAIL_ADDRESS
      newAdmin.username = process.env.ADMIN_USERNAME
      newAdmin.password = newAdmin.generateHash(process.env.ADMIN_PASS)
      newAdmin.admin = true
      newAdmin.active = true
      newAdmin.save((err, admin) => {
        if (!err) {
          console.log('Created default admin user')
        } else {
          console.log('Failed to create default admin user: %o', err)
        }
      })
    } catch (e) {
      console.log('Failed to create default admin user: %o', e)
    }
  } else {
    console.log('Admin user already exists')
  }
})


app.use(morgan('combined'))

app.use(helmet({
  contentSecurityPolicy: false,
}))

app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('dist'))
require('./routes')(app, io)
server.listen(process.env.PORT)
