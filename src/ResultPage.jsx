     import React from "react";

     const ResultPage = ({ score, questions, answers, onRestart }) => {
     return (
     <div className="result-page max-w-md mx-auto p-6 bg-black text-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
          <p className="text-lg mb-4">
          ✅ You scored {score} out of {questions.length}
          </p>

          <div>
          {questions.map((q) => (
               <div key={q.id} className="mb-4">
               <h3 className="text-lg font-semibold">{q.questionTitle}</h3>
               <p className="text-sm">
               📝 Your Answer:{" "}
               <span
                    className={
                    answers[q.id]
                         ? "text-yellow-400"
                         : "text-gray-400"
                    }
               >
                    {q[answers[q.id]] || "Not Answered"}
               </span>
               </p>
               </div>
          ))}
          </div>

          <button
          onClick={onRestart}
          className="px-4 py-2 bg-white text-black rounded mt-4"
          >
          Restart Quiz
          </button>
     </div>
     );
     };

     export default ResultPage;
