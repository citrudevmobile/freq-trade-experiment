const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({

    user: { type: mongoose.Schema.ObjectId, ref: 'user' },
    name: { type: String, trim: true, unique: true, sparse: true },
    config: { type: mongoose.Schema.Types.Mixed },
    taskId: { type: String, trim: true, unique: true, sparse: true },
    status: { type: Boolean, default: false },
    configFile: { type: String },
    logFile: { type: String },
    botDB: { type: String },
    botSimulateDB: { type: String },
    recipe: { type: mongoose.Schema.Types.Mixed },
    trades: [{ type: mongoose.Schema.Types.Mixed }]
    
})

module.exports = mongoose.model('task', taskSchema) 