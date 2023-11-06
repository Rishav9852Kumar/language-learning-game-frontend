import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs={12} className="footer-links">
            <ul className="justify-content-end">
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
          </Col>
        </Row>
      </Container>
      <div className="footer-text">
        &copy; 2023 Language Learning Game (LLG). All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
