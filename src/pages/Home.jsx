import React, { useState, useEffect } from "react";
import "./Home.css";

const typingWords = [" Aniket", " a Developer", " a Problem Solver", " an Ethical Hacker"];

const Home = () => {
  const [text, setText] = useState(""); // Dynamic text
  const [index, setIndex] = useState(0); // Current word index
  const [isTyping, setIsTyping] = useState(true); // Typing or erasing
  const [speed, setSpeed] = useState(100); // Typing/erasing speed

  useEffect(() => {
    const currentWord = typingWords[index];
    let timer;

    if (isTyping) {
      // Typing effect
      if (text.length < currentWord.length) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, speed); // Typing speed
      } else {
        // Pause after typing the word
        setSpeed(50); // Pause duration
        timer = setTimeout(() => {
          setIsTyping(false);
          setSpeed(50); // Reset to erasing speed
        }, 1500); // Wait before erasing
      }
    } else {
      // Erasing effect
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, speed); // Erasing speed
      } else {
        // Move to the next word after erasing
        setSpeed(50); // Reset to typing speed
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % typingWords.length); // Loop back to the first word
      }
    }

    return () => clearTimeout(timer); // Cleanup timeout
  }, [text, isTyping, index, speed]);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-typing-wrapper">
          <h1 className="hero-title">
            <span className="text-container">
              <span className="static-text">Hi, I am</span>
              <span className="highlight">{text}</span>
            </span>
          </h1>
          <p className="hero-subtitle">A Passionate Developer & Innovator 🚀</p>
        </div>
        <a href="#about" className="cta-button">Know More About Me</a>
      </section>
      {/* About Summary */}
      <section id="about" className="about-section">
        <h2>About Me</h2>
        <p>
          I’m an aspiring software developer with a deep passion for <b>web development</b>,
          <b>ethical hacking</b>, and <b>data structures & algorithms</b>. Always curious to explore new
          technologies and solve challenging problems, I strive to build efficient and innovative solutions.
        </p>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2>What I Do</h2>
        <div className="skills-container">
          <div className="skill-card">
            <h3>Web Development</h3>
            <p>Creating stunning, responsive websites with React, JavaScript, and CSS.</p>
          </div>
          <div className="skill-card">
            <h3>Ethical Hacking</h3>
            <p>Ensuring system security with penetration testing and ethical practices.</p>
          </div>
          <div className="skill-card">
            <h3>Problem Solving</h3>
            <p>Solving complex problems with DSA and analytical thinking.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
