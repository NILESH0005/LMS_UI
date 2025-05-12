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
import Esc from './component/LMS/DatasetModule/Esc.jsx';
import Heart_disease from './component/LMS/DatasetModule/Heart_disease.jsx';
import Image_caption from './component/LMS/DatasetModule/Image_caption.jsx';
import Imdb from './component/LMS/DatasetModule/Imdb.jsx';
import Rotten_tomatoes from './component/LMS/DatasetModule/Rotten_tomatoes.jsx';
import Pre_blip from './component/LMS/Pretrained_models/Pre_blip.jsx';
import Pre_ts from './component/LMS/Pretrained_models/Pre_ts.jsx';
import Pre_tapas from './component/LMS/Pretrained_models/Pre_tapas.jsx';
import Pre_densenet from './component/LMS/Pretrained_models/Pre_densenet.jsx';
import Alexnet from './component/LMS/Object Modules/Alexnet.jsx';
import Googlenet from './component/LMS/Object Modules/Googlenet.jsx';
import Vgg16 from './component/LMS/Object Modules/Vgg16.jsx';
import Convnext from './component/LMS/Object Modules/Convnext.jsx';
import Cnn_cifar from './component/LMS/Object Modules/Cnn_cifar.jsx';
import Knn from './component/LMS/Object Modules/Knn.jsx';
import Lg1 from './component/LMS/RegressionDoc/Lg1.jsx';
import Lg2 from './component/LMS/RegressionDoc/Lg2.jsx';
import Lg3 from './component/LMS/RegressionDoc/Lg3.jsx';
import Lg4 from './component/LMS/RegressionDoc/Lg4.jsx';
import Lg5 from './component/LMS/RegressionDoc/Lg5.jsx';
import Lg6 from './component/LMS/RegressionDoc/Lg6.jsx';
import Anomaly_Detection from './component/LMS/CompVis/Anomaly_Detection.jsx';
import Image_Segmentation from './component/LMS/CompVis/Image_Segmentation.jsx';
import Image_To_Text from './component/LMS/CompVis/Image_To_Text.jsx';
import U_NET from './component/LMS/CompVis/U_NET.jsx';
import DecisionTree from './component/LMS/AlgorithmModule/DecisionTree.jsx';
import GradientDescent from './component/LMS/AlgorithmModule/GradientDescent.jsx';
import LinearRegression from './component/LMS/AlgorithmModule/LinearRegression.jsx';
import Svm from './component/LMS/AlgorithmModule/Svm.jsx';
import Concepts from './component/LMS/Concepts.jsx';
import Lg7 from './component/LMS/RegressionDoc/Lg7.jsx';
import Transfer from './component/LMS/Object Modules/Transfer.jsx';
import Gai1 from './component/LMS/GenAimodels/Gai1.jsx';
import Gai2 from './component/LMS/GenAimodels/Gai2.jsx';
import Gai3 from './component/LMS/GenAimodels/Gai3.jsx';
import Gai4 from './component/LMS/GenAimodels/Gai4.jsx';
import Gai5 from './component/LMS/GenAimodels/Gai5.jsx';
import Gai6 from './component/LMS/GenAimodels/Gai6.jsx';
import Gai7 from './component/LMS/GenAimodels/Gai7.jsx';
import Gai8 from './component/LMS/GenAimodels/Gai8.jsx';
import Cnn from './component/LMS/ConceptsAIML/Cnn.jsx';
import Opencv from './component/LMS/ConceptsAIML/Opencv.jsx';
import Rl from './component/LMS/ConceptsAIML/Rl.jsx';
import Rnn from './component/LMS/ConceptsAIML/Rnn.jsx';
import Clustering from './component/LMS/ConceptsAIML/Clustering.jsx';
import Datapreprocessing from './component/LMS/ConceptsAIML/Datapreprocessing.jsx';





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
            <Route path='/concepts-module' element={<Concepts />} />


            {/* Object Classification */}
            <Route path='/ObjectGuide' element={<Guide />} />
            <Route path='/ObjectClass' element={<Hands />} />
            <Route path='/alexnet' element={<Alexnet />} />
            <Route path='/googlenet' element={<Googlenet />} />
            <Route path='/vgg16' element={<Vgg16 />} />
            <Route path='/convnext' element={<Convnext />} />
            <Route path='/cnncifar' element={<Cnn_cifar />} />
            <Route path='/knn' element={<Knn />} />
            <Route path='/transfer' element={<Transfer />} />

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
            <Route path='/decisiontree' element={<DecisionTree />} />
            <Route path='/gradient' element={<GradientDescent />} />
            <Route path='/linearregression' element={<LinearRegression />} />
            <Route path='/svm' element={<Svm />} />
               
            {/* Regression Module */}
            <Route path='/reg_guide' element={<Guidereg />} />
            <Route path='/lg1' element={<Lg1 />} />
            <Route path='/lg2' element={<Lg2  />} />
            <Route path='/lg3' element={<Lg3 />} />
            <Route path='/lg4' element={<Lg4  />} />
            <Route path='/lg5' element={<Lg5 />} />
            <Route path='/lg6' element={<Lg6  />} />
            <Route path='/lg7' element={<Lg7 />} />
            
            {/* Computer Vision Modules */}
            <Route path='/fasterrcnn' element={<Faster_rcnn />} />
            <Route path='/maskrcnn' element={<Mask_Rcnn />} />
            <Route path='/ssd' element={<SSD />} />
            <Route path='/visiontran' element={<Vision_trans />} />
            <Route path='/anomalydetection' element={<Anomaly_Detection />} />
            <Route path='/imagesegmentation' element={<Image_Segmentation />} />
            <Route path='/imagetotext' element={<Image_To_Text />} />
            <Route path='/unet' element={<U_NET />} />
            
         
            {/* Dataset Module */}
            <Route path='/mnist-dataset' element={<Mnist />} />
            <Route path='/makeblobs' element={<Make_Blobs />} />
            <Route path='/iris' element={<Iris />} />
            <Route path='/imageclass' element={<Imageclass />} />
            <Route path='/humanevol' element={<Humanevol />} />
            <Route path='/housepred' element={<Housepred />} />
            <Route path='/cifar' element={<Cifar />} />
            <Route path='/esc' element={<Esc />} />
            <Route path='/heart_disease' element={<Heart_disease />} />
            <Route path='/image_caption' element={<Image_caption />} />
            <Route path='/imdb' element={<Imdb />} />
            <Route path='/rotten_tomatoes' element={<Rotten_tomatoes />} />
            

            {/* Pretrained Models */}
            <Route path='/predeepspeech' element={<Pre_deepspeech />} />
            <Route path='/predetr' element={<Pre_detr />} />
              <Route path='/prelstm' element={<Pre_lstm />} />
            <Route path='/preresnet' element={<Pre_resnet />} />
            <Route path='/preblip' element={<Pre_blip />} />
            <Route path='/prets' element={<Pre_ts />} />
              <Route path='/pretapas' element={<Pre_tapas />} />
            <Route path='/predensenet' element={<Pre_densenet />} />

           {/* Generative AI Models */}
           <Route path='/genaiguide' element={<Genaiguide />} />
           <Route path='/gai1' element={<Gai1 />} />
           <Route path='/gai2' element={<Gai2 />} />
           <Route path='/gai3' element={<Gai3 />} />
           <Route path='/gai4' element={<Gai4 />} />
           <Route path='/gai5' element={<Gai5 />} />
           <Route path='/gai6' element={<Gai6 />} />
           <Route path='/gai7' element={<Gai7 />} />
           <Route path='/gai8' element={<Gai8 />} />
         
            {/* Digital Learning Models */}
            <Route path='/tutorials' element={<Tutorials />} />
           <Route path='/resources' element={<Resource />} />

           {/* Concepts of AI ML and DL */}
           <Route path='/concept2' element={<Cnn />} />
           <Route path='/concept4' element={<Opencv />} />
           <Route path='/concept5' element={<Rl />} />
           <Route path='/concept6' element={<Rnn />} />
           <Route path='/concept1' element={<Clustering />} />
           <Route path='/concept3' element={<Datapreprocessing/>} />

          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
