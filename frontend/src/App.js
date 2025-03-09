import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Receipe from './Components/Receipe.js';
import Login from './pages/login';
import Register from './pages/register';
import CreateRecipe from './pages/CreateRecipe'; // Add this import
import Favorites from './pages/Favorites';
import RecipeDetail from './pages/RecipeDetail';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [names, setNames] = useState("");
  const [recipe, setRecipe] = useState([]);

  const API_ID = '6b0226f3';
  const API_KEY = '6a002b4a45703b8192ab3b74af969984';

  // Array of random food items to show on initial load
  const randomFoods = ['chicken', 'pasta', 'salad', 'pizza', 'burger', 'soup', 'rice', 'fish', 'curry', 'sandwich'];

  useEffect(() => {
    // Get a random food item from the array
    const randomFood = randomFoods[Math.floor(Math.random() * randomFoods.length)];
    // Fetch recipes for the random food item
    fetch(`https://api.edamam.com/search?q=${randomFood}&app_id=${API_ID}&app_key=${API_KEY}`)
      .then(res => res.json())
      .then((res) => {
        console.log(res.hits);
        setRecipe(res.hits);
      })
      .catch(error => console.error('Error fetching random recipes:', error));
  }, []);

  const inputChange = (e) => {
    setNames(e.target.value);
    console.log(names);
  };

  const searchRecipe = () => {
    getRecipe();
    setNames("");
  };

  const getRecipe = async () => {
    await fetch(`https://api.edamam.com/search?q=${names}&app_id=${API_ID}&app_key=${API_KEY}`)
      .then(res => res.json())
      .then((res) => {
        console.log(res.hits);
        setRecipe(res.hits);
      });
  };

  return (
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <>
              <Header names={names} inputChange={inputChange} searchRecipe={searchRecipe} />
              <div className="container my-3">
                <Receipe recipe={recipe} />
              </div>
            </>
          } />
          <Route path="/pages/login" element={<Login />} />
          <Route path="/pages/register" element={<Register />} />
          <Route path="/create-recipe" element={<CreateRecipe />} /> {/* Add this route */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </AuthProvider>
  );
};

export default App;
