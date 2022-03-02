module.exports = (app, io) => { 
    app.get('/', (req, res) => {
        res.status(200).json({message: 'This is the tradebot...'})
    })
}