import React, { useContext, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa';
import ReactQuill from "react-quill";
import Swal from 'sweetalert2';
import ApiContext from '../../context/ApiContext';
import { compressImage } from '../../utils/compressImage';

const AddDiscussion = ({ closeModal, demoDiscussions, setDemoDiscussions }) => {
    const { fetchData, userToken } = useContext(ApiContext)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [privacy, setPrivacy] = useState({ id: '', value: '' });
    const [dropdownValues, setDropdownValues] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [tags, setTags] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [links, setLinks] = useState('');
    const [linkInput, setLinkInput] = useState('');
    const [errors, setErrors] = useState({});
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showCloseConfirmationModal, setShowCloseConfirmationModal] = useState(false);

    const handleTagInputChange = (e) => setTagInput(e.target.value);

    const handleTagInputKeyPress = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            setTags(tags + ',' + tagInput.trim());
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        const tagArray = tags.split(',');
        const filteredTags = tagArray.filter(tag => tag !== tagToRemove);
        const newTags = filteredTags.join(',');
        setTags(newTags);
    }

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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to compress image.',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    const handleLinkInputChange = (e) => setLinkInput(e.target.value);

    const handleLinkInputKeyPress = (e) => {
        if (e.key === 'Enter' && linkInput.trim() !== '') {
            e.preventDefault();
            setLinks(links + ',' + linkInput.trim());
            setLinkInput('');
        }
    };

    const removeLink = (linkToRemove) => {
        const linkArray = links.split(',');
        const filteredLinks = linkArray.filter(link => link !== linkToRemove);
        const newLinks = filteredLinks.join(',');
        setLinks(newLinks);
    }

    const fetchDropdownValues = async () => {
        try {
            const endpoint = "dropdown/getDropdownValues?category=Privacy";
            fetchData(endpoint).then(result => {
                if (result && result.data) { return result.data; }
                else { throw new Error("Invalid data format"); }
            }).then(data => {
                setDropdownValues(data);
            }).catch(error => { console.error(error); });
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowConfirmationModal(true); // Show confirmation modal when submit button is clicked
    };

    const handleConfirmation = async (confirmed) => {
        if (confirmed) {
            // Proceed with form submission
            const endpoint = "discussion/discussionpost";
            const method = "POST";
            const body = {
                title,
                content,
                tags: tags,
                url: links,
                image: selectedImage,
                visibility: privacy.id,
            };
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': userToken
            };

            try {
                const data = await fetchData(endpoint, method, body, headers);
                if (!data.success) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error in posting discussion try again: ${data.message}`,
                        confirmButtonText: 'OK'
                    });
                } else if (data.success) {
                    console.log(data);
                    const newDiscussion = {
                        DiscussionID: data.postID,
                        Title: title,
                        Content: content,
                        Tag: tags,
                        ResourceUrl: links,
                        Image: selectedImage,
                        Visibility: {
                            id: privacy.id,
                            value: privacy.value
                        },
                        comment: []
                    };

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Discussion Posted Successfully',
                        confirmButtonText: 'OK'
                    });

                    setDemoDiscussions([newDiscussion, ...demoDiscussions]);
                }
            } catch (error) {
                console.log(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong, try again',
                    confirmButtonText: 'OK'
                });
            }
            setTitle('');
            setContent('');
            setTags('');
            setLinks('');
            setSelectedImage(null);
            setTagInput('');
            setLinkInput('');
            setPrivacy({ id: '', value: '' });
        }

        // Close the modal after confirmation
        setShowConfirmationModal(false);
        closeModal();
    };

    const handleCloseConfirmation = (confirmed) => {
        if (confirmed) {
            // Reset the form
            setTitle('');
            setContent('');
            setTags('');
            setLinks('');
            setSelectedImage(null);
            setTagInput('');
            setLinkInput('');
            setPrivacy({ id: '', value: '' });
            setErrors({});

            // Close the modal
            closeModal();
        }
        setShowCloseConfirmationModal(false);
    };

    useEffect(() => {
        try {
            fetchDropdownValues();
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleCloseModal = () => {
        setShowCloseConfirmationModal(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-4">Start a New Discussion</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title <span className="text-red-500">*</span></label>
                    <input
                        id="title"
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
                        Content <span className="text-red-500">*</span>
                    </label>
                    <ReactQuill id="content" theme="snow" value={content} onChange={setContent} className="border rounded-lg h-48"
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, 3, false] }],
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["link", "formula"],
                                ["clean"],
                            ]
                        }}
                    />
                </div>

                <div className="mb-4 pt-8">
                    <label className="block text-gray-700 font-bold mb-2">Tags</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-lg" value={tagInput} onChange={handleTagInputChange} onKeyPress={handleTagInputKeyPress} placeholder="Press Enter to add a tag" />
                    <div className="mt-2 flex flex-wrap">
                        {tags.split(',').filter(tag => tag).map((tag, index) => (
                            <div key={index} className="flex items-center bg-DGXgreen text-white rounded-full px-3 py-1 mr-2 mt-2">
                                <span>{tag}</span>
                                <button type="button" className="ml-2 focus:outline-none" onClick={() => removeTag(tag)}>
                                    <FaWindowClose />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Links
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={linkInput}
                        onChange={handleLinkInputChange}
                        onKeyPress={handleLinkInputKeyPress}
                        placeholder="Press Enter to add a link"
                    />
                    <div className="mt-2 flex flex-wrap">
                        {links.split(',').filter(link => link).map((link, index) => (
                            <div key={index} className="flex items-center bg-DGXgreen text-white rounded-full px-3 py-1 mr-2 mt-2">
                                <span>{link}</span>
                                <button
                                    type="button"
                                    className="ml-2 focus:outline-none"
                                    onClick={() => removeLink(link)}
                                >
                                    <FaWindowClose />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4 relative">
                    <label className="block text-gray-700 font-bold mb-2">Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border w-full p-2"
                    />

                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

                    {selectedImage && (
                        <div className="mt-2">
                            <img src={selectedImage} alt="Selected" className="max-h-40" />
                        </div>
                    )}

                    {/* Validation message positioned at the bottom-left */}
                    <div className="absolute bottom-0 right-0 text-xs text-DGXblue mt-1">
                        <span>Max size: 50KB | Formats: .jpeg, .png .svg</span>
                    </div>
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Privacy
                    </label>
                    <select
                        value={privacy.value}
                        onChange={(e) => {
                            const selectedOption = dropdownValues.find(item => item.ddValue.toLowerCase() === e.target.value);
                            if (selectedOption) {
                                setPrivacy({ id: selectedOption.idCode, value: selectedOption.ddValue.toLowerCase() });
                            }
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        <option value="">Select Privacy</option>
                        {dropdownValues.map((item) => (
                            <option key={item.idCode} value={item.ddValue.toLowerCase()}>
                                {item.ddValue}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="bg-DGXgreen text-white py-2 px-4 rounded-lg"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Confirm Submission</h3>
                        <p>Are you sure you want to post this discussion?</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
                                onClick={() => setShowConfirmationModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-DGXgreen text-white py-2 px-4 rounded-lg"
                                onClick={() => handleConfirmation(true)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showCloseConfirmationModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Confirm Close</h3>
                        <p>Are you sure you want to close the form? Any unsaved changes will be lost.</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
                                onClick={() => setShowCloseConfirmationModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-DGXgreen text-white py-2 px-4 rounded-lg"
                                onClick={() => handleCloseConfirmation(true)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddDiscussion;