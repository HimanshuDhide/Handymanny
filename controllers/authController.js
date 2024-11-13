const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT (should be stored in environment variables in a real application)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Handle user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message and user info
        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            user: { email: user.email, fullName: user.fullName } 
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handle user signup
exports.signup = async (req, res) => {
    const { fullName, email, password, address, phoneNumber } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ fullName, email, password: hashedPassword, address, phoneNumber });
        await user.save();

        // Respond with success message
        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
