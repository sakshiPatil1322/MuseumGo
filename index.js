const express = require('express');
const path = require('path');
require('dotenv').config(); // Load environment variables

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { connectToMongoDB } = require("./connection");

// Import Routes
const staticRoutes = require('./server/routes/staticRouter');
const userRoutes = require('./server/routes/user');
const eventRoutes = require('./server/routes/event');
const bookingRoutes = require('./server/routes/Booking');
const logoutRoutes = require('./server/routes/userLogout'); 
const handleStaffRoutes = require('./server/routes/staff');
const handleMailRoutes = require('./server/routes/mail');
const newsHandler = require('./server/routes/newsLatter');
const webhookRoutes = require('./server/routes/webhook');
const handleFindUser = require('./server/routes/findUser');

const app = express();
const PORT = process.env.PORT || 9016;

// Connect to MongoDB
connectToMongoDB(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully..."))
    .catch((error) => console.log("MongoDB connection failed:", error));

// Disable caching for better authentication handling
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Expires', '0');
    res.setHeader('Pragma', 'no-cache');
    next();
});

// REMOVE SESSION (Not needed since we use JWT)
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static files and views
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Routes
app.use('/api/webhook', webhookRoutes);
app.use('/', staticRoutes);
app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/book', bookingRoutes);
app.use('/logout', logoutRoutes);
app.use('/staff', handleStaffRoutes);
app.use('/mail', handleMailRoutes);
app.use('/news', newsHandler);
app.use('/findUser', handleFindUser);

// Start Server
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
