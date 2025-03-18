import React, { useState, useEffect, useContext } from "react";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ApiContext from "../../../context/ApiContext";

const CreateQuiz = ({ navigateToQuizTable }) => {
  const navigate = useNavigate();
  const { userToken, fetchData } = useContext(ApiContext);
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [quizData, setQuizData] = useState({
    category: "",
    name: "",
    level: "Medium",
    duration: 30,
    negativeMarking: false,
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    type: "Public",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if form is submitted
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchCategories = async () => {
      const endpoint = `dropdown/getDropdownValues?category=blogCategory`;
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
        "auth-token": userToken,
      };

      try {
        const data = await fetchData(endpoint, method, headers);
        console.log("Fetched blog categories:", data);
        if (data.success) {
          const sortedCategories = data.data.sort((a, b) =>
            a.ddValue.localeCompare(b.ddValue)
          );
          setCategories(sortedCategories);
        } else {
          Swal.fire("Error", "Failed to fetch categories.", "error");
        }
      } catch (error) {
        console.error("Error fetching blog categories:", error);
        Swal.fire("Error", "Error fetching categories.", "error");
      }
    };

    fetchCategories();
  }, []);

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

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "category":
        if (!value.trim()) error = "Quiz category is required.";
        break;
      case "name":
        if (!value.trim()) error = "Quiz name is required.";
        break;
      case "startDate":
        if (!value) error = "Start date is required.";
        break;
      case "startTime":
        if (!value) error = "Start time is required.";
        break;
      case "endDate":
        if (!value) error = "End date is required.";
        break;
      case "endTime":
        if (!value) error = "End time is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setQuizData((prev) => ({ ...prev, [name]: fieldValue }));
    const error = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const getMinEndTime = () => {
    if (!quizData.startDate || !quizData.startTime) return "";

    const startDateTime = new Date(`${quizData.startDate}T${quizData.startTime}`);
    const minEndDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

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
    if (startDateTime < currentDateTime) {
      Swal.fire({
        icon: "error",
        title: "Invalid Start Date/Time",
        text: "Start date and time cannot be before the current date and time.",
      });
      return false;
    }

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

  const handleCreateQuiz = async () => {
    setIsSubmitted(true);

    const requiredFields = ["name", "startDate", "startTime", "endDate", "endTime"];
    const emptyFields = requiredFields.filter(field => !quizData[field].trim());

    if (emptyFields.length > 0) {
      const newErrors = {};
      emptyFields.forEach(field => {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      });
      setErrors(newErrors);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (!validateDates()) return;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create this quiz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        const endpoint = "quiz/createQuiz";
        const method = "POST";
        const headers = {
          "Content-Type": "application/json",
          "auth-token": userToken,
        };

        const body = {
          category: quizData.category,
          name: quizData.name,
          level: quizData.level,
          duration: quizData.duration,
          negativeMarking: quizData.negativeMarking,
          startDate: quizData.startDate,
          startTime: quizData.startTime,
          endDate: quizData.endDate,
          endTime: quizData.endTime,
          type: quizData.type,
        };

        try {
          const data = await fetchData(endpoint, method, body, headers);
          setLoading(false);

          if (data.success) {
            Swal.fire({
              title: "Quiz Created!",
              text: "Your quiz has been successfully created.",
              icon: "success",
              confirmButtonText: "Start",
            }).then(() => {
              navigateToQuizTable();
            });
          } else {
            Swal.fire("Error", `Error: ${data.message}`, "error");
          }
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
          Swal.fire("Error", "Something went wrong, please try again.", "error");
        }
      }
    });
  };

  const minEndTime = getMinEndTime();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-DGXblue mb-6">Create a New Quiz</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quiz Category</label>
            <input
              type="text"
              name="category"
              value={quizData.category}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring- ${(isSubmitted && errors.name) ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter quiz category/subject"
              required
            />
            {isSubmitted && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Quiz Name</label>
            <input
              type="text"
              name="name"
              value={quizData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${(isSubmitted && errors.name) ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter quiz name"
              required
            />
            {isSubmitted && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaCalendarAlt /> Start Date & Time
            </label>
            <div className="flex gap-4">
              <input
                type="date"
                name="startDate"
                min={currentDate}
                value={quizData.startDate}
                onChange={handleChange}
                className={`w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${(isSubmitted && errors.startDate) ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              <input
                type="time"
                name="startTime"
                min={quizData.startDate === currentDate ? currentTime : "00:00"}
                value={quizData.startTime}
                onChange={handleChange}
                className={`w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${(isSubmitted && errors.startTime) ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
            </div>
            {isSubmitted && errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            {isSubmitted && errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaCalendarAlt /> End Date & Time
            </label>
            <div className="flex gap-4">
              <input
                type="date"
                name="endDate"
                min={quizData.startDate || currentDate}
                value={quizData.endDate}
                onChange={handleChange}
                className={`w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${(isSubmitted && errors.endDate) ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
              <input
                type="time"
                name="endTime"
                min={minEndTime}
                value={quizData.endTime}
                onChange={handleChange}
                className={`w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${(isSubmitted && errors.endTime) ? "border-red-500" : "border-gray-300"
                  }`}
                required
              />
            </div>
            {isSubmitted && errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            {isSubmitted && errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
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
            type="button"
            onClick={handleCreateQuiz}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Creating..." : <><FaCheckCircle className="mr-2" /> Create Quiz</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;