import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const projects = [
  { title: "AI Model Training", gif: "/gif1.gif", description: "A powerful AI model training framework for deep learning.", techStack: "Python, TensorFlow, NVIDIA DGX" },
  { title: "Computer Vision API", gif: "/gif2.gif", description: "A fast and scalable computer vision API for edge devices.", techStack: "OpenCV, PyTorch, Flask" },
  { title: "Generative AI", gif: "/gif4.gif", description: "An AI-powered creative tool for generating artwork and designs.", techStack: "Stable Diffusion, Python, CUDA" },
  { title: "Data Visualization Suite", gif: "/gif3.gif", description: "A real-time data visualization platform with ML insights.", techStack: "D3.js, React, WebGL" }
];

const ProjectShowcase = () => {
  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <h2 className="text-4xl font-extrabold flex items-center gap-3 mb-8">
        🚀 Project Showcase <span className="text-blue-400 animate-pulse">| Featured Works</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 text-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}>
            <div className="relative w-full h-[250px] flex items-center justify-center bg-black">
              <img src={project.gif} alt={project.title} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-300">{project.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{project.description}</p>
              <p className="text-sm text-green-400 mt-2">Tech Stack: {project.techStack}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;