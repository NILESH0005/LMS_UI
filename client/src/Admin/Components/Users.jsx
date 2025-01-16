import { useState, useContext, useEffect } from 'react';
import ApiContext from '../../context/ApiContext';

const AdminUsers = () => {
  const { fetchData } = useContext(ApiContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    Name: '',
    EmailId: '',
    CollegeName: '',
    Designation: '',
  });

  // Fetch users on component load
  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = "user/users";
      const method = "GET";
      const headers = {
        'Content-Type': 'application/json',
      };

      try {
        const result = await fetchData(endpoint, method, {}, headers);
        if (result.success) {
          setUsers(result.data);
        } else {
          setError(result.message || 'Failed to fetch user data');
        }
      } catch (error) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [fetchData]);

  // Handle user creation
  const handleAddUser = async () => {
    const endpoint = "user/users"; // Ensure this endpoint is correct
    const method = "POST"; // POST request to add a new user
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(newUser); // assuming newUser is your user data to be added
  
    try {
      const result = await fetchData(endpoint, method, body, headers);
      
      // Check if the result is valid and contains a 'success' property
      if (result && result.success) {
        // Handle success (e.g., refresh the user list or show a success message)
        setUsers([...users, result.data]); // Assuming 'data' contains the newly added user
      } else {
        // Handle error when 'success' is not true or the response is not as expected
        setError(result?.message || 'Failed to add user');
      }
    } catch (error) {
      // Log error and show generic failure message
      console.error("Error adding user:", error);
      setError('Failed to add user');
    }
  };
  

  // Handle form input changes for new user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Conditional rendering
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Admin - Manage Users</h2>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="px-4 py-2 bg-DGXblue text-white font-semibold rounded-lg"
        >
          Add User
        </button>
      </div>

      {/* Table to display users */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white">
          Admin - Manage Users
          <p className="mt-1 text-sm font-normal text-gray-500">Browse and manage DGX community users.</p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">User ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">College Name</th>
            <th scope="col" className="px-6 py-3">Designation</th>
            <th scope="col" className="px-6 py-3"><span className="sr-only">Delete</span></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {user.UserID}
              </th>
              <td className="px-6 py-4">{user.Name}</td>
              <td className="px-6 py-4">{user.EmailId}</td>
              <td className="px-6 py-4">{user.CollegeName}</td>
              <td className="px-6 py-4">{user.Designation}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleDelete(user.UserID)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding user */}
      {showAddUserModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={newUser.UserName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="EmailId"
                  value={newUser.EmailId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">College Name</label>
                <input
                  type="text"
                  name="CollegeName"
                  value={newUser.CollegeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input
                  type="text"
                  name="Designation"
                  value={newUser.Designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-DGXblue text-white font-semibold rounded-lg"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
