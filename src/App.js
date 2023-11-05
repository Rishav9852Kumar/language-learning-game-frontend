import React ,{useState} from 'react';
import './App.css';
import { UserContext } from "./context/userContext.js";
import { PlayerContext } from "./context/playerContext.js";
import { app } from "./config/firebase-config.js";
import { getAuth } from "firebase/auth";

// react-router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//toast stuff
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import HomePage from "./home/homePage.js";
import SignIn from "./account/signIn.js";
import SignUp from "./account/signUp.js";
import PageNotFound from "./utils/NotFound.js";
import Footer from "./footer/footer.js";
import Header from "./header/header.js";
import AdminPage from "./admin/adminPage.js";
import User from "./account/user.js";
import LeaderBoard from "./account/leaderBoard.js";
import AboutPage from "./utils/AboutPage.js";

function App() {
  const [user, setUser] = useState(null);
  const [player, setPlayer] = useState(null);

  getAuth(app);
  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser}}>
      <PlayerContext.Provider value={{ player, setPlayer }}>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/user/admin" element={<AdminPage />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/user/leaderboard" element={<LeaderBoard />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </PlayerContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
