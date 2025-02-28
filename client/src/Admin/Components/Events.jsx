import React, { useContext, useEffect, useState } from "react";
import GeneralUserCalendar from "../../component/GeneralUserCalendar";
import ApiContext from "../../context/ApiContext";
import EventTable from "../../component/EventTable";
import { MdTableChart } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

const Events = (props) => {
  const { fetchData } = useContext(ApiContext);
  // const [events, setEvents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      const endpoint = "eventandworkshop/getEvent";
      const eventData = await fetchData(endpoint);
      props.setEvents(eventData.data || []);
      console.log("event data:", eventData.data);
    };
    fetchEventData();
  }, []);

  return (
    <div className="p-4">
      {/* Toggle Button */}
      <button
        onClick={() => setShowTable(!showTable)}
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        {showTable ? "Show Calendar" : "Show Table"}
        {showTable ? <FaCalendarAlt className="size-5" /> : <MdTableChart className="size-5" />}
      </button>

      {/* Display Event Table or Calendar */}
      <div className="mt-4">
        {showTable ? <EventTable events={props.events} setEvents={props.setEvents} /> : <GeneralUserCalendar events={props.events} setEvents={props.setEvents}/>}
      </div>
    </div>
  );
};

export default Events;
