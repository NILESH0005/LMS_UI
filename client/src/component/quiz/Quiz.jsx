import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuizPalette from './QuizPalette';

const Quiz = () => {
  const location = useLocation();
  const quiz = location.state?.quiz || {};
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timer, setTimer] = useState({ hours: 1, minutes: 5, seconds: 55 });
  const [questionStatus, setQuestionStatus] = useState({});

  // Sample questions
  const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correctAnswer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars" },
  ];

  useEffect(() => {
    // Initialize selectedAnswers and questionStatus based on the number of questions
    const initialSelectedAnswers = Array(questions.length).fill(null);
    const initialQuestionStatus = questions.reduce((acc, _, index) => {
      acc[index + 1] = "not-visited";
      return acc;
    }, {});
    setSelectedAnswers(initialSelectedAnswers);
    setQuestionStatus(initialQuestionStatus);
  }, [questions.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              return prev;
            }
            hours -= 1;
            minutes = 59;
          } else {
            minutes -= 1;
          }
          seconds = 59;
        } else {
          seconds -= 1;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerClick = (selectedAnswer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setSelectedAnswers(newAnswers);
    setQuestionStatus((prev) => ({ ...prev, [currentQuestion + 1]: "answered" }));
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

  const handleMarkForReview = () => {
    setQuestionStatus((prev) => ({ ...prev, [currentQuestion + 1]: "marked" }));
    handleSkip();
  };

  const handleClearResponse = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = null;
    setSelectedAnswers(newAnswers);
    setQuestionStatus((prev) => ({ ...prev, [currentQuestion + 1]: "not-answered" }));
  };

  const handleInstantResult = () => {
    const correct = questions.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    alert(`Your instant result: ${correct} out of ${questions.length}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-medium text-center mb-6">User Interface for Quiz</h1>

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
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded" onClick={handleMarkForReview}>Mark for Review & Next</button>
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded" onClick={handleClearResponse}>Clear Response</button>
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded" onClick={handleInstantResult}>Instant Result</button>
              </div>
              <button className="px-4 py-2 bg-blue-700 text-white rounded" onClick={handleSaveAndNext}>Save & Next</button>
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