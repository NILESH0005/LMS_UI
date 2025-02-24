import React, { useState, useContext } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import ApiContext from '../../context/ApiContext';

const DetailsEventModal = ({ selectedEvent, onClose, handleEventStatusChange  }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { user, userToken, fetchData } = useContext(ApiContext);
  const [confirmationAction, setConfirmationAction] = useState(null); // 'approve', 'reject', 'delete'
  const [remark, setRemark] = useState('');

  const updateEventStatus = async (eventId, Status, remark = '') => {
    // const eventId = Number(selectedEvent.EventID);
    // if (isNaN(eventId)) {
    //   console.error("Invalid EventID:", selectedEvent.EventID);
    //   return;
    // }
    const endpoint = `eventandworkshop/updateEvent/${eventId}`;
    const method = "POST";
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': userToken
    };

    // Request body
    const body = {
      Status, // 'approve', 'reject', or 'delete'
      remark, // Only required for 'reject'
    };

    try {
      const result = await fetchData(endpoint, method, body, headers);
      console.log("Update event result:", result);

      if (result.success) {
        // handleEventStatusChange(selectedEvent.EventID, confirmationAction);
        Swal.fire({
          title: "Success!",
          text: `Event ${Status}ed successfully!`,
          icon: "success",
          confirmButtonText: "OK",
        });

        return true; // Indicate success
      } else {
        Swal.fire({
          title: "Error!",
          text: `Failed to ${Status} event`,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log("error", result.message)

        return false; // Indicate failure
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Error ${Status}ing event`,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log("error", result.message)

      return false; // Indicate failure
    }
  };



  const handleConfirmation = (Status) => {
    setConfirmationAction(Status);
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = async () => {
    const success = await updateEventStatus(selectedEvent.EventID, confirmationAction, remark);

    if (success) {
      // Refresh the events list or close the modal
      onClose(); // Close the modal after successful Status
    } else {
      // Display an error message (e.g., using a toast or alert)
      console.error(`Failed to ${confirmationAction} event.`);
    }

    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  return (
    <div
      id="event-detail"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Close modal on outside click
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inside click
      >
        <h2 className="text-4xl font-bold mb-6 text-center">Event Details</h2>
        <div className="space-y-4">
          <div>
            <strong className="text-xl underline">Title:</strong>
            <div className="mt-1 text-lg">{selectedEvent.EventTitle}</div>
          </div>
          <div>
            <strong className="text-xl underline">Date & Time:</strong>
            <div className="mt-1 text-lg">
              {moment.utc(selectedEvent.StartDate).format("MMMM D, YYYY h:mm A")} -{' '}
              {moment.utc(selectedEvent.EndDate).format("MMMM D, YYYY h:mm A")}
            </div>
          </div>
          <div>
            <strong className="text-xl underline">Category:</strong>
            <div className="mt-1 text-lg">{selectedEvent.Category}</div>
          </div>
          <div>
            <strong className="text-xl underline">Venue:</strong>
            <div className="mt-1 text-lg">{selectedEvent.Venue}</div>
          </div>
        </div>
        <div className="mb-2">
          <strong className="text-xl underline">Description:</strong>
          <div className="" dangerouslySetInnerHTML={{ __html: selectedEvent.EventDescription }} />
        </div>
        <div className="mb-4">
          <strong className="text-xl underline">Host:</strong> 
          <div>
          <span>{selectedEvent.Host}</span>
        </div>
        </div>
        {selectedEvent.EventImage && (
          <img src={selectedEvent.EventImage} alt="Event Poster" className="mb-4 w-full max-w-3xl object-cover" />
        )}
        <div className="flex justify-center gap-4 mt-4">
          {selectedEvent.Status === 'Pending' && (
            <>
              <button
                onClick={() => handleConfirmation('approve')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Approve
              </button>
              <button
                onClick={() => handleConfirmation('reject')}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Reject
              </button>
            </>
          )}
          {(user.isAdmin == '1') && ((selectedEvent.Status === 'Approved' || selectedEvent.Status === 'Rejected') && (
            <button
              onClick={() => handleConfirmation('delete')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Delete
            </button>
          ))}
          {selectedEvent.RegistrationLink && selectedEvent.Status !== 'Pending' && selectedEvent.Status !== 'Rejected' && (
            <a
              href={selectedEvent.RegistrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Register Here
            </a>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
            <p>Are you sure you want to {confirmationAction} this event?</p>
            {confirmationAction === 'reject' && (
              <textarea
                className="w-full mt-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                required
              />
            )}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsEventModal;













