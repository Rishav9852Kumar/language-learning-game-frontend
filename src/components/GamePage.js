import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, FormGroup, Input, Label } from "reactstrap";
import FinalScorePopup from "./FinalScorePopup";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/isGameOn";
import "./GamePage.css";

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const gameContext = useContext(GameContext);
  const isGameOn = gameContext.game.isGameOn;
  const gameLanguage = gameContext.game.gameLanguage;
  const gameLevel = gameContext.game.gameLevel;

  useEffect(() => {
    setLoading(true);

    if (!isGameOn) {
      navigate("/");
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/game/questions?subjectLanguage=${gameLanguage}&level=${gameLevel}`
        );

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const formattedQuestions = data.map((question) => ({
              text: question.Question,
              options: [
                question.OptionA,
                question.OptionB,
                question.OptionC,
                question.OptionD,
              ],
              correctAnswer: question.CorrectAnswer,
            }));
            setQuestions(formattedQuestions);
            setLoading(false);
          } else {
            console.error("No questions received from the API.");
            setLoading(false);
          }
        } else {
          console.error("API request failed with status: ", response.status);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
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
        {loading ? (
          <p>Loading questions...</p>
        ) : (
          questions.map((question, index) => (
            <div key={index} className="question-container">
              <p className="question-text">{question.text}</p>
              <Form>
                <FormGroup tag="fieldset">
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
          ))
        )}
        {showPopup && (
          <FinalScorePopup questions={questions} answers={answers} />
        )}
      </Container>
    </div>
  );
};

export default GamePage;
