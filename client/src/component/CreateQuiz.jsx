import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const CreateQuiz = ({ onBack }) => {
  const [quizData, setQuizData] = useState({
    name: "",
    level: "Easy",
    duration: 30,
    negativeMarking: false,
    startDate: "",
    endDate: "",
    type: "Public",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData({
      ...quizData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Quiz Data Submitted:", quizData);
    fetch("/api/create-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600">Quiz Details</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Quiz Name</label>
          <input
            type="text"
            name="name"
            value={quizData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter quiz name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Select Quiz Level</label>
          <select
            name="level"
            value={quizData.level}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Quiz Time (minutes): {quizData.duration}
          </label>
          <input
            type="range"
            name="duration"
            min="5"
            max="180"
            value={quizData.duration}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="negativeMarking"
            checked={quizData.negativeMarking}
            onChange={handleChange}
            className="h-5 w-5"
          />
          <label className="text-gray-700 font-medium">Enable Negative Marking</label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <FaCalendarAlt /> Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={quizData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium flex items-center gap-2">
              <FaCalendarAlt /> End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={quizData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Select Quiz Type</label>
          <select
            name="type"
            value={quizData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Quiz
        </button>
      </form>

      {/* 🟢 Go Back Button */}
      <button
        onClick={onBack}
        className="mt-4 w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default CreateQuiz;
