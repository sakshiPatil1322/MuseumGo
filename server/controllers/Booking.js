const Booking = require('../models/Booking');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer'); // Import nodemailer
const Event = require('../models/event'); // Ensure the path is correct
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function handleBooking(req, res) {
    try {
        const uniqueKey = uuidv4();
        const { name, email, event, checkin, tickets, specialRequest} = req.body;

        // Find the event by its name to get its ObjectId
        const eventObject = await Event.findOne({ evName: event });
        const price = eventObject.ppp;
        // Check if the event was found
        if (!eventObject) {
            return res.status(404).send('Event not found');
        }


        await Booking.create({
            name,
            email,
            event,
            checkin,
            tickets,
            specialRequest,
            uniqueKey: uniqueKey,
            event: eventObject._id, 
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sakshipatil5333@gmail.com', 
                pass: 'ayscmhjacilzhjts'   
            }
        });

        const mailOptions = {
            from: 'sakshipatil5333@gmail.com', 
            to: email, 
            subject: 'Booking Confirmation',
            text: `Dear ${name},\n\nThank you for your booking. Your unique booking reference is: ${uniqueKey}.\n\nEvent: ${event}\nCheck-in: ${checkin}\nTickets: ${tickets}\n\nWe look forward to seeing you!\n\nBest regards,\nYour Company`
        };

        await transporter.sendMail(mailOptions);

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: event,
                        description: `Unique Key: ${uniqueKey}`, // Optional description
                    },
                    unit_amount: price * 100, // Amount should be in the smallest currency unit
                },
                quantity: tickets,
            }],
            mode: 'payment',
            success_url: 'http://localhost:9016',
            cancel_url: 'http://localhost:9016',
        });        

        res.redirect(session.url)

    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    handleBooking,
};
