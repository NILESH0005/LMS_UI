import { useState } from "react";
import CreateQuiz from "./CreateQuiz";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const QuizInterface = () => {
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const slides = [
    "Prepare for your exams with ease!",
    "Test your knowledge with interactive quizzes.",
    "Join now and start your quiz journey!",
  ];

  const upcomingQuizzes = [
    {
      title: "Basics of C++",
      points: 100,
      questions: 10,
      image: "c.png",
    },
    {
      title: "SQL Helps Shine",
      points: 50,
      questions: 5,
      image: "sql1.png",
    },
    {
      title: "SQL Mastery",
      points: 50,
      questions: 5,
      image: "sql.png",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-6 relative">
      {/* Full-Screen Background Image */}
      <img
        src="quiz.jpg"
        alt="Exam Test"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full">
        {showCreateQuiz ? (
          <CreateQuiz onBack={() => setShowCreateQuiz(false)} />
        ) : (
          <>
            <h1 className="text-6xl font-bold text-white">
              WELCOME TO <span className="text-blue-600">QUIZZIE</span>
            </h1>

            {/* Vector Image Section */}
            <div className="flex flex-col md:flex-row items-center mt-6 bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
              {/* Left Section - Text & Carousel */}
              <div className="md:w-1/2 text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  Exam Test Landing Page
                </h2>
                <p className="text-gray-600 mt-2">
                  Explore a variety of quizzes, track your progress, and enhance
                  your learning with real-time feedback.
                </p>

                {/* Button to Show CreateQuiz Component */}
                <button
                  className="mt-6 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
                  onClick={() => setShowCreateQuiz(true)}
                >
                  Create a Quiz
                </button>
              </div>

              {/* Right Section - Image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="exam.jpg"
                  alt="Exam Test"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Full-Width Carousel Section */}
            <div className="mt-8 w-screen w-full">
              <Carousel
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                autoPlay
                infiniteLoop
                interval={3000}
                swipeable
                emulateTouch
                className="w-full"
              >
                {slides.map((text, index) => (
                  <div
                    key={index}
                    className="p-8  font-bold text-3xl font-sans hover:bg-gray-200 transition duration-300 cursor-pointer"
                  >
                    {text}
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Quiz Section */}
            <div className="mt-12 flex flex-col items-center w-full">
              <h1 className="text-5xl font-bold text-white hover:text-yellow-400 transition duration-300 transform hover:scale-105">
                Upcoming Quizzes
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
                {upcomingQuizzes.map((quiz, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <img
                      src={quiz.image}
                      alt={quiz.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2
                      className="text-xl font-bold text-gray-800 mt-4 hover:text-blue-600 hover:underline hover:font-extrabold cursor-pointer transition duration-300"
                      onClick={() =>
                        navigate(
                          `/quiz/${quiz.title
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`
                        )
                      }
                    >
                      {quiz.title}
                    </h2>
                    <p className="text-gray-600">{quiz.questions} Questions</p>
                    <p className="text-gray-600">{quiz.points} Points</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
