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
