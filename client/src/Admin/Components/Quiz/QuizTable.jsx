import React, { useState, useEffect, useContext } from "react";
import ApiContext from "../../../context/ApiContext";
import Swal from "sweetalert2";
import LoadPage from "../../../component/LoadPage"; // Import the LoadPage component

const QuizTable = () => {
  const { fetchData, userToken } = useContext(ApiContext);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [quizLevels, setQuizLevels] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchQuizLevels = async () => {
    const endpoint = `dropdown/getDropdownValues?category=quizLevel`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      "auth-token": userToken,
    };
  
    try {
      const data = await fetchData(endpoint, method, headers);
      if (data.success) {
        setQuizLevels(data.data);
      } else {
        Swal.fire("Error", "Failed to fetch quiz levels.", "error");
      }
    } catch (error) {
      console.error("Error fetching quiz levels:", error);
      Swal.fire("Error", "Error fetching quiz levels.", "error");
    }
  };

  const fetchQuizCategories = async () => {
    const endpoint = `dropdown/getQuizGroupDropdown`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      "auth-token": userToken,
    };

    try {
      const data = await fetchData(endpoint, method, headers);
      console.log("Fetched quiz categories:", data);
      if (data.success) {
        const sortedCategories = data.data.sort((a, b) =>
          a.group_name.localeCompare(b.group_name)
        );
        setCategories(sortedCategories);
      } else {
        Swal.fire("Error", "Failed to fetch quiz categories.", "error");
      }
    } catch (error) {
      console.error("Error fetching quiz categories:", error);
      Swal.fire("Error", "Error fetching quiz categories.", "error");
    }
  };

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
    
    // Create date object from the string
    const date = new Date(dateString);
    
    // Subtract 5 hours and 30 minutes (for timezone adjustment)
    const adjustedDate = new Date(date.getTime() - (5 * 60 * 60 * 1000) - (30 * 60 * 1000));
    
    // Format the adjusted date
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    return adjustedDate.toLocaleString('en-US', options);
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
          const body = { QuizID: quizId }; 
          console.log("Request body:", body);

          const data = await fetchData(endpoint, method, body, headers);
          console.log("API response:", data);

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
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchQuizzes(), fetchQuizCategories(), fetchQuizLevels()]);
        setIsDataLoaded(true);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getLevelName = (levelId) => {
    if (!quizLevels.length) return "Loading...";
    const levelIdNumber = typeof levelId === 'string' ? parseInt(levelId, 10) : levelId;
    const level = quizLevels.find((lvl) => lvl.idCode === levelIdNumber);
    return level ? level.ddValue : "N/A";
  };

  const getCategoryName = (groupId) => {
    if (!categories.length) return "Loading...";
    const groupIdNumber = typeof groupId === 'string' ? parseInt(groupId, 10) : groupId;
    const category = categories.find((cat) => cat.group_id === groupIdNumber);
    return category ? category.group_name : "N/A";
  };

  if (loading) {
    return <LoadPage />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!isDataLoaded) {
    return <LoadPage />;
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
            {quizzes.map((quiz, index) => {
              return (
                <tr key={quiz.QuizID} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2"> {getCategoryName(quiz.QuizCategory)}</td>
                  <td className="border p-2">{quiz.QuizName}</td>
                  <td className="border p-2">{getLevelName(quiz.QuizLevel)}</td>
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
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No quizzes found.</p>
      )}
    </div>
  );
};

export default QuizTable;