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
import Guide from './component/LMS/Object Modules/Guide.jsx';
import Hands from './component/LMS/Object Modules/Hands.jsx';
import Aws from './component/LMS/Annotationsubmodule/Aws.jsx';
import Cvat from './component/LMS/Annotationsubmodule/Cvat.jsx';
import Vtt from './component/LMS/Annotationsubmodule/Vtt.jsx';
import DeepSpeech from './component/LMS/AlgorithmModule/DeepSpeech.jsx';
import Detr from './component/LMS/AlgorithmModule/Detr.jsx';
import Lstm from './component/LMS/AlgorithmModule/Lstm.jsx';
import Resnet50 from './component/LMS/AlgorithmModule/Resnet50.jsx';
import Handson from './component/LMS/RegressionDoc/Handson.jsx';
import Guidereg from './component/LMS/RegressionDoc/Guidereg.jsx';
import Mask_Rcnn from './component/LMS/CompVis/Mask_Rcnn.jsx';
import Vision_trans from './component/LMS/CompVis/Vision_trans.jsx';
import Faster_rcnn from './component/LMS/CompVis/Faster_rcnn.jsx';
import SSD from './component/LMS/CompVis/SSD.jsx';
import Mnist from './component/LMS/DatasetModule/Mnist.jsx';
import Pre_deepspeech from './component/LMS/Pretrained_models/Pre_deepspeech.jsx';
import Pre_detr from './component/LMS/Pretrained_models/Pre_detr.jsx';
import Pre_lstm from './component/LMS/Pretrained_models/Pre_lstm.jsx';
import Pre_resnet from './component/LMS/Pretrained_models/Pre_resnet.jsx';
import Genaiguide from './component/LMS/GenAimodels/Genaiguide.jsx';
import Genaimodels from './component/LMS/GenAimodels/Genaimodels.jsx';
import Tutorials from './component/LMS/DigitalLearningModule/Tutorials.jsx';
import Resource from './component/LMS/DigitalLearningModule/Resource.jsx';
import Vgg from './component/LMS/Annotationsubmodule/Vgg.jsx';
import Labelimg from './component/LMS/Annotationsubmodule/Labelimg.jsx';
import Labelme from './component/LMS/Annotationsubmodule/Labelme.jsx';
import Make_Blobs from './component/LMS/DatasetModule/Make_Blobs.jsx';
import Iris from './component/LMS/DatasetModule/Iris.jsx';
import Imageclass from './component/LMS/DatasetModule/Imageclass.jsx';
import Humanevol from './component/LMS/DatasetModule/Humanevol.jsx';
import Housepred from './component/LMS/DatasetModule/Housepred.jsx';
import Cifar from './component/LMS/DatasetModule/Cifar.jsx';




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

            {/* Object Classification */}
            <Route path='/ObjectGuide' element={<Guide />} />
            <Route path='/ObjectClass' element={<Hands />} />

              {/* Annotation tools */}
            <Route path='/Annsage' element={<Aws />} />
            <Route path='/Anncvat' element={<Cvat />} />
            <Route path='/Annvtt' element={<Vtt   />} />
            <Route path='/annvgg' element={<Vgg   />} />
            <Route path='/annlimg' element={<Labelimg   />} />
            <Route path='/annlme' element={<Labelme   />} />

            {/* LeaderBoard and Chatabot */}
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/chatbot' element={<Chatbot />} />

            {/* Algorithm Module */}
            <Route path='/deepspeech' element={<DeepSpeech />} />
            <Route path='/detr' element={<Detr />} />
            <Route path='/lstm' element={<Lstm />} />
            <Route path='/resnet' element={<Resnet50 />} />
               
            {/* Regression Module */}
            <Route path='/reg_guide' element={<Guidereg />} />
            <Route path='/reg_handson' element={<Handson  />} />
            
            {/* Computer Vision Modules */}
            <Route path='/fasterrcnn' element={<Faster_rcnn />} />
            <Route path='/maskrcnn' element={<Mask_Rcnn />} />
            <Route path='/ssd' element={<SSD />} />
            <Route path='/visiontran' element={<Vision_trans />} />
            
         
            {/* Dataset Module */}
            <Route path='/mnist-dataset' element={<Mnist />} />
            <Route path='/makeblobs' element={<Make_Blobs />} />
            <Route path='/iris' element={<Iris />} />
            <Route path='/imageclass' element={<Imageclass />} />
            <Route path='/humanevol' element={<Humanevol />} />
            <Route path='/housepred' element={<Housepred />} />
            <Route path='/cifar' element={<Cifar />} />
            

            {/* Pretrained Models */}
            <Route path='/predeepspeech' element={<Pre_deepspeech />} />
            <Route path='/predetr' element={<Pre_detr />} />
              <Route path='/prelstm' element={<Pre_lstm />} />
            <Route path='/preresnet' element={<Pre_resnet />} />

           {/* Generative AI Models */}
           <Route path='/genaiguide' element={<Genaiguide />} />
           <Route path='/genaimodel' element={<Genaimodels />} />
            {/* Digital Learning Models */}
            <Route path='/tutorials' element={<Tutorials />} />
           <Route path='/resources' element={<Resource />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
