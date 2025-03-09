import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp, FaTwitter, FaInstagram } from 'react-icons/fa';

const RecipeDetail = () => {
  const { state: recipe } = useLocation();
  const websiteUrl = window.location.origin; // Gets the base URL of your website

  const shareRecipe = (platform) => {
    const shareMessage = `Check out this amazing recipe website: ${websiteUrl}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`);
        break;
      case 'instagram':
        navigator.clipboard.writeText(shareMessage)
          .then(() => alert('Website link copied! You can now share it on Instagram'))
          .catch(err => console.error('Failed to copy:', err));
        break;
      default:
        break;
    }
  };

  return (
    <div className="page-container">
      <div className="form-container recipe-detail">
        <h2 className="text-center mb-4">{recipe.label}</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <img src={recipe.image} alt={recipe.label} className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <div className="share-buttons mb-4">
              <button 
                className="btn btn-link text-success"
                onClick={() => shareRecipe('whatsapp')}
                title="Share on WhatsApp"
              >
                <FaWhatsapp size={24} />
              </button>
              <button 
                className="btn btn-link text-primary"
                onClick={() => shareRecipe('twitter')}
                title="Share on Twitter"
              >
                <FaTwitter size={24} />
              </button>
              <button 
                className="btn btn-link text-danger"
                onClick={() => shareRecipe('instagram')}
                title="Share on Instagram"
              >
                <FaInstagram size={24} />
              </button>
            </div>
            <h3>Ingredients</h3>
            <ul className="list-group mb-4">
              {recipe.ingredientLines.map((ingredient, index) => (
                <li key={index} className="list-group-item">{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <h3>Instructions</h3>
          <div className="card">
            <div className="card-body">
              <ol className="mb-0">
                {recipe.instructions ? (
                  recipe.instructions.map((step, index) => (
                    <li key={index} className="mb-3">{step}</li>
                  ))
                ) : (
                  <div className="alert alert-info">
                    <h4>Cooking Instructions:</h4>
                    <ol>
                      <li>Preheat your cooking equipment as needed for the recipe.</li>
                      <li>Gather and prepare all ingredients as listed above.</li>
                      <li>Follow standard cooking procedures for this type of dish:</li>
                      <ul>
                        <li>Combine ingredients in the order that makes sense for the recipe</li>
                        <li>Cook according to typical methods for these ingredients</li>
                        <li>Ensure proper cooking temperatures for food safety</li>
                      </ul>
                      <li>Season to taste with salt and pepper if needed.</li>
                      <li>Serve and enjoy!</li>
                    </ol>
                    <p className="mt-3">
                      <strong>Note:</strong> For detailed instructions, cooking times, and temperatures specific to this recipe, 
                      please consult a similar recipe or cooking guide for this type of dish.
                    </p>
                  </div>
                )}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3>Additional Information</h3>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Cuisine Type:</strong> {recipe.cuisineType || 'Not specified'}</p>
              <p><strong>Meal Type:</strong> {recipe.mealType || 'Not specified'}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Total Time:</strong> {recipe.totalTime ? `${recipe.totalTime} minutes` : 'Not specified'}</p>
              <p><strong>Servings:</strong> {recipe.yield || 'Not specified'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;