// In your routes/service.js or similar file
const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path as needed

// Get service providers by profession
router.get('/providers', async (req, res) => {
    try {
        const profession = req.query.profession;
        const providers = await ServiceProvider.find({ profession });
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
