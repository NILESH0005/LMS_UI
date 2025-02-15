import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([
    {
      title: "AI Model Training",
      gif: "/gif1.gif",
      description: "A powerful AI model training framework for deep learning.",
      techStack: "Python, TensorFlow, NVIDIA DGX",
      isEditing: false,
    },
    {
      title: "Computer Vision API",
      gif: "/gif2.gif",
      description: "A fast and scalable computer vision API for edge devices.",
      techStack: "OpenCV, PyTorch, Flask",
      isEditing: false,
    },
    {
      title: "Generative AI",
      gif: "/gif4.gif",
      description: "An AI-powered creative tool for generating artwork and designs.",
      techStack: "Stable Diffusion, Python, CUDA",
      isEditing: false,
    },
    {
      title: "Data Visualization Suite",
      gif: "/gif3.gif",
      description: "A real-time data visualization platform with ML insights.",
      techStack: "D3.js, React, WebGL",
      isEditing: false,
    },
  ]);

  const toggleEdit = (index) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === index ? { ...project, isEditing: !project.isEditing } : project
      )
    );
  };

  const handleEdit = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleGifUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedProjects = [...projects];
        updatedProjects[index].gif = e.target.result;
        setProjects(updatedProjects);
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => {
    setProjects([...projects, { title: "New Project", gif: "", description: "", techStack: "", isEditing: false }]);
    Swal.fire("Success!", "Project added successfully!", "success");
  };

  const deleteProject = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
        Swal.fire("Deleted!", "Your project has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <h2 className="text-4xl font-extrabold flex items-center gap-3 mb-8">
        🚀 Project Showcase <span className="text-blue-400 animate-pulse">| Featured Works</span>
      </h2>
      <button onClick={addProject} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg">
        Add Project
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 text-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl p-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-full h-[250px] flex items-center justify-center bg-black">
              {project.gif && (
                <img src={project.gif} alt={project.title} className="w-full h-full object-cover opacity-80" />
              )}
              <input type="file" accept="image/gif" onChange={(e) => handleGifUpload(index, e)} className="absolute bottom-2 left-2 text-sm" />
            </div>
            <div className="p-4">
              {project.isEditing ? (
                <>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => handleEdit(index, "title", e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded-md text-white text-lg font-bold"
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) => handleEdit(index, "description", e.target.value)}
                    className="w-full bg-gray-700 p-2 mt-2 rounded-md text-white text-sm"
                    placeholder="Project Description"
                  />
                  <input
                    type="text"
                    value={project.techStack}
                    onChange={(e) => handleEdit(index, "techStack", e.target.value)}
                    className="w-full bg-gray-700 p-2 mt-2 rounded-md text-white text-sm"
                    placeholder="Tech Stack"
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm mt-2">{project.description}</p>
                  <p className="text-sm mt-2 font-semibold text-blue-400">{project.techStack}</p>
                </>
              )}
              <div className="mt-4 flex gap-2">
                <button onClick={() => toggleEdit(index)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                  {project.isEditing ? "Save" : "Edit"}
                </button>
                <button onClick={() => deleteProject(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
