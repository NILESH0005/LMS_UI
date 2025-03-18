import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import QuizStartHeader from "./QuizStartHeader";
import QuizQuestions from "./QuizQuestions";
import QuizResults from "./QuizResults";

const QuizStart = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  

  const quizTitle = quizData?.title || "General Knowledge Quiz";
  const startTime = "10:00 AM";
  const endTime = "11:00 AM";
  const isNegativeMarkingEnabled = quizData?.negativeMarking || false;

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="w-full bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-2">
        <h1 className="text-2xl font-bold text-gray-800">{quizTitle}</h1>


        </div>
      </nav>

      <div className="w-full flex flex-col items-center mt-8">
        <div className="w-full max-w-6xl px-4">
          <h1 className="text-4xl font-extrabold text-gray-800">{quizTitle}</h1>
          <div className="mt-4 flex flex-col space-y-2 text-gray-600">
            <p>
              <span className="font-semibold">Start Time:</span> {startTime}
            </p>
            <p>
              <span className="font-semibold">End Time:</span> {endTime}
            </p>
            <p>
              <span className="font-semibold">Negative Marking:</span>{" "}
              {isNegativeMarkingEnabled ? (
                <span className="text-green-600">Enabled</span>
              ) : (
                <span className="text-red-600">Disabled</span>
              )}
            </p>
          </div>
        </div>

        {/* Quiz Introduction Card */}
        {!isQuizStarted && (
          <div className="w-full max-w-6xl bg-gray-50 rounded-xl shadow-lg p-8 mt-6 mx-4">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to the Quiz!</h2>
            <p className="text-gray-600 mt-2">
              Read the instructions carefully and click the button below to start.
            </p>
            <button
              onClick={handleStartQuiz}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* Quiz Content */}
        {isQuizStarted && (
          <div className="w-full max-w-6xl flex flex-col items-center mt-6 px-4">
            <QuizQuestions />
            <QuizResults />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizStart;