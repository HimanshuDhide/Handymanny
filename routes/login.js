const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const ServiceProvider = require('../models/ServiceProvider'); // Add ServiceProvider model
const bcrypt = require('bcrypt'); // If you are using hashed passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// Route for user and service provider login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // First, try finding the user in the User table
        let user = await User.findOne({ email });
        let userType = 'user'; // Default to user

        if (!user) {
            // If user is not found, try finding the service provider
            user = await ServiceProvider.findOne({ email });
            userType = 'serviceProvider'; // Change to service provider if found
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password (assuming passwords are hashed)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, userType },
            process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your environment variables
            { expiresIn: '1h' }
        );

        // Return success message with the token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName || user.serviceProviderName, // Adjusted to show full name or service provider name
                phoneNumber: user.phoneNumber
            },
            userType
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
