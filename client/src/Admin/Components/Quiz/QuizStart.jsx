import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import QuizStartHeader from "./QuizStartHeader";
import QuizQuestions from "./QuizQuestions";
import QuizMapping from "./QuizMapping";

const QuizStart = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <h1 className="text-2xl font-bold text-gray-800">
            {quizData?.name || "General Knowledge Quiz"}
          </h1>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="w-full flex justify-center mt-8 px-4">
        <div className="w-full max-w-6xl">
          {/* Quiz Header */}
          <QuizStartHeader quizData={quizData} />

          {/* Quiz Introduction Card */}
          {!isQuizStarted && (
            <div className="bg-gray-50 shadow-lg p-8 mt-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome to the Quiz!
              </h2>
              <p className="text-gray-600 mt-2">
                Read the instructions carefully and click the button below to start.
              </p>
              <button
                onClick={handleStartQuiz}
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Quiz
              </button>
            </div>
          )}

          {/* Quiz Content */}
          {isQuizStarted && (
            <div className="flex flex-col mt-6">
              <QuizQuestions />
              <QuizMapping />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizStart;