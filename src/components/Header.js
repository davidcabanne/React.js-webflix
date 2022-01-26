import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="logo">WEBFLIX.</div>
        <nav>
          <ul>
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? "navLink-active" : "navLink")}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/cart"
              className={(nav) => (nav.isActive ? "navLink-active" : "navLink")}
            >
              <li>Cart</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
