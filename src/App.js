import React ,{useState} from 'react';
import './App.css';
import { UserContext } from "./context/userContext.js";
import { initializeApp } from "firebase/app";
//import { config } from "dotenv";

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

//config(); // Load environment variables from .env file
const firebaseConfig = {
  apiKey: "AIzaSyC37R05nqLbthBkll7-vh_FYe3iR7koqOg",
  authDomain: "language-learning-game-auth.firebaseapp.com",
  projectId: "language-learning-game-auth",
  storageBucket: "language-learning-game-auth.appspot.com",
  messagingSenderId: "1061857104452",
  appId: "1:1061857104452:web:0b2af7f961bf31e59c2211",
  measurementId: "G-ZJBH8E0SJ7",
};
initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser, userId, setUserId, isAdmin, setIsAdmin }}>
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
      </UserContext.Provider>
    </Router>
  );
}

export default App;
