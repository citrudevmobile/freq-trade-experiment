const User = require('../models/user.model')
const validator = require('email-validator')
const jwt = require('jsonwebtoken')

module.exports = {

    login: function (req, res) {
        if (validator.validate(req.body.username)) {
          User.findOne({ email: req.body.username }, function (err, user) {
            if (err) return res.status(500).send('Error on the server.')
            if (!user) return res.status(401).send('user not found')
            if (!user.validPassword(req.body.password)) { return res.status(401).send({ auth: false, token: null }) }
            const token = jwt.sign({ id: user._id }, process.env.JWTsecret, {
              expiresIn: 86400
            })
            res.status(200).send({ auth: true, token: token, admin: user.isAdmin, user: user._id, isActive: user.isActive, signupInfo: user.signupInfo })
          })
        } else {
          User.findOne({ email: req.body.email }, function (err, user) {
            if (err) return res.status(500).send('Error on the server.')
            if (!user) return res.status(401).send('user not found')
            if (!user.validPassword(req.body.password)) { return res.status(401).send({ auth: false, token: null }) }
            const token = jwt.sign({ id: user._id }, process.env.JWTsecret, {
              expiresIn: 86400
            })
            res.status(200).send({ auth: true, token: token, admin: user.isAdmin, user: user._id, isActive: user.isActive, signupInfo: user.signupInfo })
          })
        }
      },
    
      register: function (req, res) {
        process.nextTick(function () {
          User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
              console.log(err)
              return res.status(500).send('Error on the server.')
            }
            if (user) return res.status(400).send('user exists')
            const newUser = new User()
            newUser.email = req.body.email
            newUser.password = newUser.generateHash(req.body.password)
            newUser.username = req.body.username
            newUser.save((err, user) => {
              if (err) {
                console.log(err)
                return res
                  .status(500)
                  .send('There was a problem registering the user.')
              }
    
              const token = jwt.sign({ id: user._id }, process.env.JWTsecret, {
                expiresIn: 86400
              })
              res.status(200).send({ auth: true, token: token })
            })
          })
        })
      },

      verifyAuthTokenSession: function (req, res, next) {
        const token = req.headers['x-access-token']
        if (!token) {
          return res
            .status(401)
            .json({ auth: false, message: 'No token provided.' })
        }
        jwt.verify(token, process.env.JWTsecret, function (err, decoded) {
          if (err) {
            return res
              .status(401)
              .json({ auth: false, message: 'Failed to authenticate token.' })
          }
          next()
        })
      },

      verifyAuthToken: function (req, res) {
        const token = req.headers['x-access-token']
        if (!token) {
          return res
            .status(401)
            .json({ auth: false, message: 'No token provided.' })
        }
        jwt.verify(token, process.env.JWTsecret, function (err, decoded) {
          if (err) {
            return res
              .status(401)
              .json({ auth: false, message: 'Failed to authenticate token.' })
          }
          res.status(200).json({ auth: true, message: 'Authenticated', user: decoded.id })
        })
      },

}