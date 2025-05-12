import React from 'react'
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const Generative = () => {
   const navigate = useNavigate();
 
   const models = [
    {
      id: 1,
      title: "Intro to Generative AI",
      description: "Explore the foundations of generative AI: Understand how LLMs (like GPT and Claude) and diffusion models (like DALL·E, Stable Diffusion) generate text, code, and images using transformers and attention mechanisms.",
      progress: 70,
      thumbnail: "generativellm.jpg",
    },
    {
      id: 2,
      title: "CLIP Model Tuning",
      description: "Learn how to fine-tune CLIP for aligning images and text using contrastive learning, enabling powerful multimodal search and image-captioning tasks.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 3,
      title: "LLaMA 2 Fine-Tuning",
      description: "Fine-tune LLaMA 2 for custom NLP tasks using parameter-efficient techniques (LoRA, PEFT) and align outputs with instruction tuning for better task generalization.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 4,
      title: "Phi-1.5 Model Fine-Tuning",
      description: "Customize Microsoft's Phi-1.5 small language model for downstream tasks, leveraging its efficiency for code generation, reasoning, and instruction-following.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 5,
      title: "Mistral 7B Fine-Tuning",
      description: "Implement fine-tuning workflows for Mistral 7B, a high-performance open-weight model optimized for reasoning and summarization with efficient attention mechanisms.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 6,
      title: "Summarization with T5 & BART",
      description: "Use encoder-decoder models like T5 and BART for abstractive text summarization; explore dataset preparation, training strategies, and evaluation with ROUGE metrics.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 7,
      title: "GPT-2 Fine-Tuning",
      description: "Fine-tune GPT-2 for domain-specific text generation; understand tokenization, causal language modeling, and the impact of dataset size and context length.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 8,
      title: "Stable Diffusion - Text to Image",
      description: "Generate high-quality images from text prompts using Stable Diffusion; learn prompt engineering, model inference, and customization for creative tasks.",
      progress: 65,
      thumbnail: "",
    },
    {
      id: 9,
      title: "TinyLlama Fine-Tuning",
      description: "Experiment with TinyLlama, a compact open LLM ideal for resource-constrained environments; fine-tune for chat, classification, and summarization tasks.",
      progress: 65,
      thumbnail: "",
    }
    
   ];
 
   const handleCardClick = (title) => {
     const routes = {
       "Intro to Generative AI": "/genaiguide",
       "CLIP Model Tuning": "/gai1",
       "LLaMA 2 Fine-Tuning": "/gai2",
       "Phi-1.5 Model Fine-Tuning": "/gai3",
       "Mistral 7B Fine-Tuning": "/gai4",
       "Summarization with T5 & BART": "/gai5",
       "GPT-2 Fine-Tuning": "/gai6",
       "Stable Diffusion - Text to Image": "/gai7",
       "TinyLlama Fine-Tuning": "/gai8",
   
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
           Generative AI and Large Language Models (LLM)
           </h1>
         </header>
 
         <main className="flex-1 p-8 overflow-y-auto">
           <div className="space-y-8">
             <div className="text-center">
               <h1 className="text-5xl font-bold mb-4">
               Generative AI and Large Language Models (LLM)
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
export default Generative;