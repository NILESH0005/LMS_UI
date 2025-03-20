import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import LoadPage from "../../../component/LoadPage"; // Loader component
import ApiContext from "../../../context/ApiContext";

const QuizBank = ({ handleEdit, handleDelete }) => {
  const { fetchData, userToken } = useContext(ApiContext);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  // Fetch questions from API
  const fetchQuestions = async () => {
    setLoading(true);
    const endpoint = "quiz/getQuizzes";
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      "auth-token": userToken,
    };
    const body = {};
    

    try {
      const data = await fetchData(endpoint, method, body, headers);
      if (data.success) {
        setQuestions(data.data.quizzes); // Assuming API response contains `quizzes`
      } else {
        setError(data.message || "Failed to fetch questions.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Get unique groups for dropdown
  const groups = ["All", ...new Set(questions.map((q) => q.group_name))];

  // Filter questions based on search query and selected group
  const filteredQuestions = questions.filter((question) => {
    return (
      (selectedGroup === "All" || question.group_name === selectedGroup) &&
      question.question_text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <LoadPage />; // Show loader while fetching data
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
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
            <tr className="bg-DGXgreen">
              <th className="border p-2">#</th>
              <th className="border p-2">Question</th>
              <th className="border p-2">Correct Answer</th>
              <th className="border p-2">Group</th>
              <th className="border p-2">Level</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{q.question_text}</td>
                <td className="border p-2">{q.option_text}</td>
                <td className="border p-2">{q.group_name}</td>
                <td className="border p-2">{q.ddValue}</td>
                <td className="border p-2 flex justify-center space-x-2">
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
