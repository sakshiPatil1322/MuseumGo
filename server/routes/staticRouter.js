const express = require('express');
const { isAdmin } = require('../middlewares/auth')
const { restrictToLoggedinUserOnly } = require('../middlewares/auth');
const {  myBooking,deleteMyBooking,handleIndexPage,handleBookingPage,handleContactPage,handleServicePage,handleAdminDashboard,handleAdminBooking,handleAdminExhibits,handleSignupPage,handleLoginPage,handleAdminWebHandle} = require('../controllers/staticRouter');
router = express.Router();

router.get('/',handleIndexPage);
router.get('/index.ejs',handleIndexPage);
router.get('/booking.ejs',restrictToLoggedinUserOnly,handleBookingPage);
router.get('/contact.ejs',handleContactPage);
router.get('/service.ejs',handleServicePage);
router.get('/adminDashboard',isAdmin,handleAdminDashboard);
router.get('/adminBooking',handleAdminBooking);
router.get('/adminExhibits',handleAdminExhibits);
router.get('/adminWebHandle',handleAdminWebHandle);
router.get('/signup',handleSignupPage);
router.get('/login.ejs',handleLoginPage);
router.get('/login',handleLoginPage);
router.get('/pay',(req,res)=>{
    res.render('pay.ejs');
})
router.get('/dashboard', restrictToLoggedinUserOnly, myBooking);

// Handle Cancellation
router.post('/cancel-booking', restrictToLoggedinUserOnly, deleteMyBooking);

module.exports = router;