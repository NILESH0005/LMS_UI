import React, { useState, useEffect, useContext } from "react";
import { MdAdd } from "react-icons/md";
import { IoMdList } from "react-icons/io";
import BlogForm from "../Admin/Components/BlogComponents/BlogForm.jsx"
import LoadPage from "./LoadPage.jsx"
import ApiContext from "../context/ApiContext";
// import DetailsBlogModal from "./blog/DetailsBlogModal.jsx";
import BlogModal from "./BlogModal.jsx";

const AddUserBlog = () => {
  const [showForm, setShowForm] = useState(false);
  const { fetchData, user } = useContext(ApiContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBlog(null);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const endpoint = "blog/getBlog";
      const method = "POST";
      const headers = { 'Content-Type': 'application/json' };

      try {
        const result = await fetchData(endpoint, method, {}, headers);
        console.log(result)
        if (result.success && Array.isArray(result.data)) {
          setBlogs(result.data);
        } else {
          console.error("Invalid data format:", result);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [fetchData]);



  const filteredBlogs = blogs.filter((blog) => blog.UserID === user.UserID);
  console.log("user ID is :", user.UserID);
  console.log("filtered blogs is ", filteredBlogs);



  if (loading) {
    return <LoadPage />;
  }

  return (
    <div className="p-6  min-h-screen">
      {/* Toggle Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-3 bg-DGXblue from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg shadow-md hover:scale-105 transition-all duration-300 text-lg font-semibold"
        >
          {showForm ? "My Blogs" : "Add Blog"}
          {showForm ? <IoMdList className="size-6" /> : <MdAdd className="size-6" />}
        </button>
      </div>

      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {showForm ? (
          <BlogForm setBlogs={setBlogs} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div
                  key={blog.BlogID}
                  className="p-5 rounded-xl shadow-lg border-2 border-gray-200 bg-white hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col gap-3"
                  style={{ height: "400px" }} // Set a fixed height for the card
                >
                  {/* Blog Image */}
                  <div className="w-full h-44 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">No Image Available</span>
                    )}
                  </div>

                  {/* Blog Details */}
                  <div className="flex flex-col gap-2 flex-grow">
                    <h3 className="text-lg font-bold text-gray-900">{blog.title}</h3>

                    {/* Blog content preview with max 3 lines */}
                    <p className="text-gray-600 overflow-hidden line-clamp-3 h-[60px]">
                      {blog.content}
                    </p>

                    <span className="text-gray-500 text-sm">
                      Published: {new Date(blog.publishedDate).toDateString()}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full self-start ${blog.Status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : blog.Status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {blog.Status}
                  </span>

                  {/* Admin Remark (Only for Rejected Blogs) */}
                  {blog.Status === "Rejected" && blog.AdminRemark && (
                    <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md">
                      <span className="font-semibold">Admin Remark:</span> {blog.AdminRemark}
                    </div>
                  )}

                  {/* View Button */}
                  <button
                    onClick={() => openModal(blog)}
                    className="w-full bg-DGXblue text-white py-2 text-lg rounded-md hover:bg-indigo-700 transition-all"
                  >
                    View Details
                  </button>
                </div>

              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No blogs found.</p>
            )}
          </div>
        )}
      </div>

      {/* Render the Modal When Open */}
      {isModalOpen && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </div>
  );
};

export default AddUserBlog;
