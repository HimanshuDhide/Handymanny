const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path based on your project structure

// Route to get nannies
router.get('/nannies', async (req, res) => {
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp('Nanny', 'i') } });
        if (!providers || providers.length === 0) {
            console.log('No nanny found');
            return res.status(404).json({ error: 'No nanny found' });
        }
        console.log('Nannies found:', providers);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching nannies:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
