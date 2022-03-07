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
    
    app.post('/test-image', DockerCtrl.testImage)
    app.post('/start-ctrlbot', DockerCtrl.startCtrlBot)
    app.post('/start-tradebot', DockerCtrl.startTradeBot)

    app.post('/stop-ctrlbot', DockerCtrl.stopCtrlBot)
    app.post('/stop-tradebot', DockerCtrl.stopTradeBot)

    app.post('/ping-ctrlbot', CommsCtrl.pingCtrlBot)
    app.post('/ping-tradebot', CommsCtrl.pingTradeBot)
   
    app.get('*', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    
}