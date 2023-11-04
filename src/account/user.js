import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

const User = () => {
  const context = useContext(UserContext);

  // Check if context.user is null or undefined
 if (!context.user?.uid) {
   return <Navigate to="/signin" />;
 }

  // Now you can safely access the user's name   
  return (
    <div>
      <h1>Hello, {context.user.name}</h1>
      <p>Email: {context.user.email}</p>
      <p>User ID: {context.user.gameUid}</p>
    </div>
  );
};

export default User;
