import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuizPalette from './QuizPalette';

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

  // Timer state
  const [timer, setTimer] = useState({
    hours: 1,
    minutes: 5,
    seconds: 55,
  });

  // Question palette state - simulating answered/unanswered questions
  const [questionStatus, setQuestionStatus] = useState({
    1: "answered",
    2: "answered",
    3: "answered",
    4: "answered",
    5: "not-answered",
    6: "answered",
    7: "answered",
    8: "answered",
    9: "answered",
    10: "marked",
    11: "marked",
    12: "current",
    // Rest are not visited
  });

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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <QuizHeader />

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-medium text-center mb-6">VI Practice Test</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main test area - 3/4 width on large screens */}
          <div className="lg:col-span-3 border border-gray-300 rounded-md">
            {/* Question header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-300">
              <div className="text-gray-700">Question No. {currentQuestion + 1}</div>
              <div className="flex flex-wrap gap-4 items-center">
              
                <div className="flex items-center gap-2">
                  <span>Right mark:</span>
                  <span className="text-green-600 font-medium">1.00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Negative mark:</span>
                  <span className="text-red-600 font-medium">0.00</span>
                </div>
              </div>
            </div>

            {/* Question content */}
            <div className="p-6 border-b border-gray-300">
              <p className="text-lg mb-6">{questions[currentQuestion].question}</p>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswers[currentQuestion] === option}
                      onChange={() => handleAnswerClick(option)}
                      className="w-4 h-4"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between p-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded">Mark for Review & Next</button>
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded">Clear Response</button>
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded">Instant Result</button>
              </div>
              <button className="px-4 py-2 bg-blue-700 text-white rounded">Save & Next</button>
            </div>
          </div>

          {/* Sidebar - 1/4 width on large screens */}
          <QuizPalette
            questionStatus={questionStatus}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            timer={timer}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;