const mongoose = require('mongoose');

const FailRequestSchema = new mongoose.Schema({
    sourceIP: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    reason : String,
})

module.exports = mongoose.model('FailRequest', FailRequestSchema);