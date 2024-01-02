import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./user.css";

const User = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="full-page">
      <Container className="about-container">
        <Row className="m-0">
          <Col className="about-content">
            <iframe
              style={{ visibility: loaded ? "visible" : "hidden" }}
              src="https://test-moengage.netlify.app/index_scorm.html"
              title="Iframe Example"
              className="full-size-iframe"
              onLoad={() => setLoaded(true)}
            ></iframe>
            {!loaded && <div>Loading...</div>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default User;
