const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    document: { 
        type: String,
        required: true 
    },
    profession: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    services: [String]  // Array of services provided
});

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

module.exports = ServiceProvider;
