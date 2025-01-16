import React, { useContext, useEffect, useState } from "react";
import { TbUserSquareRounded } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import BlogImage from "../component/BlogImage";
import blogData from "../json/blogsData.json"
import ApiContext from "../context/ApiContext";
import { toast } from "react-toastify";
import BlogModal from "../component/BlogModal";



const BlogPage = () => {
    const { fetchData } = useContext(ApiContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [showAll, setShowAll] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        try {
            const fetchBlogs = () => {
                try {
                    const endpoint = "blog/getBlog";
                    const method = "POST";
                    const headers = {
                        'Content-Type': 'application/json',
                    };

                    setLoading(true);
                    fetchData(endpoint, method, headers)
                        .then(result => {
                            if (result && result.data) {
                                return result.data;
                            } else {
                                throw new Error("Invalid data format");
                            }
                        })
                        .then((data) => {
                            console.log(data);
                            setBlogs(data)
                        })
                        .catch(error => {
                            setLoading(false);
                            toast.error(`Something went wrong: ${error.message}`, {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        });
                } catch (error) {
                    console.log(error)
                }
            };
            fetchBlogs()
        } catch (error) {
            console.log(error)
        }

    }, [fetchData]);

    const allCategories = [...new Set(blogs.map(blog => blog.category))];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const openModal = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBlog(null);
    };

    const Blog = ({ blog }) => {
        const { title, image, author, published_date } = blog || {};
        return (
            <div className="shadow-md shadow-gray-500 relative cursor-pointer" onClick={() => openModal(blog)}>
                <div>
                    <img className="w-full rounded" src={image} alt={title} />
                </div>
                <div className="pb-10 px-5">
                    <h3 className="mt-4 mb-2 font-bold hover:text-blue-600">{title}</h3>
                    <p className="mb-2 flex items-center gap-2 text-gray-500">
                        <TbUserSquareRounded className="text-black text-3xl" />
                        {author}
                    </p>
                    <p className="text-sm text-gray-500 translate-x-6">Published: {published_date}</p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <BlogImage />
            <div className="flex justify-center items-center flex-wrap gap-3">
                <div className=" flex items-center justify-center flex-wrap p-4 space-x-2 space-y-2" >
                    <button
                        className={`flex items-center justify-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 text-sm h-8 font-semibold ${selectedCategory === null ? 'bg-DGXgreen text-black' : 'bg-DGXblue text-white'} rounded-full transition-colors duration-300 ease-in-out hover:bg-DGXgreen hover:text-white`}
                        onClick={() => handleCategorySelect(null)}
                    >
                        All
                    </button>
                    {allCategories.map((category, index) => (
                        <button
                            key={index}
                            className={`flex items-center justify-center px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 h-8 text-sm font-semibold ${selectedCategory === category ? 'bg-DGXgreen text-black' : 'bg-DGXblue text-white'} rounded-full transition-colors duration-300 ease-in-out hover:bg-DGXgreen hover:text-white`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>


                {/* Blogs List */}
                <div className="max-w-7xl mx-auto mb-10 px-4 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 transition-all duration-200">
                        {blogs.filter(blog => selectedCategory === null || blog.category === selectedCategory).slice(0, pageSize).map((blog) => <Blog key={blog.BlogID} blog={blog}></Blog>)}
                    </div>

                    {/* Show More Button */}
                    {blogs.filter(blog => selectedCategory === null || blog.category === selectedCategory).length > pageSize && !showAll && (
                        <div className="flex justify-center my-10">
                            <button
                                onClick={() => {
                                    const filteredBlogs = blogs.filter(blog => selectedCategory === null || blog.category === selectedCategory);
                                    if (pageSize + 5 >= filteredBlogs.length) {
                                        setShowAll(true);
                                    }
                                    setPageSize(pageSize + 5);
                                }}
                                className="px-6 py-2 md:px-8 md:py-4 text-sm md:text-lg bg-DGXblue text-white rounded-lg hover:bg-DGXgreen"
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </div>
                {isModalOpen && selectedBlog && <BlogModal blog={selectedBlog} closeModal={closeModal} />}
            </div>
        </div>
    );
};


export default BlogPage;
