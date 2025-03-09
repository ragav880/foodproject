const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Create a new recipe
router.post('/create', async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      // Add user reference if you have authentication
      // user: req.user.id
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;