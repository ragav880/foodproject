const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Favorite = require('../models/Favorite');

router.post('/add', auth, async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debug log
        console.log('User ID:', req.user.id); // Debug log

        const { recipeId, title, image, ingredients, url } = req.body;

        // Check if recipe already exists for this user
        const existingFavorite = await Favorite.findOne({
            userId: req.user.id,
            recipeId: recipeId
        });

        if (existingFavorite) {
            return res.status(400).json({ message: 'Recipe already in favorites' });
        }

        const newFavorite = new Favorite({
            userId: req.user.id,
            recipeId,
            title,
            image,
            ingredients,
            url
        });

        await newFavorite.save();
        res.json(newFavorite);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Failed to add to favorites' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user.id });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
});

// Add this route to your existing favorites routes
router.delete('/remove/:id', auth, async (req, res) => {
    try {
        // Validate MongoDB ObjectId
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const favorite = await Favorite.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        await favorite.deleteOne(); // Use deleteOne instead of remove
        
        return res.status(200).json({ 
            success: true,
            message: 'Recipe removed from favorites'
        });
    } catch (error) {
        console.error('Delete favorite error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error removing favorite'
        });
    }
});

module.exports = router;