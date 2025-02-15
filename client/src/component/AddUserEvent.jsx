import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { IoMdList } from "react-icons/io";
import EventForm from "../component/eventAndWorkshop/EventForm";

const AddUserEvent = () => {
  const [showForm, setShowForm] = useState(false);

  // Dummy event data (Replace with real API data)
  const userEvents = [
    { id: 1, title: "AI Workshop", status: "Approved", remark: "Great work!" },
    { id: 2, title: "Cyber Security Bootcamp", status: "Pending", remark: "Under review" },
    { id: 3, title: "Blockchain Seminar", status: "Rejected", remark: "Provide more details" },
  ];

  return (
    <div className="p-4">
      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        {showForm ? "My Events" : "Add Event"}
        {showForm ? <IoMdList className="size-5" /> : <MdAdd className="size-5" />}
      </button>
      <div className="mt-4 w-full w-100  bg-white p-4 rounded-lg ">
        {showForm ? (
          <EventForm />
        ) : (
          <div className="space-y-4">
            {userEvents.length > 0 ? (
              userEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg shadow-md border-l-4 flex flex-col gap-2"
                  style={{
                    borderColor:
                      event.status === "Approved" ? "#22C55E" :
                        event.status === "Rejected" ? "#EF4444" :
                          "#F59E0B",
                  }}
                >
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${event.status === "Approved" ? "bg-green-100 text-green-600" :
                          event.status === "Rejected" ? "bg-red-100 text-red-600" :
                            "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {event.status}
                    </span>
                    {event.remark && (
                      <p className="text-sm text-gray-600 italic">"{event.remark}"</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No events found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserEvent;
