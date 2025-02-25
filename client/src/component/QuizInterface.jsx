import { useState } from "react";
import CreateQuiz from "./CreateQuiz";

const QuizInterface = () => {
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showCreateQuiz ? (
        <CreateQuiz onBack={() => setShowCreateQuiz(false)} />
      ) : (
        <>
          <h1 className="text-3xl font-bold">
            WELCOME TO <span className="text-blue-600">QUIZZIE</span>
          </h1>

          {/* Button to Show CreateQuiz Component */}
          <button
            className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
            onClick={() => setShowCreateQuiz(true)}
          >
            Create a Quiz
          </button>

          {/* Quiz Section */}
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-3xl font-bold">Upcoming Quizzes</h1>
            <p className="text-gray-600">Check out the latest quizzes available.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizInterface;
