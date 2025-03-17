import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizTimer from "./QuizTimer"; // Import QuizTimer component

const QuizHeader = ({ startTimer, isTimerRunning }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure quizData is not undefined
  const quizData = location.state?.quizData || {
    name: "Default Quiz",
    level: "N/A",
    duration: 5,
  };

  const currentQuestion = 3;
  const totalQuestions = 10;

  // Handle missing quizData (e.g., page refresh)
  if (!location.state?.quizData) {
    console.warn("Quiz data is missing! Redirecting to the quiz selection page...");
    navigate("/quiz-selection"); // Change this to your quiz selection page
  }

  return (
    <div className="w-full max-w-4xl bg-blue-500 text-white rounded-xl shadow-lg p-6 text-center">
      <h1 className="text-3xl font-bold">{quizData.name}</h1>
      <p className="text-lg mt-2">Level: {quizData.level} | Duration: {quizData.duration} min</p>
      <p className="text-sm mt-1">
        Start: {quizData.startDate} {quizData.startTime} | End: {quizData.endDate} {quizData.endTime}
      </p>
      <p className="mt-2">{quizData.negativeMarking ? "Negative Marking: Enabled" : "Negative Marking: Disabled"}</p>
    </div>
  );
};

export default QuizHeader;
