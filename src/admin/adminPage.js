import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./AdminPage.css"; // Import your CSS file
//import AccessDenied from "./accessDenied ";

const AdminPage = () => {
  const [question, setQuestion] = useState({
    Question: "",
    OptionA: "",
    OptionB: "",
    OptionC: "",
    OptionD: "",
    CorrectAnswer: "",
    QuestionLevel: 1, // Default to 1
    Language: "English",
  });

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    // Fetch total users and total questions from your API
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the QuestionLevel is an integer in the range of 1 to 5
    const selectedLevel = parseInt(question.QuestionLevel);
    if (!isNaN(selectedLevel) && selectedLevel >= 1 && selectedLevel <= 5) {
      // Send the question data to your API endpoint using fetch or Axios
      const apiUrl = "/api/addQuestion"; // Replace with your actual API endpoint

      // Make a POST request to the API to add the question
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the API response here (e.g., show a success message)
          console.log("Question added successfully:", data);
        })
        .catch((error) => {
          console.error("Error adding question:", error);
        });
    } else {
      alert("Question level must be an integer in the range of 1 to 5.");
    }
  };
// const { user } = useContext(UserContext);

// if (!user.isadmin) {
//   return <AccessDenied />;
// }
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
          {/* Form fields for question details */}
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
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              {/* Add more language options as needed */}
            </Form.Control>
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
