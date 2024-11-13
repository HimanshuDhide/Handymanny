const express = require('express');
const router = express.Router();
const ServiceProvider = require('../models/ServiceProvider');

// Route to get providers based on profession
router.get('/providers', async (req, res) => {
    const profession = req.query.profession; // Expecting profession to be passed as a query parameter
    try {
        const providers = await ServiceProvider.find({ profession: { $regex: new RegExp(profession, 'i') } });
        if (!providers || providers.length === 0) {
            console.log(`No ${profession} found`);
            return res.status(404).json({ error: `No ${profession} found` });
        }
        console.log(`${profession} found:`, providers);
        res.json(providers);
    } catch (error) {
        console.error(`Error fetching ${profession}:`, error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
