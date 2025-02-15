import React, { useState } from 'react';
import moment from 'moment';

const DetailsEventModal = ({ selectedEvent, onClose }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null); // 'approve', 'reject', 'delete'
  const [remark, setRemark] = useState('');

  const handleConfirmation = (action) => {
    setConfirmationAction(action);
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = () => {
    // Handle the action (approve, reject, delete) here
    console.log(`Action: ${confirmationAction}, Remark: ${remark}`);
    // You can call an API here to update the event status
    setShowConfirmationModal(false);
    onClose(); // Close the modal after action
  };

  return (
    <div id="event-detail" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-3xl w-full max-h-[90vh] overflow-y-auto z-50">
        <h2 className="text-4xl font-bold mb-10 flex justify-center">Event Details:</h2>
        <div className="mb-2">
          <strong className="text-xl underline">Title:</strong>
          <div><span>{selectedEvent.EventTitle}</span></div>
        </div>
        <div className="mb-2">
          <strong className="text-xl underline">Date & Time:</strong>{' '}
          <div>
            <span>
              {moment.utc(selectedEvent.StartDate).format("MMMM D, YYYY h:mm A")} -
              {moment.utc(selectedEvent.EndDate).format("MMMM D, YYYY h:mm A")}
            </span>
          </div>
        </div>
        <div className="mb-2">
          <strong className="text-xl underline">Category:</strong>
          <div>
            <span>{selectedEvent.Category}</span>
          </div>
        </div>
        <div className="mb-2">
          <strong className="text-xl underline">Venue:</strong>
          <div>
            <span>{selectedEvent.Venue}</span>
          </div>
        </div>
        <div className="mb-2">
          <strong className="text-xl underline">Description:</strong>
          <div className="" dangerouslySetInnerHTML={{ __html: selectedEvent.EventDescription }} />
        </div>
        <div className="mb-4">
          <strong className="text-xl underline">Host:</strong> <span>{selectedEvent.Host}</span>
        </div>
        {selectedEvent.EventImage && (
          <img src={selectedEvent.EventImage} alt="Event Poster" className="mb-4 w-full max-w-3xl object-cover" />
        )}
        <div className="flex justify-center gap-4 mt-4">
          {selectedEvent.Status === 'Pending' && (
            <>
              <button
                onClick={() => handleConfirmation('approve')}
                className="bg-green-500 text-white p-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleConfirmation('reject')}
                className="bg-red-500 text-white p-2 rounded"
              >
                Reject
              </button>
            </>
          )}
          {selectedEvent.Status === 'Approved' && (
            <button
              onClick={() => handleConfirmation('delete')}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          )}
          {selectedEvent.Status === 'Rejected' && (
            <button
              onClick={() => handleConfirmation('delete')}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          )}
          {selectedEvent.RegistrationLink && selectedEvent.Status !== 'Pending' && (
            <a
              href={selectedEvent.RegistrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-DGXblue text-white p-2 rounded"
            >
              Register Here
            </a>
          )}
          <button
            onClick={onClose}
            className="bg-DGXblue text-white p-2 rounded"
          >
            Close
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
            <p>Are you sure you want to {confirmationAction} this event?</p>
            {confirmationAction === 'reject' && (
              <textarea
                className="w-full mt-4 p-2 border rounded"
                placeholder="Enter remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            )}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="bg-red-500 text-white p-2 rounded"
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