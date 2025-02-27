import React, { useState } from 'react';
import Users from './Components/Users';
import Discussions from './Components/Discussions';
import Events from './Components/Events';
import GuidelineManager from './Components/GuidelineManager';
import Contact from './Components/Contact';
import BlogManager from './Components/BlogManager';
import HomeManager from './Components/HomeManager';
import Home from './Components/home';
import {
  FaUsers,
  FaComments,
  FaCalendarAlt,
  FaBlog,
  FaBook,
  FaHome,
  FaEnvelope,
} from 'react-icons/fa';

const AdminDashboard = (props) => {
  const [activeComp, setActiveComp] = useState('users'); // Default to users

  const getComp = (comp) => {
    switch (comp) {
      case 'users':
        return <Users />;
      case 'discussions':
        return <Discussions />;
      case 'events':
        return <Events />;
      case 'blog_manager':
        return <BlogManager blogs={props.blogs} setBlogs={props.setBlogs} />;
      case 'guidelines':
        return <GuidelineManager />;
      case 'Home':
        return <Home />;
      case 'contact':
        return <Contact />;
      default:
        return <HomeManager />;
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-2 bg-black text-white">
        <div className="p-4 text-3xl font-bold">Admin Dashboard</div> {/* Increased text size */}
        <nav>
          <ul>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'users' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('users')}
              >
                <FaUsers className="mr-4" /> {/* Increased margin */}
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
                <FaComments className="mr-4" /> {/* Increased margin */}
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
                <FaCalendarAlt className="mr-4" /> {/* Increased margin */}
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
                <FaBlog className="mr-4" /> {/* Increased margin */}
                Blogs
              </div>
            </li>
            <li>
              <div
                className={`py-3 px-4 cursor-pointer flex items-center text-xl ${
                  activeComp === 'guidelines' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('guidelines')}
              >
                <FaBook className="mr-4" /> {/* Increased margin */}
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
                <FaHome className="mr-4" /> {/* Increased margin */}
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
                <FaEnvelope className="mr-4" /> {/* Increased margin */}
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