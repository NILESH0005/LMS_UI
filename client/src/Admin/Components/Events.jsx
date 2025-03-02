import React, { useContext, useEffect, useState } from "react";
import GeneralUserCalendar from "../../component/GeneralUserCalendar";
import ApiContext from "../../context/ApiContext";
import EventTable from "../../component/EventTable";
import { MdTableChart } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const Events = (props) => {
  const { fetchData } = useContext(ApiContext);
<<<<<<< HEAD
  const [showTable, setShowTable] = useState(() => {
    return sessionStorage.getItem("showTable") === "true"; // Restore state from sessionStorage
  });
=======
  const [showTable, setShowTable] = useState(false);
>>>>>>> 844417e5091423ac53fb78b179f811a3ac613d02

  // Fetch event data
  const fetchEventData = async () => {
    const endpoint = "eventandworkshop/getEvent";
    const eventData = await fetchData(endpoint);
    props.setEvents(eventData.data || []);
    console.log("Event data:", eventData.data);
  };

  // Fetch data on mount & when showTable changes
  useEffect(() => {
    fetchEventData();
  }, [showTable]); // Refresh data when toggling view

  // Preserve scroll position after refresh
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }

    return () => {
      sessionStorage.setItem("scrollPosition", window.scrollY); // Save scroll position before unmount
    };
  }, []);

<<<<<<< HEAD
  // Handle toggle & update sessionStorage
  const handleToggleView = () => {
    const newShowTable = !showTable;
    sessionStorage.setItem("showTable", newShowTable);
    setShowTable(newShowTable);
  };
=======
  

>>>>>>> 844417e5091423ac53fb78b179f811a3ac613d02

  return (
    <div className="p-4">
      {/* Toggle Button */}
      <button
        onClick={handleToggleView}
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        {showTable ? "Show Calendar" : "Show Table"}
        {showTable ? <FaCalendarAlt className="size-5" /> : <MdTableChart className="size-5" />}
      </button>

      {/* Display Event Table or Calendar */}
      <div className="mt-4">
        {showTable ? (
          <EventTable events={props.events} setEvents={props.setEvents} />
        ) : (
          <GeneralUserCalendar events={props.events} setEvents={props.setEvents} />
        )}
      </div>
    </div>
  );
};

export default Events;
