import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import ApiContext from "../../../context/ApiContext.jsx";

const QuizMapping = () => {
  const { userToken, fetchData, currentUser } = useContext(ApiContext);
  const [quizGroups, setQuizGroups] = useState([]);
  const [quizLevels, setQuizLevels] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [existingMappings, setExistingMappings] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [loading, setLoading] = useState({
    groups: false,
    levels: false,
    quizzes: false,
    questions: false,
    mappings: false
  });
  const fetchQuizGroups = async () => {
    setLoading(prev => ({ ...prev, groups: true }));
    try {
      const data = await fetchData(`dropdown/getQuizGroupDropdown`, "GET");
      if (data.success) {
        setQuizGroups(data.data.sort((a, b) => a.group_name.localeCompare(b.group_name)));
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch quiz groups", "error");
    } finally {
      setLoading(prev => ({ ...prev, groups: false }));
    }
  };

  const fetchQuestions = async (groupId) => {
    if (!groupId) {
      setQuestions([]);
      setQuizzes([]); // Clear quizzes too
      return;
    }

    setLoading(prev => ({ ...prev, questions: true, quizzes: true }));

    try {
      const response = await fetchData(
        "quiz/getQuestionsByGroup",
        "POST",
        { groupId: parseInt(groupId) },
        {
          "Content-Type": "application/json",
          "auth-token": userToken,
        }
      );

      if (response?.success) {
        setQuestions(response.data.questions.map(question => ({
          question_id: question.question_id,
          question_text: question.question_text,
          question_level: "N/A", 
          group_id: question.group_id,
        })));
        setQuizzes(response.data.quizzes.map(quiz => ({
          quiz_id: quiz.quiz_id,
          quiz_name: quiz.quiz_name,
          quiz_level: quiz.quiz_level
        })));

      } else {
        throw new Error(response?.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", error.message, "error");
      setQuestions([]);
      setQuizzes([]);
    } finally {
      setLoading(prev => ({
        ...prev,
        questions: false,
        quizzes: false
      }));
    }
  };
  useEffect(() => {
    if (selectedGroup) {
      setSelectedLevel("");
      setSelectedQuiz("");
      setSelectedQuestions([]);
      fetchQuestions(selectedGroup);
    } else {
      setQuestions([]);
    }
  }, [selectedGroup]);

  useEffect(() => {
    fetchQuizGroups();
  }, []);




  useEffect(() => {
    if (selectedQuiz) {
    } else {
      setExistingMappings([]);
    }
  }, [selectedQuiz]);

  const handleSubmitMapping = async () => {
    if (!selectedQuiz || selectedQuestions.length === 0) {
      Swal.fire("Warning", "Please select a quiz and at least one question", "warning");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, mappings: true }));
      const data = await fetchData(
        "quiz-question-mappings",
        "POST",
        {
          quiz_id: selectedQuiz,
          question_ids: selectedQuestions,
          created_by: currentUser.email
        }
      );

      if (data.success) {
        Swal.fire("Success", "Question mappings saved successfully", "success");
        fetchExistingMappings(selectedQuiz);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to save mappings", "error");
    } finally {
      setLoading(prev => ({ ...prev, mappings: false }));
    }
  };

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz Question Mapping</h2>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Quiz Group:</label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedGroup(e.target.value)}
            value={selectedGroup}
            disabled={loading.groups}
          >
            <option value="">-- Select Group --</option>
            {quizGroups.map(group => (
              <option key={group.group_id} value={group.group_id}>
                {group.group_name}
              </option>
            ))}
          </select>
        </div>
        {selectedGroup && (
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">Quiz:</label>
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => setSelectedQuiz(e.target.value)}
              value={selectedQuiz}
              disabled={loading.quizzes}
            >
              <option value="">-- Select Quiz --</option>
              {quizzes.map(quiz => (
                <option key={quiz.quiz_id} value={quiz.quiz_id}>
                  {quiz.quiz_name} ({quiz.quiz_level})
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedGroup && (
          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">Available Questions:</label>
            <div className="max-h-60 overflow-y-auto border rounded-md p-3 bg-gray-50">
              {questions.length > 0 ? (
                questions.map(q => (
                  <div key={q.question_id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`q-${q.question_id}`}
                      checked={selectedQuestions.includes(q.question_id)}
                      onChange={() => handleQuestionSelect(q.question_id)}
                      className="mr-2"
                      disabled={loading.questions}
                    />
                    <label htmlFor={`q-${q.question_id}`} className="text-sm">
                      {q.question_text}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No questions available for this group</p>
              )}
            </div>
          </div>
        )}
        <button
          onClick={handleSubmitMapping}
          disabled={!selectedQuiz || selectedQuestions.length === 0 || loading.mappings}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading.mappings ? "Saving..." : "Save Question Mappings"}
        </button>
        {existingMappings.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700 mb-2">Currently Mapped Questions:</h3>
            <div className="border rounded-md p-3 bg-gray-50 max-h-60 overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Question</th>
                    <th className="p-2 text-left">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {existingMappings.map(mapping => {
                    const question = questions.find(q => q.question_id === mapping.question_id);
                    return question ? (
                      <tr key={mapping.id} className="border-t">
                        <td className="p-2">{question.question_text}</td>
                        <td className="p-2">{question.question_level}</td>
                      </tr>
                    ) : null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMapping;