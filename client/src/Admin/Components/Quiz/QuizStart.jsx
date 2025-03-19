import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Trash2 } from "lucide-react";
import QuizStartHeader from "./QuizStartHeader";
import QuizQuestions from "./QuizQuestions";
import QuizMapping from "./QuizMapping";

const QuizStart = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [instructions, setInstructions] = useState([
    "1. Read all questions carefully.",
    "2. You have limited time to complete the quiz.",
    "3. No negative marking unless specified."
  ]);
  const [newInstruction, setNewInstruction] = useState("");

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, `${instructions.length + 1}. ${newInstruction}`]);
      setNewInstruction("");
    }
  };

  const deleteInstruction = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    const renumberedInstructions = updatedInstructions.map((inst, i) => `${i + 1}. ${inst.substring(inst.indexOf(' ') + 1)}`);
    setInstructions(renumberedInstructions);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-6">
      <nav className="w-full bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800">
          Generate Question
          </h1>
        </div>
      </nav>

      <div className="w-full max-w-3xl mt-8">
        {!isQuizStarted && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome to the Quiz Instruction</h2>
            <p className="text-gray-600 mt-2">Read the instructions carefully before starting.</p>
            
            {/* Instruction Panel */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
              <ul className="bg-gray-50 p-4 rounded-lg shadow-sm divide-y divide-gray-200">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex justify-between items-center py-2">
                    <span className="text-gray-700">{instruction}</span>
                    <button 
                      onClick={() => deleteInstruction(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Add New Instruction */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  className="border p-2 flex-1 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                  placeholder="Add new instruction"
                />
                <button 
                  onClick={addInstruction} 
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            </div>
            
            <button
              onClick={handleStartQuiz}
              className="mt-6 px-6 py-3 w-full bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Start Quiz
            </button>
          </div>
        )}

        {isQuizStarted && (
          <div className="flex flex-col mt-6">
            <QuizQuestions />
            <QuizMapping />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizStart;
