import React from "react";
import { useNavigate } from "react-router-dom";

const FinalScorePopup = ({ score }) => {
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="popup">
      <h2>Your Final Score</h2>
      <p>Score: {score}</p>
      <button onClick={handleReturnToHomePage}>Return to Home Page</button>
    </div>
  );
};

export default FinalScorePopup;
