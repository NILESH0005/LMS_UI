import React, { useState } from "react";
import QuizStartHeader from "./QuizStartHeader";
import QuizTable from "./QuizTable.jsx";
import QuizQuestions from "./QuizQuestions";
import QuizResult from "./QuizResult";
import QuizReview from "./QuizReview";
import QuizTimer from "./QuizTimer";

const QuizStart = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Function to start the timer
  const startTimer = () => {
    setIsTimerRunning(true);
  };

  return (
    <>
      {/* Pass isTimerRunning and startTimer to QuizStartHeader */}
      <QuizStartHeader startTimer={startTimer} isTimerRunning={isTimerRunning} />
      
      <QuizQuestions />
      <QuizResult />
      <QuizReview />


      {/* Start Quiz Button (Moved here)                                  IMPORTANT CODE
      <div className="flex justify-center mt-4">
        <button
          onClick={startTimer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Start Quiz
        </button>
      </div> */}

     
    </>
  );
};

export default QuizStart;
