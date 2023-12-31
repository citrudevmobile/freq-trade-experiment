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
    // Endpoints For Controll Bot
    app.post('/start-ctrlbot',DockerCtrl.startCtrlBot)
    app.post('/stop-ctrlbot', DockerCtrl.stopCtrlBot)
    app.post('/ping-ctrlbot', CommsCtrl.pingCtrlBot)
    // Endpoints For Tradebot
    app.post('/get-tradebots', Auth.verifyAuthTokenSession, DockerCtrl.getUserBots)
    app.post('/create-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.createTradeBot)
    app.post('/delete-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.deleteTradeBot)
    app.post('/start-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.startTradeBot)
    app.post('/stop-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.stopTradeBot)
    app.post('/ping-tradebot', CommsCtrl.pingTradeBot)
    app.post('/login-tradebot', CommsCtrl.loginTradeBot)
    app.post('/login-tradebot', CommsCtrl.loginTradeBot)
    app.post('/notify-tradebot/:botname/:username', DockerCtrl.notifyTradeBot)
    app.get('*', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    
}