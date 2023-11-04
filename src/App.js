import React ,{useState} from 'react';
import './App.css';
import { userContext } from "./context/userContext";

// react-router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//toast stuff
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import HomePage from "./home/homePage.js";
import SignIn from "./account/signIn.js";
import SignUp from "./account/signUp.js";
import PageNotFound from "./utils/pageNotFound.js";
import Footer from "./footer/footer.js";
import Header from "./header/header.js";
import AdminPage from "./admin/adminPage.js";
import User from "./account/user.js";
import LeaderBoard from "./account/leaderBoard.js";

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <Router>
      <ToastContainer />
      <userContext.Provider value={{ user, setUser, userId, setUserId, isAdmin, setIsAdmin }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/user/admin" element={<AdminPage />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/user/leaderboard" element={<LeaderBoard />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </userContext.Provider>
    </Router>
  );
}

export default App;
