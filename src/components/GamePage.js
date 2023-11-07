import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, FormGroup, Input, Label } from "reactstrap";
import FinalScorePopup from "./FinalScorePopup";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/isGameOn"; 
import "./GamePage.css"; 

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Using the context to get the game information
  const gameContext = useContext(GameContext);

  const isGameOn = gameContext.game.isGameOn;
  const gameLanguage = gameContext.game.gameLanguage;
  const gameLevel = gameContext.game.gameLevel;

  useEffect(() => {
    if (!isGameOn) {
      navigate("/"); // Redirect to the homepage if the game is not active
    }
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `/api/questions?language=${gameLanguage}&level=${gameLevel}`
        );
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [gameLanguage, gameLevel, isGameOn, navigate]);

  const handleAnswerSelection = (questionIndex, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        calculatedScore++;
      }
    }
    setScore(calculatedScore);

    // Make an API call to update the user's score (you need to implement this)

    setShowPopup(true);
  };

  return (
    <div className="game-page-container">
      <Container>
        <h2>Language Learning Game</h2>
        <h3>Language: {gameLanguage}</h3>
        <h3>Level: {gameLevel}</h3>
        <Button
          className="submit-button"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <p>{question.text}</p>
            <Form>
              <FormGroup tag="fieldset">
                <legend>Options:</legend>
                <ul>
                  {question.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            onChange={() =>
                              handleAnswerSelection(index, option)
                            }
                          />{" "}
                          {option}
                        </Label>
                      </FormGroup>
                    </li>
                  ))}
                </ul>
              </FormGroup>
            </Form>
          </div>
        ))}
        {showPopup && <FinalScorePopup score={score} />}
      </Container>
    </div>
  );
};

export default GamePage;
