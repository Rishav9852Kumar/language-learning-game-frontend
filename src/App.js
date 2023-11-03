import React ,{useState} from 'react';
import './App.css';
import { userContext } from "./context/userContext";

//firebase stuff
import { initializeApp } from "firebase/app";
// react-router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//toast stuff
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages
import HomePage from "./home/homePage";
import SignIn from "./account/signIn.js";
import SignUp from "./account/signUp.js";
import PageNotFound from "./utils/pageNotFound";

const firebaseConfig = {
  apiKey: "AIzaSyC37R05nqLbthBkll7-vh_FYe3iR7koqOg",
  authDomain: "language-learning-game-auth.firebaseapp.com",
  projectId: "language-learning-game-auth",
  storageBucket: "language-learning-game-auth.appspot.com",
  messagingSenderId: "1061857104452",
  appId: "1:1061857104452:web:0b2af7f961bf31e59c2211",
  measurementId: "G-ZJBH8E0SJ7",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <Router>
      <ToastContainer />
      <userContext.Provider value={{ user, setUser }}>
        
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
       
      </userContext.Provider>
    </Router>
  );
}

export default App;
