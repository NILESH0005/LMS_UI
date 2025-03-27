// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from './container/Home.jsx';
// import images from './constant/images.js';

import Lms from './component/LMS/Lms.jsx';

// import BlogManager from './Admin/Components/BlogManager.jsx';
import TeachingModules from './component/LMS/TeachingModules.jsx'

// import BlogManager from './Admin/Components/BlogManager.jsx';
import DeepLearningKit from './component/LMS/Modules/DeepLearningKit.jsx';
import AiRoboticsKit from './component/LMS/Modules/AiRoboticsKit.jsx';
import NvidiaIntro from './component/LMS/Modules/NvidiaIntro.jsx';
import IndustrialMetaverseKit from './component/LMS/Modules/IndustrialMetaverseKit.jsx';
import GenAiKit from './component/LMS/Modules/GenAiKit.jsx';
import DatasetModules from './component/LMS/DatasetModules.jsx';
import Regression from './component/LMS/Regression.jsx';
import Pretrained from './component/LMS/Pretrained.jsx';
import ObjectClassification from './component/LMS/ObjectClassification.jsx';
import Generative from './component/LMS/Generative.jsx';
import DigitalLearning from './component/LMS/DigitalLearning.jsx';
import ComputerVision from './component/LMS/ComputerVision.jsx'
import Annotation from './component/LMS/Annotation.jsx';
import Algorithms from './component/LMS/Algorithms.jsx';
import LeaderBoard from './component/LMS/LeaderBoard.jsx';
import Chatbot from './component/LMS/ChatBot.jsx';




function App() {

  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);



  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Lms />} />


            {/* LMS */}
            <Route path='/Lms' element={<Lms />} />
            <Route path='/teaching-modules' element={<TeachingModules />} />
            <Route path="/edge-ai-robotics-kit" element={<AiRoboticsKit />} />
            <Route path="/deep-learning-kit" element={<DeepLearningKit />} />
            <Route path="/generative-ai-kit" element={<GenAiKit />} />
            <Route path="/industrial-metaverse-kit" element={<IndustrialMetaverseKit />} />
            <Route path="/nvidia-intro" element={<NvidiaIntro />} />


            <Route path='/data-modules' element={<DatasetModules />} />
            <Route path='/regression-modules' element={<Regression />} />
            <Route path='/pretrained-modules' element={<Pretrained />} />
            <Route path='/object-classification-modules' element={<ObjectClassification />} />
            <Route path='/generative-ai-modules' element={<Generative />} />
            <Route path='/digital-learning-modules' element={<DigitalLearning />} />
            <Route path='/computer-vision-modules' element={<ComputerVision />} />
            <Route path='/annotation-modules' element={<Annotation />} />
            <Route path='/algorithms-modules' element={<Algorithms />} />


            {/* LeaderBoard and Chatabot */}
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/chatbot' element={<Chatbot />} />


          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
