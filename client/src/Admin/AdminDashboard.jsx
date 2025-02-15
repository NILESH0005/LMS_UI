import React, { useState } from 'react';
import Users from './Components/Users';
import Discussions from './Components/Discussions';
import Events from './Components/Events';
import GuidelineManager from './Components/GuidelineManager';
import Contact from './Components/Contact';
import BlogManager from './Components/BlogManager';
import HomeManager from './Components/HomeManager'; // New import
import Home from './Components/home';




const AdminDashboard = () => {
  const [activeComp, setActiveComp] = useState('users'); // Default to home_manager

  const getComp = (comp) => { 
    switch (comp) {
      case 'users':
        return <Users />;
      case 'discussions':
        return <Discussions />;
      case 'events':
        return <Events />;
      case 'blog_manager':
        return <BlogManager />;
      case 'guidelines':
        return <GuidelineManager />;
      case 'Home':
        return <Home />;
      case 'contact':
        return <Contact />;
      // default:
      //   return <HomeManager />;
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-2 bg-black text-white">
        <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
        <nav>
          <ul>
            <li>
              <div
                className={`py-2 px-4 cursor-pointer ${
                  activeComp === 'users' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('users')}
              >
                Users
              </div>
            </li>
            <li>
              <div
                className={`py-2 px-4 cursor-pointer ${
                  activeComp === 'discussions' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('discussions')}
              >
                Discussions
              </div>
            </li>
            <li>
              <div
                className={`py-2 px-4 cursor-pointer ${
                  activeComp === 'events' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('events')}
              >
                Events
              </div>
            </li>
            <li>
              <div
                className={`py-2 px-4 cursor-pointer ${
                  activeComp === 'blog_manager' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('blog_manager')}
              >
                Blogs
              </div>
            </li>
            <li>
              <div
                className={`py-2 px-4 cursor-pointer ${
                  activeComp === 'guidelines' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('guidelines')}
              >
                Guidelines
              </div>
            </li>

            <li>
              <div
                className={`py-2 px-4 cursor-pointer ${
                  activeComp === 'Home' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('Home')}
              >
                Home page
              </div>
            </li>

            <li>
              <div
                className={`py-2 px-4 cursor-pointer ${
                  activeComp === 'contact' ? 'bg-gray-700 text-yellow-300' : ''
                }`}
                onClick={() => setActiveComp('contact')}
              >
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