import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FiUpload, FiTrash } from "react-icons/fi";
import QuizQuestionTable from "./QuizQuestionTable";

const QuizQuestions = ({ setActiveComp }) => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Start with 4 options
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [group, setGroup] = useState("General");
  const [image, setImage] = useState(null);
  const [optionImages, setOptionImages] = useState([null, null, null, null]); // Start with 4 option images

  // Handle Image Upload for Question
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Image Upload for Options
  const handleOptionImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newOptionImages = [...optionImages];
        newOptionImages[index] = reader.result;
        setOptionImages(newOptionImages);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image for Question
  const removeImage = () => {
    setImage(null);
  };

  // Remove uploaded image for Options
  const removeOptionImage = (index) => {
    const newOptionImages = [...optionImages];
    newOptionImages[index] = null;
    setOptionImages(newOptionImages);
  };

  // Add a new option
  const handleAddOption = () => {
    setOptions([...options, ""]);
    setOptionImages([...optionImages, null]);
  };

  // Remove an option
  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);

      const newOptionImages = [...optionImages];
      newOptionImages.splice(index, 1);
      setOptionImages(newOptionImages);

      const newCorrectAnswers = correctAnswers
        .filter((answer) => answer !== index)
        .map((answer) => (answer > index ? answer - 1 : answer));
      setCorrectAnswers(newCorrectAnswers);
    } else {
      Swal.fire("Error", "You need at least 2 answer options!", "error");
    }
  };

  // Create a new question
  const handleCreateQuestion = () => {
    if (!questionText.trim()) {
      Swal.fire("Error", "Please enter a question!", "error");
      return;
    }
    if (options.length < 2) {
      Swal.fire("Error", "You need at least 2 answer options!", "error");
      return;
    }
    if (correctAnswers.length === 0) {
      Swal.fire("Error", "Please select at least one correct answer!", "error");
      return;
    }

    const newQuestion = {
      id: uuidv4(),
      text: questionText,
      options,
      correctAnswers,
      group,
      image,
      optionImages,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswers([]);
    setGroup("General");
    setImage(null);
    setOptionImages([null, null, null, null]);

    Swal.fire("Success", "Question added successfully!", "success");
  };

  // Delete a question
  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    Swal.fire("Deleted", "Question removed successfully!", "success");
  };

  // Edit a question
  const handleEdit = (id) => {
    const question = questions.find((q) => q.id === id);
    setQuestionText(question.text);
    setOptions(question.options);
    setCorrectAnswers(question.correctAnswers);
    setGroup(question.group);
    setImage(question.image || null);
    setOptionImages(question.optionImages || [null, null, null, null]);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Navigate to QuestionBank
  const navigateToQuestionBank = () => {
    setActiveComp("quiz_bank"); // Update the active component in AdminDashboard
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create a Quiz Question</h2>

      {/* Group Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Group</label>
        <select
          className="w-full p-2 border rounded"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>
      </div>

      {/* Question Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Question</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter question..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      {/* Image Upload for Question */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Question Image (Optional)
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <FiUpload className="text-blue-500" size={20} />
          <span className="text-blue-500">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Image Preview for Question */}
        {image && (
          <div className="mt-2 relative flex justify-center items-center border rounded-lg overflow-hidden max-w-md mx-auto">
            <img
              src={image}
              alt="Preview"
              className="w-full h-auto max-h-[60vh] object-contain"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
            >
              <FiTrash size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Options</label>
        <button
          onClick={handleAddOption}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-2"
        >
          Add Option
        </button>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={correctAnswers.includes(index)}
              onChange={() => {
                const newCorrectAnswers = [...correctAnswers];
                if (newCorrectAnswers.includes(index)) {
                  newCorrectAnswers.splice(newCorrectAnswers.indexOf(index), 1);
                } else {
                  newCorrectAnswers.push(index);
                }
                setCorrectAnswers(newCorrectAnswers);
              }}
              className="cursor-pointer"
            />
            <label className="w-6 text-sm font-medium">
              {String.fromCharCode(65 + index)}
            </label>
            <input
              type="text"
              className="p-2 border rounded flex-1"
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
            {/* Image Upload for Option */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <FiUpload className="text-blue-500" size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleOptionImageUpload(e, index)}
                className="hidden"
              />
            </label>
            {/* Image Preview for Option */}
            {optionImages[index] && (
              <div className="mt-2 relative">
                <img
                  src={optionImages[index]}
                  alt="Preview"
                  className="w-32 h-16 object-cover rounded-md border"
                />
                <button
                  onClick={() => removeOptionImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <FiTrash size={16} />
                </button>
              </div>
            )}
            <button
              onClick={() => handleRemoveOption(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              <FiTrash size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleCreateQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Create Question
        </button>
        <button
          onClick={navigateToQuestionBank}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Go to Question Bank
        </button>
      </div>

      {/* QuizQuestionTable Component */}
      <QuizQuestionTable
        questions={questions}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default QuizQuestions;
