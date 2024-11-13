const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path based on your project structure

// Route to get maids
router.get('/Painters', async (req, res) => {
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp('Painter', 'i') } });
        if (!providers || providers.length === 0) {
            console.log('No Painter found');
            return res.status(404).json({ error: 'No Painter found' });
        }
        console.log('Painters found:', providers);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching painters:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
