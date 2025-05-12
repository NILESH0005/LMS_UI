import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ObjectClassification = () => {
  const navigate = useNavigate();

  const models = [
    {
      id: 1,
      title: "Guides",
      description: "Comprehensive tutorials on image classification with deep learning: explore CNN basics, common architectures, datasets, and model evaluation techniques.",
      progress: 70,
      thumbnail: "objectclas.jpg",
    },
    {
      id: 2,
      title: "CNN-CIFAR-10",
      description: "Build and train CNNs from scratch on the CIFAR-10 dataset using PyTorch/TensorFlow; includes data augmentation, architecture tuning, and visualization of model performance.",
      progress: 65,
      thumbnail: "Objectclas1.jpeg",
    },
    {
      id: 3,
      title: "GoogleNet",
      description: "Dive into GoogleNet (Inception v1): understand inception modules, architectural innovations, and how to implement and train it on datasets like CIFAR or ImageNet.",
      progress: 70,
      thumbnail: "objectclas.jpeg",
    },
    {
      id: 4,
      title: "AlexNet",
      description: "Study the pioneering AlexNet architecture: learn about ReLU, dropout, overlapping pooling, and train it on standard image classification datasets using deep learning frameworks.",
      progress: 65,
      thumbnail: "Objectclas1.jpeg",
    },
    {
      id: 5,
      title: "ConvNeXt",
      description: "Explore ConvNeXt, a modernized CNN inspired by Transformer design: understand its architecture, training procedures, and performance on datasets like ImageNet.",
      progress: 70,
      thumbnail: "objectclas.jpeg",
    },
    {
      id: 6,
      title: "Vgg16",
      description: "Implement and fine-tune VGG16 for image classification: grasp its deep yet simple design, and adapt it for various real-world datasets using transfer learning.",
      progress: 65,
      thumbnail: "Objectclas1.jpeg",
    },
    {
      id: 7,
      title: "KNN",
      description: "Learn the fundamentals of the K-Nearest Neighbors algorithm and how to apply it to image classification tasks as a baseline or lightweight model.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 8,
      title: "Transfer Learning - Using CNN",
      description: "Apply transfer learning with pre-trained CNNs like VGG, ResNet, and MobileNet: reuse feature extractors for custom tasks and optimize with minimal data.",
      progress: 65,
      thumbnail: "",
    }
    
  ];

  const handleCardClick = (title) => {
    const routes = {
      "Guides": "/ObjectGuide",
      "Practical Implementation": "/ObjectClass",
      "GoogleNet":"/googlenet",
      "AlexNet":"/alexnet",
      "Vgg16":"/vgg16",
      "ConvNeXt":"/convnext",
      "KNN":"/knn",
      "CNN-CIFAR-10":"/cnncifar",
      "Transfer Learning - Using CNN":"/transfer"
  
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