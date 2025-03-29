const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.clearCookie('uid'); // Clear JWT cookie
        res.redirect('/login'); // Redirect to login page after logout
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
