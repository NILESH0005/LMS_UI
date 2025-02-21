import React, { useContext } from 'react';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TbUserSquareRounded } from "react-icons/tb";
import Swal from "sweetalert2";
import ApiContext from '../context/ApiContext';

const BlogModal = ({ blog, closeModal, updateBlogState }) => {

    const { title, image, author, published_date, content, Status, BlogID } = blog || {};
    const { fetchData, userToken } = useContext(ApiContext);

    const updateBlogStatus = async (blogId, Status, remark = "") => {
        const endpoint = `blog/updateBlog/${blogId}`;
        const method = "POST";
        const headers = {
            "Content-Type": "application/json",
            "auth-token": userToken,
        };

        const body = { Status, remark };

        try {
            const result = await fetchData(endpoint, method, body, headers);
            console.log(result); // Log the result for debugging

            if (result.success) {
                Swal.fire({
                    title: "Success!",
                    text: `Blog ${Status}ed successfully!`,
                    icon: "success",
                    confirmButtonText: "OK",
                });

                // Notify the parent component to update the blog state
                updateBlogState(blogId, Status);
                closeModal();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: `Failed to ${Status} blog: ${result.message}`,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: `Error ${Status}ing blog: ${error.message}`,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleAction = (status) => {
        if (status === "reject") {
            Swal.fire({
                title: "Reject Blog",
                input: "text",
                inputLabel: "Enter reason for rejection",
                inputPlaceholder: "Provide a reason for rejection...",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Reject",
                inputValidator: (value) => {
                    if (!value) {
                        return "You need to provide a reason!";
                    }
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    updateBlogStatus(BlogID, "reject", result.value);
                }
            });
        } else {
            Swal.fire({
                title: `Are you sure?`,
                text: `You are about to ${status} this blog.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: status === "approve" ? "#28a745" : "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: `Yes, ${status}!`,
            }).then((result) => {
                if (result.isConfirmed) {
                    updateBlogStatus(BlogID, status);
                }
            });
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg w-full h-full max-w-full relative overflow-y-auto">
                <button className="text-black text-2xl absolute top-2 right-3" onClick={closeModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
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
                        <p className="text-gray-500 text-center mb-4">{published_date}</p>
                        <div className="text-justify" dangerouslySetInnerHTML={{ __html: content }} />

                        {/* Buttons based on blog status */}
                        <div className="flex justify-center gap-4 mt-6">
                            {Status === "Pending" && (
                                <>
                                    <button
                                        className="bg-green-500 text-white p-2 rounded"
                                        onClick={() => handleAction("approve")}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 text-white p-2 rounded"
                                        onClick={() => handleAction("reject")}
                                    >
                                        Reject
                                    </button>
                                </>
                            )}
                            {(Status === "Approved" || Status === "Rejected") && (
                                <button
                                    className="bg-red-500 text-white p-2 rounded"
                                    onClick={() => handleAction("delete")}
                                >
                                    Delete
                                </button>
                            )}
                            <button onClick={closeModal} className="bg-DGXblue text-white p-2 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogModal;