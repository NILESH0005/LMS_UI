import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import ApiContext from "../../../context/ApiContext.jsx";

const QuizMapping = () => {
  const { userToken, fetchData, currentUser } = useContext(ApiContext);
  const [quizGroups, setQuizGroups] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [mappedQuestions, setMappedQuestions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionMarks, setQuestionMarks] = useState({});
  const [loading, setLoading] = useState({
    groups: false,
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
      setMappedQuestions([]);
      setQuizzes([]);
      setQuestionMarks({});
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
        const fetchedQuestions = response.data.questions.map(question => ({
          question_id: question.question_id,
          question_text: question.question_text,
          question_level: "N/A",
          group_id: question.group_id,
        }));

        setQuestions(fetchedQuestions);
        if (response.data.mappedQuestions) {
          setMappedQuestions(response.data.mappedQuestions.map(q => ({
            question_id: q.id || q.question_id, // Handle both field names
            question_text: q.question_text,
            marks: q.marks || 0, // Default to 0 if not provided
            negative_marks: q.negative_marks || 0, // Default to 0 if not provided
            quiz_name: q.quiz_name || 'Unassigned',
            quiz_id: q.quiz_id
          })));
        }
        console.log("Mapped questions from API:", response.data.mappedQuestions);

        const initialMarks = {};
        fetchedQuestions.forEach(q => {
          initialMarks[q.question_id] = {
            marks: 1,
            negative: 0
          };
        });
        setQuestionMarks(initialMarks);

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
      setQuestionMarks({});
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
      setSelectedQuiz("");
      setSelectedQuestions([]);
      fetchQuestions(selectedGroup);
    } else {
      setQuestions([]);
      setQuizzes([]);
      setQuestionMarks({});
    }
  }, [selectedGroup]);

  useEffect(() => {
    fetchQuizGroups();
  }, []);

  const handleSubmitMapping = async () => {
    if (!selectedQuiz || selectedQuestions.length === 0) {
      Swal.fire("Warning", "Please select a quiz and at least one question", "warning");
      return;
    }

    try {
      setLoading(prev => ({ ...prev, mappings: true }));
      const mappingData = selectedQuestions.map(questionId => ({
        question_id: questionId,
        marks: questionMarks[questionId]?.marks || 1,
        negative_marks: questionMarks[questionId]?.negative || 0
      }));
      const response = await fetchData(
        "quiz/createQuizQuestionMapping",
        "POST",
        {
          quiz_id: parseInt(selectedQuiz),
          questions: mappingData,
          created_by: currentUser || "admin"
        },
        {
          "Content-Type": "application/json",
          "auth-token": userToken,
          "user-id": currentUser || ""
        }
      );

      if (response?.success) {
        Swal.fire("Success", response.message || "Question mappings created successfully", "success");
        setSelectedQuestions([]);
      } else {
        throw new Error(response?.message || "Failed to create mappings");
      }
    } catch (error) {
      console.error("Error creating mappings:", error);
      Swal.fire("Error", error.message || "Failed to create question mappings", "error");
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

  const handleMarksChange = (questionId, field, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    setQuestionMarks(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: field === 'negative' ? numValue : Math.max(0, numValue)
      }
    }));
  };

  const filteredMappedQuestions = selectedQuiz
    ? mappedQuestions.filter(q => q.quiz_id === parseInt(selectedQuiz))
    : mappedQuestions;

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
            disabled={loading.groups}>
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
          <>
            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">Available Questions:</label>
              <div className="max-h-60 overflow-y-auto border rounded-md p-3 bg-gray-50">
                {loading.questions ? (
                  <div className="text-center py-4">Loading questions...</div>
                ) : questions.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left">Select</th>
                        <th className="p-2 text-left">Question</th>
                        <th className="p-2 text-left">Marks</th>
                        <th className="p-2 text-left">Negative Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map(q => (
                        <tr key={q.question_id} className="border-t">
                          <td className="p-2">
                            <input
                              type="checkbox"
                              id={`q-${q.question_id}`}
                              checked={selectedQuestions.includes(q.question_id)}
                              onChange={() => handleQuestionSelect(q.question_id)}
                              className="mr-2"
                              disabled={loading.questions}
                            />
                          </td>
                          <td className="p-2">
                            <label htmlFor={`q-${q.question_id}`} className="text-sm">
                              {q.question_text}
                            </label>
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={questionMarks[q.question_id]?.marks || 1}
                              onChange={(e) => handleMarksChange(q.question_id, 'marks', e.target.value)}
                              className="w-16 p-1 border rounded"
                              disabled={!selectedQuestions.includes(q.question_id)}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              step="0.5"
                              value={questionMarks[q.question_id]?.negative || 0}
                              onChange={(e) => handleMarksChange(q.question_id, 'negative', e.target.value)}
                              className="w-16 p-1 border rounded"
                              disabled={!selectedQuestions.includes(q.question_id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No questions available for this group</p>
                )}
              </div>
            </div>
            {filteredMappedQuestions.length > 0 && (
              <div className="mb-6">
                <label className="block font-semibold text-gray-700 mb-2">
                  {selectedQuiz
                    ? `Questions Mapped to ${quizzes.find(q => q.quiz_id === parseInt(selectedQuiz))?.quiz_name || 'Selected Quiz'}`
                    : `All Mapped Questions in Group`}
                </label>
                <div className="max-h-60 overflow-y-auto border rounded-md p-3 bg-gray-50">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left">Question</th>
                        {!selectedQuiz && <th className="p-2 text-left">Mapped To Quiz</th>}
                        <th className="p-2 text-left">Marks</th>
                        <th className="p-2 text-left">Negative Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMappedQuestions.map(q => (
                        <tr key={`mapped-${q.question_id}-${q.quiz_id}`} className="border-t">
                          <td className="p-2">{q.question_text}</td>
                          {!selectedQuiz && <td className="p-2">{q.quiz_name}</td>}
                          <td className="p-2">{q.marks}</td>
                          <td className="p-2">{q.negative_marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        <button
          onClick={handleSubmitMapping}
          disabled={!selectedQuiz || selectedQuestions.length === 0 || loading.mappings}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading.mappings ? "Saving..." : "Save Question Mappings"}
        </button>
      </div>
    </div>
  );
};

export default QuizMapping;