const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    user: { type: String, trim: true, unique: true, sparse: true }
})

module.exports = mongoose.model('task', taskSchema)