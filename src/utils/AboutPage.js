import React, { useState, useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import TestPopup from "../components/TestPopup";
import "./AboutPage.css";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

const AboutPage = () => {
  const context = useContext(UserContext);
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
if (!context.user?.uid) {
  return <Navigate to="/signin" />;
}
  return (
    <div className="full-page">
      <Container className="about-container">
        <Row className="m-0">
          <Col className="about-content">
            <h2>
              <b>Attention</b>
            </h2>
            <h3>Rules & Regulations</h3>
            <ul className="rules-list">
              <li>Do not switch tabs during the test.</li>
              <li>Do not refresh the page during the test.</li>
              <li>
                Provide answers to the best of your knowledge and without
                assistance.
              </li>
              <li>
                All questions are mandatory and each question has one or more
                correct answer.
              </li>
              <li>
                After Completing the test rememebr to submit the test for review
                or else your test would become invalid
              </li>
            </ul>

            <p className="rules-note">
              Please read and understand the rules before proceeding. Failure to
              adhere to the rules may lead to disqualification from the test.
            </p>
            <Button color="primary" onClick={toggle}>
              I understand, Take Test
            </Button>

            {modal && <TestPopup isOpen={modal} toggle={toggle} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
