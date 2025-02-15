import React, { useRef } from 'react';
import { useState, useContext, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ApiContext from '../../context/ApiContext.jsx';
import { compressImage } from '../../utils/compressImage.js';

const eventColors = {
    workshop: '#013D54',
    event: '#76B900',
};

const EventTable = () => {
    const localizer = momentLocalizer(moment);
    const { fetchData, userToken, user } = useContext(ApiContext);
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        category: 'Select one',
        companyCategory: 'Select one',
        poster: null,
        venue: '',
        description: '',
        host: '',
        registerLink: '', // Add registerLink to state
    });

    const [errors, setErrors] = useState({});
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


    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch("/api/getEvents"); // Replace with your API endpoint
            const data = await response.json();
            setEvents(data);
        };
        fetchEvents();
    }, []);

    
    const addEvent = async () => {
        const response = await fetch("/api/addEvent", { method: 'POST' }); // Add data to the event
        const result = await response.json();
        setEvents(prevEvents => [...prevEvents, result]); // Add the new event to the table
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewEvent({ ...newEvent, poster: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleDescriptionChange = (value) => {
        setNewEvent({ ...newEvent, description: value });
    };


    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file) {
                const compressedFile = await compressImage(file);
                setNewEvent({ ...newEvent, [poster]: compressedFile });
            }
        }
    };



    const handleSubmit = async (events) => {
        const errors = {};

        // Validate form fields
        if (!newEvent.title) errors.title = 'Event title is required.';
        if (!newEvent.start) errors.start = 'Start date is required.';
        if (!newEvent.end) errors.end = 'End date is required.';
        if (newEvent.category === 'Select one') errors.category = 'Please select a category.';
        if (newEvent.companyCategory === 'Select one') errors.companyCategory = 'Please select a company category.';
        if (!newEvent.venue) errors.venue = 'Venue is required.';
        if (!newEvent.description) errors.description = 'Description is required.';
        if (!newEvent.host) errors.host = 'Host is required.';
        if (!newEvent.registerLink) errors.registerLink = 'Register link is required.';

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
            'auth-token': userToken
        };
        const body = {
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            category: newEvent.category,
            companyCategory: newEvent.companyCategory,
            venue: newEvent.venue,
            host: newEvent.host,
            registerLink: newEvent.registerLink,
            poster: newEvent.poster, // Ensure you handle the poster appropriately
            description: newEvent.description,
        };


        try {
            const data = await fetchData(endpoint, method, body, headers);
            if (data.success) {
                setEvents([
                    ...events,
                    {
                        ...newEvent,
                        start: new Date(newEvent.start),
                        end: new Date(newEvent.end),
                    },
                ]);
                resetForm();
                setIsModalOpen(false);
                console.log('Event added successfully!', data.message);
            } else {
                console.error(`Server Error: ${data.message}`);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding event:', error);
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


    return (


        <div className="container mx-auto mt-10">
            <div>
                <h1 className='flex justify-center items-center font-bold text-3xl mb-10'>Events and Workshops Calendar</h1>
                <p className="mt-1 flex text-md justify-center items-center font-normal text-gray-500 dark:text-gray-400">Browse and manage Events in the DGX community.</p>
            </div>


        </div>

    );
};

export default EventTable;
