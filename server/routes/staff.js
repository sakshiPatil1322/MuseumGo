const express = require('express');

const { handleStaff } = require('../controllers/staff');

const router = express.Router();

router.post("/", handleStaff);

module.exports = router;