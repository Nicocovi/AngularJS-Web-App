// Load required packages
var mongoose = require('mongoose');

// Define our event schema
var Event = new mongoose.Schema({
    name: String,
    location: String,
    startDate: Date,
    endDate: Date,
    creator: mongoose.Schema.Types.ObjectId,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

// Export the Mongoose model
module.exports = mongoose.model('Event', Event);
