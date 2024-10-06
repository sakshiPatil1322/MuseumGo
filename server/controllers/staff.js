const Staff = require('../models/staff');
const multer = require('multer');

// Configure multer for file storage
const upload = multer({ storage: multer.memoryStorage() }).single('image');

const handleStaff = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(400).json({ error: err.message });
        }

        // Check if a file was uploaded
        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ error: 'An image is required.' });
        }

        try {
            const { name, email, DOB, gender, salary, role } = req.body;

            // Create a new staff entry
            await Staff.create({
                name,
                email,
                DOB,
                gender,
                salary,
                role,
                image: {
                    data: imageFile.buffer,
                    contentType: imageFile.mimetype
                }
            });

            // Redirect or respond with success
            res.redirect('/adminDashboard');
        } catch (error) {
            console.error('Error creating staff:', error);
            res.status(500).json({ error: 'Server error' });
        }
    });
};

module.exports = {
    handleStaff,
};
