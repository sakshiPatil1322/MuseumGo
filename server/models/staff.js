const mongoose = require('mongoose');

// Define the User schema
const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
});

// Create the User model
const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
