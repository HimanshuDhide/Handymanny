const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for getting user favorites
router.get('/favorites', userController.getFavorites);

// Route for updating user profile
router.put('/profile', userController.updateProfile);

module.exports = router;
