const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

// Add recipe to favorites
router.post('/add', auth, async (req, res) => {
  try {
    const { recipeId, title, image, ingredients, url } = req.body;
    let favorite = await Favorite.findOne({ userId: req.user.id });

    if (!favorite) {
      favorite = new Favorite({
        userId: req.user.id,
        recipes: []
      });
    }

    // Check if recipe already exists in favorites
    if (favorite.recipes.find(recipe => recipe.recipeId === recipeId)) {
      return res.status(400).json({ message: 'Recipe already in favorites' });
    }

    favorite.recipes.push({ recipeId, title, image, ingredients, url });
    await favorite.save();

    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get user's favorite recipes
router.get('/', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ userId: req.user.id });
    res.json(favorite ? favorite.recipes : []);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Remove recipe from favorites
router.delete('/remove/:recipeId', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ userId: req.user.id });
    if (!favorite) {
      return res.status(404).json({ message: 'No favorites found' });
    }

    favorite.recipes = favorite.recipes.filter(
      recipe => recipe.recipeId !== req.params.recipeId
    );

    await favorite.save();
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;