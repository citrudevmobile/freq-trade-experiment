const Auth = require('../libs/config-auth')
const path = require('path')

module.exports = (app, io) => {

    app.post('/login', Auth.login)
    app.post('/signup', Auth.register)
    app.post('/verify-auth', Auth.verifyAuthToken)
    app.get('*', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    
}