import React, { useState } from "react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateQuiz = ({ onBack }) => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({ name: "", level: "Medium", duration: 30 });
  const [errors, setErrors] = useState({});

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return { currentDate: `${year}-${month}-${day}`, currentTime: `${hours}:${minutes}` };
  };

  const { currentDate, currentTime } = getCurrentDateTime();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value.trim() === "" }));
  };

  const handleCreateQuiz = () => {
    const newErrors = {};
    if (!quizData.name.trim()) newErrors.name = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to create this quiz?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, create it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Quiz Created!",
            text: "Your quiz has been successfully created.",
            icon: "success",
            confirmButtonText: "Start Quiz",
          }).then(() => {
            navigate("/QuizStart", { state: { quizData } });
          });
        }
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create a New Quiz</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quiz Name</label>
            <input
              type="text"
              name="name"
              value={quizData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter quiz name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Quiz Level</label>
            <select
              name="level"
              value={quizData.level}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Quiz Duration (minutes)</label>
            <div className="relative">
              <input
                type="range"
                name="duration"
                min="5"
                max="180"
                value={quizData.duration}
                onChange={handleChange}
                className="w-full range-slider"
              />
              <div
                className="absolute top-0 h-1 bg-blue-500 rounded"
                style={{ width: `${((quizData.duration - 5) / (180 - 5)) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-700 mt-2">Duration: {quizData.duration} minutes</p>
          </div>

          <div className="flex items-center">
            <input type="checkbox" name="negativeMarking" className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500" />
            <label className="ml-2 text-gray-700 font-medium">Enable Negative Marking</label>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaCalendarAlt /> Start Date & Time
            </label>
            <div className="flex gap-4">
              <input type="date" name="startDate" min={currentDate} className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
              <input type="time" name="startTime" min={currentTime} className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreateQuiz}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            <FaCheckCircle className="mr-2" /> Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;