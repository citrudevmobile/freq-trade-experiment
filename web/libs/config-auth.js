const User = require('../models/user.model')
const validator = require('email-validator')
const jwt = require('jsonwebtoken')
const email = require('./email')
const emailTemplates = require('./emailTemplates')

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

      sendConfirmEmail: function (req, res) {
        const token = req.body.token
        jwt.verify(token, process.env.JWTsecret, function (err, decoded) {
          if (err) {
            return res
              .status(401)
              .json({ auth: false, message: 'Failed to authenticate token.' })
          }
          User.findOne({ _id: decoded.id }, function (err, user) {
            if (err) return res.status(401).json({ sent: false })
            if (!user) return res.status(200).json({ sent: false })
            if (user) {
              const emailToken = jwt.sign({ id: user._id }, process.env.JWTsecret, {
                expiresIn: 1800
              })
              email.sendEmail({
                from: `Best-Crypto-Bot-Ever <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: 'Please confirm your email',
                html: emailTemplates.verifyEmail(emailToken)
              }, function (err) {
                if (err) return res.status(401).json({ sent: false })
                res.status(200).json({ sent: true })
              })
            }
          })
        })
      },

      activateUser: function (req, res) {
        const token = req.headers['x-access-token']
        if (!token) {
          return res
            .status(401)
            .json({ activated: false, message: 'No token provided.' })
        }
        jwt.verify(token, process.env.JWTsecret, function (err, decoded) {
          if (err) {
            return res
              .status(401)
              .json({ activated: false, message: 'Failed to authenticate token.' })
          }
    
          User.findOne({ _id: decoded.id }, function (err, user) {
            if (err) return res.status(500).json({ reset: false, message: 'Internal server error while retriving user data' })
            if (!user) return res.status(500).json({ activated: false, message: 'User not found' })
            if (user) {
              user.isActive = true
              user.save(function (err, user) {
                if (err) return res.status(500).json({ activated: false, message: 'Internal server error while saving changes to user.' })
                return res.status(200).json({ activated: true })
              })
            }
          })
        })
      },

    
      resetPassword: function (req, res) {
        const token = req.headers['x-access-token']
        if (!token) {
          return res
            .status(401)
            .json({ reset: false, message: 'No token provided.' })
        }
        jwt.verify(token, process.env.JWTsecret, function (err, decoded) {
          if (err) {
            return res
              .status(401)
              .json({ reset: false, message: 'Failed to authenticate token.' })
          }
    
          User.findOne({ _id: decoded.id }, function (err, user) {
            if (err) return res.status(500).json({ reset: false, message: 'Internal server error while retriving user data' })
            if (!user) return res.status(500).json({ reset: false, message: 'User not found' })
            if (user) {
              user.password = user.generateHash(req.body.password)
              user.save(function (err, user) {
                if (err) return res.status(500).json({ reset: false, message: 'Internal server error while saving changes to user.' })
                return res.status(200).json({ reset: true })
              })
            }
          })
        })
      },

      sendPasswordResetEmail: function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (err) return res.status(401).json({ sent: false })
          if (!user) return res.status(200).json({ sent: false })
          if (user) {
            const emailToken = jwt.sign({ id: user._id }, process.env.JWTsecret, {
              expiresIn: 1800
            })
            email.sendEmail({
              from: `Best-Crypto-Bot-Ever <${process.env.EMAIL_USER}>`,
              to: user.email,
              subject: 'Reset Your Password',
              html: emailTemplates.resetPasswordEmail(emailToken)
            }, function (err) {
              if (err) return res.status(500).json({ sent: false })
              res.status(200).json({ sent: true })
            })
          }
        })
      },

}