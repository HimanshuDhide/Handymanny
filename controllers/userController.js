const User = require('../models/User');
const Favorite = require('../models/Favorite');

// Get user favorites
exports.getFavorites = async (req, res) => {
    const userId = req.query.userId;
    try {
        const favorites = await Favorite.find({ userId }).populate('serviceProviderId');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { userId, updates } = req.body;
    try {
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
