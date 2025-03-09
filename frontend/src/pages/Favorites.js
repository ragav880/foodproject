import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.REACT_API_URL}/api/favorites`, {
        headers: {
          'x-auth-token': token
        }
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const viewRecipeDetail = (recipe) => {
    // Transform the saved favorite data to match the original recipe format
    const recipeData = {
      label: recipe.title,
      image: recipe.image,
      ingredientLines: recipe.ingredients,
      url: recipe.url,
      cuisineType: recipe.cuisineType || [],
      mealType: recipe.mealType || [],
      totalTime: recipe.totalTime || 0,
      yield: recipe.yield || 0
    };
    
    navigate(`/recipe/${recipe.recipeId}`, { state: recipeData });
  };

  const removeFavorite = async (recipeId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to remove favorites');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.REACT_API_URL}/api/favorites/remove/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove from favorites');
      }

      // Remove from state only after successful deletion
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== recipeId));
      alert('Recipe removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert(error.message || 'Failed to remove from favorites');
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">My Favorite Recipes</h1>
      <div className="recipe-grid">
        {favorites.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <div className="card h-100">
              <div className="img-container">
                <img 
                  src={recipe.image} 
                  className="card-img-top" 
                  alt={recipe.title}
                  onClick={() => viewRecipeDetail(recipe)}
                />
              </div>
              <div className="card-body">
                <h5 
                  className="card-title"
                  onClick={() => viewRecipeDetail(recipe)}
                >
                  {recipe.title}
                </h5>
                <div className="d-flex justify-content-between align-items-center">
                  <button 
                    className="btn btn-primary"
                    onClick={() => viewRecipeDetail(recipe)}
                  >
                    View Recipe
                  </button>
                  <button 
                    className="btn btn-link text-danger"
                    onClick={() => removeFavorite(recipe._id)}
                    title="Remove from favorites"
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;