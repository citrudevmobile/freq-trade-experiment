const Auth = require('../libs/config-auth')
const path = require('path')
const DockerCtrl = require('../controllers/dockerCtrl')
const CommsCtrl = require('../controllers/commsCtrl')

module.exports = (app, io) => {

    app.post('/login', Auth.login)
    app.post('/register', Auth.register)
    app.post('/verify', Auth.verifyAuthToken)
    app.post('/send-confirm-email', Auth.sendConfirmEmail)
    app.post('/confirm-email-link', Auth.activateUser)
  
    app.post('/start-bot', DockerCtrl.startBot)
    app.post('/stop-bot', DockerCtrl.stopBot)
    app.post('/ping-bot', CommsCtrl.pingBot)
   
    app.get('*', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    
}