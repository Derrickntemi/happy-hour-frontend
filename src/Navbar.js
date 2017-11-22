import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (

  <div className="navbar-container">
    <NavLink className="navbar-link" activeClassName="navbar-active">Home</NavLink>
  </div>

)

export default Navbar
