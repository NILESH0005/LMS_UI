import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FiUpload, FiTrash } from "react-icons/fi"; // Import icons
import QuizTable from "./QuizTable";

const QuizQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Default 4 options
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [group, setGroup] = useState("General");
  const [image, setImage] = useState(null);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setImage(null);
  };

  const handleAddOption = () => {
    if (options.length >= 5) {
      Swal.fire("Limit Reached", "You can add up to 5 options only!", "warning");
      return;
    }
    setOptions([...options, ""]);
  };

  const handleCreateQuestion = () => {
    if (!questionText.trim()) {
      Swal.fire("Error", "Please enter a question!", "error");
      return;
    }
    if (options.length < 2) {
      Swal.fire("Error", "You need at least 2 answer options!", "error");
      return;
    }
    if (correctAnswer === null) {
      Swal.fire("Error", "Please select a correct answer!", "error");
      return;
    }

    const newQuestion = {
      id: uuidv4(),
      text: questionText,
      options,
      correctAnswer,
      group,
      image, // Save image URL if uploaded
    };

    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(null);
    setGroup("General");
    setImage(null);

    Swal.fire("Success", "Question added successfully!", "success");
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    Swal.fire("Deleted", "Question removed successfully!", "success");
  };

  const handleEdit = (id) => {
    const question = questions.find((q) => q.id === id);
    setQuestionText(question.text);
    setOptions(question.options);
    setCorrectAnswer(question.correctAnswer);
    setGroup(question.group);
    setImage(question.image || null);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create a Quiz Question</h2>

      {/* Group Selection */}
      <select
        className="w-full p-2 mb-2 border rounded"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        <option value="General">General</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>

      {/* Question Input */}
      <input
        type="text"
        className="w-full p-2 mb-2 border rounded"
        placeholder="Enter question..."
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {/* Image Upload */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <FiUpload className="text-blue-500" size={20} />
          <span className="text-blue-500">Upload Image (Optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Image Preview */}
        {image && (
          <div className="mt-2 relative">
            <img src={image} alt="Preview" className="w-full h-40 object-cover rounded-md border" />
            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            >
              <FiTrash size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Options */}
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="radio"
            name="correctAnswer"
            checked={correctAnswer === index}
            onChange={() => setCorrectAnswer(index)}
            className="cursor-pointer"
          />
          <input
            type="text"
            className="p-2 border rounded w-full"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        </div>
      ))}

      {/* Buttons */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleAddOption}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Option
        </button>

        <button
          onClick={handleCreateQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Create Question
        </button>
      </div>

      {/* QuizTable Component */}
      <QuizTable
        questions={questions}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default QuizQuestions;
