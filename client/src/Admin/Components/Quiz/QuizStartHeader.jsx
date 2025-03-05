import React, { useState, useEffect } from 'react';

const QuizStartHeader = ({ quizData }) => {
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{quizData.name}</h1>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-600">Level: {quizData.level}</span>
        <span className="text-gray-600">Duration: {formatTime(timeLeft)}</span>
      </div>
      <div className="mt-2">
        <span className="text-gray-600">Start Date: {quizData.startDate}</span>
        <span className="text-gray-600 ml-4">Start Time: {quizData.startTime}</span>
      </div>
    </div>
  );
};

export default QuizStartHeader;