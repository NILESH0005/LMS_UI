import React, { useState, useEffect, useContext } from "react";
import ApiContext from "../../../context/ApiContext";
import Swal from "sweetalert2"; 
const QuizTable = () => {
  const { fetchData, userToken } = useContext(ApiContext);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuizzes = async () => {
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
      console.log("data is:", data);
      if (data.success) {
        setQuizzes(data.data.quizzes);
      } else {
        setError(data.message || "Failed to fetch quizzes");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      console.error("Error fetching quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString); // Convert to Date object
  
    const datePart = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC", // Force UTC
    });
  
    const timePart = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC", // Force UTC
    });
  
    return `${datePart}, ${timePart}`;
  };
  

  const handleDelete = async (quizId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const endpoint = "quiz/deleteQuiz";
          const method = "POST";
          const headers = {
            "Content-Type": "application/json",
            "auth-token": userToken,
          };
          const body = { quizId };
          console.log("body is :", body);
          const data = await fetchData(endpoint, method, body, headers);
          console.log("data is :", data);

          if (data.success) {
            setQuizzes((prevQuizzes) =>
              prevQuizzes.filter((quiz) => quiz.QuizID !== quizId)
            );

            Swal.fire({
              title: "Deleted!",
              text: "The quiz has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: data.message || "Failed to delete the quiz.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting quiz:", error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong, please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search quizzes..."
          className="p-2 border rounded w-1/2"
        />
      </div>
      {quizzes.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-DGXgreen">
              <th className="border p-2">#</th>
              <th className="border p-2">Quiz Category</th>
              <th className="border p-2">Quiz Name</th>
              <th className="border p-2">Level</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Negative Marking</th>
              <th className="border p-2">Start Date & Time</th>
              <th className="border p-2">End Date & Time</th>
              <th className="border p-2">Visibility</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={quiz.QuizID} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{quiz.QuizCategory}</td>
                <td className="border p-2">{quiz.QuizName}</td>
                <td className="border p-2">{quiz.QuizLevel}</td>
                <td className="border p-2">{quiz.QuizDuration} mins</td>
                <td className="border p-2">{quiz.NegativeMarking ? "Yes" : "No"}</td>
                <td className="border p-2">{formatDateTime(quiz.StartDateAndTime)}</td>
                <td className="border p-2">{formatDateTime(quiz.EndDateTime)}</td>
                <td className="border p-2">{quiz.QuizVisibility}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(quiz.QuizID)} 
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