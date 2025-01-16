import React, { useState } from 'react';

const Quiz = () => {
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(null);
  const questions = [
    { id: 1, question: "What is 2 + 2?", options: [2, 3, 4, 5], correct: 4 },
    { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
    // Add more questions as needed
  ];

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q) => {
      if (responses[q.id] == q.correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  return (
    <div className="p-4 bg-DGXwhite text-DGXblack max-w-lg mx-auto my-4 rounded shadow-lg">
      <h1 className="text-2xl font-bold text-DGXblue mb-4">Quiz</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p className="mb-2">{q.question}</p>
          {q.options.map((option, index) => (
            <div key={index} className="flex items-center mb-1">
              <input
                type="radio"
                id={`${q.id}-${index}`}
                name={`question-${q.id}`}
                value={option}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="mr-2"
              />
              <label htmlFor={`${q.id}-${index}`} className="ml-2">{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button className="bg-DGXgreen text-DGXwhite p-2 mt-4 rounded hover:bg-green-700" onClick={handleSubmit}>
        Submit
      </button>
      {score !== null && (
        <p className="mt-4 text-DGXblue">Your score is: {score} / {questions.length}</p>
      )}
    </div>
  );
};

export default Quiz;
