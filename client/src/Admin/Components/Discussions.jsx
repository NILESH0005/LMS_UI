import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed for notifications
import ApiContext from '../../context/ApiContext'; // Import your context if needed

const Discussions = () => {
  const { fetchData } = useContext(ApiContext); // Assuming you're using ApiContext
  const [discussions, setDiscussions] = useState([]);
  const [users, setUsers] = useState([]); // State for users
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const resetForm = () => {
    setDiscussions([]);  // Reset discussions state if needed
    setUsers([]);  // Reset users or any other state you want to clear
    setModalType('');  // Reset modal type
  };


  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const endpoint = "discussion/getdiscussion"; // Adjust port as necessary
        const method = "POST";
        const headers = {
          'Content-Type': 'application/json',
        };
        const body = {};

        setLoading(true);

        fetchData(endpoint, method, body, headers).then(result => {
          if (result && result.data) {
            console.log(result);

            return result.data;
          } else {
            throw new Error("Invalid data format");
          }
        }).then(data => {
          console.log(data);

          if (data && data.updatedDiscussions) {
            setDiscussions(data.updatedDiscussions);
          } else {
            throw new Error("Missing updatedDiscussions in response data");
          }
        })
      } catch (error) {
        toast.error(`Something went wrong: ${error.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setLoading(false); // Stop loading
      }
    };


    fetchDiscussions();
  }, [fetchData]);



  const handleDeleteUser = async () => {
    const endpoint = "/user/deleteUser";
    const method = "POST";
    const headers = { 'Content-Type': 'application/json' };

    try {
      const result = await fetchData(endpoint, method, {}, headers);
      if (result?.success) {
        setUsers(users.filter((user) => user.UserID !== selectedUserId));
        setShowModal(false);
      } else {
        setError(result?.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Admin - Manage Community Discussions
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Review and manage discussions in the DGX community.
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-DGXgreen text-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="border px-6 py-3">Serial No.</th>
            <th scope="col" className="border px-6 py-3">Discussion ID</th>
            <th scope="col" className="border px-6 py-3">Title</th>
            <th scope="col" className="border px-6 py-3">Content</th>
            <th scope="col" className="border px-6 py-3">Likes</th>
            <th scope="col" className="border px-6 py-3">Comments</th>
            <th scope="col" className="border px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">Loading...</td>
            </tr>
          ) : discussions.length > 0 ? (
            discussions.map((discussion) => (
              <tr key={discussion.DiscussionID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {/* Display user ID from the discussions data */}
                  {discussion.UserID}
                </th>
                <td className="border px-6 py-4">{discussion.DiscussionID}</td>
                <td className="border px-6 py-4">{discussion.Title}</td>
                <td className="border px-6 py-4">{discussion.Content.substring(0, 50)}...</td>
                <td className="border px-6 py-4">{discussion.likeCount}</td>
                <td className="border px-6 py-4">{discussion.comment.length}</td>
                <td className="border px-6 py-4 text-right">
                  {!discussion.approved && (
                    <>
                      {/* <button
                        onClick={() => handleApprove(discussion.DiscussionID)}
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Approve
                      </button> */}
                      {/* <button
                        onClick={() => handleReject(discussion.DiscussionID)}
                        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                      >
                        Reject
                      </button> */}
                      <button
                        onClick={() => {
                          setModalType('delete');
                          // setSelectedUserId(user.UserID);
                          setShowModal(true);
                        }}
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none
                     focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm 
                     px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700
                      dark:focus:ring-red-900"
                      >
                        Delete
                      </button>

                    </>
                  )}

                  {showModal && modalType === 'delete' && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
                      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this Event?</p>
                        <div className="flex justify-between mt-4">
                          <button
                            type="button"
                            onClick={() => {
                              setShowModal(false);  // Close the modal
                              resetForm();  // Reset the form
                            }}
                            className="px-4 py-2 bg-DGXblue hover:bg-gray-500 text-white rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleDeleteUser}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No discussions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Discussions;


