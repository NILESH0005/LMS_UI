import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuizHeader from './QuizHeader';

const Quiz = () => {
  const location = useLocation();
  const quiz = location.state?.quiz || {};
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(2).fill(null)); // Stores selected answers

  // Sample questions
  const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correctAnswer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
  ];

  const handleAnswerClick = (selectedAnswer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setSelectedAnswers(newAnswers);
  };

  const handleSaveAndNext = () => {
    if (selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100 text-white p-6">
      <QuizHeader />
      {showScore ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center text-black">
          <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl">Your score: {score} out of {questions.length}</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full text-black">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>

          <div className="flex flex-col w-full">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer ${
                  selectedAnswers[currentQuestion] === option ? "bg-green-200 border-green-500" : "bg-white/5 border-white/10"
                } rounded-xl`}
                onClick={() => handleAnswerClick(option)}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={selectedAnswers[currentQuestion] === option}
                  readOnly
                />
                <p className="ml-6 text-DGXblack">{option}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className="bg-DGXblue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              onClick={handleSaveAndNext}
              disabled={!selectedAnswers[currentQuestion]}
            >
              Save & Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
