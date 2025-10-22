import React, { useState, useEffect } from "react";
import QuizPage from "./QuizPage";  // Importing QuizPage component
import ResultPage from "./ResultPage";  // Importing ResultPage component

function QuizApp() {
const [step, setStep] = useState(1); // 1 = setup, 2 = quiz, 3 = result
const [numQ, setNumQ] = useState(5);
const [subject, setSubject] = useState("Java");
const [shuffle, setShuffle] = useState(false);
const [questions, setQuestions] = useState([]);
const [timeLeft, setTimeLeft] = useState(60); // seconds
const [answers, setAnswers] = useState({});
const [quizId, setQuizId] = useState(null);

// Step 1: Create quiz and fetch questions
const startQuiz = async () => {
try {
     const createRes = await fetch(
     `http://localhost:8080/quiz/create?category=${subject}&numQ=${numQ}&title=${subject}-quiz`,
     { method: "POST" }
     );
     const quizId = await createRes.json();
     setQuizId(quizId); // Save quizId

     // Fetch quiz questions using the quizId
     const getRes = await fetch(`http://localhost:8080/quiz/get?id=${quizId}`);
     const data = await getRes.json();

     let selected = data || [];
     if (shuffle) selected = selected.sort(() => Math.random() - 0.5);

     setQuestions(selected);
     setStep(2);
     setTimeLeft(numQ * 30); // 30 sec per question
} catch (error) {
     console.error("Error starting quiz:", error);
}
};

// Timer
useEffect(() => {
if (step === 2 && timeLeft > 0) {
     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
     return () => clearInterval(timer);
}
if (step === 2 && timeLeft === 0) handleFinish(answers);
}, [step, timeLeft]);

// When quiz finishes
const handleFinish = (userAnswers) => {
setAnswers(userAnswers);
setStep(3);
};

// Reset to setup
const handleRestart = () => {
setStep(1);
setAnswers({});
setQuestions([]);
setQuizId(null);
setTimeLeft(60);
};

return (
<div className="quiz-app p-6">
     {step === 1 && (
     <div className="setup-container max-w-md mx-auto space-y-4">
     <h1 className="text-2xl font-bold">Create Your Quiz</h1>

     <div>
          <label>Number of Questions:</label>
          <input
          type="number"
          value={numQ}
          onChange={(e) => setNumQ(e.target.value)}
          className="border bg-black text-white p-2 mb-4 w-full"
          />
     </div>

     <div>
          <label>Subject:</label>
          <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 mb-4 bg-black text-white w-full"
          />
     </div>

     <div>
          <input
          type="checkbox"
          checked={shuffle}
          onChange={() => setShuffle(!shuffle)}
          />
          <span className="ml-2">Shuffle Questions</span>
     </div>

     <button
          onClick={startQuiz}
          className="px-4 py-2 bg-black text-white rounded"
     >
          Start Quiz →
     </button>
     </div>
     )}

     {step === 2 && (
     <div>
     {/* Timer Bar */}
     <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">⏳ {timeLeft}s left</span>
          <button
          onClick={() => handleFinish(answers)}
          className="px-3 py-1 bg-white text-black rounded"
          >
          Submit
          </button>
     </div>

     <QuizPage
          questions={questions}
          onFinish={handleFinish}
     />
     </div>
     )}

     {step === 3 && (
     <ResultPage
     questions={questions}
     answers={answers}
     onRestart={handleRestart}
     />
     )}
</div>
);
}

export default QuizApp;
