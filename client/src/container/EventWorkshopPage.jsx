import { useState, useEffect, useContext } from "react";
import { images } from '../../public/index.js';
import GeneralUserCalendar from "../component/GeneralUserCalendar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShare } from "@fortawesome/free-solid-svg-icons";
import ApiContext from "../context/ApiContext.jsx";
import { momentLocalizer } from "react-big-calendar";
import moment from 'moment';


import React from 'react';
import { motion } from 'framer-motion';


const EventDetailsModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  const localizer = momentLocalizer(moment);
  const downloadICS = () => {
      if (!event) return;
  
      const event = {
        start: [
          moment(event.StartDate).year(),
          moment(event.StartDate).month() + 1,
          moment(event.StartDate).date(),
          moment(event.StartDate).hour(),
          moment(event.StartDate).minute(),
        ],
        end: [
          moment(event.EndDate).year(),
          moment(event.EndDate).month() + 1,
          moment(event.EndDate).date(),
          moment(event.EndDate).hour(),
          moment(event.EndDate).minute(),
        ],
        title: event.EventTitle,
        description: event.EventDescription,
        location: event.Venue,
        organizer: { name: event.Host, email: 'host@example.com' },
        url: event.RegistrationLink || '',
      };
      console.log("event is", event)
  
      createEvent(event, (error, value) => {
        if (error) {
          console.error('Error creating ICS file:', error);
          return;
        }
  
        const blob = new Blob([value], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedEvent.EventTitle.replace(/ /g, '_')}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    };

  return (
    
    <div id="event-detail" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-3xl w-full max-h-[90vh] overflow-y-auto z-50">
        <h2 className="text-4xl font-bold mb-10 flex justify-center">Event Details</h2>
        <div className="mb-4">
          <strong className="text-xl underline">Title:</strong> <span>{event.EventTitle}</span>
        </div>
        <div className="mb-4">
          <strong className="text-xl underline">Date & Time:</strong>{' '}
          <span>
            {moment(event.StartDate).format('MMMM D, YYYY h:mm A')} -{' '}
            {moment(event.EndDate).format('MMMM D, YYYY h:mm A')}
          </span>
        </div>
        <div className="mb-4">
          <strong className="text-xl underline">Category:</strong>
          <span>
            {event.Category === 'giEvent'
              ? 'Global Infoventures Event'
              : event.Category === 'nvidiaEvent'
                ? 'NVIDIA Event'
                : 'Other Event'}
          </span>
        </div>

        <div className="mb-4">
          <strong className="text-xl underline">Venue:</strong> <span>{event.Venue}</span>
        </div>
        <div className="mb-4">
          <strong className="text-xl underline">Description:</strong>{' '}
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: event.EventDescription }} />
        </div>
        <div className="mb-4">
          <strong className="text-xl underline">Host:</strong> <span>{event.Host}</span>
        </div>
        {event.EventImage && (
          <img src={event.EventImage} alt="Event Poster" className="mb-4 w-full max-w-3xl object-cover" />
        )}
        <div className="flex justify-center gap-4 mt-4">
          {event.RegistrationLink && (
            <a
              href={event.RegistrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-DGXblue text-white p-2 rounded"
            >
              Register Here
            </a>
          )}
          <button onClick={downloadICS} className="bg-DGXgreen text-white p-2 rounded">
            Download ICS
          </button>
          <button
            onClick={onClose}
            className="bg-DGXblue text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const EventWorkshopPage = () => {
  const [activeTab, setActiveTab] = useState("myCompany");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData } = useContext(ApiContext);
  const [dbevents, setDbvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Open the modal with the selected event
  const handleMoreInfoClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };


  const handleTabChange = (tab) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 300);
  };

  const handleShare = async (event) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.EventTitle,
          text: `Check out this event: ${event.EventTitle}`,
          url: window.location.href, // Share the current page's URL
        });
        alert("Event shared successfully!");
      } catch (error) {
        console.error("Error sharing event:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };


  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const events = [
    {
      title: "AI Workshop for Beginners",
      description: "An engaging workshop marking the commencement of a new AI training session at GL Bajaj. This workshop provided participants with a comprehensive introduction to AI, where they learned the fundamentals and built their first AI model. It was an interactive session designed for beginners, offering hands-on experience and insights into the world of artificial intelligence. Attendees left with practical knowledge and the confidence to explore further into the field of AI.",
      date: "January 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "GL Bajaj, Training Room 1",
      image: images.us1,
    },
    {
      title: "Advanced Data Science Seminar",
      description: "A comprehensive seminar focused on advanced data analysis techniques, cutting-edge AI tools, and real-world applications. Held at KIET, this event brought together experts and enthusiasts in the field of data science and AI. Attendees had the opportunity to learn from industry leaders, participate in hands-on training, and gain insights into the future of AI and machine learning. It was a highly interactive session that empowered participants with practical knowledge to tackle complex data challenges.",
      date: "February 20, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "KIET Hall 2",
      image: images.us2,
    },
    {
      title: "AI Workshop for Beginners",
      description: "An engaging workshop marking the commencement of a new AI training session at GL Bajaj. This workshop provided participants with a comprehensive introduction to AI, where they learned the fundamentals and built their first AI model. It was an interactive session designed for beginners, offering hands-on experience and insights into the world of artificial intelligence. Attendees left with practical knowledge and the confidence to explore further into the field of AI.",
      date: "January 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "GL Bajaj, Training Room 1",
      image: images.us3,
    },
    {
      title: "Advanced Data Science Seminar",
      description: "A comprehensive seminar focused on advanced data analysis techniques, cutting-edge AI tools, and real-world applications. Held at KIET, this event brought together experts and enthusiasts in the field of data science and AI. Attendees had the opportunity to learn from industry leaders, participate in hands-on training, and gain insights into the future of AI and machine learning. It was a highly interactive session that empowered participants with practical knowledge to tackle complex data challenges.",
      date: "February 20, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "KIET Hall 2",
      image: images.us4,
    }
  ];

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const endpoint = "eventandworkshop/getEvent";
        const eventData = await fetchData(endpoint);
        setDbvents(eventData.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [fetchData]);

  return (
    <div className="w-full">
      <div className="relative isolate overflow-hidden bg-DGXwhite px-2 py-20 text-center sm:px-16 sm:shadow-sm">
        <p className="mx-auto max-w-full text-4xl font-bold tracking-tight text-[#111827] mb-10 pt-4">
          Explore Events and Workshops
        </p>

        {/* <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={() => handleTabChange("myCompany")}
            className={`px-8 py-3 ${activeTab === "myCompany"
              ? "bg-DGXgreen text-white"
              : "bg-DGXwhite text-black"
              } border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            GI India Events
          </button>
          <button
            onClick={() => handleTabChange("nvidia")}
            className={`px-8 py-3 ${activeTab === "nvidia"
              ? "bg-DGXgreen text-white"
              : "bg-DGXwhite text-black"
              } border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            NVIDIA Events
          </button>
          <button
            onClick={() => handleTabChange("oldEvents")}
            className={`px-8 py-3 ${activeTab === "oldEvents"
              ? "bg-DGXgreen text-white"
              : "bg-DGXwhite text-black"
              } border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            GI India Old Events
          </button>
        </div> */}

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 transition-opacity duration-300 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"
            }`}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse border-2 border-DGXgreen bg-DGXblue rounded-lg overflow-hidden shadow-lg p-4 sm:p-6"
              >
                {/* Add loader */}
                <div className="w-full h-24 sm:h-32 md:h-40 bg-DGXwhite rounded-md"></div>
                <div className="mt-4 h-6 sm:h-8 bg-DGXwhite rounded-md"></div>
                <div className="mt-2 h-6 sm:h-8 bg-DGXwhite rounded-md w-2/3"></div>
              </div>
            ))
          ) : (
            dbevents.map((event, index) => (
              <div
                key={index}
                className="border-2 border-DGXgreen bg-DGXblue rounded-lg overflow-hidden shadow-lg p-4 sm:p-6 flex flex-col justify-between"
              >
                <h2 className="text-lg sm:text-xl font-bold text-DGXwhite mb-4 text-center">
                  {event.EventTitle}
                </h2>
                <img
                  src={event.EventImage}
                  alt={`Image for ${event.EventTitle}`}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-md shadow-md"
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleViewDetails(event)}
                    className="px-4 sm:px-6 py-2 bg-DGXgreen text-DGXwhite rounded-md hover:bg-green-600 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleShare(event)}
                    className="px-4 sm:px-6 py-2 bg-DGXgreen hover:bg-green-600 text-DGXwhite rounded-md transition flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
      <GeneralUserCalendar events={dbevents} />

      <div className="relative bg-DGXblue w-full gap-4">
          {/* Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 max-w-7xl mx-auto text-white sm:p-6 md:p-8  p-6 bg-opacity-60 rounded-lg shadow-lg"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center">Our Past Events & Workshops</h1>
            <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6 text-center">
              Discover the impactful workshops and seminars we've hosted. These events have empowered professionals and enthusiasts, offering deep dives into cutting-edge technologies and practical applications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  className="bg-DGXwhite bg-opacity-90 text-DGXblack rounded-lg shadow-xl flex flex-col sm:flex-row items-center sm:items-start p-4 sm:p-6"
                >
                  {/* Event Image */}
                  <div className="flex w-full md:w-1/2 mb-4 md:mb-0 sm:w-1/3 sm:mb-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="rounded-lg object-cover w-full h-48 sm:h-48 md:h-56 lg:h-64"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="flex flex-col sm:pl-4 w-full sm:w-2/3 lg:w-3/4">
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-2">{event.title}</h2>
                    <p className="text-xs sm:text-sm md:text-md mb-2">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-xs sm:text-sm md:text-md mb-2">
                      <strong>Location:</strong> {event.location}
                    </p>

                    {/* More Info Button */}
                    <button
                      // onClick={() => handleMoreInfoClick(event)}
                      className="mt-4 text-DGXblue hover:text-DGXgreen font-semibold text-sm sm:text-base"
                    >
                      More Info
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Modal */}
              {/* {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full md:w-[600px] lg:w-[800px]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{event.title}</h2>
            <p className="text-md md:text-lg mb-4">{event.description}</p>
            <p className="text-sm md:text-md mb-2">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-sm md:text-md mb-2">
              <strong>Location:</strong> {event.location}
            </p>
          </div>
        </div>
      )} */}
            </div>
          </motion.div>
        </div>
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EventWorkshopPage;