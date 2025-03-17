import React, { useState } from 'react';
import Users from './Components/Users';
import Discussions from './Components/Discussions';
import Events from './Components/Events';
import GuidelineManager from './Components/GuidelineManager';
import Contact from './Components/Contact';
import BlogManager from './Components/BlogManager';
import Home from './Components/Home';
import QuizPanel from './Components/Quiz/QuizPanel';
import QuestionBank from './Components/Quiz/QuestionBank';
import QuizResults from './Components/Quiz/QuizResults';
import QuizSettings from './Components/Quiz/QuizSettings';
import {
  FaUsers,
  FaComments,
  FaCalendarAlt,
  FaBlog,
  FaQuestionCircle,
  FaList,
  FaChartBar,
  FaCog,
  FaBook,
  FaHome,
  FaEnvelope,
  FaAngleDown,
  FaAngleUp
} from 'react-icons/fa';

const AdminDashboard = (props) => {
  const [activeComp, setActiveComp] = useState('users'); // Default to users
  const [quizMenuOpen, setQuizMenuOpen] = useState(false);

  const getComp = (comp) => {
    switch (comp) {
      case 'users':
        return <Users />;
      case 'discussions':
        return <Discussions />;
      case 'events':
        return <Events events={props.events} setEvents={props.setEvents} />;
      case 'blog_manager':
        return <BlogManager blogs={props.blogs} setBlogs={props.setBlogs} />;
      case 'quizpanel':
        return <QuizPanel />;
      case 'quiz_questions':
        return <QuestionBank />;
      case 'quiz_results':
        return <QuizResults />;
      case 'quiz_settings':
        return <QuizSettings />;
      case 'guidelines':
        return <GuidelineManager />;
      case 'Home':
        return <Home />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-2 bg-black text-white">
        <div className="p-4 text-3xl font-bold">Admin Dashboard</div>
        <nav>
          <ul>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'users' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('users')}
              >
                <FaUsers className="mr-4" />
                Users
              </div>
            </li>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'discussions' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('discussions')}
              >
                <FaComments className="mr-4" />
                Discussions
              </div>
            </li>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'events' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('events')}
              >
                <FaCalendarAlt className="mr-4" />
                Events
              </div>
            </li>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'blog_manager' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('blog_manager')}
              >
                <FaBlog className="mr-4" />
                Blogs
              </div>
            </li>

            {/* Quiz Section */}  
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'quizpanel' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => {
                  setActiveComp('quizpanel');
                  setQuizMenuOpen(!quizMenuOpen);
                }}
              >
                <FaQuestionCircle className="mr-4" />
                Quiz Panel
                {quizMenuOpen ? <FaAngleUp className="ml-auto" /> : <FaAngleDown className="ml-auto" />}
              </div>
            </li>
            {quizMenuOpen && (
              <ul className="ml-6">
                <li>
                  <div
                    className={`py-2 px-4 cursor-pointer flex items-center text-lg ${
                      activeComp === 'quiz_questions' ? 'bg-gray-700 text-yellow-300' : ''
                    }`}
                    onClick={() => setActiveComp('quiz_questions')}
                  >
                    <FaList className="mr-4" />
                    Question Bank
                  </div>
                </li>
                <li>
                  <div
                    className={`py-2 px-4 cursor-pointer flex items-center text-lg ${
                      activeComp === 'quiz_results' ? 'bg-gray-700 text-yellow-300' : ''
                    }`}
                    onClick={() => setActiveComp('quiz_results')}
                  >
                    <FaChartBar className="mr-4" />
                    Quiz Results
                  </div>
                </li>
                <li>
                  <div
                    className={`py-2 px-4 cursor-pointer flex items-center text-lg ${
                      activeComp === 'quiz_settings' ? 'bg-gray-700 text-yellow-300' : ''
                    }`}
                    onClick={() => setActiveComp('quiz_settings')}
                  >
                    <FaCog className="mr-4" />
                    Quiz Settings
                  </div>
                </li>
              </ul>
            )}

            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'guidelines' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('guidelines')}
              >
                <FaBook className="mr-4" />
                Guidelines
              </div>
            </li>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'Home' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('Home')}
              >
                <FaHome className="mr-4" />
                Home page
              </div>
            </li>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'contact' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('contact')}
              >
                <FaEnvelope className="mr-4" />
                Contact Us
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="col-span-10 p-4">
        {getComp(activeComp)}
      </div>
    </div>
  );
};

export default AdminDashboard;