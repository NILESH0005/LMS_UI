import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuizPalette from './QuizPalette';
import ApiContext from '../../context/ApiContext';

const Quiz = () => {
  const location = useLocation();
  const { userToken, fetchData } = useContext(ApiContext);
  const quiz = location.state?.quiz || {};
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timer, setTimer] = useState({ hours: 0, minutes: 30, seconds: 0 });
  const [questionStatus, setQuestionStatus] = useState({});

  useEffect(() => {
    console.log("Received quiz data:", quiz);
    if (quiz.QuizID && quiz.group_id) {
      fetchQuizQuestions();
    }
  }, [quiz]);


  const fetchQuizQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!userToken) {
        throw new Error("Authentication token is missing");
      }

      const endpoint = "quiz/getQuizQuestions";
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        "auth-token": userToken,
      };
      const body = {
        quizGroupID: quiz.group_id,
        QuizID: quiz.QuizID // Only using QuizID now
      };

      console.log("Sending request with:", body); // Debug log

      const data = await fetchData(endpoint, method, body, headers);
      console.log("API Response:", data);

      if (!data) {
        throw new Error("No data received from server");
      }

      if (data.success) {
        const transformedQuestions = transformQuestions(data.data.questions);
        setQuestions(transformedQuestions);
        
        if (transformedQuestions.length > 0) {
          const duration = transformedQuestions[0].duration || 30; // Default to 30 minutes
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;
          setTimer({ hours, minutes, seconds: 0 });
        }

        const initialSelectedAnswers = Array(transformedQuestions.length).fill(null);
        const initialQuestionStatus = transformedQuestions.reduce((acc, _, index) => {
          acc[index + 1] = "not-visited";
          return acc;
        }, {});
        
        setSelectedAnswers(initialSelectedAnswers);
        setQuestionStatus(initialQuestionStatus);
      } else {
        throw new Error(data.message || "Failed to fetch questions");
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Transform the API response into a more usable format
  const transformQuestions = (apiQuestions) => {
    const questionMap = {};
    
    apiQuestions.forEach(item => {
      if (!questionMap[item.QuestionsID]) {
        questionMap[item.QuestionsID] = {
          id: item.QuestionsID,
          question_text: item.question_text,
          image: item.image,
          negativeMarks: item.negativeMarks,
          totalMarks: item.totalMarks,
          duration: item.QuizDuration,
          options: [],
          correctAnswers: [] // For multiple correct answers
        };
      }
      
      questionMap[item.QuestionsID].options.push({
        id: item.id,
        option_text: item.option_text.trim(), // Trim whitespace
        is_correct: item.is_correct
      });
      
      if (item.is_correct === 1) {
        questionMap[item.QuestionsID].correctAnswers.push(item.option_text.trim());
      }
    });
    
    return Object.values(questionMap);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              return prev;
            }
            hours -= 1;
            minutes = 59;
          } else {
            minutes -= 1;
          }
          seconds = 59;
        } else {
          seconds -= 1;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerClick = (selectedAnswer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setSelectedAnswers(newAnswers);
    setQuestionStatus((prev) => ({ ...prev, [currentQuestion + 1]: "answered" }));
  };

  const handleSaveAndNext = () => {
    if (selectedAnswers[currentQuestion] === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleMarkForReview = () => {
    setQuestionStatus((prev) => ({ ...prev, [currentQuestion + 1]: "marked" }));
    handleSkip();
  };

  const handleClearResponse = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = null;
    setSelectedAnswers(newAnswers);
    setQuestionStatus((prev) => ({ ...prev, [currentQuestion + 1]: "not-answered" }));
  };

  const handleInstantResult = () => {
    const correct = questions.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    alert(`Your instant result: ${correct} out of ${questions.length}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-DGXblue mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={fetchQuizQuestions}
            className="mt-4 bg-DGXblue text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg">No questions available for this quiz.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-medium text-center mb-6">{quiz.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main test area - 3/4 width on large screens */}
          <div className="lg:col-span-3 border border-gray-300 rounded-md">
            {/* Question header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-gray-300">
              <div className="text-gray-700">Question No. {currentQuestion + 1}</div>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span>Right mark:</span>
                  <span className="text-green-600 font-medium">{questions[currentQuestion]?.totalMarks || 1}.00</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Negative mark:</span>
                  <span className="text-red-600 font-medium">{questions[currentQuestion]?.negativeMarks || 0}.00</span>
                </div>
              </div>
            </div>

            {/* Question content */}
            <div className="p-6 border-b border-gray-300">
              <p className="text-lg mb-6">{questions[currentQuestion]?.question_text}</p>

              <div className="space-y-3">
                {questions[currentQuestion]?.options?.map((option, index) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={option.option_text}
                      checked={selectedAnswers[currentQuestion] === option.option_text}
                      onChange={() => handleAnswerClick(option.option_text)}
                      className="w-4 h-4"
                    />
                    <span>{option.option_text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between p-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded" onClick={handleMarkForReview}>Mark for Review & Next</button>
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded" onClick={handleClearResponse}>Clear Response</button>
                <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded" onClick={handleInstantResult}>Instant Result</button>
              </div>
              <button className="px-4 py-2 bg-blue-700 text-white rounded" onClick={handleSaveAndNext}>Save & Next</button>
            </div>
          </div>

          {/* Sidebar - 1/4 width on large screens */}
          <QuizPalette
            questionStatus={questionStatus}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            timer={timer}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;