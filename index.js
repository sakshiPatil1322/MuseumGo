const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const { connectToMongoDB } = require("./connection");
const staticRoutes = require('./server/routes/staticRouter');
const userRoutes = require('./server/routes/user');
const eventRoutes = require('./server/routes/event');
const bookingRoutes = require('./server/routes/Booking');
const logoutRoutes = require('./server/routes/userLogout'); // Import logout route
const handleStaffRoutes = require('./server/routes/staff');
const handleMailRoutes =require('./server/routes/mail');
const newsHandler = require('./server/routes/newsLatter');
const webhookRoutes = require('./server/routes/webhook');
const handleFindUser = require('./server/routes/findUser');

const {mongoose} = require("mongoose");

const app = express();
const PORT = process.env.PORT || 9016;

connectToMongoDB('mongodb://127.0.0.1:27017/ticket')
.then(()=>console.log("mongoDb connected succesfully..."))
.catch((error)=>console.log("mongDb can't connect",error));

require('dotenv').config();
// Add this middleware to your server setup
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Expires', '0');
    res.setHeader('Pragma', 'no-cache');
    next();
});

app.use(session({
    secret: 'yujiItadori',  // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

app.get('/xyz',(req,res)=>{
    res.json({status:pending});
})

const cors = require('cors');
app.use(cors());


app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressLayouts);

app.set('view engine', 'ejs');
// app.set('layout','./layouts/home');
app.use('/api/webhook', webhookRoutes); // Use the webhook route
app.use('/',staticRoutes);
app.use('/user',userRoutes);
app.use('/event',eventRoutes);
app.use('/book', bookingRoutes);
app.use('/logout', logoutRoutes); // Use logout route
app.use('/staff',handleStaffRoutes);
app.use('/mail',handleMailRoutes);
app.use('/news',newsHandler);
app.use('/findUser',handleFindUser);

app.listen(PORT,() => console.log(`Server is started on Port ${PORT}`))