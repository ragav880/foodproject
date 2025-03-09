import React from 'react';
import Navbar from './Components/ui/Navbar';
import logo from './Components/ui/logo123.png';
const Header = ({ names, inputChange, searchRecipe }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchRecipe();
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="jumbotron">
      
      <img src={logo} alt="logo" width="150px" height="150px" className="me-2" />
        <h1 className="display-1">RecipeBox </h1>
        


        <div className="input-group w-50 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search Your Recipe"
            value={names}
            onChange={inputChange}
            onKeyPress={handleKeyPress}
          />
          <button
          style={{ backgroundColor: '#443627', borderColor: '#443627' }}  
          className="btn btn-dark" onClick={searchRecipe}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;