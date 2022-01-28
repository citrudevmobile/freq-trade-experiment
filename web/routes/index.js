const Auth = require('../libs/config-auth')
const path = require('path')

module.exports = (app, io) => {

    app.post('/login', Auth.login)
    app.post('/register', Auth.register)
    app.post('/verify', Auth.verifyAuthToken)
    app.get('*', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    
}