const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path based on your project structure

// Route to get plumbers
router.get('/plumbers', async (req, res) => {  // Changed route from /providers to /plumbers
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp('Plumber', 'i') } });
        if (!providers || providers.length === 0) {
            console.log('No plumber found');
            return res.status(404).json({ error: 'No plumber found' });
        }
        console.log('Plumbers found:', providers);  // Changed console log message
        res.json(providers);
    } catch (error) {
        console.error('Error fetching plumbers:', error);  // Changed error log message
        res.status(500).send('Server error');
    }
});

module.exports = router;
