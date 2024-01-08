import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";
import "./HomePage.css";

// Importing images from the local files
import step1Img from "../gallery/step1.png";
import step2Img from "../gallery/step2.png";
import step3Img from "../gallery/step3.png";
import step4Img from "../gallery/step4.png";
import step5Img from "../gallery/step5.png";

const HomePage = () => {
  const steps = [
    {
      title: "Step 1",
      text: "Read the dashboard steps",
      imgSrc: step3Img,
    },
    {
      title: "Step 2",
      text: "Find  at top right corner",
      imgSrc: step1Img,
    },
    {
      title: "Step 3",
      text: "Login to the platform",
      imgSrc: step2Img,
    },
    {
      title: "Step 4",
      text: "Read guidelines before starting test",
      imgSrc: step4Img,
    },
    {
      title: "Step 5",
      text: "Review results and Submit for Review",
      imgSrc: step5Img,
    },
  ];

  return (
    <div className="homepage-container">
      <Container className="homepage-content">
        <h1 className="heading-home">
          <b>Welcome to Our Online Assessment Platform</b>
        </h1>
        <p className="sub-heading">
          Our platform provides the best tool to test your skills and knowledge.
        </p>
        <Row>
          {steps.map((step, index) => (
            <Col key={index} xs="12" sm="6" md="4" lg="3" className="step-col">
              <Card className="step-card">
                <CardImg
                  top
                  width="100%"
                  src={step.imgSrc}
                  alt={step.title}
                  className="step-img"
                />
                <CardBody>
                  <CardTitle tag="h5">{step.title}</CardTitle>
                  <CardText>{step.text}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
