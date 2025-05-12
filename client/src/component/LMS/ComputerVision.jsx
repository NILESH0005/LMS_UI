import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ComputerVision = () => {
 const navigate = useNavigate();
 
   const models = [
    {
      id: 1,
      title: "Faster_RCNN",
      description: "A two-stage object detection model that uses Region Proposal Networks (RPNs) for fast and accurate object localization.",
      progress: 70,
      thumbnail: "fasterrcnn.avif"
    },
    {
      id: 2,
      title: "Mask_RCNN",
      description: "An extension of Faster R-CNN that adds a branch for predicting object masks, enabling instance segmentation.",
      progress: 65,
      thumbnail: "maskrcnn.avif"
    },
    {
      id: 3,
      title: "SSD",
      description: "Single Shot MultiBox Detector that performs object detection in a single forward pass for real-time applications.",
      progress: 65,
      thumbnail: "SSD object detection.avif"
    },
    {
      id: 4,
      title: "Vision_Transformers",
      description: "Transformer-based architecture that applies self-attention mechanisms to image patches for image classification and recognition tasks.",
      progress: 65,
      thumbnail: "visiontrans.avif"
    },
    {
      id: 5,
      title: "Anomaly Detection",
      description: "Techniques for identifying unusual patterns or outliers in image data, often used in industrial inspection or medical imaging.",
      progress: 70,
      thumbnail: ""
    },
    {
      id: 6,
      title: "Image Segmentation",
      description: "The task of partitioning an image into meaningful regions to locate objects and boundaries more precisely.",
      progress: 65,
      thumbnail: ""
    },
    {
      id: 7,
      title: "Text Extraction",
      description: "Techniques such as OCR for detecting and extracting text content from images and scanned documents.",
      progress: 65,
      thumbnail: ""
    },
    {
      id: 8,
      title: "U-NET",
      description: "A convolutional neural network architecture designed for biomedical image segmentation with encoder-decoder structure and skip connections.",
      progress: 65,
      thumbnail: ""
    }
    
     
   ];
 
   const handleCardClick = (title) => {
     const routes = {
       "Faster_RCNN": "/fasterrcnn",
       "Mask_RCNN": "/maskrcnn",
        "SSD": "/ssd",
        "Vision_Transformers": "/visiontran",
        "Anomaly Detection":"/anomalydetection",
        "Image Segmentation":"/imagesegmentation",
        "Text Extraction":"/imagetotext",
        "U-NET":"/unet",
        
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
           Computer Vision Models
           </h1>
         </header>
 
         <main className="flex-1 p-8 overflow-y-auto">
           <div className="space-y-8">
             <div className="text-center">
               <h1 className="text-5xl font-bold mb-4">
                 Computer Vision Models
               </h1>
               <p className="text-gray-600">
                 
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
export default ComputerVision;