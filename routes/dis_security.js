const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path based on your project structure

// Route to get maids
router.get('/security', async (req, res) => {
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp('Security', 'i') } });
        if (!providers || providers.length === 0) {
            console.log('No security guard found');
            return res.status(404).json({ error: 'No security guard found' });
        }
        console.log('security guard found:', providers);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching security:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
