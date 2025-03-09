const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    recipeId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ingredients: [String],
    url: String
});

module.exports = mongoose.model('Favorite', FavoriteSchema);