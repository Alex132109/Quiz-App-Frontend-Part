import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import GetAllQuestion from "./GetAllQuestion";
import SearchResults from "./SearchResults";
import About from "./About";
import QuizPage from "./QuizPage";
import ResultPage from "./ResultPage";
import QuizApp from "./QuizApp";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(null);
  const [score, setScore] = useState(null);
  const [quizId, setQuizId] = useState(null);

  const navigate = useNavigate(); // ✅ for redirecting

  // Fetch quiz questions
  const startQuiz = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/quiz/get?id=${id}`);
      if (!res.ok) throw new Error("Quiz not found");
      const data = await res.json();

      setQuizId(id);
      setQuestions(data);
      setAnswers(null);
      setScore(null);

      navigate("/quiz"); // ✅ move to quiz page
    } catch (err) {
      console.error("Error fetching quiz questions:", err);
    }
  };

  // Submit answers
  const submitQuiz = async (userAnswers) => {
    try {
      const res = await fetch(`http://localhost:8080/quiz/submit/${quizId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers),
      });
      const result = await res.json();
      setAnswers(userAnswers);
      setScore(result);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center space-y-4">
                <h1 className="text-3xl font-bold">Home Page</h1>

              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/authmodal" element={<AuthModal />} />
          <Route path="/login" element={<h1 className="text-2xl font-semibold">Login Page</h1>} />
          <Route path="/getAllQuestions" element={<GetAllQuestion />} />
          <Route path="/search/:category" element={<SearchResults />} />
          <Route path="/QuizApp" element={<QuizApp />} />

          {/* Quiz flow */}
          <Route
            path="/quiz"
            element={
              score !== null ? (
                <ResultPage
                  questions={questions}
                  answers={answers}
                  score={score}
                  onRestart={() => startQuiz(quizId)}
                />
              ) : (
                <QuizPage
                  questions={questions}
                  onFinish={(userAnswers) => submitQuiz(userAnswers)}
                />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
