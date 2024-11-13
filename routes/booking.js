const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/create', async (req, res) => {
    try {
        const {
            userId,
            serviceProviderId,
            serviceProviderName,
            serviceProviderNumber,
            userName,
            userAddress,
            date,
            timeSlot
        } = req.body;

        // Ensure all required fields are provided
        if (!userId || !serviceProviderId || !serviceProviderName || !date || !timeSlot) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newBooking = new Booking({
            userId,
            serviceProviderId,
            serviceProviderName,
            serviceProviderNumber,
            userName,
            userAddress,
            date,
            timeSlot,
            status: 'Pending',
        });

        const savedBooking = await newBooking.save();

        // Return the MongoDB-generated `_id` as orderId
        res.status(201).json({ orderId: savedBooking._id });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

module.exports = router;
