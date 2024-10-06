const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^.+@gmail\.com$/.test(value);
            },
            message: 'Email must be a Gmail address ending with @gmail.com'
        }

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user', // Default role is 'user'
        enum: ['user', 'admin'] // Valid roles are 'user' or 'admin'
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    // Check if the password field is modified or if it's a new document
    if (this.isModified('password') || this.isNew) {
        try {
            // Hash the password
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
