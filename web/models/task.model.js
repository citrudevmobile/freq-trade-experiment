const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'user' },
    taskName: { type: String, trim: true, unique: true, sparse: true },
    config: { type: mongoose.Schema.Types.Mixed },
    taskId: { type: String }
})

module.exports = mongoose.model('task', taskSchema)