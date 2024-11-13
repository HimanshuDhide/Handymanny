const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
