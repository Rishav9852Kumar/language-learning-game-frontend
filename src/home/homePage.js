import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const HomePage = () => {
  const context = useContext(UserContext);
  const user = context.user;

  return (
    <div>
      <h1>Welcome to the HomePage, { "Guest"}!</h1>
    </div>
  );
};

export default HomePage;





