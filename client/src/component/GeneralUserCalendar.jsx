import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DetailsEventModal from './eventAndWorkshop/DetailsEventModal'; // Import the new component

const localizer = momentLocalizer(moment);

const eventColors = {
  "NVIDIA": '#013D54', // DGXblue
  "Global Infoventures Event": '#76B900', // DGXgreen
};

const GeneralUserCalendar = (props) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Updated events list :", );
    const loadEvents = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    loadEvents();
  }, [props.events]);

  const handleSelectEvent = (event) => {
    console.log("Selected Event:", event); // Debug selected event
    setSelectedEvent(event);
    const eventDetailElement = document.getElementById('event-detail');
    if (eventDetailElement) {
      eventDetailElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("Element with ID 'event-detail' not found");
    }
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = eventColors[event.Category] || '#C0C0C0';
    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        fontSize: '0.75rem',
        padding: '0.2rem',
      },
    };
  };

  const formattedEvents = props.events?.map(event => ({
    ...event,
    start: moment.utc(event.StartDate).local().toDate(), // Convert UTC to local time
    end: moment.utc(event.EndDate).local().toDate(),     // Convert UTC to local time
    title: event.EventTitle,
  }));

  console.log("Formatted Events:", formattedEvents); // Debug formatted events

  

  const formats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, 'HH:mm', culture),  // Ensures correct local time
    eventTimeRangeFormat: ({ start, end }) =>
      `${moment(start).format("MMMM D, YYYY h:mm A")} - ${moment(end).format("MMMM D, YYYY h:mm A")}`,
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="mb-5">
        <h1 className="flex items-center justify-center text-2xl font-bold mb-4">
          Our Event and Workshop Calendar
        </h1>
      </div>

      {isLoading ? (
        <Skeleton height={600} className="bg-gray-200 rounded-lg mb-10" />
      ) : (
        <BigCalendar
          localizer={localizer}
          events={formattedEvents }
          formats={formats}
          eventPropGetter={eventStyleGetter}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="EventTitle"
          style={{ height: 600 }}
          className="bg-white rounded-lg border-2 border-DGXgreen shadow-lg p-5 mb-10"
          onSelectEvent={handleSelectEvent}
        />
      )}

      {/* Render the EventDetailsModal component */}
      {selectedEvent && (
        <DetailsEventModal
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default GeneralUserCalendar;