import React, { useContext, useEffect, useState } from 'react'
import GeneralUserCalendar from '../../component/GeneralUserCalendar'
import ApiContext from '../../context/ApiContext';
import EventTable from '../../component/Calendar';



const Events = () => {
  const { fetchData } = useContext(ApiContext);
  const [events, setEvents] = useState([])
  useEffect(() => {
    const fetchEventData = async () => {
      const endpoint = 'eventandworkshop/getEvent'
      const eventData = await fetchData(endpoint);
      setEvents(eventData.data)
    };
    fetchEventData();
  }, []);
  return (
    <>
    
      <EventTable />
      <GeneralUserCalendar events={events} />
    </>
  )

}

export default Events