import React from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import "./AboutPage.css";


const AboutPage = () => {
  return (
    <div>
      <Container className="about-container">
        <Row>
          <Col className="about-content">
            <h1>hello </h1>
          </Col>
          <iframe
            src="demo_iframe.htm"
            height="100%"
            width="100%"
            title="Iframe Example"
          ></iframe>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
