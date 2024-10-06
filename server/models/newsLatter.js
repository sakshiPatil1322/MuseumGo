const mongoose = require('mongoose');

// Define the Event schema
const newsSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique:true,
    },
    
});

// Check if the model already exists, otherwise create it
const News = mongoose.model('News', newsSchema);

module.exports = News;
