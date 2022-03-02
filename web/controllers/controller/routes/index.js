const axios = require('axios')

module.exports = (app, io) => {
     
    app.get('/', (req, res) => {
        console.log('controller works')
        res.status(200).json({message: 'controller bot working...'})
    })
}