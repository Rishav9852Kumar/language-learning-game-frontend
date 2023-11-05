import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { config } from 'dotenv';

// config(); // Load environment variables from .env file

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
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
export {app};
// const auth = getAuth(app);
// export { app, auth };
