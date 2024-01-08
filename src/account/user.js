import React, { useContext,useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

import "./user.css";

const UserHome = () => {
  const [userTests, setUserTests] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const context = useContext(UserContext);

  useEffect(() => {
    // Fetch user details and test data from API
    const fetchData = async () => {
      const response = await fetch("/api/user/tests");
      const data = await response.json();
      setUserTests(data);
      setLoaded(true);
    };
    fetchData();
  }, []);
  if (!context.user?.uid) {
    return <Navigate to="/signin" />;
  }
  return (
    <Container className="about-container">
      <Row className="m-0">
        <Col>
          <div className="user-content">
            <h1>User Details</h1>
            {/* User details can be fetched and displayed here */}
            <h2>Test History</h2>
            {!loaded ? (
              <div>Loading...</div>
            ) : (
              <Table striped>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Test Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {userTests.map((test, index) => (
                    <tr key={index}>
                      <td>{test.date}</td>
                      <td>{test.name}</td>
                      <td>{test.score}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserHome;
