import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Receipe = ({ recipe }) => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  const fetchUserFavorites = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.REACT_API_URL}/api/favorites`, {
        headers: {
          'x-auth-token': token
        }
      });
      const data = await response.json();
      setFavorites(data.map(fav => fav.recipeId));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const addToFavorites = async (recipeData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        if (window.confirm('Please login to add favorites. Would you like to login now?')) {
            navigate('/pages/login');
        }
        return;
    }

    try {
        const response = await fetch(`${import.meta.env.REACT_API_URL}/api/favorites/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token // Make sure this matches the token from localStorage
            },
            body: JSON.stringify({
                recipeId: recipeData.recipe.uri.split('#recipe_')[1],
                title: recipeData.recipe.label,
                image: recipeData.recipe.image,
                ingredients: recipeData.recipe.ingredientLines,
                url: recipeData.recipe.url
            })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to add to favorites');
        }

        alert('Added to favorites!');
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
};

  const viewRecipeDetail = (recipeData) => {
    navigate(`/recipe/${recipeData.recipe.uri.split('#recipe_')[1]}`, {
      state: recipeData.recipe
    });
  };

  return (
    <div className="recipe-grid">
      {recipe.map((item, index) => (
        <div key={index} className="recipe-card">
          <div className="card h-100">
            <div className="img-container">
              <img 
                src={item.recipe.image} 
                className="card-img-top" 
                alt={item.recipe.label}
                onClick={() => viewRecipeDetail(item)}
              />
            </div>
            <div className="card-body">
              <h5 
                className="card-title" 
                onClick={() => viewRecipeDetail(item)}
              >
                {item.recipe.label}
              </h5>
              <div className="d-flex justify-content-between align-items-center">
                <button 
                  style={{ backgroundColor: '#443627', borderColor: '#007bff' }}
                  className="btn btn-dark"
                  onClick={() => viewRecipeDetail(item)}
                >
                  View Recipe
                </button>
                <button 
                  className="btn btn-link text-danger"
                  onClick={() => addToFavorites(item)}
                >
                  {favorites.includes(item.recipe.uri.split('#recipe_')[1]) ? 
                    <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Receipe;