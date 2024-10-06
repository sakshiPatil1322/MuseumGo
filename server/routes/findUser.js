const express = require('express');

const { handleFindUser } = require('../controllers/findUser');

const router = express.Router();

router.post("/", handleFindUser);

module.exports = router;
