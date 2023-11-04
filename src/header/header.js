// Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Language Learning Game</h1>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default header;
