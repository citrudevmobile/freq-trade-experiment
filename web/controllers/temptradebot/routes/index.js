module.exports = (app, io) => { 
    app.get('/', (req, res) => {
        res.status(200).json({message: `This ${process.env.BOT_NAME} bot is up...`})
    })
}