import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const Concepts = () => {
   const navigate = useNavigate();
 
   const models = [
  
      {
        "id": 1,
        "title": "Clustering",
        "description": "Learn the fundamentals of clustering algorithms like K-Means, DBSCAN, and Hierarchical Clustering, and how they group unlabeled data based on similarity.",
        "progress": 70,
        "thumbnail": ""
      },
      {
        "id": 2,
        "title": "CNN",
        "description": "Understand Convolutional Neural Networks (CNNs) and their use in image classification, object detection, and computer vision tasks through convolution, pooling, and feature extraction.",
        "progress": 65,
        "thumbnail": ""
      },
      {
        "id": 3,
        "title": "Data Preprocessing",
        "description": "Master essential techniques like normalization, encoding, missing value handling, and feature scaling to prepare raw data for machine learning models.",
        "progress": 70,
        "thumbnail": ""
      },
      {
        "id": 4,
        "title": "OpenCV",
        "description": "Explore OpenCV, a powerful computer vision library for real-time image and video processing, object tracking, facial recognition, and more.",
        "progress": 65,
        "thumbnail": ""
      },
      {
        "id": 5,
        "title": "Reinforcement Learning",
        "description": "Dive into reinforcement learning concepts like agents, environments, rewards, Q-learning, and policy gradients to build intelligent decision-making systems.",
        "progress": 70,
        "thumbnail": ""
      },
      {
        "id": 6,
        "title": "Recurrent Neural Network (RNN)",
        "description": "Understand how RNNs handle sequential data like text and time series using memory of previous inputs, and explore architectures like LSTM and GRU.",
        "progress": 65,
        "thumbnail": ""
      }
        
   ];
 
   const handleCardClick = (title) => {
     const routes = {
       "Clustering": "/concept1",
       "CNN": "/concept2",
      "Data Preprocessing":"/concept3",
      "OpenCV":"/concept4",
      "Reinforcement Learning":"/concept5",
      "Recurrent Neural Network (RNN)":"/concept6"



     };
 
     const route = routes[title];
     if (route) {
       navigate(route);
     } else {
       console.warn(`No route defined for model: ${title}`);
     }
   };
 
   return (
     <div className="flex h-screen bg-gray-100 text-gray-900">
       <div className="flex-1 flex flex-col">
         <header className="bg-white border-b border-gray-200 p-6">
           <h1 className="text-3xl font-bold">
           Concepts AI and Large Language Models (LLM)
           </h1>
         </header>
 
         <main className="flex-1 p-8 overflow-y-auto">
           <div className="space-y-8">
             <div className="text-center">
               <h1 className="text-5xl font-bold mb-4">
               Concepts AI and Large Language Models (LLM)
               </h1>
               <p className="text-gray-600">
                 Explore state-of-the-art object classification and detection models
               </p>
             </div>
 
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {models.map((model) => (
                 <motion.div
                   key={model.id}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200"
                   onClick={() => handleCardClick(model.title)} 
                 >
                   <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                     <img
                       src={model.thumbnail}
                       alt={model.title}
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <h2 className="text-xl font-semibold mb-2">{model.title}</h2>
                   <p className="text-gray-600 text-sm mb-4">
                     {model.description}
                   </p>
                   <div className="w-full">
                     <div className="flex justify-between text-xs text-gray-600 mb-1">
                       <span>Progress</span>
                       <span>{model.progress}%</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-2">
                       <div
                         className="bg-blue-500 h-2 rounded-full"
                         style={{ width: `${model.progress}%` }}
                       ></div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
           </div>
         </main>
       </div>
     </div>
   );
}
export default Concepts;