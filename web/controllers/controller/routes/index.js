module.exports = (app, io) => { 
    app.get('/', (req, res) => {
        console.log('controller works')
        res.status(200).json({message: 'hello this is a basic message'})
    })
}