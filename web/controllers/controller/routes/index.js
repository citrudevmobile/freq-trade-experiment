const axios = require('axios')

module.exports = (app, io) => {

    app.get('/', (req, res) => {
        console.log('controller works')
        res.status(200).json({message: 'Controller bot up...'})
    })

    app.get('/ping-tradebot', async (req, res) => {
        try {
            const response = await axios.get('http://tradebot:8080/')
            console.log(response.data);
            res.status(200).json({message: response.data})
          } catch (error) {
            console.error('Unable to reach tradebot')
            res.status(500).json({})
          }
    })
}