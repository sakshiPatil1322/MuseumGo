const User = require("../models/user");
const {setUser} = require("../service/auth.js");
const bcrypt = require('bcryptjs');


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

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).render('login', { message: 'User not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('login', { message: 'Invalid credentials' });

        }
        // Handle successful login (e.g., set session or cookie, redirect)
        if (user.role === 'admin') {
            req.session.user = user; // Store user object in session
            return res.redirect('/adminDashboard');
        } else {
            const token = setUser({ id: user._id, email: user.email });
            res.cookie('uid', token);
            return res.redirect('/'); // Replace with actual route
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


