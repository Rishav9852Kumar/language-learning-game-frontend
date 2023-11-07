import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { PlayerContext } from "../context/playerContext";
import { Navigate } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
} from "reactstrap";
import "./user.css";

const User = () => {
  const context = useContext(UserContext);
  const playerContext = useContext(PlayerContext);

  const [userSubjects, setUserSubjects] = useState([]); // User's subjects data
  const [subjectList, setSubjectList] = useState([]); // Dropdown list of subjects
  const [selectedSubject, setSelectedSubject] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState({}); // Store the open/close state of each dropdown

  useEffect(() => {
    // Fetch user's subjects data
    if (playerContext.player && playerContext.player.gameUid) {
      fetch(
        `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/user/languages?userId=${playerContext.player.gameUid}`
      )
        .then((response) => response.json())
        .then((data) => {
          setUserSubjects(data);
        })
        .catch((error) => {
          console.error("Error fetching user subjects:", error);
        });
    }

    // Fetch the list of subjects for the dropdown
    fetch("subjectListApiEndpoint")
      .then((response) => response.json())
      .then((data) => {
        setSubjectList(data);
      })
      .catch((error) => {
        console.error("Error fetching subject list:", error);
      });
  }, [playerContext.player]);

  if (!context.user?.uid) {
    return <Navigate to="/signin" />;
  }
  if (!playerContext.player?.gameUid) {
    return <Navigate to="/signin" />;
  }

  const name = playerContext.player.name || "guest";
  const email = context.user.email;
  const gameUid = playerContext.player.gameUid || "user not logged in";

  const handleResetProgress = () => {
    // Add your logic for resetting progress here
  };

  const handleDeleteSubject = () => {
    // Add your logic for deleting a subject here
  };

  const handleAddSubject = () => {
    // Add your logic for adding a subject here
  };

  return (
    <Container fluid className="user-container">
      <div className="user-details">
        <h1 className="user-heading">Hello, {name}</h1>
        <p className="user-info">Email: {email}</p>
        <p className="user-info">User GameID: {gameUid}</p>
      </div>

      <Card className="user-card">
        <CardBody>
          <CardTitle className="user-card-title">Subject List</CardTitle>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Assignments Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userSubjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.SubjectName}</td>
                  <td>{subject.SubjectScore}</td>
                  <td>{subject.ExercisesCompleted}</td>
                  <td>
                    <Dropdown
                      isOpen={openDropdowns[subject.SubjectId] || false}
                      toggle={() =>
                        toggleDropdown(
                          subject.SubjectId,
                          !openDropdowns[subject.SubjectId]
                        )
                      }
                    >
                      <DropdownToggle caret>Actions</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={handleResetProgress}>
                          Reset Progress
                        </DropdownItem>
                        <DropdownItem onClick={handleDeleteSubject}>
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Input
            type="select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="subject-dropdown"
          >
            <option value="">Select a Subject</option>
            {subjectList.map((subject, index) => (
              <option key={index} value={subject.SubjectName}>
                {subject.SubjectName}
              </option>
            ))}
          </Input>
          <Button
            color="primary"
            className="add-subject-button"
            onClick={handleAddSubject}
          >
            Add Subject
          </Button>
        </CardBody>
      </Card>
    </Container>
  );

  function toggleDropdown(subjectId, isOpen) {
    setOpenDropdowns({
      ...openDropdowns,
      [subjectId]: isOpen,
    });
  }
};

export default User;
