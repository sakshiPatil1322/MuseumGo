const express = require('express');

const { handleBooking } = require('../controllers/Booking');

const router = express.Router();

router.post("/", handleBooking);

module.exports = router;
