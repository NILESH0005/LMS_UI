import React, { useRef, useState, useContext, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
// import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ApiContext from '.././context/ApiContext';
import { compressImage } from '../utils/compressImage.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventForm from './eventAndWorkshop/EventForm';
// import EventDetailsModal from './EventDetailsModal'; // Import the modal component
import DetailsEventModal from './eventAndWorkshop/DetailsEventModal.jsx';
import LoadPage from './LoadPage'

const EventTable = () => {
  const { fetchData, userToken } = useContext(ApiContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event in modal




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

      setDropdownData({
        categoryOptions: eventTypeOptions,
        companyCategoryOptions: eventHostOptions
      });
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchEvents = async () => {
      const endpoint = "eventandworkshop/getEvent";
      const method = "GET";
      const headers = {
        'Content-Type': 'application/json',
      };

      try {
        const result = await fetchData(endpoint, method, {}, headers);
        console.log("event result:", result);
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
  // console.log("events ::", fetchData)


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

  const filteredEvents = events.filter(event =>
    statusFilter === "" || event.Status === statusFilter
  );



  const handleEditEvent = (event) => {
    setNewEvent({
      title: event.EventTitle || '',
      start: moment(event.StartDate).format('YYYY-MM-DD') || '',
      end: moment(event.EndDate).format('YYYY-MM-DD') || '',
      category: event.categoryId || '',
      companyCategory: event.companyCategoryId || '',
      poster: event.EventImage || null,
      venue: event.Venue || '',
      description: event.EventDescription || '',
      host: event.Host || '',
      registerLink: event.RegistrationLink || '',
    });
    setModalType('edit');
    setIsModalOpen(true);
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
        console.log("event result:", result);
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

  const fileInputRef = useRef(null);

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

  const remainingChars = maxLength - newEvent.description.length;

  // const formatDate = (isoString) => {
  //   return moment(isoString).tz('Asia/Kolkata').format('DD/MM/YYYY');
  // };

  // const formatTime = (isoString) => {
  //   return moment(isoString).tz('Asia/Kolkata').format('HH:mm');
  // };

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
      registerLink: '',
    });
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const convertToKolkataTime = (date) => {
    const offsetIST = 5.5 * 60 * 60 * 1000;
    return new Date(date.getTime() + offsetIST);
  };

  if (loading) {
    return <div><LoadPage /></div>;
  }


  return (
    <div className="container mx-auto mt-10">
      <div>
        <h1 className='flex justify-center items-center font-bold text-3xl mb-10'>Events and Workshops Calendar</h1>
        <p className="mt-1 flex text-md justify-center items-center font-normal text-gray-500 dark:text-gray-400">Browse and manage discussions in the DGX community.</p>
      </div>

      <div className="flex justify-between mb-4">
        {/* Filter on the left */}
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

        {/* Button on the right */}
        <button
          className="bg-DGXgreen text-white px-4 py-2 rounded-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Show Table' : 'Add Event'}
        </button>
      </div>

      {showForm ? (
        <EventForm />
      ) : (
        <div className="event-table flex items-center justify-center">
          <table className="table-fixed border bottom-2 w-full mt-4">
            <thead className='bg-DGXgreen text-white'>
              <tr >
                <th className="border px-4 py-2 ">Title</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Venue</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr className='text-center' key={index}>
                  <td className="border px-4 py-2 w-2/6">
                    {event.EventTitle && event.EventTitle.length > 50
                      ? `${event.EventTitle.slice(0, 50)}...`
                      : event.EventTitle}
                  </td>

                  {/* Start Date */}
                  <td className="border px-4 py-2">
                    <div>{moment.utc(event.StartDate).format("MMMM D, YYYY ")}</div>
                    <div>{moment.utc(event.StartDate).format("h:mm A")}</div>
                  </td>

                  {/* End Date */}
                  <td className="border px-4 py-2">
                    <div>{moment.utc(event.EndDate).format("MMMM D, YYYY ")}</div>
                    <div>{moment.utc(event.EndDate).format("h:mm A")}</div>
                  </td>

                  <td className="border px-4 py-2">
                    {dropdownData.categoryOptions.find(option => option.idCode === event.Category)?.ddValue || 'Unknown'}
                  </td>
                  <td className="border px-4 py-2">{event.Venue}</td>
                  <td className="border px-4 py-2">
                    <button
                      className='font-medium hover:text-DGXblue bg-DGXblue text-white px-6 py-1 rounded-lg'
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

      {/* Render the EventDetailsModal */}
      {selectedEvent && (
        <DetailsEventModal
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)} // Close modal
        />
      )}
    </div>
  );
};

export default EventTable;