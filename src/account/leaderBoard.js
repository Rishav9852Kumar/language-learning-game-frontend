import React, { useState, useEffect } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState("English");
  const [players, setPlayers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetching available languages from the API
    fetch(
      "https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/languages"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Languages:", data);
        setCategories(data.map((language) => language.SubjectName));
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });

    // Fetching the list of players based on the selected language(category from my dropdown)
    console.log("Selected Category:", selectedCategory);
    const fetchPlayers = async () => {
      const apiUrl = `https://language-learning-game-backend.rishavkumaraug20005212.workers.dev/leaderboard?subjectName=${selectedCategory}`;
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log("Players data:", data);
          setPlayers(data);
        } else {
          console.error("Failed to fetch player data");
        }
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
            <th>Player id </th>
            <th>Score</th>
            <th>Exercise Completed</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>{player.UserId}</td>
              <td>{player.SubjectScore}</td>
              <td>{player.ExercisesCompleted}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderBoard;
