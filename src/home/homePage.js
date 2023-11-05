import React, { useState } from "react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import "./HomePage.css";
import easyLevelImage from "../gallery/easy.png";
import mediumLevelImage from "../gallery/medium.png";
import hardLevelImage from "../gallery/hard.png";

const HomePage = () => {
  const [chosenLanguage, setChosenLanguage] = useState("English"); // Default language

  const handleLanguageChange = (language) => {
    setChosenLanguage(language);
  };

  const games = [
    {
      title: `Language Game 1 (${chosenLanguage})`,
      imgURL: easyLevelImage ,
      link: "/game1",
      level: "Easy",
      description: `Learn basic vocabulary in a fun way (${chosenLanguage}).`,
    },
    {
      title: `Language Game 2 (${chosenLanguage})`,
      imgURL: mediumLevelImage ,
      link: "/game2",
      level: "Medium",
      description: `Practice medium level question when you want to get serious (${chosenLanguage}).`,
    },
    {
      title: `Language Game 3 (${chosenLanguage})`,
      imgURL: hardLevelImage ,
      link: "/game3",
      level: "Hard",
      description: `Challenge yourself with advanced grammar exercises (${chosenLanguage}).`,
    },
    // Add more games as needed
  ];

  return (
    <div className="homepage-container">
      <Container className="homepage-container my-5">
        <h1>Welcome to Language Learning Games</h1>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="language-dropdown">
            Choose Language: {chosenLanguage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleLanguageChange("English")}>
              English
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLanguageChange("Spanish")}>
              Spanish
            </Dropdown.Item>
            {/* Add more language options as needed */}
          </Dropdown.Menu>
        </Dropdown>
        <Row>
          {games.map((game, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="game-card">
                <Card.Img variant="top" src={game.imgURL} />
                <Card.Body>
                  <Card.Title className="game-title">{game.title}</Card.Title>
                  <Card.Subtitle
                    className={`game-level game-level-${game.level.toLowerCase()}`}
                  >
                    {game.level}
                  </Card.Subtitle>
                  <Card.Text className="game-description">
                    {game.description}
                  </Card.Text>
                  <Card.Link href={game.link} className="game-link">
                    Play Now
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
