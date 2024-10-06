const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Clear user session or cookie
    req.session.destroy(err => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.clearCookie('uid'); // Clear the cookie if used
        res.redirect('/'); // Redirect to home or login page
    });
});

module.exports = router;
