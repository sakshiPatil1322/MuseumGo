const User = require("../models/user");
const { setUser } = require("../service/auth.js");
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require("jsonwebtoken");


async function userSignup(req, res) {
    const { userName, email, password } = req.body;

    try {
        // Create a new user
        await User.create({
            userName,
            email,
            password,
        });
        // Redirect to the home page or another page
        return res.redirect("/");
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
            // Duplicate email error
            return res.status(400).send('Email already exists. Please choose another.');
        }
        // Handle other errors
        return res.status(500).send('Internal Server Error');
    }
}


async function userLogin(req, res) {
    const { email, password } = req.body;
    console.log('Received login request:', req.body); // Add this line to log the request body

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(404).render('login', { message: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(400).render('login', { message: 'Invalid credentials' });
        }

        // Generate JWT for the user
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Store token in cookies
        res.cookie('uid', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' // Only secure in production
        });

        console.log('Token generated and saved in cookies');

        // Redirect based on role
        if (user.role === 'admin') {
            console.log('Redirecting to admin dashboard');
            return res.redirect('/adminDashboard');
        } else {
            console.log('Redirecting to homepage');
            return res.redirect('/');
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).render('login', { message: 'Internal Server Error' });
    }
}


module.exports = {
    userSignup,
    userLogin,
};


