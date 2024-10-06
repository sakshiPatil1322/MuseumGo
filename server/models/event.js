const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
    evName: {
        type: String,
        required: true,
    },
    smallInfo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ppp: {
        type: Number,
        required: true,
    },
    aSeat:{
        type: Number,
        required: true,
    },
    evDate: {
        type: Date,
        required: true
      },    
    image: {
        data: Buffer,
        contentType: String
    },
},{timestamps:true});

// Check if the model already exists, otherwise create it
const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

module.exports = Event;
