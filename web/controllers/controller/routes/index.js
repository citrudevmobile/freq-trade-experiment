const axios = require('axios')

module.exports = (app, io) => {

    app.get('/', (req, res) => {
        console.log('controller works')
        res.status(200).json({message: 'Controller bot up...'})
    })

    app.post('/ping-tradebot', async (req, res) => {
        try {
            const response = await axios.get(`http://${req.body.name}:8080/`)
            console.log(response.data);
            res.status(200).json(response.data)
          } catch (error) {
            console.error('Unable to reach tradebot')
            res.status(500).json({message: 'Unable to reach tradebot'})
          }
    })
}