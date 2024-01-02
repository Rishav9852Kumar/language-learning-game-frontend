import React from "react";
import { Container } from "reactstrap";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Container className="my-5">
        <h1>Welcome to Our Online Assessment Platform</h1>
        <p>Our platform provides the best tool to test your skills and knowledge.</p>
      </Container>
    </div>
  );
};

export default HomePage;