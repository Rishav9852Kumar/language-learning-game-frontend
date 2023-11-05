import React, { useState, useEffect } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Overall"); // Default category
  const [players, setPlayers] = useState([]); // Initial empty player list

  const categories = ["Overall", "Easy", "Medium", "Hard"]; // Add more categories as needed

  // Simulate fetching player data from an API (you can replace this with your actual API call)
  useEffect(() => {
    // Simulate an API call to get the list of players based on the selected category
    // Replace this with your actual API endpoint
    const fetchPlayers = async () => {
      // Example API endpoint (replace with your actual endpoint)
      const apiUrl = `/api/players?category=${selectedCategory}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
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
          Category: {selectedCategory}
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
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderBoard;
