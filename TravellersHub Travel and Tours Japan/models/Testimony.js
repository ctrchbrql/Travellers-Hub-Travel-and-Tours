const mongoose = require('mongoose');

const testimonySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted'],
        default: 'Pending' // Default status is 'pending'
    }
});

module.exports = mongoose.model('Testimony', testimonySchema,'Testimony');
