import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div className="header">
    <NavLink className="header-item" key={1} to="/">Bogaeus</NavLink>
    <NavLink className="header-item" key={2} to="/beats">Beats</NavLink>
    <NavLink className="header-item" key={3} to="/musicforprogramming">Music For Programming</NavLink>
  </div>
)

export default Header;