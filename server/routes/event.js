const express = require('express');

const { handleEvent } = require('../controllers/event');

const router = express.Router();

router.post("/", handleEvent);

module.exports = router;
