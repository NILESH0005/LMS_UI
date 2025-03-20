import React, { useState, useEffect } from "react";

const QuizMapping = () => {
  // Dummy data (Replace with API call later)
  const [quizGroups, setQuizGroups] = useState([
    { group_id: "g1", group_name: "Programming" },
    { group_id: "g2", group_name: "Data Science" },
  ]);

  const [quizzes, setQuizzes] = useState([
    { quiz_id: "qz_123", quiz_name: "JavaScript Basics", group_id: "g1" },
    { quiz_id: "qz_456", quiz_name: "React Fundamentals", group_id: "g1" },
    { quiz_id: "qz_789", quiz_name: "Machine Learning", group_id: "g2" },
  ]);

  const [questions, setQuestions] = useState([
    { question_id: "q_101", question_text: "What is React?", group_id: "g1" },
    { question_id: "q_102", question_text: "What is JSX?", group_id: "g1" },
    { question_id: "q_103", question_text: "What is useState hook?", group_id: "g1" },
    { question_id: "q_201", question_text: "What is a Neural Network?", group_id: "g2" },
  ]);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [mappedQuestions, setMappedQuestions] = useState([]);

  useEffect(() => {
    if (selectedGroup) {
      setFilteredQuizzes(quizzes.filter((q) => q.group_id === selectedGroup));
    } else {
      setFilteredQuizzes(quizzes);
    }
  }, [selectedGroup, quizzes]);

  const handleGroupSelect = (e) => {
    setSelectedGroup(e.target.value);
    setSelectedQuiz("");  
  };

  const handleQuizSelect = (e) => {
    setSelectedQuiz(e.target.value);
  };

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleMapQuestions = () => {
    if (!selectedQuiz || selectedQuestions.length === 0) {
      alert("Please select a quiz and at least one question.");
      return;
    }

    const newMappings = selectedQuestions.map((qId) => ({
      quiz_id: selectedQuiz,
      question_id: qId,
    }));
    setMappedQuestions((prev) => [...prev, ...newMappings]);

    setSelectedQuestions([]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Quiz Question Mapping</h2>

        <label className="block font-semibold text-gray-700">Select Quiz Group:</label>
        <select
          className="w-full p-2 border rounded-md my-2 focus:ring-2 focus:ring-blue-400"
          onChange={handleGroupSelect}
          value={selectedGroup}
        >
          <option value="">-- Select Group --</option>
          {quizGroups.map((group) => (
            <option key={group.group_id} value={group.group_id}>
              {group.group_name}
            </option>
          ))}
        </select>

        <label className="block font-semibold text-gray-700">Select Quiz:</label>
        <select
          className="w-full p-2 border rounded-md my-2 focus:ring-2 focus:ring-blue-400"
          onChange={handleQuizSelect}
          value={selectedQuiz}
          disabled={!selectedGroup}
        >
          <option value="">-- Select Quiz --</option>
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <option key={quiz.quiz_id} value={quiz.quiz_id}>
                {quiz.quiz_name}
              </option>
            ))
          ) : (
            <option disabled>No quizzes available</option>
          )}
        </select>

     
        <h3 className="font-semibold text-gray-700 mt-4">Select Questions:</h3>
        <div className="bg-gray-50 p-4 rounded-md max-h-40 overflow-auto border">
          {questions
            .filter((q) => q.group_id === selectedGroup)
            .map((q) => (
              <label key={q.question_id} className="block flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(q.question_id)}
                  onChange={() => handleQuestionSelect(q.question_id)}
                  className="w-4 h-4"
                />
                {q.question_text}
              </label>
            ))}
          {questions.filter((q) => q.group_id === selectedGroup).length === 0 && (
            <p className="text-gray-500 text-sm">No questions available for this group.</p>
          )}
        </div>

        {/* Button to Map Questions to Quiz */}
        <button
          onClick={handleMapQuestions}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full transition"
          disabled={!selectedQuiz || selectedQuestions.length === 0}
        >
          Map Questions to Quiz
        </button>

        {/* Mapped Questions */}
        <h3 className="font-semibold text-gray-700 mt-6">Mapped Questions:</h3>
        <div className="bg-gray-50 p-4 rounded-md max-h-40 overflow-auto border">
          {mappedQuestions.length > 0 ? (
            mappedQuestions.map((map, index) => (
              <p key={index} className="text-sm text-gray-600">
                <strong>Quiz ID:</strong> {map.quiz_id} → <strong>Question ID:</strong> {map.question_id}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No mapped questions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizMapping;
