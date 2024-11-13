const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path based on your project structure

// Route to get maids
router.get('/maids', async (req, res) => {
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp('Maid', 'i') } });
        if (!providers || providers.length === 0) {
            console.log('No maid found');
            return res.status(404).json({ error: 'No maid found' });
        }
        console.log('Maids found:', providers);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching maids:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
