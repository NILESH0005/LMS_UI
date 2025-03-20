import React, { useState } from "react";
import QuizQuestions from "./QuizQuestions"; // Import the QuizQuestions component

const QuizBank = ({ questions = [], handleEdit, handleDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [showQuizQuestions, setShowQuizQuestions] = useState(false); // State to control rendering of QuizQuestions

  // Dummy data
  const dummyQuestions = [
    {
      id: 1,
      text: "What is the capital of France?",
      correctAnswer: "Paris",
      group: "Geography",
      level: "Easy",
      count: 0,
    },
    {
      id: 2,
      text: "What is 2 + 2?",
      correctAnswer: "4",
      group: "Mathematics",
      level: "Easy",
      count: 0,
    },
    {
      id: 3,
      text: "Who wrote 'Hamlet'?",
      correctAnswer: "William Shakespeare",
      group: "Literature",
      level: "Medium",
      count: 0,
    },
    {
      id: 4,
      text: "What is the chemical symbol for water?",
      correctAnswer: "H2O",
      group: "Science",
      level: "Easy",
      count: 0,
    },
    {
      id: 5,
      text: "Who painted the Mona Lisa?",
      correctAnswer: "Leonardo da Vinci",
      group: "Art",
      level: "Medium",
      count: 0,
    },
  ];

  // Use provided questions or fallback to dummy data
  const [finalQuestions, setFinalQuestions] = useState(
    questions.length > 0 ? questions : dummyQuestions
  );

  // Get unique groups for the dropdown
  const groups = ["All", ...new Set(finalQuestions.map((q) => q.group))];

  // Filter questions based on search and selected group
  const filteredQuestions = finalQuestions.filter((question) => {
    return (
      (selectedGroup === "All" || question.group === selectedGroup) &&
      question.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Function to increase the count of a question
  const increaseCount = (id) => {
    setFinalQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, count: q.count + 1 } : q))
    );
  };

  // Function to show QuizQuestions component
  const handleEditQuiz = () => {
    setShowQuizQuestions(true); // Set state to true to render QuizQuestions
  };

  // If showQuizQuestions is true, render the QuizQuestions component
  if (showQuizQuestions) {
    return <QuizQuestions questions={finalQuestions} />;
  }

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      {/* Button to navigate to QuizQuestions component */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleEditQuiz}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Edit Quiz
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/2"
        />

        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="p-2 border rounded"
        >
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {filteredQuestions.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Question</th>
              <th className="border p-2">Correct Answer</th>
              <th className="border p-2">Group</th>
              <th className="border p-2">Level</th>
              <th className="border p-2">Count</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q, index) => (
              <tr key={q.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{q.text}</td>
                <td className="border p-2">{q.correctAnswer}</td>
                <td className="border p-2">{q.group}</td>
                <td className="border p-2">{q.level}</td>
                <td className="border p-2">{q.count}</td>
                <td className="border p-2 flex justify-center space-x-2">
                  <button
                    onClick={() => increaseCount(q.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleEdit(q.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No questions found.</p>
      )}
    </div>
  );
};

export default QuizBank;