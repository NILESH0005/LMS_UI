import React from "react";
import { FiTrash, FiEdit } from "react-icons/fi";

const QuizQuestionTable = ({ questions, handleEdit, handleDelete }) => {
  return (
    <div className="mt-6">
      {questions.length > 0 ? (
        questions.map((question) => (
          <div key={question.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold">{question.text}</h3>
            {question.image && (
              <img
                src={question.image}
                alt="Question"
                className="w-full h-40 object-cover rounded-md border mt-2"
              />
            )}
            <div className="mt-2">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={question.correctAnswers.includes(index)}
                    readOnly
                    className="cursor-pointer"
                  />
                  <span>{option}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(question.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                <FiEdit size={16} />
              </button>
              <button
                onClick={() => handleDelete(question.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                <FiTrash size={16} />
              </button>
            </div>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default QuizQuestionTable;