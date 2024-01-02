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
              src="https://test-moengage.netlify.app/index_scorm.html"
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