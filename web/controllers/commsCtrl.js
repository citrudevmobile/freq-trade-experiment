const axios = require('axios')

module.exports = {
    pingBot: async function (req, res) {
        try {
            const response = await axios.get('http://localhost:8080/');
            console.log(response);
            res.status(200).json({response: response})
          } catch (error) {
            console.error(error);
            res.status(500).json({response: error})
          }
    }
}