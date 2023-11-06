import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form, FormGroup, Input, Label } from "reactstrap";
import FinalScorePopup from "./FinalScorePopup";
import { useNavigate } from "react-router-dom";
import { IsGameOnContext } from "../context/isGameOn"; // Import the context
import "./GamePage.css"; // Import the CSS

const GamePage = ({ selectedLanguage }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Use the context to get the isGameOn state
  const isGameOnContext = useContext(IsGameOnContext);

  useEffect(() => {
    if (!isGameOnContext.isGameOn) {
      navigate("/"); // Redirect to the homepage if the game is not active
    }
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `/api/questions?language=${selectedLanguage}`
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
  }, [selectedLanguage, isGameOnContext.isGameOn, navigate]);

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
        <h3>Language: {selectedLanguage}</h3>
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
