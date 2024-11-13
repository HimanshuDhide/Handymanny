const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    const {
        userId,
        userName,
        userAddress,
        serviceProviderId,
        serviceProviderName,
        serviceProviderNumber,
        date,
        timeSlot
    } = req.body;

    try {
        const booking = new Booking({
            userId,
            userName,
            userAddress,
            serviceProviderId,
            serviceProviderName,
            serviceProviderNumber,
            date,
            timeSlot
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create booking', error });
    }
};
