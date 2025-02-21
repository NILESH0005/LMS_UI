import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ApiContext from "../../../context/ApiContext";
import { toast } from "react-toastify";
import { compressImage } from "../../../utils/compressImage.js";

const BlogForm = ({ updateBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showCloseConfirmationModal, setShowCloseConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchData, userToken } = useContext(ApiContext);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedFormats = ["image/jpeg", "image/png", "image/svg+xml"];
      const maxSize = 50 * 1024; // 50KB

      if (!allowedFormats.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPEG, PNG, and SVG files are allowed.",
        }));
        return;
      }
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 50KB.",
        }));
        return;
      }

      try {
        const compressedFile = await compressImage(file);
        setSelectedImage(compressedFile);
        setErrors((prev) => ({ ...prev, image: null })); // Clear error
      } catch (error) {
        toast.error("Failed to compress image.");
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Blog title is required.";
    if (!author.trim()) errors.author = "Author name is required.";
    if (!category) errors.category = "Please select a category.";
    if (!publishedDate) errors.publishedDate = "Published date is required.";
    if (!content.trim()) errors.content = "Blog content is required.";
    if (!selectedImage) errors.image = "Please upload an image.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirmSubmit = async () => {
    setShowModal(false);
    setLoading(true);

    const endpoint = "blog/blogpost";
    const method = "POST";
    const headers = { "Content-Type": "application/json", "auth-token": userToken };
    const body = { title, content, image: selectedImage, author, category, publishedDate };

    try {
      const data = await fetchData(endpoint, method, body, headers);
      console.log("API Response:", data);
      let dataSuccess = data.success;

      setLoading(false);

      if (dataSuccess == true) {
        if (typeof updateBlogs === "function") {
          updateBlogs({ BlogId: data.data.postId, title, content, category, image: selectedImage, author, publishedDate });
        } else {
          console.warn("updateBlogs is not a function!");
        }
        toast.success("Blog Posted Successfully");
        resetForm();
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      toast.error("Something went wrong, please try again.");
    }
  };


  // const handleConfirmSubmit = async () => {
  //   setShowModal(false);
  //   setLoading(true);

  //   const endpoint = "blog/blogpost";
  //   const method = "POST";
  //   const headers = { "Content-Type": "application/json", "auth-token": userToken };
  //   const body = { title, content, image: selectedImage, author, category, publishedDate };

  //   try {
  //     const data = await fetchData(endpoint, method, body, headers);
  //     console.log("API Response:", data);
  //     let dataSuccess = data.success;

  //     setLoading(false);
  //     console.log("data success:", data.success);

  //     if (dataSuccess == true) {
  //       updateBlogs({ BlogId: data.data.postId, title, content, category, image: selectedImage, author, publishedDate });
  //       toast.success("Blog Posted Successfully");
  //       resetForm();
  //     } else {
  //       toast.error(`Error: ${data.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setLoading(false);
  //     toast.error("Something went wrong, please try again.");
  //   }
  // };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCategory("");
    setPublishedDate("");
    setContent("");
    setSelectedImage(null);
    setErrors({});
  };

  const handleCancel = () => {
    setShowCloseConfirmationModal(true);
  };

  const handleCloseConfirmation = (confirmed) => {
    if (confirmed) {
      resetForm();
    }
    setShowCloseConfirmationModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto mt-4 bg-white p-6 rounded shadow border-2">
        <div className="mb-4">
          <label>Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border w-full p-2"
          />
          {errors.author && <p className="text-red-500">{errors.author}</p>}
        </div>

        <div className="mb-4">
          <label>Published Date</label>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]} // Restricts future dates
            className="border w-full p-2"
          />
          {errors.publishedDate && <p className="text-red-500">{errors.publishedDate}</p>}
        </div>

        <div className="mb-4">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border w-full p-2"
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="AI">AI</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label>Blog Content</label>
          <ReactQuill value={content} onChange={(value) => setContent(value)} className=" h-48" />
          {errors.content && <p className="text-red-500">{errors.content}</p>}
        </div>

        <div className="mb-4 relative pt-10">
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border w-full p-2"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          <div className="absolute top-0 right-0 text-xs text-DGXblue  p-2">
            <span>Max size: 50KB | Formats: .jpeg, .png</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Confirmation Modal for Submission */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Submission</h3>
            <p>Are you sure you want to submit this blog post?</p>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Closing Form */}
      {showCloseConfirmationModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Close</h3>
            <p>Are you sure you want to close the form? Any unsaved changes will be lost.</p>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => handleCloseConfirmation(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleCloseConfirmation(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogForm;