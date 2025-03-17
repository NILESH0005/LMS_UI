import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const QuizResult = ({ score, totalQuestions, timeTaken, onRetry, onExit }) => {
  const [showResult, setShowResult] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  useEffect(() => {
    setTimeout(() => setShowResult(true), 500);
  }, []);

  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent! 🏆";
    if (percentage >= 50) return "Great job! Keep Practicing!";
    return "Don't give up! Try again!";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {percentage >= 80 && <Confetti />}
      <button onClick={() => setShowResult(!showResult)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
        Show Result
      </button>

      {showResult && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md text-center"
        >
          <h2 className="text-xl font-bold mb-2">Your Score & Performance Summary</h2>
          <div className="text-4xl font-bold mb-4">{percentage}%</div>
          <p className="text-lg font-semibold">Your Score: {score} / {totalQuestions}</p>
          <p className="text-gray-700">Time Taken: {timeTaken} seconds</p>
          <p className="text-xl font-medium mt-2">{getPerformanceMessage()}</p>

          <div className="mt-4 flex justify-between">
            <button onClick={onRetry} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Retry Quiz
            </button>
            <button onClick={onExit} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
              Exit
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizResult;
