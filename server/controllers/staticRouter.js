const Event = require('../models/Event');
const { getTotalStaff, getTotalUsers, getTotalEvents } = require('../service/entry');
const Booking = require('../models/Booking');
const Staff = require('../models/staff');

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
        const allEvents = await Event.find({});
        res.render('booking', { cookies: req.cookies, events: allEvents });
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
        const events = await Booking.find().sort({ event: 1 });
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
};
