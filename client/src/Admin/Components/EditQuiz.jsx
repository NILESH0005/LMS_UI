import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert2

const CreateQuiz = ({ onBack }) => {
  const [quizData, setQuizData] = useState({
    name: "",
    level: "Easy",
    duration: 30,
    negativeMarking: false,
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    type: "Public",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizData({
      ...quizData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Get the current date and time in the required format for the `min` attribute
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return {
      currentDate: `${year}-${month}-${day}`,
      currentTime: `${hours}:${minutes}`,
    };
  };

  // Calculate the minimum end time based on the start time
  const getMinEndTime = () => {
    if (!quizData.startDate || !quizData.startTime) return "";

    const startDateTime = new Date(`${quizData.startDate}T${quizData.startTime}`);
    const minEndDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // Add 30 minutes

    const hours = String(minEndDateTime.getHours()).padStart(2, "0");
    const minutes = String(minEndDateTime.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const validateDates = () => {
    const { startDate, startTime, endDate, endTime } = quizData;

    // Check if all fields are filled
    if (!startDate || !endDate || !startTime || !endTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select both date and time for start and end.",
      });
      return false;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    const currentDateTime = new Date();

    // Check if start date/time is before the current date/time
    if (startDateTime < currentDateTime) {
      Swal.fire({
        icon: "error",
        title: "Invalid Start Date/Time",
        text: "Start date and time cannot be before the current date and time.",
      });
      return false;
    }

    // Check if end date/time is at least 30 minutes after start date/time
    const timeDifference = (endDateTime - startDateTime) / (1000 * 60); // Difference in minutes
    if (timeDifference < 30) {
      Swal.fire({
        icon: "error",
        title: "Invalid End Date/Time",
        text: "End date and time must be at least 30 minutes after the start date and time.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateDates()) return;

    console.log("Quiz Data Submitted:", quizData);
    fetch("/api/create-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Quiz created successfully!",
        });
        console.log("Success:", data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error creating quiz.",
        });
        console.error("Error:", error);
      });
  };

  const { currentDate, currentTime } = getCurrentDateTime();
  const minEndTime = getMinEndTime();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create a New Quiz
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quiz Name</label>
            <input
              type="text"
              name="name"
              value={quizData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-gray-700 font-medium mb-2">
              Quiz Duration (minutes): {quizData.duration}
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

          <div className="flex items-center">
            <input
              type="checkbox"
              name="negativeMarking"
              checked={quizData.negativeMarking}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-gray-700 font-medium">Enable Negative Marking</label>
          </div>

          {/* Date and Time Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <FaCalendarAlt /> Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={quizData.startDate}
                onChange={handleChange}
                min={currentDate} // Prevent selecting dates before today
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <FaClock /> Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={quizData.startTime}
                onChange={handleChange}
                min={quizData.startDate === currentDate ? currentTime : "00:00"} // Prevent selecting times before the current time if the date is today
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <FaCalendarAlt /> End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={quizData.endDate}
                onChange={handleChange}
                min={quizData.startDate || currentDate} // Prevent selecting dates before the start date
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <FaClock /> End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={quizData.endTime}
                onChange={handleChange}
                min={minEndTime} // Prevent selecting times before the start time + 30 minutes
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Select Quiz Type</label>
            <select
              name="type"
              value={quizData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <button
            type="submit"
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