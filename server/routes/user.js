const express = require('express');
const { userSignup,userLogin } = require('../controllers/user');
const router = express.Router();

// Handle user signup
router.post("/", userSignup);

router.post("/login",userLogin);


module.exports = router;
