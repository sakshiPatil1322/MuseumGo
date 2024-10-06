const mongoose = require ("mongoose");
const User = require('./server/models/user');
const { connectToMongoDB } = require("./connection");


connectToMongoDB('mongodb://127.0.0.1:27017/ticket')
.then(()=>console.log("mongoDb connected succesfully..."))
.catch((error)=>console.log("mongDb can't connect",error));

// Function to create the admin user
const createAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (adminExists) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        const admin = new User({
            userName: 'Sakshi',
            email: 'admin@gmail.com',
            password: 'admim@123', // Choose a strong password
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
