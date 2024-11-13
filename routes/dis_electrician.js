const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path based on your project structure

// Route to get electricians
router.get('/providers', async (req, res) => {
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp('Electrician', 'i') } });
        if (!providers || providers.length === 0) {
            console.log('No electricians found');
            return res.status(404).json({ error: 'No electricians found' });
        }
        console.log('Electricians found:', providers);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching electricians:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;


