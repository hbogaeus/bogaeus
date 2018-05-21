import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.css";
import indexStyle from "../index.css";

const Header = () => (
  <div className={style.main}>
    <ul>
      <li className={style.item}>
        <NavLink
          className={style.link}
          activeClassName={style.selected}
          key={1}
          to="/"
          exact
        >
          Bogaeus
        </NavLink>
      </li>
      <li className={style.item}>
        <NavLink
          className={style.link}
          activeClassName={style.selected}
          key={2}
          to="/beats"
          exact
        >
          Search
        </NavLink>
      </li>
      <li className={style.item}>
        <NavLink
          className={style.link}
          activeClassName={style.selected}
          key={3}
          to="/beats/playlists"
        >
          Playlists
        </NavLink>
      </li>
    </ul>
    {/* 
    <NavLink className={style.headerItem} key={3} to="/musicforprogramming">
      Music For Programming
    </NavLink>
    */}
  </div>
);

export default Header;
