import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ObjectClassification = () => {
  const navigate = useNavigate();

  const models = [
    {
      id: 1,
      title: "Guides",
      description: "Learn to categorize images into predefined classes using deep learning models like CNNs, covering architectures (ResNet, EfficientNet), datasets (ImageNet, CIFAR), and evaluation metrics (accuracy, confusion matrices).",
      progress: 70,
      thumbnail: "objectclas.jpeg",
    },
    {
      id: 2,
      title: "Practical Implementation",
      description: "Build and train classifiers in PyTorch/TensorFlow: Preprocess data, fine-tune pre-trained models (VGG, MobileNet), and deploy with ONNX or TFLite for real-world applications.",
      progress: 65,
      thumbnail: "Objectclas1.jpeg",
    }
  ];

  const handleCardClick = (title) => {
    const routes = {
      "Guides": "/ObjectGuide",
      "Practical Implementation": "/ObjectClass",
  
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
            Object Classification Models
          </h1>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">
              Object Classification Models
              </h1>
              <p className="text-gray-600">
                Explore state-of-the-art object classification models
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
};

export default ObjectClassification;