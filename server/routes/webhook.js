// routes/webhook.js
const express = require('express');
const router = express.Router();
const Event = require('../models/event'); // Import your Event model

// Webhook for Dialogflow
router.post('/', async (req, res) => {
  const intent = req.body.queryResult.intent.displayName; // Get the intent name from the request

  if (intent === 'Upcoming Events') {
    try {
      // Fetch upcoming events directly within the webhook
      const events = await Event.find({ evDate: { $gte: new Date() } }).sort({ evDate: 1 });

      if (events.length > 0) {
        const eventsList = events.map(event => `-\n ${event.evName} on ${new Date(event.evDate).toDateString()}\n`).join('\n');
        res.json({
          fulfillmentText: `Here are the upcoming events:\n${eventsList}`,
        });
      } else {
        res.json({
          fulfillmentText: 'There are no upcoming events at the moment.',
        });
      }
    } catch (error) {
      res.json({
        fulfillmentText: 'Sorry, I am unable to fetch the events right now. Please try again later.',
      });
    }
  } else {
    res.json({
      fulfillmentText: 'I did not understand your request. Can you please rephrase?',
    });
  }


  
});

module.exports = router;
