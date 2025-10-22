import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
const { category } = useParams(); // Get category from URL
const [questions, setQuestions] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch(`http://localhost:8080/question/search/${category}`)
     .then((res) => res.json())
     .then((data) => {
     setQuestions(data);
     setLoading(false);
     })
     .catch(() => setLoading(false));
}, [category]);

if (loading) return <p>Loading...</p>;

return (
<div className="p-6">
     <h2 className="text-2xl font-bold mb-4">Search Results for "{category}"</h2>
     {questions.length === 0 ? (
     <p>No results found</p>
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
};

export default SearchResults;
