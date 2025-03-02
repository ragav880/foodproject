import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './Header'
import Recepes from './Components/Recepes';

import Navbar from './Components/Navbar.js';


const App = () => {
  const [names, setNames] = useState("")
  const [recipe, setRecipe] = useState([])

  const API_ID = '6b0226f3'
  const API_KEY = '6a002b4a45703b8192ab3b74af969984	'


  useEffect(() => {
    getRecipe()
  }, [])

 

  const inputChange = (e) => {
    setNames(e.target.value)
    console.log(names)
  }

  const searchRecipe = ()=>{
    getRecipe()
    setNames("")
  }
  const getRecipe = async () => {
    await fetch(`https://api.edamam.com/search?q=${names}&app_id=${API_ID}&app_key=${API_KEY}`).then(res => res.json()).then((res) => {
      console.log(res.hits)
      setRecipe(res.hits)
    })
  }
  return (
    <>
    
    <Navbar/>
    
      <Header names={names} inputChange={inputChange} searchRecipe={searchRecipe} />
      <div className="container my-3">
        <Recepes recipe={recipe} />
      </div>
      
      

    </>
  )
}

export default App;