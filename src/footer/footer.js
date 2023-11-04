import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../gallery/logo.png"; // Import the image

const footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Your Logo" />
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/user/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/user/admin">Admin</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-text">
        &copy; 2023 Language Learning Game (LLG). All rights reserved.
      </div>
    </footer>
  );
};

export default footer;
