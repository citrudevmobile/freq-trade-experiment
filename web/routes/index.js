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
    app.post('/start-ctrlbot', Auth.verifyAuthTokenSession, DockerCtrl.startCtrlBot)
    app.post('/stop-ctrlbot', Auth.verifyAuthTokenSession, DockerCtrl.stopCtrlBot)
    app.post('/ping-ctrlbot', Auth.verifyAuthTokenSession, CommsCtrl.pingCtrlBot)
    // Endpoints For Tradebot
    app.post('/get-tradebots', Auth.verifyAuthTokenSession, DockerCtrl.getUserBots)
    app.post('/create-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.createTradeBot)
    app.post('/delete-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.deleteTradeBot)
    app.post('/start-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.startTradeBot)
    app.post('/stop-tradebot', Auth.verifyAuthTokenSession, DockerCtrl.stopTradeBot)
    app.post('/ping-tradebot', Auth.verifyAuthTokenSession, CommsCtrl.pingTradeBot)
   
    app.get('*', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
    
}