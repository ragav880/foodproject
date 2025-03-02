import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css' // Import the CSS file for additional styling

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-lg-top">
      <div className="container-fluid">
        
          
        
        
        
        
            
          <div className="navbar-nav">
            
            <NavLink >Login</NavLink>
            <NavLink >Register</NavLink>
          </div>
        
      </div>
    </nav>
  )
}

export default Navbar