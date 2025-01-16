import React, { useState, useEffect, useContext } from 'react';
import BlogForm from './BlogComponents/BlogForm';
import BlogTable from './BlogComponents/BlogTable';
import ApiContext from '../../context/ApiContext';
import { ToastContainer } from 'react-toastify';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useContext(ApiContext);
  const [isTableView, setIsTableView] = useState(true);

  // Fetch blog data when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const endpoint = 'blog/getBlog'
        const method = 'POST'
        const headers = {
          'Content-Type': 'application/json'
        }
        const body = {}

        const result = await fetchData(endpoint, method);
        if (result.success) {
          setBlogs(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        console.log(blogs);
        setLoading(false);

      }
    };

    fetchBlogs();
  }, []);



  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const updateBlogs = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Blog Manager</h1>
      <div className="mb-4">
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="bg-DGXblue text-white px-4 py-2 rounded-lg"
        >
          {isTableView ? 'Add New Blog' : 'Go to Table'}
        </button>
      </div>

      {isTableView ? (
        <BlogTable blogs={blogs} />
      ) : (
        <BlogForm updateBlogs={updateBlogs} setIsTableView={setIsTableView} />
      )}
    </div>
  );
};

export default BlogManager;
