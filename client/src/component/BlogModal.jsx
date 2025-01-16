import { faImages, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbUserSquareRounded } from "react-icons/tb";

const BlogModal = ({ blog, closeModal }) => {
    const { title, image, author, published_date, content } = blog || {};
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full h-full max-w-full relative overflow-y-auto">
                <button className="text-black text-2xl absolute top-2 right-3" onClick={closeModal}><FontAwesomeIcon icon={faXmark} /></button>
                <div className="flex flex-col items-center h-full p-10">
                    <div className="w-full lg:w-1/2 mb-6">
                        <img className="w-full rounded" src={image} alt={title} />
                    </div>
                    <div className="w-full lg:w-2/3 lg:px-10">
                        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
                        <p className="mb-2 text-gray-500 flex justify-center items-center gap-2">
                            <TbUserSquareRounded className="text-black text-3xl" />
                            {author}
                        </p>
                        <p className="mb-4 text-sm text-gray-500 text-center">Published: {published_date}</p>
                        <p className="text-lg text-justify">{content}</p>

                    </div>

                    <div>
                        <button
                            className="m-6 bg-DGXblue text-white px-6 py-2 rounded-lg hover:bg-red-"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogModal;