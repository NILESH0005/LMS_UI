import React, { useRef } from 'react';
import { useState, useContext, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { images } from '../constant/index.js';
// import { images } from '../constant/index.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ApiContext from '../../context/ApiContext'
import { compressImage } from '../../utils/compressImage.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventForm = () => {
    const { user, fetchData, userToken } = useContext(ApiContext);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [statusFilter, setStatusFilter] = useState("");

    const [dropdownData, setDropdownData] = useState({
        categoryOptions: [],
        companyCategoryOptions: []
    });

    const filteredEvents = events.filter(event =>
        statusFilter === "" || event.Status === statusFilter
    );
    // const [newEventDD, setNewEventDD] = useState({
    //   category: '',
    //   companyCategory: ''
    // });

    useEffect(() => {
        const fetchDropdownValues = async (category) => {
            const endpoint = `dropdown/getDropdownValues?category=${category}`;
            const method = 'GET';
            const headers = {
                'Content-Type': 'application/json',
                'auth-token': userToken,    
            };

            try {
                const data = await fetchData(endpoint, method, headers);
                console.log(`Fetched ${category} data:`, data); 
                return data.success ? data.data : [];
            } catch (error) {
                console.error('Error fetching dropdown values:', error);
                return [];
            }
        };

        const fetchCategories = async () => {
            try {
                const [eventTypeOptions, eventHostOptions] = await Promise.all([
                    fetchDropdownValues('eventType'),
                    fetchDropdownValues('eventHost'),
                ]);

                setDropdownData({
                    categoryOptions: eventTypeOptions,
                    companyCategoryOptions: eventHostOptions,
                });
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchCategories();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const [errors, setErrors] = useState({});
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        categoryId: dropdownData.categoryOptions[0]?.idCode || '',
        companyCategoryId: dropdownData.companyCategoryOptions[0]?.idCode || '',
        poster: '',
        venue: '',
        description: '',
        host: '',
        registerLink: '',
    });

    const handleCloseConfirmationModal = () => {
        setShowCancelConfirmation(true); // Show the confirmation modal
    };

    // const handleEditEvent = (event) => {
    //     setNewEvent({
    //         title: event.EventTitle || '',
    //         start: moment(event.StartDate).format('YYYY-MM-DD') || '',
    //         end: moment(event.EndDate).format('YYYY-MM-DD') || '',
    //         category: event.categoryId || '',
    //         companyCategory: event.companyCategoryId || '',
    //         poster: event.EventImage || null,
    //         venue: event.Venue || '',
    //         description: event.EventDescription || '',
    //         host: event.Host || '',
    //         registerLink: event.RegistrationLink || '',
    //     });
    //     setModalType('edit'); // Set modal type to "edit"
    //     setIsModalOpen(true); // Open the modal
    // };

    const handleAddEvent = () => {
        resetForm(); // Clear the form
        setModalType('add'); // Set modal type to "add"
        setIsModalOpen(true); // Open the modal
    };

    useEffect(() => {

        const fetchEvents = async () => {
            const endpoint = "eventandworkshop/getEvent";
            const method = "GET";
            const headers = {
                'Content-Type': 'application/json',
            };

            try {
                const result = await fetchData(endpoint, method, {}, headers);
                console.log("event result:", result)
                if (result.success && Array.isArray(result.data)) {
                    setEvents(result.data);
                } else {
                    console.error("Invalid data format:", result);
                    setEvents([]);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [fetchData]);


    // const [selectedEvent, setSelectedEvent] = useState(null);
    // const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    // Create refs for input fields
    const titleRef = useRef(null);
    const startRef = useRef(null);
    const endRef = useRef(null);
    const categoryRef = useRef(null);
    const companyCategoryRef = useRef(null);
    const venueRef = useRef(null);
    const hostRef = useRef(null);
    const descriptionRef = useRef(null);
    const registerLinkRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const maxLength = 800;

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const allowedFormats = ["image/jpeg", "image/png", "image/svg+xml", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const maxSize = 50 * 1024; // 50KB
            let errorMessage = "";

            if (!allowedFormats.includes(file.type)) {
                errorMessage = "Invalid format! Only JPEG, PNG, SVG, and Word files are allowed.";
            } else if (file.size > maxSize) {
                errorMessage = "File size exceeds 50KB! Please upload a smaller file.";
            }

            if (errorMessage) {
                setErrors((prevErrors) => ({ ...prevErrors, poster: errorMessage }));
                e.target.value = ""; // Reset the input field
                return;
            }

            setErrors((prevErrors) => ({ ...prevErrors, poster: "" })); // Clear previous errors

            const reader = new FileReader();
            reader.onloadend = () => {
                setNewEvent({ ...newEvent, poster: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDescriptionChange = (value) => {
        if (value.length > maxLength) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: `Description must be within ${maxLength} characters.`,
            }));
            return; // Stop if the length exceeds the max limit
        }

        setErrors((prevErrors) => ({ ...prevErrors, description: '' })); // Clear error if valid
        setNewEvent((prevEvent) => ({ ...prevEvent, description: value }));
    };

    // Calculate font size based on the length of the description
    const calculateFontSize = (length) => {
        // Decrease font size as the text length increases
        if (length < 50) {
            return '16px'; // Larger text size
        } else if (length < 200) {
            return '14px'; // Medium text size
        } else {
            return '12px'; // Smaller text size
        }
    };

    // Handle focus and blur of the input to display/hide the error message
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    // Character count below the input field
    const remainingChars = maxLength - newEvent.description.length;

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                const compressedFile = await compressImage(file);
                setNewEvent({ ...newEvent, [poster]: compressedFile });
            }
        }
    };
    const formatDate = (isoString) => {
        return moment(isoString).format('DD/MM/YYYY'); // Custom date format
    };

    const formatTime = (isoString) => {
        return moment(isoString).format('HH:mm'); // Custom time format
    };

    const handleSubmit = async () => {
        const errors = {};
        if (!newEvent.title) errors.title = 'Event title is required.';
        if (!newEvent.start) errors.start = 'Start date is required.';
        if (!newEvent.end) errors.end = 'End date is required.';
        if (newEvent.categoryId === 'Select one') errors.categoryId = 'Please select a category.';
        if (newEvent.companyCategoryId === 'Select one') errors.companyCategoryId = 'Please select a company category.';
        if (!newEvent.venue) errors.venue = 'Venue is required.';
        if (!newEvent.description) errors.description = 'Description is required.';
        if (!newEvent.host) errors.host = 'Host is required.';
        if (!newEvent.registerLink) errors.registerLink = 'Register link is required.';
        if (!newEvent.poster) errors.poster = 'Poster is required.';

        // Check for errors
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            const firstErrorField = Object.keys(errors)[0];
            const refMap = {
                title: titleRef,
                start: startRef,
                end: endRef,
                category: categoryRef,
                companyCategory: companyCategoryRef,
                venue: venueRef,
                host: hostRef,
                description: descriptionRef,
                registerLink: registerLinkRef,
            };
            const element = refMap[firstErrorField].current;
            if (element) {
                element.focus();
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        const endpoint = 'eventandworkshop/addEvent';
        const method = 'POST';
        const headers = {
            'Content-Type': 'application/json',
            'auth-token': userToken,
        };
        const body = {
            userID: user.UserID,
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            category: newEvent.categoryId, // Send categoryId
            companyCategory: newEvent.companyCategoryId,
            venue: newEvent.venue,
            host: newEvent.host,
            registerLink: newEvent.registerLink,
            poster: newEvent.poster, // Ensure you handle the poster appropriately
            description: newEvent.description,
        };
        console.log("body is ", body)

        try {
            const data = await fetchData(endpoint, method, body, headers);
            console.log("data is ", data);
            if (data.success) {
                const addedEvent = {
                    EventTitle: newEvent.title,
                    StartDate: newEvent.start,
                    EndDate: newEvent.end,
                    Category: newEvent.categoryId,
                    CompanyCategory: newEvent.companyCategoryId,
                    Venue: newEvent.venue,
                    Host: newEvent.host,
                    RegistrationLink: newEvent.registerLink,
                    EventImage: newEvent.poster,
                    EventDescription: newEvent.description,
                };
                console.log("add event", addedEvent);
                // setEvents([
                //   ...events,
                //   {
                //     ...newEvent,
                //     start: new Date(newEvent.start),
                //     end: new Date(newEvent.end),
                //   },
                // ]);
                setEvents([...events, addedEvent]);
                resetForm();
                setIsModalOpen(false);
                toast.success('Event added successfully!'); // Show success toast
                console.log('Event added successfully!', data.message);
            } else {
                console.error(`Server Error: ${data.message}`);
                toast.error(`Error: ${data.message}`); // Show error toast
            }
        } catch (error) {
            console.error('Error adding event:', error);
            toast.error('An error occurred while adding the event. Please try again.'); // Show error toast
        }
    };

    const handleCloseModal = () => {
        resetForm();
        setIsModalOpen(false);
    };
    const resetForm = () => {
        setNewEvent({
            title: '',
            start: '',
            end: '',
            category: 'Select one',
            companyCategory: 'Select one',
            poster: null,
            venue: '',
            description: '',
            host: '',
            registerLink: '', // Reset registerLink
        });
        setErrors({});
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input
        }
    };

    const convertToKolkataTime = (date) => {
        const offsetIST = 5.5 * 60 * 60 * 1000; // Offset in milliseconds (5.5 hours ahead)
        return new Date(date.getTime() + offsetIST);
    };
    const handleDateChange = (e, field) => {
        const selectedDate = new Date(e.target.value); // Get selected datetime
        const kolkataTime = convertToKolkataTime(selectedDate); // Convert to IST

        const formattedDate = kolkataTime.toISOString().slice(0, 19).replace("T", " "); // Convert to SQL format

        if (field === "start") {
            if (kolkataTime < new Date()) {
                setErrors((prev) => ({ ...prev, start: "Start date cannot be in the past." }));
            } else {
                setErrors((prev) => ({ ...prev, start: "" }));
                handleChange({ target: { name: "start", value: formattedDate } });
            }
        }
        if (field === "end") {
            const startDate = new Date(newEvent.start);
            if (kolkataTime <= startDate) {
                setErrors((prev) => ({ ...prev, end: "End date must be after the start date." }));
            } else {
                setErrors((prev) => ({ ...prev, end: "" }));
                handleChange({ target: { name: "end", value: formattedDate } });
            }
        }
    };

    return (
        <div>
            <div className=" inset-0 items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="bg-white rounded-lg p-5 max-w-7xl w-full max-h-[100vh]  ">
                    <h2 className="text-xl font-bold mb-4">Add New Event</h2>

                    <div className="mb-2">
                        <label className="block text-sm font-medium">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleChange}
                            className={`p-2 border border-gray-300 rounded w-full ${errors.title ? 'border-red-500' : ''}`}
                            ref={titleRef}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium">Start Date</label>
                            <input
                                type="datetime-local"
                                name="start"
                                value={newEvent.start}
                                onChange={(e) => handleDateChange(e, "start")}
                                className={`p-2 border border-gray-300 rounded w-full ${errors.start ? "border-red-500" : ""}`}
                                min={new Date().toISOString().slice(0, 16)} // Prevents past dates
                            />
                            {errors.start && <p className="text-red-500 text-sm">{errors.start}</p>}
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium">End Date</label>
                            <input
                                type="datetime-local"
                                name="end"
                                value={newEvent.end}
                                onChange={(e) => handleDateChange(e, "end")}
                                className={`p-2 border border-gray-300 rounded w-full ${errors.end ? "border-red-500" : ""}`}
                                min={newEvent.start || new Date().toISOString().slice(0, 16)} // Ensures it's at least the start date
                            />
                            {errors.end && <p className="text-red-500 text-sm">{errors.end}</p>}
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                            <label className="block text-sm font-medium">Category</label>
                            <select
                                name="categoryId"
                                value={newEvent.categoryId || dropdownData.categoryOptions[0]?.ddValue || ''}  // Use the updated value
                                onChange={handleChange}
                                className={`p-2 border border-gray-300 rounded w-full ${errors.categoryId ? 'border-red-500' : ''}`}
                            >
                                {dropdownData.categoryOptions.map((item) => (
                                    <option key={item.idCode} value={item.idCode}>
                                        {item.ddValue}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Company Category</label>
                            <select
                                name="companyCategoryId"
                                value={newEvent.companyCategoryId || dropdownData.companyCategoryOptions[0]?.ddValue || ''}  // Set first option as default if no value
                                onChange={handleChange}
                                className={`p-2 border border-gray-300 rounded w-full ${errors.companyCategoryId ? 'border-red-500' : ''}`}
                            >
                                {/* <option value="">Select a company category</option> */}
                                {dropdownData.companyCategoryOptions.map((item) => (
                                    <option key={item.idCode} value={item.idCode}>
                                        {item.ddValue}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div className="mb-2">
                        <label className="block text-sm font-medium">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            value={newEvent.venue}
                            onChange={handleChange}
                            className={`p-2 border border-gray-300 rounded w-full ${errors.venue ? 'border-red-500' : ''}`}
                            ref={venueRef}
                        />
                        {errors.venue && <p className="text-red-500 text-sm">{errors.venue}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium">Host</label>
                        <input
                            type="text"
                            name="host"
                            value={newEvent.host}
                            onChange={handleChange}
                            className={`p-2 border border-gray-300 rounded w-full ${errors.host ? 'border-red-500' : ''}`}
                            ref={hostRef}
                        />
                        {errors.host && <p className="text-red-500 text-sm">{errors.host}</p>}
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium">Registration Link</label>
                        <input
                            type="text"
                            name="registerLink"
                            value={newEvent.registerLink}
                            onChange={handleChange}
                            className={`p-2 border border-gray-300 rounded w-full ${errors.registerLink ? 'border-red-500' : ''}`}
                            ref={registerLinkRef}
                        />
                        {errors.registerLink && <p className="text-red-500 text-sm">{errors.registerLink}</p>}
                    </div>

                    <div className="mb-2 relative">

                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium">Event Poster</label>
                            <span className='text-xs'>(Max size: 50KB | Formats: .jpeg, .png)</span>
                            {/* Validation message positioned at the bottom-left */}
                            {/* <div className="absolute top-0 right-0 text-xs text-DGXblue mt-1 p-4">
                                <span>Max size: 50KB | Formats: .jpeg, .png</span>
                            </div> */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                // accept="image/*"
                                onChange={handleFileChange}
                                className="border w-full p-2"
                            />

                            {errors.poster && (
                                <p className="text-red-500 text-sm">{errors.poster}</p>
                            )}
                            {newEvent.poster && (
                                <img
                                    src={newEvent.poster}
                                    onChange={handleImageChange}
                                    alt="Event Poster"
                                    className={`w-32 h-32 object-cover mt-2 ${errors.poster ? 'border-red-500' : ''}`}
                                />
                            )}
                        </div>

                    </div>
                    <div className="mb-2 h-50">
                        <label className="block text-sm font-medium">Event Description</label>
                        <ReactQuill
                            value={newEvent.description}
                            onChange={handleDescriptionChange}
                            className={` p-2 rounded h-40 ${errors.description ? 'border-red-500' : ''}`}
                            style={{ fontSize: calculateFontSize(newEvent.description.length) }} // Dynamically change font size
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                    [{ 'color': [] }, { 'background': [] }],
                                    [{ 'font': [] }],
                                    [{ 'align': [] }],
                                    ['clean'],
                                ],
                            }}
                            formats={[
                                'header', 'font', 'size',
                                'bold', 'italic', 'underline', 'strike',
                                'blockquote', 'list', 'bullet', 'indent',
                                'link', 'image', 'color', 'background', 'align',
                                'script',
                            ]}
                        />

                        {isFocused && errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}

                        <p className="text-sm text-gray-500 mt-1 pt-8 px-2">
                            {remainingChars} characters remaining
                        </p>
                    </div>
                    <div className="flex justify-end  ">
                        <button onClick={handleCloseConfirmationModal} className="bg-red-500 text-white p-2 rounded mr-2">Cancel</button>
                        <button
                            onClick={async (events) => {
                                await handleSubmit(events);
                            }}
                            onChange={handleAddEvent}
                            className="bg-DGXgreen text-white p-2 rounded"
                        >
                            Add Event
                        </button>
                    </div>
                </div>
            </div>
            {showModal && modalType === 'delete' && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this Event?</p>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-DGXblue hover:bg-gray-500 text-white rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteUser}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showCancelConfirmation && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Confirm Cancel</h3>
                        <p>Are you sure you want to cancel? Any unsaved changes will be lost.</p>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={() => setShowCancelConfirmation(false)} // Close the confirmation modal
                                className="px-4 py-2 bg-DGXblue hover:bg-gray-500 text-white rounded-lg"
                            >
                                No, Continue Editing
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm(); // Reset the form
                                    setIsModalOpen(false); // Close the add event modal
                                    setShowCancelConfirmation(false); // Close the confirmation modal
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="container mx-auto mt-10">
                <ToastContainer /> {/* Add this line */}
                {/* ... rest of your JSX */}
            </div>

        </div>
    )
}

export default EventForm