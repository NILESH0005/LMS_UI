import React, { useState } from "react";

const QuizTable = ({ handleEdit, handleDelete }) => {
  // Dummy Data
  const dummyQuestions = [
    { id: 1, text: "What is the capital of France?", group: "Geography" },
    { id: 2, text: "Who wrote 'To Kill a Mockingbird'?", group: "Literature" },
    { id: 3, text: "What is 2 + 2?", group: "Mathematics" },
    { id: 4, text: "What is the chemical symbol for water?", group: "Science" },
    { id: 5, text: "Who painted the Mona Lisa?", group: "Art" },
    { id: 6, text: "What is the speed of light?", group: "Physics" },
    { id: 7, text: "Who discovered penicillin?", group: "Medicine" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  // Get unique groups for the dropdown
  const groups = ["All", ...new Set(dummyQuestions.map((q) => q.group))];

  // Filter questions based on search and selected group
  const filteredQuestions = dummyQuestions.filter((q) => {
    return (
      (selectedGroup === "All" || q.group === selectedGroup) &&
      q.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      {/* Search and Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Field */}
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-1/2"
        />

        {/* Group Filter Dropdown */}
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

      {/* Table */}
      {filteredQuestions.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Question</th>
              <th className="border p-2">Group</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q, index) => (
              <tr key={q.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{q.text}</td>
                <td className="border p-2">{q.group}</td>
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
        <p className="text-center text-gray-500">No questions found.</p>
      )}
    </div>
  );
};

export default QuizTable;
