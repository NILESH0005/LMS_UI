import React, { useState } from 'react';
import BlogModal from '../../../component/BlogModal';
import moment from 'moment';

const BlogTable = ({ blogs, userToken }) => {
  console.log("blogs are",blogs)
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState(""); 
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const [blogData, setBlogData] = useState(blogs); // Local state for blogs

  // Function to update blog state (status or delete)
  const updateBlogState = (blogId, newStatus) => {
    if (newStatus === "delete") {
      // Remove the blog from the table
      setBlogData((prevBlogs) =>
        prevBlogs.filter((blog) => blog.BlogID !== blogId)
      );
    } else {
      // Update the status of the blog
      setBlogData((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.BlogID === blogId ? { ...blog, Status: newStatus } : blog
        )
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };
// console.log(blog)
  // Filter blogs based on status and category
  const filteredBlogs = blogData.filter((blog) => {
    const matchesStatus = statusFilter === "" || blog.Status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "" || blog.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesStatus && matchesCategory;
  });

  console.log("Filtered blogs are:", filteredBlogs);

  return (
    <div>
      {/* Filter Dropdowns */}
      <div className="flex justify-start mb-4 space-x-4">
        <div className="flex items-center">
          <label className="mr-2 text-lg font-medium">Filter by Status:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-DGXgreen text-white">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Published Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((blog, index) => (
            <tr className={`text-center ${getStatusClass(blog.Status)}`} key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{blog.title}</td>
              <td className="border px-4 py-2">{blog.category}</td>
              <td className="border px-4 py-2">{blog.UserName}</td>
              <td className="border px-4 py-2">
                {moment.utc(blog.publishedDate).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="border px-4 py-2">{blog.Status || "Pending"}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-DGXblue text-white px-4 py-1 rounded-lg"
                  onClick={() => openModal(blog)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Blog Modal */}
      {isModalOpen && selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          closeModal={closeModal}
          updateBlogState={updateBlogState}
          userToken={userToken}
        />
      )}
    </div>
  );
};

export default BlogTable;