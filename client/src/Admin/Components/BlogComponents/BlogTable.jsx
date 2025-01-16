import React, { useState } from 'react'
import BlogModal from '../../../component/BlogModal';

const BlogTable = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };
  return (
    <div><table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-200">
          {/* <th className="border px-4 py-2">ID</th> */}
          <th className="border px-4 py-2">Title</th>
          <th className="border px-4 py-2">Category</th>
          <th className="border px-4 py-2">Author</th>
          <th className="border px-4 py-2">Published Date</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog.BlogID} className="border-t">
            {/* <td className="border px-4 py-2">{blog.BlogID}</td> */}
            <td className="border px-4 py-2">{blog.title}</td>
            <td className="border px-4 py-2">{blog.category}</td>
            <td className="border px-4 py-2">{blog.author}</td>
            <td className="border px-4 py-2">{blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString() : '-'}</td>
            <td className="border px-4 py-2"><button className="bg-DGXblue text-white px-4 py-1 rounded-lg" onClick={(e) => { openModal(blog) }}>View</button></td>
          </tr>
        ))}
      </tbody>
    </table>
      {isModalOpen && selectedBlog && <BlogModal blog={selectedBlog} closeModal={closeModal} />}
    </div>
  )
}

export default BlogTable