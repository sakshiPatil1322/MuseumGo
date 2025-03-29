const Booking = require('../models/Booking'); // Corrected variable name

async function handleFindUser(req, res) {
    try {
        if (!req.user) {
            return res.redirect('/login');
        }

        const { key } = req.body;
        console.log(key);

        const currentUser = await Booking.findOne({ uniqueKey: key });

        res.render('adminWebHandle', { user: req.user, currentUser });
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    handleFindUser,
};
