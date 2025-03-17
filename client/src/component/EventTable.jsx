import React, { useRef, useState, useContext, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ApiContext from '../context/ApiContext.jsx';
import EventForm from './eventAndWorkshop/EventForm.jsx';
import DetailsEventModal from './eventAndWorkshop/DetailsEventModal.jsx';
import LoadPage from './LoadPage.jsx';

const EventTable = (props) => {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const { fetchData, userToken } = useContext(ApiContext);
  const [isTokenLoading, setIsTokenLoading] = useState(true); // New state for token loading
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dropdownData, setDropdownData] = useState({
    categoryOptions: [],
    companyCategoryOptions: []
  });

  useEffect(() => {
    const fetchDropdownValues = async (category) => {
      try {
        const response = await fetch(`http://localhost:8000/dropdown/getDropdownValues?category=${category}`);
        const data = await response.json();
        return data.success ? data.data : [];
      } catch (error) {
        console.error('Error fetching dropdown values:', error);
        return [];
      }
    };

    const fetchCategories = async () => {
      const eventTypeOptions = await fetchDropdownValues('eventType');
      const eventHostOptions = await fetchDropdownValues('eventHost');

      const eventTypeDropdown = [
        { idCode: 'All', ddValue: 'All', ddCategory: 'eventType' },
        ...eventTypeOptions,
      ];

      setDropdownData({
        categoryOptions: eventTypeOptions,
        companyCategoryOptions: eventHostOptions
      });
    };

    fetchCategories();
  }, []);

  const validateDates = () => {
    const { start, end } = newEvent;
    if (!start || !end) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select both start and end dates and times.' });
      return false;
    }

    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const currentDateTime = new Date();

    if (startDateTime < currentDateTime) {
      Swal.fire({ icon: 'error', title: 'Invalid Start Date/Time', text: 'Start time cannot be in the past.' });
      return false;
    }

    if ((endDateTime - startDateTime) / (1000 * 60) < 30) {
      Swal.fire({ icon: 'error', title: 'Invalid End Date/Time', text: 'End time must be at least 30 minutes after the start time.' });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateDates()) return;

    console.log('Event Data Submitted:', newEvent);
  };



  useEffect(() => {
    // Check if userToken is available
    if (userToken) {
      setIsTokenLoading(false); // Token is available, stop token loading
      fetchEvents(); // Fetch events only when the token is available
    } else {
      // If no token, stop loading after a short delay (simulating token check)
      const timeoutId = setTimeout(() => {
        setIsTokenLoading(false);
      }, 1000); // Adjust the delay as needed

      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [userToken]);

  const fetchEvents = async () => {
    const endpoint = "eventandworkshop/getEvent";
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      "auth-token": userToken, // Include the token in the headers
    };

    try {
      const result = await fetchData(endpoint, method, {}, headers);
      console.log("event result:", result);
      if (result.success && Array.isArray(result.data)) {
        props.setEvents(result.data);
      } else {
        console.error("Invalid data format:", result);
        props.setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      props.setEvents([]);
    } finally {
      setLoading(false);
    }
  };


  const updateEvents = (newEvent) => {
    props.setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

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

  const filteredEvents = props.events.filter((event) => {
    const matchesStatus = statusFilter === "" || event.Status === statusFilter;
    const matchesCategory = selectedCategory === "" || event.EventType === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  const handleEventUpdate = (updatedEvent) => {
    props.setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.EventID === updatedEvent.EventID ? updatedEvent : event
      )
    );
  };

  const handleEventDelete = (eventId) => {
    props.setEvents((prevEvents) =>
      prevEvents.filter((event) => event.EventID !== eventId)
    );
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const fileInputRef = useRef(null);

  // const handleCloseModal = () => {
  //   resetForm();
  //   setIsModalOpen(false);
  // };

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
      registerLink: '',
    });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isTokenLoading) {
    return <div><LoadPage /></div>;
  }

  return (
    <div className="container overflow-y-auto max-h-[80vh]">
      <div>
        <h1 className='flex justify-center items-center font-bold text-3xl mb-10'>Events and Workshops Calendar</h1>
        <p className="mt-1 flex text-md justify-center items-center font-normal text-gray-500 dark:text-gray-400">Browse and manage discussions in the DGX community.</p>
      </div>

      <div className="flex justify-between mb-4 pt-4">
        <div className="flex items-center">
          <label className="mr-2 text-lg font-medium">Filter by Status:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2 text-lg font-medium">Filter by Event Type:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {dropdownData.categoryOptions.map((option) => (
              <option key={option.idCode} value={option.ddValue}>
                {option.ddValue}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-DGXgreen text-white px-4 py-2 rounded-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Show Table' : 'Add Event'}
        </button>
      </div>
      {showForm ? (
        <EventForm updateEvents={updateEvents} setEvents={props.setEvents} />
      ) : (
        <div className="event-table flex items-center justify-center">
          <table className="table-fixed border bottom-2 w-full mt-4">
            <thead className='bg-DGXgreen text-white'>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Created By</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Venue</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr className={`text-center ${getStatusClass(event.Status)}`} key={index}>
                  <td className="border">{index + 1}</td>
                  <td className="border px-4 py-2 w-2/6">
                    {event.EventTitle && event.EventTitle.length > 50
                      ? `${event.EventTitle.slice(0, 50)}...`
                      : event.EventTitle}
                  </td>
                  <td className="border px-4 py-2">{event.UserName}</td>
                  <td className="border px-4 py-2">
                    <div>{moment.utc(event.StartDate).format("MMMM D, YYYY")}</div>
                    <div>{moment.utc(event.StartDate).format("h:mm A")}</div>
                  </td>
                  <td className="border px-4 py-2">
                    <div>{moment.utc(event.EndDate).format("MMMM D, YYYY")}</div>
                    <div>{moment.utc(event.EndDate).format("h:mm A")}</div>
                  </td>
                  <td className="border px-4 py-2">{event.Status}</td>
                  <td className="border px-4 py-2">{event.Venue}</td>
                  <td className="border px-4 py-2">
                    <button
                      className='font-medium text-DGXblue bg-DGXblue text-white px-6 py-1 rounded-lg'
                      onClick={() => setSelectedEvent(event)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedEvent && (
        <DetailsEventModal
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
      )}
    </div>
  );
};

export default EventTable;