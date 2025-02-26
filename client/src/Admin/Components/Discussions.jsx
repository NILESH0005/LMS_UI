import { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import ApiContext from '../../context/ApiContext';

const Discussions = () => {
  const { fetchData, userToken } = useContext(ApiContext);
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDiscussions = async () => {
    try {
      const endpoint = "discussion/getdiscussion";
      const method = "POST";
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {};

      setLoading(true);

      const result = await fetchData(endpoint, method, body, headers);
      console.log("result is ", result);
      if (result && result.data) {
        setDiscussions(result.data.updatedDiscussions || []);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    fetchDiscussions();
  }, [fetchData]);

  const handleDeleteDiscussion = async (discussionId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const endpoint = "discussion/deleteDiscussion";
        const method = "POST";
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': userToken
        };
        const body = { discussionId };

        const response = await fetchData(endpoint, method, body, headers);
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The discussion has been deleted.',
          });
          fetchDiscussions(); // Refresh the discussions list
        } else {
          throw new Error("Failed to delete the discussion.");
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to delete the discussion: ${error.message}`,
        });
      }
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
            <th scope="col" className="border px-6 py-3">#</th>
            <th scope="col" className="border px-6 py-3">Title</th>
            <th scope="col" className="border px-6 py-3">Name</th>
            <th scope="col" className="border px-6 py-3">Content</th>
            <th scope="col" className="border px-6 py-3">Likes</th>
            <th scope="col" className="border px-6 py-3">Comments</th>
            <th scope="col" className="border px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">Loading...</td>
            </tr>
          ) : discussions.length > 0 ? (
            discussions.map((discussion, index) => (
              <tr key={discussion.DiscussionID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="border px-6 py-4">{index + 1}</td>
                <td className="border px-6 py-4">{discussion.Title}</td>
                <td className="border px-6 py-4">{discussion.UserName }</td>
                <td className="border px-6 py-4">{stripHtmlTags(discussion.Content.substring(0, 50))}...</td>
                <td className="border px-6 py-4">{discussion.likeCount}</td>
                <td className="border px-6 py-4">{discussion.comment.length}</td>
                <td className="border px-6 py-4 text-right">
                  {!discussion.approved && (
                    <button
                      onClick={() => handleDeleteDiscussion(discussion.DiscussionID)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No discussions found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Discussions;