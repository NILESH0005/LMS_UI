import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Regression = () => {
 const navigate = useNavigate();
 
   const models = [
    {
      id: 1,
      title: "Guides",
      description: "Master the theory: Learn how regression models map relationships between variables to predict continuous outcomes, from assumptions to interpretation.",
      progress: 70,
      thumbnail: "Regression.avif",
    },
    {
      id: 2,
      title: "Home Price Prediction - Single Variable",
      description: "Build a simple linear regression model to predict house prices using only one key feature—ideal for understanding the fundamentals of regression modeling.",
      progress: 65,
      thumbnail: "Regression2.png",
    },
    {
      id: 3,
      title: "Home Price Prediction - Multi Variable",
      description: "Expand your regression skills by incorporating multiple features (e.g., size, location, and age) to predict housing prices with improved accuracy.",
      progress: 65,
      thumbnail: "Regression2.png",
    },
    {
      id: 4,
      title: "Binary Logistic Regression: Predicting Life Insurance Purchase Based on Age",
      description: "Use logistic regression to predict whether a customer is likely to buy life insurance based solely on their age—a classic binary classification problem.",
      progress: 65,
      thumbnail: "Regression2.png",
    },
    {
      id: 5,
      title: "Multiclass Classification with Logistic Regression",
      description: "Apply logistic regression to problems with more than two categories—learn how to predict multiple classes using one-vs-rest or softmax approaches.",
      progress: 65,
      thumbnail: "Regression2.png",
    },
    {
      id: 6,
      title: "Salary Prediction using Linear Regression",
      description: "Predict employee salary based on features like experience, education, and role using linear regression models with real-world salary datasets.",
      progress: 65,
      thumbnail: "Regression2.png",
    },
    {
      id: 7,
      title: "Employee Retention Prediction",
      description: "Use classification techniques to forecast whether an employee is likely to stay or leave the company, based on features like satisfaction and performance.",
      progress: 65,
      thumbnail: "Regression2.png",
    },
    {
      id: 8,
      title: "Car Price Prediction",
      description: "Build a regression model to estimate car prices based on attributes such as brand, mileage, engine size, and more—ideal for automotive analytics.",
      progress: 65,
      thumbnail: "",
    }
    
   ];
 
   const handleCardClick = (title) => {
     const routes = {
       "Guides": "/reg_guide",
       "Home Price Prediction - Single Variable":"/lg1 ",
       "Home Price Prediction - Multi Variable":"/lg2 ",
       "Binary Logistic Regression: Predicting Life Insurance Purchase Based on Age":"/lg3",
       "Multiclass Classification with Logistic Regression":"/lg4",
       "Salary Prediction using Linear Regression":"/lg5",
       "Employee Retention Prediction":"/lg6",
       "Car Price Prediction":"/lg7"

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
           Regression- Linear and Logistic
           </h1>
         </header>
 
         <main className="flex-1 p-8 overflow-y-auto">
           <div className="space-y-8">
             <div className="text-center">
               <h1 className="text-5xl font-bold mb-4">
               Regression- Linear and Logistic
               </h1>
               <p className="text-gray-600">
                 Explore Regression
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
export default Regression;