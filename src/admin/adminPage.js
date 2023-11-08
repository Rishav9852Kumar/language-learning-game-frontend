import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./AdminPage.css";
import { toast } from "react-toastify";

const AdminPage = () => {
  const initialQuestionState = {
    Question: "",
    OptionA: "",
    OptionB: "",
    OptionC: "",
    OptionD: "",
    CorrectAnswer: "",
    QuestionLevel: 1,
    Language: "English",
  };

  const [question, setQuestion] = useState({ ...initialQuestionState });
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [languages, setLanguages] = useState([]); // State variable to store available languages
  const [formErrors, setFormErrors] = useState({}); // State variable to store form field errors

  useEffect(() => {
    // Fetching total users and total questions from API
    fetch("/api/getTotalUsers")
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.totalUsers);
      })
      .catch((error) => {
        console.error("Error fetching total users:", error);
      });

    fetch("/api/getTotalQuestions")
      .then((response) => response.json())
      .then((data) => {
        setTotalQuestions(data.totalQuestions);
      })
      .catch((error) => {
        console.error("Error fetching total questions:", error);
      });

    // Fetching available languages from the API
    fetch(
      "https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/languages"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Languages:", data);
        setLanguages(data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!question.Question) {
      errors.Question = "Question is required";
    }
    if (!question.OptionA) {
      errors.OptionA = "Option A is required";
    }
    if (!question.OptionB) {
      errors.OptionB = "Option B is required";
    }
    if (!question.OptionC) {
      errors.OptionC = "Option C is required";
    }
    if (!question.OptionD) {
      errors.OptionD = "Option D is required";
    }
    if (
      isNaN(parseInt(question.QuestionLevel)) ||
      question.QuestionLevel < 1 ||
      question.QuestionLevel > 5
    ) {
      errors.QuestionLevel =
        "Question level must be an integer in the range of 1 to 5";
    }
    if (!question.Language) {
      errors.Language = "Language is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const selectedLevel = parseInt(question.QuestionLevel);
      const apiUrl = `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/game/questions?questionLevel=${selectedLevel}&subjectLanguage=${question.Language}&question=${question.Question}&optionA=${question.OptionA}&optionB=${question.OptionB}&optionC=${question.OptionC}&optionD=${question.OptionD}&correctAnswer=${question.CorrectAnswer}`;

      // Making a POST request to the API to add the question
      fetch(apiUrl, {
        method: "POST",
      })
        .then((response) => response.text())
        .then((data) => {
          if (data === "Question was added successfully") {
            toast("Question Added Successfully", {
              type: "success",
            });
            setQuestion({ ...initialQuestionState }); // Reset the form
          } else {
            alert("Failed to add the question. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error adding the question:", error);
          alert("Failed to add the question. Please try again.");
        });
    }
  };

  return (
    <Container className="admin-container my-5">
      <h1 className="admin-heading">Admin Page</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Text className="admin-info">
            Total Registered Users:{" "}
            <span className="admin-count">{totalUsers}</span>
          </Card.Text>
          <Card.Text className="admin-info">
            Total Questions:{" "}
            <span className="admin-count">{totalQuestions}</span>
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="question-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="question">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the question"
              value={question.Question}
              onChange={(e) =>
                setQuestion({ ...question, Question: e.target.value })
              }
            />
            {formErrors.Question && (
              <span className="text-danger">{formErrors.Question}</span>
            )}
          </Form.Group>

          <Form.Group controlId="optionA">
            <Form.Label>Option A</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option A"
              value={question.OptionA}
              onChange={(e) =>
                setQuestion({ ...question, OptionA: e.target.value })
              }
            />
            {formErrors.OptionA && (
              <span className="text-danger">{formErrors.OptionA}</span>
            )}
          </Form.Group>

          <Form.Group controlId="optionB">
            <Form.Label>Option B</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option B"
              value={question.OptionB}
              onChange={(e) =>
                setQuestion({ ...question, OptionB: e.target.value })
              }
            />
            {formErrors.OptionB && (
              <span className="text-danger">{formErrors.OptionB}</span>
            )}
          </Form.Group>

          <Form.Group controlId="optionC">
            <Form.Label>Option C</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option C"
              value={question.OptionC}
              onChange={(e) =>
                setQuestion({ ...question, OptionC: e.target.value })
              }
            />
            {formErrors.OptionC && (
              <span className="text-danger">{formErrors.OptionC}</span>
            )}
          </Form.Group>

          <Form.Group controlId="optionD">
            <Form.Label>Option D</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter option D"
              value={question.OptionD}
              onChange={(e) =>
                setQuestion({ ...question, OptionD: e.target.value })
              }
            />
            {formErrors.OptionD && (
              <span className="text-danger">{formErrors.OptionD}</span>
            )}
          </Form.Group>

          <Form.Group controlId="correctAnswer">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              as="select"
              value={question.CorrectAnswer}
              onChange={(e) =>
                setQuestion({ ...question, CorrectAnswer: e.target.value })
              }
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="questionLevel">
            <Form.Label>Question Level</Form.Label>
            <Form.Control
              type="number"
              value={question.QuestionLevel}
              onChange={(e) =>
                setQuestion({ ...question, QuestionLevel: e.target.value })
              }
              required
              min="1"
              max="5"
            />
            {formErrors.QuestionLevel && (
              <span className="text-danger">{formErrors.QuestionLevel}</span>
            )}
          </Form.Group>

          <Form.Group controlId="language">
            <Form.Label>Language</Form.Label>
            <Form.Control
              as="select"
              value={question.Language}
              onChange={(e) =>
                setQuestion({ ...question, Language: e.target.value })
              }
            >
              {languages.map((language) => (
                <option key={language.SubjectId} value={language.SubjectName}>
                  {language.SubjectName}
                </option>
              ))}
            </Form.Control>
            {formErrors.Language && (
              <span className="text-danger">{formErrors.Language}</span>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AdminPage;
