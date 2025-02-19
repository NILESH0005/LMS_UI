import { faImages, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbUserSquareRounded } from "react-icons/tb";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const BlogModal = ({ blog, closeModal, deleteBlog }) => {
    const { id, title, image, author, published_date, content } = blog || {};

    // Delete Confirmation
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBlog(id);
                Swal.fire("Deleted!", "Your blog has been deleted.", "success");
                closeModal();
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
        >
            <div className="bg-white max-w-2xl w-full mx-4 md:mx-0 rounded-lg shadow-lg relative overflow-hidden transition-all transform">
                
                {/* Image Section with Overlay */}
                <div className="relative w-full h-72 md:h-96">
                    <motion.img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-t-lg shadow-lg transition-transform transform hover:scale-105"
                    />

                    {/* Text Overlay on Image */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-6">
                        {/* Blog Title */}
                        <h1 className="text-white text-3xl md:text-4xl font-bold max-w-lg">
                            {title}
                        </h1>

                        {/* Author & Published Date */}
                        <div className="flex justify-between items-center text-white text-sm md:text-lg">
                            <p className="flex items-center gap-2">
                                <TbUserSquareRounded className="text-green-400 text-xl" />
                                <span className="font-medium">{author}</span>
                            </p>
                            <span className="text-gray-300">Published: {published_date}</span>
                        </div>
                    </div>
                </div>

                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl transition-transform transform hover:scale-110"
                    onClick={closeModal}
                    aria-label="Close modal"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                {/* Blog Content */}
                <div className="p-6">
                    <p className="text-gray-700 text-lg leading-relaxed text-justify">
                        {content}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-center mt-6 gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-DGXblue text-white px-6 py-2 rounded-full hover:bg-DGXgreen transition-all"
                            onClick={closeModal}
                        >
                            Close
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all flex items-center gap-2"
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            Delete
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogModal;
