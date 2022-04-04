const axios = require('axios')
let FormData = require('form-data')

module.exports = (app, io) => {
  
    // ping request to test if controller bot is up
    app.get('/', (req, res) => {
        res.status(200).json({message: `The '${process.env.BOT_NAME}' bot is up...`})
    })

    // ping request with specified name for trade bot to test if a specific trade bot is up
    app.post('/ping-tradebot', async (req, res) => {
        try {
            const response = await axios.get(`http://${req.body.name}:8080/api/v1/ping`)
            res.status(200).json(response.data)
          } catch (error) {
            res.status(500).json({message: 'Unable to reach tradebot'})
          }
    })

    app.post('/login-tradebot', async (req, res) => {
        try {
          let bodyFormData = new FormData()
          bodyFormData.append("username", "freqtrader")
          bodyFormData.append("password", "")
          const response = await axios({
            method: "post",
            url: `http://${req.body.name}:8080/api/v1/token/login`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          console.log('attemping login to bot...')
          console.log(response.data)
          res.status(200).json(response.data)
        } catch (error) {
          console.log('error connecting to bot')
          console.log(error)
          res.status(500).json(error)
        }
    })
}