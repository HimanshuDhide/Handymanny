const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/serviceproviderController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Password validation middleware
const validatePassword = (req, res, next) => {
    const password = req.body.password;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long, include at least 1 symbol, and 1 number.' });
    }
    next();
};

// Phone number validation middleware
const validatePhoneNumber = (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    const phoneRegex = /^\d{10}$/; // For 10-digit phone numbers (adjust based on region)

    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
        return res.status(400).json({ message: 'Phone number must be a valid 10-digit number.' });
    }
    next();
};

// Register route with file upload, password, and phone number validation
router.post('/register', upload.single('document'), validatePassword, validatePhoneNumber, serviceProviderController.register);

// Login route with password and phone number validation
router.post('/login', validatePassword, validatePhoneNumber, serviceProviderController.login);

module.exports = router;
