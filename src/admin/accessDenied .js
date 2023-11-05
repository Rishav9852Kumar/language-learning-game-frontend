import React from "react";
import { Link } from "react-router-dom";
import "./AccessDenied.css";
// <a href="#" onClick={() => handleLogout()} className="btn">
const AccessDenied = () => {
  return (
    <div className="access-denied-page">
      <div className="access-denied-message">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
      <div className="login-options">
        <p>Would you like to...</p>
        <a to="/login" className="btn">
          Log Out
        </a>
        <Link to="/login" className="btn">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
