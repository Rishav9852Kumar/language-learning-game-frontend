import React, { useState, useEffect } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState("English"); 
  const [players, setPlayers] = useState([]); 

  const categories = ["English", "Deutsch", "French", "Spanish"]; 

  useEffect(() => {
    // Simulate an API call to get the list of players based on the selected category
    const fetchPlayers = async () => {
      const apiUrl =
        `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/leaderboard?subjectName=${selectedCategory}`;
      try {
       fetch(apiUrl, {
         method: "GET",
         headers: {
           "X-RapidAPI-Key": "your-api-key",
           "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
         },
       })
         .then((response) => response.json())
         .then((data) => {
           setPlayers(data);
           console.log(data);
         })
         .catch((error) => console.log(error));
      } catch (error) {
        console.error("Error while fetching player data:", error);
      }
    };

    fetchPlayers();
  }, [selectedCategory]);

  return (
    <Container className="leaderboard-container my-5">
      <h1 className="leaderboard-heading">Leaderboard</h1>
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id="category-dropdown"
          className="category-dropdown"
        >
          Language: {selectedCategory}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Table striped bordered hover className="player-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.UserId}</td>
              <td>{player.SubjectScore}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderBoard;
