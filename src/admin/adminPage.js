import React, { useState } from "react";
import { Container, Form, Button, Badge } from "react-bootstrap";
import "./AdminPage.css";
import { toast } from "react-toastify";

const AdminPage = () => {
  const initialTestState = {
    testName: "",
    tag: "",
    department: "",
    level: "",
    file: null,
    emails: [],
  };

  const [test, setTest] = useState({ ...initialTestState });
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // File size validation
    if (test.file && test.file.size > 25000000) {
      alert("File size must be less than 25MB");
      return;
    }

    // Simulate API call here

    toast.success("API call successful!", {
      position: toast.POSITION.TOP_CENTER,
    });

    alert("Test added successfully!");
    setTest({ ...initialTestState }); // Reset the form
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTest({ ...test, [name]: value });
  };

  const handleFileChange = (event) => {
    setTest({ ...test, file: event.target.files[0] });
  };

  const handleAddEmail = () => {
    if (emailInput && !test.emails.includes(emailInput)) {
      setTest({ ...test, emails: [...test.emails, emailInput] });
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setTest({
      ...test,
      emails: test.emails.filter((email) => email !== emailToRemove),
    });
  };

  return (
    <div className="background">
      <Container className="admin-container my-5">
        <h1 className="admin-heading">Add a New Test</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="testName">
            <Form.Label>Test Name</Form.Label>
            <Form.Control
              type="text"
              name="testName"
              value={test.testName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="tag">
            <Form.Label>Tag</Form.Label>
            <Form.Control
              type="text"
              name="tag"
              value={test.tag}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={test.department}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="level">
            <Form.Label>Level</Form.Label>
            <Form.Control
              type="text"
              name="level"
              value={test.level}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="emails">
            <Form.Label>Emails</Form.Label>
            <Form.Control
              type="text"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddEmail}
              style={{ margin: "0.5rem 0" }}
            >
              Add email
            </Button>
            <div>
              {test.emails.map((email, index) => (
                <Badge variant="secondary" className="m-1" key={index}>
                  {email}
                  <span
                    onClick={() => handleRemoveEmail(email)}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  >
                    &times;
                  </span>
                </Badge>
              ))}
            </div>
          </Form.Group>

          <Form.Group controlId="file">
            <Form.Label>File Upload</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AdminPage;
