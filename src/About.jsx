import React from 'react';

const About = () => {
return (
<div className="about-container" style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '8px' }}>
     <h1>About the Quiz App</h1>
     <p>
     Welcome to the Quiz App! This app is designed to help you improve your knowledge across various topics through fun and engaging quizzes.
     </p>
     <h3>Features</h3>
     <ul>
     <li>Multiple categories of quizzes</li>
     <li>Timer-based questions for added challenge</li>
     <li>Track your scores and progress</li>
     <li>Friendly user interface</li>
     </ul>
     <h3>How to Play</h3>
     <p>
     1. Select your quiz category from the main menu.
     </p>
     <p>
     2. Start the quiz, answer each question, and get your score at the end.
     </p>
     <p>
     3. You can challenge yourself to improve your score with each attempt!
     </p>
     <h3>Contact</h3>
     <p>
     If you have any questions or feedback, feel free to reach out at <strong>support@quizapp.com</strong>.
     </p>
     <style jsx>{`
     .about-container {
     padding: 20px;
     background-color: #f9f9f9;
     border-radius: 8px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     max-width: 600px;
     margin: 0 auto;
     font-family: 'Arial', sans-serif;
     }

     h1 {
     color: #333;
     font-size: 2rem;
     }

     h3 {
     color: #555;
     font-size: 1.5rem;
     margin-top: 20px;
     }

     p {
     color: #666;
     font-size: 1rem;
     line-height: 1.6;
     }

     ul {
     list-style-type: disc;
     margin-left: 20px;
     }

     strong {
     font-weight: bold;
     }
     `}</style>
</div>
);
};

export default About;
