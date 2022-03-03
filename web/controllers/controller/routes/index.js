const axios = require('axios')

module.exports = (app, io) => {

    app.get('/', (req, res) => {
        res.status(200).json({message: `The '${process.env.BOT_NAME}' bot is up...`})
    })

    app.post('/ping-tradebot', async (req, res) => {
        try {
            const response = await axios.get(`http://${req.body.name}:8080/`)
            res.status(200).json(response.data)
          } catch (error) {
            res.status(500).json({message: 'Unable to reach tradebot'})
          }
    })
}