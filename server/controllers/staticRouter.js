const Event = require('../models/Event');
const { getTotalStaff, getTotalUsers, getTotalEvents } = require('../service/entry');
const Booking = require('../models/Booking');
const Staff = require('../models/staff');
const { getUser } = require('../service/auth'); 

const handleIndexPage = async (req, res) => {
    try {
        const allEvents = await Event.find({});
        const eventsWithAvailableSeats = await Promise.all(allEvents.map(async (event) => {
            const bookings = await Booking.find({ event: event._id });
            const totalTicketsBooked = bookings.reduce((total, booking) => total + booking.tickets, 0);
            const availableSeats = event.aSeat - totalTicketsBooked;
            return {
                ...event.toObject(),
                availableSeats
            };
        }));

        const totalStaff = await getTotalStaff();
        const totalUsers = await getTotalUsers();
        const totalEvents = await getTotalEvents();

        res.render('index', {
            cookies: req.cookies,
            events: eventsWithAvailableSeats,
            totalStaff: totalStaff,
            totalUsers: totalUsers,
            totalEvents: totalEvents
        });
    } catch (error) {
        console.error('Error fetching events or bookings:', error);
        res.status(500).send('Server Error');
    }
};

const handleBookingPage = async (req, res) => {
    try {
        const selectedEvent = req.query.evName || ""; // Get selected event from query params
        const allEvents = await Event.find({});
        res.render('booking', { cookies: req.cookies, events: allEvents,selectedEvent:selectedEvent });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Server Error');
    }
};

const handleContactPage = (req, res) => {
    res.render('contact', { cookies: req.cookies });
};

const handleServicePage = (req, res) => {
    res.render('service', { cookies: req.cookies });
};

const handleAdminDashboard = async (req, res) => {
    const staffs = await Staff.find({});
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const totalStaff = await getTotalStaff();
        const totalUsers = await getTotalUsers();
        const totalEvents = await getTotalEvents();
        res.render('adminDashboard', { user: req.session.user, totalStaff, totalUsers, totalEvents ,staffs});
    } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        res.status(500).send('Server Error');
    }
};

const handleAdminBooking = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('adminBooking', { user: req.session.user });
};

const handleAdminExhibits = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('adminExhibits', { user: req.session.user });
};

const handleAdminWebHandle = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        let currentUser=req.params;
        const events = await Booking.find({email:currentUser.email}).sort({ event: 1 });
        res.render('adminWebHandle', { user: req.session.user, events });
    } catch (error) {
        console.error('Error fetching bookings for admin web handle:', error);
        res.status(500).send('Server Error');
    }
};

const handleSignupPage = (req, res) => {
    res.render('signup');
};

const handleLoginPage = (req, res) => {
    res.render('login');
};


const myBooking = async (req, res) => {
    try {
        const token = req.cookies.uid; // Get token from cookies
        if (!token) {
            return res.status(401).render('login', { message: 'Please log in to access your bookings.' });
        }

        const user = getUser(token); // Decode the token to get the user information
        if (!user) {
            return res.status(401).render('login', { message: 'Invalid or expired token' });
        }

        // Fetch bookings for the logged-in user using their email
        const bookings = await Booking.find({ email: user.email }).populate('event'); // Populate event details


        // Render user dashboard with bookings
        res.render('userDashboard', { user: user,bookings: bookings,cookies: req.cookies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


// Handle Cancellation
const deleteMyBooking =  async (req, res) => {
    const { bookingId } = req.body;

    try {
        await Booking.findByIdAndDelete(bookingId);
        res.redirect('/dashboard'); // Refresh dashboard after cancellation
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};




module.exports = {
    handleIndexPage,
    handleBookingPage,
    handleContactPage,
    handleServicePage,
    handleSignupPage,
    handleLoginPage,
    handleAdminDashboard,
    handleAdminBooking,
    handleAdminExhibits,
    handleAdminWebHandle,
    myBooking,
    deleteMyBooking
};


