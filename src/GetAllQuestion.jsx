import React, { useEffect, useState } from "react";
import axios from "axios";

function QuestionList() {
const [questions, setQuestions] = useState([]);

useEffect(() => {
axios.get("http://localhost:8080/question/allQuestion")
     .then(res => {
     setQuestions(res.data); // response is array of questions
     })
     .catch(err => {
     console.error("Error fetching questions:", err);
     });
}, []);

return (
<div className="p-6">
     <h2 className="text-2xl font-bold mb-4">Quiz Questions</h2>
     {questions.length === 0 ? (
     <p>No questions available</p>
     ) : (
     questions.map((q, index) => (
     <div key={q.id} className="mb-6 p-4 border rounded shadow">
          <h3 className="text-lg font-semibold">
          {index + 1}. {q.questionTitle}
          </h3>
          <ul className="mt-2 space-y-2">
          <li className="p-2 border rounded hover:bg-gray-100 cursor-pointer">{q.option1}</li>
          <li className="p-2 border rounded hover:bg-gray-100 cursor-pointer">{q.option2}</li>
          <li className="p-2 border rounded hover:bg-gray-100 cursor-pointer">{q.option3}</li>
          <li className="p-2 border rounded hover:bg-gray-100 cursor-pointer">{q.option4}</li>
          </ul>

          <div className="mt-2 text-sm text-gray-600">
          <p><strong>Difficulty:</strong> {q.difficultyLevel}</p>
          <p><strong>Category:</strong> {q.category}</p>
          </div>
     </div>
     ))
     )}
</div>
);
}

export default QuestionList;
