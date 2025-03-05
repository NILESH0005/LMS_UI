import React, { useState } from 'react';
import QuizStartHeader from './QuizStartHeader';
import QuizStartQuestions from './QuizStartQuestions';
import QuizTimer from './QuizTimer';
import QuizResult from './QuizResult';
import QuizQuestion from './QuizQuestion';
import QuizPanel from './QuizPanel';
import EditQuiz from './EditQuiz';

function QuizStart() {
  const [parentTimer, setParentTimer] = useState(30);

  return (
    <div className="w-full flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full max-w-3xl border-b-2 pb-4 mb-4">
        <QuizStartHeader parentTimer={parentTimer} />
      </div>
      
      {/* Quiz Panel Section */}
      <QuizPanel />
      
      {/* Quiz Questions Section */}
      <div className="w-full max-w-3xl">
        <QuizStartQuestions onUpdateTime={setParentTimer} />
      </div>

      {/* Timer Section */}
      <QuizTimer time={parentTimer} />

      {/* Result Section */}
      <QuizResult />
    </div>
  );
}

export default QuizStart;
