import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="full-page">
      <Container className="about-container">
        <Row className="m-0">
          <Col className="about-content">
            <iframe
              src="https://docs.google.com/presentation/d/1N5we7hFqd3AK9Nf9qFvxz2jXvT8KFZMz561F9npIkqk/edit?usp=sharing"
              title="Iframe Example"
              className="full-size-iframe"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;