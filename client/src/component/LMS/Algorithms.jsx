import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Algorithms = () => {
  const navigate = useNavigate();

  const algorithms = [
    {
      id: 1,
      title: "DeepSpeech",
      description: "An end-to-end automatic speech recognition (ASR) system using RNNs that converts audio to text, with pre-trained models available for English and other languages.",
      progress: 35,
      thumbnail: "deepspeech1.png",
    },
    {
      id: 2,
      title: "DETR",
      description: "An object detection model combining CNNs with transformers, offering end-to-end training with pre-trained models for COCO dataset detection without anchor boxes.",
      progress: 45,
      thumbnail: "Detr.png",
    },
    {
      id: 3,
      title: "LSTM",
      description: " specialized RNN architecture for sequence modeling that handles long-term dependencies, with pre-trained models widely used in time-series forecasting and NLP tasks like text generation.",
      progress: 65,
      thumbnail: "lstm.png",
    },
    {
      id: 4,
      title: "Resnet50",
      description: "A 50-layer deep convolutional neural network with residual connections, featuring pre-trained models on ImageNet that excel in image classification and transfer learning.",
      progress: 75,
      thumbnail: "Resnet50.png",
    },
    {
      id: 5,
      title: "Decision Tree Classifier",
      description: "A tree-based supervised learning algorithm used for both classification and regression tasks. It splits the data based on feature values to form decision rules that predict outcomes.",
      progress: 35,
      thumbnail: ""
    },
    {
      id: 6,
      title: "Gradient Descent",
      description: "An optimization algorithm used to minimize loss functions in machine learning models by iteratively adjusting weights in the direction of the steepest descent.",
      progress: 45,
      thumbnail: "g"
    },
    {
      id: 7,
      title: "Linear Regression",
      description: "A statistical method for modeling the relationship between a dependent variable and one or more independent variables using a straight-line fit.",
      progress: 65,
      thumbnail: ""
    },
    {
      id: 8,
      title: "SVM",
      description: "Support Vector Machine is a supervised learning algorithm used for classification and regression. It finds the optimal hyperplane that best separates different classes in the feature space.",
      progress: 75,
      thumbnail: ""
    }
    
  ];

  const handleCardClick = (title) => {
    const routes = {
      "DeepSpeech": "/deepspeech",
      "DETR": "/detr",
      "LSTM": "/lstm",
      "Resnet50": "/resnet",
      "Decision Tree Classifier":"/decisiontree",
      "Gradient Descent":"/gradient",
      "Linear Regression":"/linearregression",
      "SVM":"/svm"


    };

    const route = routes[title];
    if (route) {
      navigate(route);
    } else {
      console.warn(`No route defined for algorithm: ${title}`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-6">
          <h1 className="text-3xl font-bold">
            Welcome to the Algorithm Modules
          </h1>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">
                Algorithm Modules Platform
              </h1>
              <p className="text-gray-600">
                Explore our interactive machine learning algorithm modules
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {algorithms.map((algorithm) => (
                <motion.div
                  key={algorithm.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200"
                  onClick={() => handleCardClick(algorithm.title)} 
                >
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={algorithm.thumbnail}
                      alt={algorithm.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{algorithm.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {algorithm.description}
                  </p>
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{algorithm.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${algorithm.progress}%` }}
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
};

export default Algorithms;