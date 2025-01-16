import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed for notifications
import ApiContext from '../../context/ApiContext'; // Import your context if needed

const Discussions = () => {
  const { fetchData } = useContext(ApiContext); // Assuming you're using ApiContext
  const [discussions, setDiscussions] = useState([]);
  const [users, setUsers] = useState([]); // State for users
  const [loading, setLoading] = useState(false); // Add loading state

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

  // Handle discussion approval
  const handleApprove = async (discussionId) => {
    const endpoint = `discussion/approve`; // Adjust your API endpoint
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = { discussionId };

    try {
      const result = await fetchData(endpoint, method, body, headers);
      if (result.success) {
        // Update local state to reflect the change
        setDiscussions(discussions.map(discussion =>
          discussion.DiscussionID === discussionId ? { ...discussion, approved: true } : discussion
        ));
        toast.success('Discussion approved successfully');
      } else {
        throw new Error(result.message || 'Failed to approve discussion');
      }
    } catch (error) {
      toast.error(`Error approving discussion: ${error.message}`);
    }
  };

  // Handle discussion rejection
  const handleReject = async (discussionId) => {
    const endpoint = `discussion/reject`; // Adjust your API endpoint
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = { discussionId };

    try {
      const result = await fetchData(endpoint, method, body, headers);
      if (result.success) {
        // Update local state to reflect the change
        setDiscussions(discussions.filter(discussion => discussion.DiscussionID !== discussionId));
        toast.success('Discussion rejected successfully');
      } else {
        throw new Error(result.message || 'Failed to reject discussion');
      }
    } catch (error) {
      toast.error(`Error rejecting discussion: ${error.message}`);
    }
  };

  // Handle discussion deletion
  const handleDelete = async (discussionId) => {
    const endpoint = `discussion/delete`; // Adjust your API endpoint
    const method = 'DELETE';
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({ discussionId });

    try {
      const result = await fetchData(endpoint, method, body, headers);
      if (result.success) {
        setDiscussions(discussions.filter(discussion => discussion.DiscussionID !== discussionId)); // Remove deleted discussion from state
        toast.success('Discussion deleted successfully');
      } else {
        throw new Error(result.message || 'Failed to delete discussion');
      }
    } catch (error) {
      toast.error(`Error deleting discussion: ${error.message}`);
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
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">User ID</th>
            <th scope="col" className="px-6 py-3">Discussion ID</th>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Content</th>
            <th scope="col" className="px-6 py-3">Likes</th>
            <th scope="col" className="px-6 py-3">Comments</th>
            <th scope="col" className="px-6 py-3">Actions</th>
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
                <td className="px-6 py-4">{discussion.DiscussionID}</td>
                <td className="px-6 py-4">{discussion.Title}</td>
                <td className="px-6 py-4">{discussion.Content.substring(0, 50)}...</td>
                <td className="px-6 py-4">{discussion.likeCount}</td>
                <td className="px-6 py-4">{discussion.comment.length}</td>
                <td className="px-6 py-4 text-right">
                  {!discussion.approved && (
                    <>
                      <button
                        onClick={() => handleApprove(discussion.DiscussionID)}
                        className="mr-2 font-medium text-green-600 dark:text-green-500 hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(discussion.DiscussionID)}
                        className="mr-2 font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(discussion.DiscussionID)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
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

export const getdiscussion = async (req, res) => {
  let success = false;

  const userId = req.body.user;
  // console.log(userId)
  console.log("TEstingssss");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const warningMessage = "Data is not in the right format";
    logWarning(warningMessage); // Log the warning
    res.status(400).json({ success, data: errors.array(), message: warningMessage });
    return;
  }

  try {
    // Connect to the database
    connectToDatabase(async (err, conn) => {
      if (err) {
        const errorMessage = "Failed to connect to database";
        logError(err); // Log the error
        res.status(500).json({ success: false, data: err, message: errorMessage });
        return;
      }

      try {
        let rows = []
        if (userId !== null && userId !== undefined) {
          // console.log("Ho")
          const query = `SELECT UserID, Name FROM Community_User WHERE isnull(delStatus,0) = 0 AND EmailId = ?`;
          rows = await queryAsync(conn, query, [userId]);
        }
        // console.log(rows)
        if (rows.length === 0) {
          rows.push({ UserID: null });
        }
        // console.log(rows[0].UserID);
        // if (rows.length > 0) {
        const discussionGetQuery = `SELECT DiscussionID, UserID, AuthAdd as UserName, Title, Content, Image, Tag, ResourceUrl, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND Visibility = 'public' AND Reference = 0 ORDER BY AddOnDt DESC`;
        const discussionGet = await queryAsync(conn, discussionGetQuery);
        // console.log(discussionGet)
        const updatedDiscussions = [];

        // Map over each discussion and fetch like count
        for (const item of discussionGet) {
          // Query to get like count for each discussion
          const likeCountQuery = `SELECT DiscussionID, UserID, Likes, AuthAdd as UserName FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND Likes > 0 AND Reference = ?`;
          const likeCountResult = await queryAsync(conn, likeCountQuery, [item.DiscussionID]);

          const commentQuery = `SELECT DiscussionID, UserID, Comment, AuthAdd as UserName, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND  Comment IS NOT NULL AND Reference = ? ORDER BY AddOnDt DESC`;
          const commentResult = await queryAsync(conn, commentQuery, [item.DiscussionID]);
          const commentsArray = Array.isArray(commentResult) ? commentResult : [];

          const commentsArrayUpdated = [];

          let userLike = 0;

          // Check if `UserID` in `likeCountResult` matches `rows[0].UserId`

          if (likeCountResult.some(likeItem => likeItem.UserID === rows[0].UserID && likeItem.Likes === 1)) {
            userLike = 1;
          }

          if (commentsArray.length > 0) {
            for (const comment of commentsArray) {
              // Reset the second-level comments array for each top-level comment
              const commentsArrayUpdatedSecond = [];

              const likeCountQuery = `SELECT DiscussionID, UserID, Likes, AuthAdd as UserName FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND Likes > 0 AND Reference = ?`;
              const likeCountResult = await queryAsync(conn, likeCountQuery, [comment.DiscussionID]);
              const likeCount = likeCountResult.length > 0 ? likeCountResult.length : 0;

              const commentQuery = `SELECT DiscussionID, UserID, Comment, AuthAdd as UserName, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND  Comment IS NOT NULL AND Reference = ? ORDER BY AddOnDt DESC`;
              const commentResult = await queryAsync(conn, commentQuery, [comment.DiscussionID]);
              const secondLevelCommentsArray = Array.isArray(commentResult) ? commentResult : [];

              let secondLevelUserLike = 0;

              // Check if `UserID` in `likeCountResult` matches `rows[0].UserId`
              if (likeCountResult.some(likeItem => likeItem.UserID === rows[0].UserID && likeItem.Likes === 1)) {
                secondLevelUserLike = 1;
              }

              if (secondLevelCommentsArray.length > 0) {
                for (const secondLevelComment of secondLevelCommentsArray) {
                  const secondLevelLikeCountQuery = `SELECT DiscussionID, UserID, Likes, AuthAdd as UserName, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND Likes > 0 AND Reference = ?`;
                  const secondLevelLikeCountResult = await queryAsync(conn, secondLevelLikeCountQuery, [secondLevelComment.DiscussionID]);
                  const secondLevelLikeCount = secondLevelLikeCountResult.length > 0 ? secondLevelLikeCountResult.length : 0;

                  let secondLevelUserLike = 0;
                  if (secondLevelLikeCountResult.some(likeItem => likeItem.UserID === rows[0].UserID && likeItem.Likes === 1)) {
                    secondLevelUserLike = 1;
                  }

                  commentsArrayUpdatedSecond.push({ ...secondLevelComment, likeCount: secondLevelLikeCount, userLike: secondLevelUserLike });
                }
              }

              commentsArrayUpdated.push({ ...comment, likeCount, userLike: secondLevelUserLike, comment: commentsArrayUpdatedSecond });
            }
          }

          const likeCount = likeCountResult.length > 0 ? likeCountResult.length : 0;

          // Add like count to the discussion item
          updatedDiscussions.push({ ...item, likeCount, userLike, comment: commentsArrayUpdated });
        }

        success = true;
        closeConnection();
        const infoMessage = "Discussion Get Successfully";
        logInfo(infoMessage);
        res.status(200).json({ success, data: { updatedDiscussions }, message: infoMessage });
        return;
        // } else {
        //     closeConnection();
        //     const warningMessage = "User not found";
        //     logWarning(warningMessage);
        //     res.status(200).json({ success: false, data: {}, message: warningMessage });
        //     return;
        // }
      }
      catch (queryErr) {
        closeConnection();
        logError(queryErr)
        res.status(500).json({ success: false, data: queryErr, message: 'Something went wrong please try again' });
        return
      }
    });
  } catch (error) {
    logError(error)
    return res.status(500).json({ success: false, data: {}, message: 'Something went wrong please try again' });

  }
}
