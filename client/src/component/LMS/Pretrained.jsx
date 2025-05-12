import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const Pretrained = () => {
const navigate = useNavigate();

  const models = [
    
      {
        "id": 1,
        "title": "DeepSpeech",
        "description": "An end-to-end automatic speech recognition (ASR) system developed by Mozilla that uses RNNs to convert spoken audio into text, with pre-trained models available in multiple languages.",
        "progress": 70,
        "thumbnail": "deepspeech1.avif"
      },
      {
        "id": 2,
        "title": "DETR",
        "description": "DEtection TRansformer (DETR) is an object detection model that integrates CNNs with transformers for end-to-end detection without the need for anchor boxes, trained on COCO and other datasets.",
        "progress": 65,
        "thumbnail": "Detr.avif"
      },
      {
        "id": 3,
        "title": "LSTM",
        "description": "Long Short-Term Memory (LSTM) is a type of recurrent neural network capable of learning long-term dependencies, widely used in time-series forecasting, speech recognition, and natural language processing.",
        "progress": 65,
        "thumbnail": "lstm.png"
      },
      {
        "id": 4,
        "title": "Resnet",
        "description": "ResNet (Residual Network) is a deep convolutional neural network with skip connections that allow training of very deep architectures like ResNet-50, achieving high performance on image classification tasks.",
        "progress": 65,
        "thumbnail": "Resnet50.avif"
      },
      {
        "id": 5,
        "title": "BLIP",
        "description": "Bootstrapped Language-Image Pretraining (BLIP) is a multimodal model that combines vision and language for tasks like image captioning and visual question answering, using a transformer-based architecture.",
        "progress": 65,
        "thumbnail": ""
      },
      {
        "id": 6,
        "title": "T5",
        "description": "T5 (Text-to-Text Transfer Transformer) is a unified NLP framework by Google that casts all text-based language problems into a text-to-text format, enabling tasks like translation, summarization, and question answering using a single model..",
        "progress": 65,
        "thumbnail": ""
      },
      {
        "id": 7,
        "title": "TAPAS",
        "description": "TAPAS (Tabular Pretraining for Answering Semi-structured tables) is a BERT-based model designed to answer questions from tables directly without needing table-to-text conversion.",
        "progress": 65,
        "thumbnail": ""
      },
      {
        "id": 8,
        "title": "DenseNet",
        "description": "DenseNet (Densely Connected Convolutional Networks) is a CNN architecture where each layer is connected to every other layer in a feed-forward fashion, improving feature reuse and efficiency.",
        "progress": 65,
        "thumbnail": ""
      }
    
    
  ];

  const handleCardClick = (title) => {
    const routes = {
      "DeepSpeech": "/predeepspeech",
      "DETR": "/predetr",
      "LSTM": "/prelstm",
      "Resnet": "/preresnet",
      "BLIP":"/preblip",
      "T5":"/prets",
      "TAPAS":"/pretapas",
      "DenseNet":"/predensenet"
  
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
            Pre-Trained Models
          </h1>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">
                Pre-Trained Models
              </h1>
              <p className="text-gray-600">
                Explore state-of-the-art Pre Trained models
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
export default Pretrained;