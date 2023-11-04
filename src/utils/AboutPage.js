import React from "react";
import "./AboutPage.css";
import techStackLogo from "../gallery/tech-stack-logo.png";
import yourImage from "../gallery/my-image.png";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-content-left">
          <h1 className="about-heading">About Our Language Learning Game</h1>
          <p className="about-description">
            Welcome to our language learning game! Our game is designed to help
            you improve your language skills while having fun.
          </p>
          <h2 className="about-subheading">How to Play</h2>
          <p className="about-description">
            Playing our game is easy. Just follow these steps:
          </p>
          <ul className="about-list">
            <li>Choose a language you want to learn.</li>
            <li>Answer quiz questions to test your knowledge.</li>
            <li>Earn points and progress to higher levels.</li>
          </ul>
          <h2 className="about-subheading">Tools and Technologies</h2>
          <p className="about-description">
            Our game is built using the following tools and technologies:
          </p>
          <img
            src={techStackLogo}
            alt="Tech Stack Logo"
            className="tech-stack-logo"
          />
        </div>
        <div className="about-content-right">
          <img src={yourImage} alt="Your" className="your-image" />
          <h2 className="about-subheading">About the Developer</h2>
          <p className="about-description">
            Hi, I'm [Your Name], the developer of this game. If you have any
            questions or feedback, please feel free to contact me:
          </p>
          <p className="about-contact-info">Email: contact@yourwebsite.com</p>
          <h2 className="about-subheading">GitHub Repositories</h2>
          <p className="about-description">
            You can find the source code for our game on GitHub:
          </p>
          <ul className="about-list">
            <li>
              <a href="https://github.com/Rishav9852Kumar/language-learning-game-frontend">
                Front-End Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/Rishav9852Kumar/language-learning-game-backend">
                Back-End Repository
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1BUg_SBSai1kVxAXy0H6Ys6P2cfXB-R7k/view?usp=drive_link">
                Documentation Repository
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
