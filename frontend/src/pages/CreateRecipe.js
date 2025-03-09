import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.REACT_API_URL}/api/recipes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create recipe');
      }

      const data = await response.json();
      alert('Recipe created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">RecipBox </h1>
      <div className="form-container">
        <h2 className="text-center mb-4">Create New Recipe</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Recipe Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={recipeData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ingredients</label>
            <textarea
              className="form-control"
              name="ingredients"
              value={recipeData.ingredients}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <textarea
              className="form-control"
              name="instructions"
              value={recipeData.instructions}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Recipe'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;