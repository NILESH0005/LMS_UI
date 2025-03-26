import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import QuizHeader from './QuizHeader';
import QuizPalette from './QuizPalette';
import ApiContext from '../../context/ApiContext';

const Quiz = () => {
  const location = useLocation();

  const quiz = location.state?.quiz || {};

  const STORAGE_KEY = `quiz_attempt_${quiz.QuizID}`;
  const { userToken, fetchData } = useContext(ApiContext);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timer, setTimer] = useState({ hours: 0, minutes: 30, seconds: 0 });
  const [questionStatus, setQuestionStatus] = useState({});

  const loadSavedAnswers = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      console.log(`Loading from localStorage (key: ${STORAGE_KEY}):`, savedData);
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      console.error("Failed to load saved answers:", error);
      return null;
    }
  };

  const saveAnswersToStorage = (answers) => {
    try {
      console.log("Saving to localStorage:", answers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      // Verify it was stored correctly
      const verify = localStorage.getItem(STORAGE_KEY);
      console.log("Storage verification:", verify);
    } catch (error) {
      console.error("Failed to save answers:", error);
    }
  };

  const clearAnswerFromStorage = (questionIndex) => {
    const savedData = loadSavedAnswers();
    if (savedData) {
      console.log("Clearing answer for question:", questionIndex);
      const updatedAnswers = savedData.answers.map((answer, idx) =>
        idx === questionIndex ? null : answer
      );
      saveAnswersToStorage({
        ...savedData,
        answers: updatedAnswers
      });
    }
  };

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const saved = loadSavedAnswers();
    return saved ? saved.answers : Array(questions.length).fill(null);
  });

  useEffect(() => {
    console.log("Received quiz data:", quiz);
    if (quiz.QuizID && quiz.group_id) {
      fetchQuizQuestions();

    }
  }, [quiz]);
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        console.log("LocalStorage updated:", {
          key: e.key,
          newValue: e.newValue,
          oldValue: e.oldValue
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [STORAGE_KEY]);


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

  const handleAnswerClick = (selectedOption) => {
    const currentQuestionData = questions[currentQuestion];

    // Find the selected option object(s)
    const selectedOptions = currentQuestionData.options
      .filter(opt => opt.option_text === selectedOption);

    // Determine marks based on correctness
    const isCorrect = selectedOptions.some(opt => opt.is_correct === 1);
    const marks = isCorrect ? currentQuestionData.totalMarks : -currentQuestionData.negativeMarks;

    // Create answer object with all needed information
    const newAnswer = {
      questionId: currentQuestionData.id,
      questionText: currentQuestionData.question_text,
      options: selectedOptions.map(opt => ({
        id: opt.id,
        text: opt.option_text,
        is_correct: opt.is_correct
      })),
      marksAwarded: marks,
      isCorrect: isCorrect,
      maxMarks: currentQuestionData.totalMarks,
      negativeMarks: currentQuestionData.negativeMarks
    };

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = newAnswer;

    setSelectedAnswers(newAnswers);
    setQuestionStatus(prev => ({ ...prev, [currentQuestion + 1]: "answered" }));

    // Save to local storage
    saveAnswersToStorage({
      quizId: quiz.QuizID,
      groupId: quiz.group_id,
      answers: newAnswers
    });
  };

  const handleSaveAndNext = () => {
    // Save is already handled in handleAnswerClick
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleClearResponse = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = null;
    setSelectedAnswers(newAnswers);
    setQuestionStatus(prev => ({ ...prev, [currentQuestion + 1]: "not-answered" }));

    // Clear from storage
    clearAnswerFromStorage(currentQuestion);
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

  const handleInstantResult = () => {
    const correct = questions.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    alert(`Your instant result: ${correct} out of ${questions.length}`);
  };


  const handleQuizSubmit = async () => {
    if (!userToken) {
      console.log("Authentication token missing");
      return;
    }
  
    const savedData = loadSavedAnswers();
    if (!savedData) {
      setSubmitError("No quiz data found to submit");
      return;
    }
  
    const endpoint = "quiz/submitQuiz";
    const method = "POST";
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': userToken
    };
  
    // Prepare answers ensuring proper data types
    const preparedAnswers = savedData.answers
      .filter(a => a !== null)
      .map(answer => ({
        questionId: Number(answer.questionId), // Ensure number type
        questionText: String(answer.questionText),
        options: answer.options.map(option => ({
          id: Number(option.id), // Ensure number type
          text: String(option.text),
          is_correct: Number(option.is_correct) // Convert to number (0 or 1)
        })),
        marksAwarded: Number(answer.marksAwarded),
        isCorrect: Boolean(answer.isCorrect),
        maxMarks: Number(answer.maxMarks),
        negativeMarks: Number(answer.negativeMarks)
      }));
  
    const body = {
      quizId: Number(savedData.quizId), // Ensure number type
      groupId: Number(savedData.groupId), // Ensure number type
      answers: preparedAnswers
    };
  
    try {
      setSubmitting(true);
      setSubmitError(null);
  
      const data = await fetchData(endpoint, method, body, headers);
  
      if (!data.success) {
        console.log("Error occurred while submitting quiz");
        throw new Error(data.message || "Submission failed");
      }
  
      // Success case
      setSubmitSuccess(true);
      setFinalScore(data.data?.totalScore || 0);
      localStorage.removeItem(STORAGE_KEY);
  
      console.log("Quiz submitted successfully:", data);
      alert(`Quiz submitted successfully! Your score: ${data.data?.totalScore || 0}`);
  
    } catch (error) {
      console.error("Quiz submission error:", error);
      setSubmitError(error.message || "Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
      <div className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-medium text-center mb-6">{quiz.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 border border-gray-300 rounded-md">
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
            <div className="p-6 border-b border-gray-300">
              <p className="text-lg mb-6">{questions[currentQuestion]?.question_text}</p>
              <div className="space-y-3">
                {questions[currentQuestion]?.options?.map((option, index) => (
                  <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={option.option_text}
                      checked={
                        selectedAnswers[currentQuestion]?.optionTexts?.includes(option.option_text)
                      }
                      onChange={() => handleAnswerClick(option.option_text)}
                      className="w-4 h-4"
                    />
                    {/* <input
                      type="radio"
                      name="answer" 

                      value={option.option_text}
                      checked={selectedAnswers[currentQuestion] === option.option_text}
                      onChange={() => handleAnswerClick(option.option_text)}
                      className="w-4 h-4"
                    /> */}
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
            onSubmitQuiz={handleQuizSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Quiz;