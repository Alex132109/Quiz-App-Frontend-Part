     import React, { useState } from "react";
     import "./QuizPage.css"; // external CSS

     const QuizPage = ({ questions, onFinish }) => {
     const [current, setCurrent] = useState(0);
     const [answers, setAnswers] = useState({});

     if (!questions || questions.length === 0) {
     return <p className="loading">Loading questions...</p>;
     }

     const handleAnswer = (option) => {
     setAnswers({ ...answers, [questions[current].id]: option });
     };

     const nextQuestion = () => {
     if (current < questions.length - 1) {
          setCurrent(current + 1);
     } else {
          onFinish(answers);
     }
     };

     const question = questions[current];

     return (
     <div className="quiz-container">
          <h2 className="quiz-header">
          Question {current + 1} of {questions.length}
          </h2>
          <p className="quiz-question">{question.questionTitle}</p>

          {/* Options */}
          <div className="options-container">
          {[question.option1, question.option2, question.option3, question.option4].map(
               (opt, index) => (
               <button
               key={index}
               onClick={() => handleAnswer(opt)}
               className={`option-btn ${
                    answers[question.id] === opt ? "selected" : ""
               }`}
               >
               {opt}
               </button>
               )
          )}
          </div>

          <div className="button-container">
          <button onClick={nextQuestion} className="next-btn">
               {current < questions.length - 1 ? "Next" : "Finish"}
          </button>
          </div>
     </div>
     );
     };

     export default QuizPage;
