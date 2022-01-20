module.exports = (app, io) => {

    app.get('/', (req, res) => { res.sendFile(path.join(__basedir + '/dist/index.html')) })
}