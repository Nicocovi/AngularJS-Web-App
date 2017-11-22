// Load required packages
var mongoose = require('mongoose');

// Define our event schema
var Event = new mongoose.Schema({
    name: String,
    location: String,
    startDate: String,
    endDate: String,
    startTime: String,
    endTime: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    creator: String //mongoose.Schema.Types.ObjectId
});

// Export the Mongoose model
module.exports = mongoose.model('Event', Event);
