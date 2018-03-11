import React from "react";
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <Link key={1} to="/beats">Beats!</Link>
    <Link key={2} to="/musicforprogramming">Mfp</Link>
  </div>
)

export default Header;