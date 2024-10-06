const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId to reference Event
        ref: 'Event',
        required: true
    },
    checkin: {
        type: Date,
        required: true
    },
    tickets: {
        type: Number,
        required: true,
        min: 1
    },
    specialRequest: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    uniqueKey: {
        type: String,
        unique: true,
        required: true
    },
});

module.exports = mongoose.model('Booking', bookingSchema);
