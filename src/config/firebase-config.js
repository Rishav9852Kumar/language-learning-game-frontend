import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const firebaseConfig = {
  apiKey: process.env["API_KEY"],
  authDomain: process.env["AUTH_DOMAIN"],
  projectId: process.env["PROJECT_ID"],
  storageBucket: process.env["STORAGE_BUCKET"],
  messagingSenderId: process.env["MESSAGING_SENDOR_ID"],
  appId: process.env["APP_ID"],
  measurementId: process.env["MEASUREMENT_ID"],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;