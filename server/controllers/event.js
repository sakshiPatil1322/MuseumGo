const Event = require('../models/event');
const multer = require('multer');

// Use memory storage to temporarily store the image
const upload = multer({ storage: multer.memoryStorage() }).single('image');


async function handleEvent(req, res) {
    // Call the upload middleware
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ error: err.message });
        }

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'An image is required.' });
        }

        const { evName, smallInfo, description, ppp ,aSeat,evDate} = req.body;
        const imageFile = req.file; // Access the uploaded file

        try {
            const newEvent = new Event({
                evName,
                smallInfo,
                description,
                ppp,
                aSeat,
                image: {
                    data: imageFile.buffer,
                    contentType: imageFile.mimetype
                },  
                evDate
            });

            await newEvent.save();
            return res.redirect('adminDashboard');
        } catch (error) {
            console.error('Error creating event:', error);
            return res.status(400).json({ error: 'Failed to create event' });
        }
    });
}

module.exports = {
    handleEvent,
};
