import React, { useState } from "react";

const QuizTable = ({ quizzes, handleEdit, handleDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuizLevel, setSelectedQuizLevel] = useState("All");

  const quizLevels = ["All", "Easy", "Medium", "Hard"];

  const filteredQuizzes = quizzes.map((q, index) => ({
    ...q,
    quizCategory: q.quizCategory || ["Math", "Science", "History", "Geography", "English"][index % 5],
  })).filter((q) => {
    const matchesLevel =
      selectedQuizLevel === "All" || q.quizLevel === selectedQuizLevel;
    const matchesSearch =
      q.quizName &&
      q.quizName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      {/* Search and Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Field */}
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/2"
        />

        {/* Quiz Level Filter Dropdown */}
        <select
          value={selectedQuizLevel}
          onChange={(e) => setSelectedQuizLevel(e.target.value)}
          className="p-2 border rounded"
        >
          {quizLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filteredQuizzes.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Serial Number</th>
              <th className="border p-2">Private/Public</th>
              <th className="border p-2">Quiz Name</th>
              <th className="border p-2">Quiz Category</th>
              <th className="border p-2">Quiz Level</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Negative Marking</th>
              <th className="border p-2">Start Time</th>
              <th className="border p-2">End Time</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuizzes.map((q) => (
              <tr key={q.id} className="text-center">
                <td className="border p-2">{q.serialNumber}</td>
                <td className="border p-2">{q.isPrivate ? "Private" : "Public"}</td>
                <td className="border p-2">{q.quizName}</td>
                <td className="border p-2">{q.quizCategory}</td>
                <td className="border p-2">{q.quizLevel}</td>
                <td className="border p-2">{q.duration}</td>
                <td className="border p-2">{q.negativeMarking ? "Enabled" : "Disabled"}</td>
                <td className="border p-2">{q.startTime}</td>
                <td className="border p-2">{q.endTime}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(q.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 transition"
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
        <p className="text-center text-gray-500">No quizzes found.</p>
      )}
    </div>
  );
};

export default QuizTable;