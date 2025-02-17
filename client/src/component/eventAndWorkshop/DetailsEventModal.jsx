import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

const DetailsEventModal = ({ selectedEvent, onClose }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null); // 'approve', 'reject', 'delete'
  const [remark, setRemark] = useState('');

  const updateEventStatus = async (eventId, action, remark = '') => {
    const endpoint = `eventandworkshop/updateEvent/${eventId}`; 
    const method = "POST"; 
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`, 
    };

    // Request body
    const body = {
      action, // 'approve', 'reject', or 'delete'
      remark, // Only required for 'reject'
    };

    try {
      const result = await fetchData(endpoint, method, body, headers);
      console.log("Update event result:", result);

      if (result.success) {
        console.log(`Event ${action}ed successfully!`);
        return true; // Indicate success
      } else {
        console.error(`Failed to ${action} event:`, result.message);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error(`Error ${action}ing event:`, error);
      return false; // Indicate failure
    }
  };



  const handleConfirmation = (action) => {
    setConfirmationAction(action);
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = async () => {
    const success = await updateEventStatus(selectedEvent.EventID, confirmationAction, remark);

    if (success) {
      // Refresh the events list or close the modal
      onClose(); // Close the modal after successful action
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
          <div>
            <strong className="text-xl underline">Description:</strong>
            <div className="mt-1 text-lg" dangerouslySetInnerHTML={{ __html: selectedEvent.EventDescription }} />
          </div>
          <div>
            <strong className="text-xl underline">Host:</strong>
            <div className="mt-1 text-lg">{selectedEvent.Host}</div>
          </div>
          {selectedEvent.EventImage && (
            <img
              src={selectedEvent.EventImage}
              alt="Event Poster"
              className="w-full max-w-3xl object-cover rounded-lg shadow-sm"
            />
          )}
        </div>
        <div className="flex justify-center gap-4 mt-6">
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
          {selectedEvent.Status === 'Approved' && (
            <button
              onClick={() => handleConfirmation('delete')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Delete
            </button>
          )}
          {selectedEvent.Status === 'Rejected' && (
            <button
              onClick={() => handleConfirmation('delete')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Delete
            </button>
          )}
          {selectedEvent.RegistrationLink && selectedEvent.Status !== 'Pending' && (
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