import React, { useContext } from "react";
import "./LeaderBoard.css";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

const LeaderBoard = () => {
  const context = useContext(UserContext);
   if (!context.user?.uid) {
     return <Navigate to="/signin" />;
   }
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-heading">404</h1>
        <p className="not-found-message">Page Not Found</p>
        <p className="not-found-description">
          The page you are looking for might have been removed or doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default LeaderBoard;
