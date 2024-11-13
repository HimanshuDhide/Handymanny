const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    userAddress: { type: String, required: true },
    serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
    serviceProviderName: { type: String, required: true },
    serviceProviderNumber: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
