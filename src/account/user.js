import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

const User = () => {
  const context = useContext(UserContext);

  // Check if context.user is null or undefined
 if (!context.user?.uid) {
   return <Navigate to="/signin" />;
 }
  console.log(context);
  console.log(context.user);
  console.log(context.user.uid);
  const name = context.user.name || "guest";
  const email = context.user.email;
  const user_Id = context.user.uid;
  // Now you can safely access the user's name   
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Email: {email}</p>
      <p>User ID: {user_Id}</p>
    </div>
  );
};

export default User;
