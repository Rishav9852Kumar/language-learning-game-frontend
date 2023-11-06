import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { PlayerContext } from "../context/playerContext.js";
import { Navigate } from "react-router-dom";

const User = () => {
  const context = useContext(UserContext);
  const playerContext = useContext(PlayerContext);
  // Check if context.user is null or undefined
  
 if (!context.user?.uid) {
   return <Navigate to="/signin" />;
 }
 if(!playerContext.player?.gameUid){
   return <Navigate to="/signin" />;
  }
  const name = playerContext.player.name | "guest";
  const email = context.user.email;
  const gameUid = playerContext.player.gameUid | "user not logged in ";
  console.log(name);
  // Now you can safely access the user's name   
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Email: {email}</p>
      <p>User GameID: {gameUid}</p>
    </div>
  );
};

export default User;
