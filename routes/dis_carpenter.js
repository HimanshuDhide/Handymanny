const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider'); // Adjust the path based on your project structure

// Route to get maids
router.get('/Carpenters', async (req, res) => {
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp('Carpenter', 'i') } });
        if (!providers || providers.length === 0) {
            console.log('No carpenter found');
            return res.status(404).json({ error: 'No carpenter found' });
        }
        console.log('carpenters found:', providers);
        res.json(providers);
    } catch (error) {
        console.error('Error fetching carpenters:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
