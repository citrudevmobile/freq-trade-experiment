const axios = require('axios')

// This is resposible for communications with the applications in the containers. 
// Currently there are two apps: the controller application and tradebot application respectively

module.exports = {

    pingCtrlBot: async function (req, res) {
        try {
            const response = await axios.get('http://localhost:8080/')
            res.status(200).json(response.data)
          } catch (error) {
            res.status(500).json({message: 'Unable to reach controller'})
          }
    },

    pingTradeBot: async function (req, res) {
      try {
          const response = await axios.post('http://localhost:8080/ping-tradebot', {
            name: req.body.name
          })
          res.status(200).json(response.data)
        } catch (error) {
          res.status(500).json({message: 'Unable to reach tradebot'})
        }
    },

    loginTradeBot: async function (req, res) {
      try {
        const response = await axios.post('http://localhost:8080/login-tradebot', {
          name: req.body.name,
          username: "freqtrader",
          password: "SuperSecurePassword"
        })
        res.status(200).json(response.data)
      } catch (error) {
        res.status(500).json(error)
      }

    }
}