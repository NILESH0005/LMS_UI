import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const quiz = location.state?.quiz || {}; // Get quiz details
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Timer set to 60 seconds

  // Sample questions (Replace this with real questions for the quiz)
  const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correctAnswer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
  ];

  // Timer logic
  // useEffect(() => {
  //     if (timeLeft > 0 && !showScore) {
  //         const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //         return () => clearTimeout(timer);
  //     } else if (timeLeft === 0) {
  //         setShowScore(true);
  //     }
  // }, [timeLeft, showScore]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="flex border-2 border-DGXblue flex-col justify-center min-h-screen bg-gray-100 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-DGXblack">{quiz.title || "Quiz"}</h1>
      {showScore ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center text-black">
          <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
          <p className="text-xl">Your score: {score} out of {questions.length}</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full text-black">
          <div className="flex justify-between items-center mb-6">
            {/* <p className="text-lg">Time Left: {timeLeft} seconds</p> */}
            <p className="text-lg">Question {currentQuestion + 1} of {questions.length}</p>
          </div>
          <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>

          <div className="flex flex-col w-full">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
                onClick={() => handleAnswerClick(option)}
              >
                <input type="radio" className="w-6 h-6 bg-black" />
                <p className="ml-6 text-DGXblack">{option}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;