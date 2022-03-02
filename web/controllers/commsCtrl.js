const axios = require('axios')

module.exports = {
    pingBot: async function (req, res) {
        try {
            const response = await axios.get('http://localhost:8080/');
            console.log(response.data);
            res.status(200).json({data: response.data})
          } catch (error) {
            console.error(error);
            res.status(500).json({response: error})
          }
    }
}