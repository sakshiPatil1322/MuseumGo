const express = require('express');
const { isAdmin,verifyToken,restrictToLoggedinUserOnly } = require('../middlewares/auth')
const { getUserForValidation, removeTicketByAdmin,myBooking,deleteMyBooking,handleIndexPage,handleBookingPage,handleContactPage,handleServicePage,handleAdminDashboard,handleAdminBooking,handleAdminExhibits,handleSignupPage,handleLoginPage,handleAdminWebHandle} = require('../controllers/staticRouter');
router = express.Router();

router.get('/',handleIndexPage);
router.get('/index.ejs',handleIndexPage);
router.get('/booking.ejs',restrictToLoggedinUserOnly,handleBookingPage);
router.get('/contact.ejs',handleContactPage);
router.get('/service.ejs',handleServicePage);
router.get('/adminDashboard',verifyToken,isAdmin,handleAdminDashboard);
router.get('/adminBooking',verifyToken,isAdmin,handleAdminBooking);
router.get('/adminExhibits',verifyToken,isAdmin,handleAdminExhibits);
router.get('/adminWebHandle',verifyToken,isAdmin,handleAdminWebHandle);
router.get('/signup',handleSignupPage);
router.get('/login.ejs',handleLoginPage);
router.get('/login',handleLoginPage);
router.get('/pay',(req,res)=>{
    res.render('pay.ejs');
})
router.get('/dashboard', restrictToLoggedinUserOnly, myBooking);

// Handle Cancellation
router.post('/cancel-booking', deleteMyBooking);

router.post('/delete-user/:email',removeTicketByAdmin);

router.get('/get-user',getUserForValidation)

module.exports = router;