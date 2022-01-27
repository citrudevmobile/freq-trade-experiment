const Auth = require('../libs/config-auth')
const path = require('path')

module.exports = (app, io) => {

    app.get('/', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    app.get('/dashboard', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    app.post('/login', Auth.login)
    app.post('/signup', Auth.register)
    app.post('/verify-auth', Auth.verifyAuthToken)
    
}