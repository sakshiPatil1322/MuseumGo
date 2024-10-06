const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sakshipatil5333@gmail.com',
        pass: 'ayscmhjacilzhjts'
    }
});

const sendMail = async (req, res) => {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    const mailOptions = {
        from: email,
        to: 'sakshipatil5333@gmail.com',
        subject: 'Technical Issue Report',
        text: `A technical issue has been reported by: ${email}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

module.exports = {
    sendMail,
};
