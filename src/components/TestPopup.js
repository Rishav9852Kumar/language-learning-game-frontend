import React from "react";
import { useNavigate } from "react-router-dom";
import "./TestPopup.css";

const TestPopup = () => {
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="popup">
      <iframe
        src="https://test-moengage.netlify.app/index_scorm.html"
        title="Iframe Example"
        className="full-size-iframe"
      />
      <button className="dismiss-btn" onClick={handleReturnToHomePage}>
        Submit for Review
      </button>
    </div>
  );
};

export default TestPopup;
