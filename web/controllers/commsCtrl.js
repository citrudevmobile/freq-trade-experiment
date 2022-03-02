const axios = require('axios')

module.exports = {
    pingCtrlBot: async function (req, res) {
        try {
            const response = await axios.get('http://localhost:8080/')
            console.log(response.data);
            res.status(200).json({data: response.data})
          } catch (error) {
            console.error('Unable to reach controller')
            res.status(500).json({})
          }
    },

    pingTradeBot: async function (req, res) {
      try {
          const response = await axios.get('http://localhost:8080/ping-tradebot')
          console.log(response.data);
          res.status(200).json({data: response.data})
        } catch (error) {
          console.error('Unable to reach controller')
          res.status(500).json({})
        }
  }
}