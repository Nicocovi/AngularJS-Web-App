// Load required packages
var mongoose = require('mongoose');

// Define our movie schema
var Trip = new mongoose.Schema({
    name: String,
    destination: String,
    startDate: Date,
    endDate: Date,
    budgetMin: Number,
    budgetMax: Number,
    preferences: String,
    lat: Number,
    long: Number,
    creator: mongoose.Schema.Types.ObjectId,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    preferences: [
        {
            type: String
        }
    ],
    selected: [
        {
            type: String
        }
    ]

});

// Export the Mongoose model
module.exports = mongoose.model('Trip', Trip);
