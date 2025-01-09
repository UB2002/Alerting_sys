const mongoose = require('mongoose');
const IPTrackingSchema = new mongoose.Schema({ 
    sourceIP: {
        type: String,
        required: true,
        unique: true
    },
    failedCount: {
        type: Number,
        default: 0
    },
    firstFailedAt:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('IPTracking', IPTrackingSchema);