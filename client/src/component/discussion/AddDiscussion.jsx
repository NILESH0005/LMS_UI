import React, { useContext, useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa';
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
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
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                const compressedFile = await compressImage(file);
                setSelectedImage(compressedFile);
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
        const endpoint = "discussion/discussionpost";
        const method = "POST";
        const body = {
            title,
            content,
            tags: tags,
            url: links,
            image: selectedImage,
            visibility:  privacy.id,
                
        };
        const headers = {
            'Content-Type': 'application/json',
            'auth-token': userToken
        };

        try {
            const data = await fetchData(endpoint, method, body, headers);
            if (!data.success) {
                toast.error(`Error in posting discussion try again: ${data.message}`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (data.success) {
                console.log(data);
                if (privacy.value == "private") {
                    toast.success("Private Discussion Posted Successfully", {
                        position: "center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    const newDiscussion = {
                        DiscussionID: data.postID,
                        Title: title,
                        Content: content,
                        Tag: tags,
                        ResourceUrl: links,
                        Image: selectedImage,
                        Visibility:{
                            id: privacy.id,
                            value: privacy.value
                        },
                        comment: []
                    };
                    setDemoDiscussions([newDiscussion, ...demoDiscussions]);
                    toast.success("Disscussion Post Successfully", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        style: {
                            backgroundColor: 'green',
                            color: 'white',
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);

            toast.error(`On catching error: Something went wrong, try again`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
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
    };
    useEffect(() => {
        try {
            fetchDropdownValues()
        } catch (error) {
            console.error(error);

        }
    }, [])
    return (
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
                <ReactQuill id="content" theme="snow" value={content} onChange={setContent} className="border rounded-lg"
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

            <div className="mb-4">
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

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {selectedImage && (
                    <div className="mt-2">
                        <img src={selectedImage} alt="Selected" className="max-h-40" />
                    </div>
                )}
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
                    onClick={closeModal}
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
    )
}

export default AddDiscussion