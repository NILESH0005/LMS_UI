import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
    const navigate = useNavigate();
    const quizCategoriesRef = useRef(null);

    const subjects = [
        {
            title: "Supervised vs Unsupervised vs Reinforcement Learning",
            quizzes: [
                { title: "Basics of Machine Learning", level: "Beginner", questions: 10, points: 100 },
                { title: "Advanced Reinforcement Learning", level: "Advanced", questions: 15, points: 150 },
            ],
        },
        {
            title: "Python Programming",
            quizzes: [
                { title: "Python Basics", level: "Beginner", questions: 10, points: 100 },
                { title: "Advanced Python Libraries", level: "Intermediate", questions: 12, points: 120 },
            ],
        },
        {
            title: "Mathematics for AI/ML",
            quizzes: [
                { title: "Linear Algebra", level: "Beginner", questions: 10, points: 100 },
                { title: "Probability & Statistics", level: "Intermediate", questions: 12, points: 120 },
            ],
        },
        // Add more subjects and quizzes as needed
    ];

    // Mock data for top performers
    const topPerformers = [
        { name: "John Doe", points: 1200, avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Jane Smith", points: 1150, avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Alice Johnson", points: 1100, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
        { name: "Bob Brown", points: 1050, avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
        { name: "Charlie Davis", points: 1000, avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    ];

    const handleQuizClick = (quiz) => {
        navigate(`/Quiz`, { state: { quiz } });
    };

    const scrollToQuizzes = () => {
        if (quizCategoriesRef.current) {
            quizCategoriesRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 ">
            {/* Hero Section */}
            <div className="py-12 sm:py-24 w-full">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Welcome to Quizzle!
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Test your knowledge, earn points, and compete with others to become the top performer!
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                className="rounded-md bg-DGXgreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                                onClick={scrollToQuizzes}
                            >
                                Start a Quiz
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="w-full mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
                {/* Quiz Categories Section (Left - 8/12 width) */}
                <div className="w-full lg:w-8/12" ref={quizCategoriesRef}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Quiz Categories</h2>
                    {subjects.map((subject, index) => (
                        <div key={index} className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-700 mb-6">{subject.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {subject.quizzes.map((quiz, quizIndex) => (
                                    <div
                                        key={quizIndex}
                                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h4>
                                        <p className="text-gray-600 mb-2">Level: {quiz.level}</p>
                                        <p className="text-gray-600 mb-2">Questions: {quiz.questions}</p>
                                        <p className="text-gray-600 mb-4">Points: {quiz.points}</p>
                                        <button
                                            className="w-full bg-DGXblue text-white py-2 px-4 rounded-lg transition duration-200"
                                            onClick={() => handleQuizClick(quiz)}
                                        >
                                            Start Quiz
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top Performers Section (Right - 4/12 width) */}
                <div className="w-full lg:w-4/12">
                    <div className="sticky top-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performers</h2>
                            <div className="space-y-4">
                                {topPerformers.map((user, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="ml-4">
                                                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.points} Points</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-lime-600">
                                            #{index + 1}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-6 text-sm text-gray-600 text-center">
                                Top performers will be rewarded with exclusive gifts! 🎁
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizList;