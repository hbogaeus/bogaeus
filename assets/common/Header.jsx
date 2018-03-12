import React from "react";
import { NavLink } from "react-router-dom";
import style from "./style.css";
import indexStyle from "../index.css";

const Header = () => (
  <div className={style.header}>
    <NavLink className={style.headerItem} key={1} to="/">
      Bogaeus
    </NavLink>
    <NavLink className={style.headerItem} key={2} to="/beats">
      Beats
    </NavLink>
    <NavLink className={style.headerItem} key={3} to="/musicforprogramming">
      Music For Programming
    </NavLink>
  </div>
);

export default Header;
