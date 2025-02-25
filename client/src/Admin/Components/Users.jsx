import { useState, useContext, useEffect } from 'react';
import ApiContext from '../../context/ApiContext';
import LoadPage from "../../component/LoadPage";
import Swal from 'sweetalert2';

const AdminUsers = () => {
  const { fetchData, userToken } = useContext(ApiContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalAction, setModalAction] = useState('');

  const [newUser, setNewUser] = useState({
    Name: '',
    EmailId: '',
    CollegeName: '',
    Designation: '',
    MobileNumber: '',
    Category: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const endpoint = "user/users";
    const method = "GET";
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': userToken,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setModalAction('cancel');
    setShowConfirmationModal(true);
  };

  const handleSubmit = () => {
    setModalAction('submit');
    setShowConfirmationModal(true);
  };

  const confirmCancel = () => {
    setNewUser({
      Name: '',
      EmailId: '',
      CollegeName: '',
      Designation: '',
      MobileNumber: '',
      Category: '',
    });
    setFormErrors({});
    setShowAddUserModal(false);
    setShowConfirmationModal(false);
  };

  const handleAddUser = async () => {
    const errors = {};
    if (!newUser.Name) errors.Name = "Name is required";
    if (!newUser.EmailId) errors.EmailId = "Email is required";
    if (!newUser.CollegeName) errors.CollegeName = "College name is required";
    if (!newUser.Designation) errors.Designation = "Designation is required";
    if (!newUser.MobileNumber || !/^\d{10}$/.test(newUser.MobileNumber)) errors.MobileNumber = "Enter a valid 10-digit mobile number";
    if (!newUser.Category) errors.Category = "Category is required";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const endpoint = "user/addUser";
    const method = "POST";
    const headers = {
      'Content-Type': 'application/json',
      'auth-token': userToken,
    };
    const body = { ...newUser };

    try {
      const result = await fetchData(endpoint, method, body, headers);
      if (result && result.success) {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User added successfully!',
        });

        // Refetch users to update the table
        await fetchUsers();

        // Close the modal and reset the form
        setShowAddUserModal(false);
        setNewUser({
          Name: '',
          EmailId: '',
          CollegeName: '',
          Designation: '',
          MobileNumber: '',
          Category: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result?.message || 'Failed to add user',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add user',
      });
    }
  };

  const confirmSubmit = () => {
    handleAddUser();
    setShowConfirmationModal(false);
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const endpoint = "user/deleteUser";
        const method = "POST";
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': userToken,
        };
        const body = { userId };

        const response = await fetchData(endpoint, method, body, headers);

        if (response.success) {
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          await fetchUsers(); // Refetch users after deletion
        } else {
          Swal.fire('Error!', response.message || 'Failed to delete user', 'error');
        }
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete user', 'error');
      }
    }
  };

  if (loading) return <div><LoadPage /></div>;
  if (error) return <div><LoadPage /></div>;

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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white">
          Admin - Manage Users
          <p className="mt-1 text-sm font-normal text-gray-500">Browse and manage DGX community users.</p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-DGXgreen text-white">
          <tr>
            <th scope="col" className="border px-6 py-3">#</th>
            <th scope="col" className="border px-6 py-3">Name</th>
            <th scope="col" className="border px-6 py-3">Email</th>
            <th scope="col" className="border px-6 py-3">College Name</th>
            <th scope="col" className="border px-6 py-3">Designation</th>
            <th scope="col" className="border px-6 py-3">Mobile Number</th>
            <th scope="col" className="border px-6 py-3">Category</th>
            <th scope="col" className="border px-6 py-3"><span className="sr-only">Delete</span></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.UserID} className="bg-white border-b">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{index + 1}</th>
              <td className="border px-6 py-4">{user.Name}</td>
              <td className="border px-6 py-4">{user.EmailId}</td>
              <td className="border px-6 py-4">{user.CollegeName}</td>
              <td className="border px-6 py-4">{user.Designation}</td>
              <td className="border px-6 py-4">{user.MobileNumber}</td>
              <td className="border px-6 py-4">{user.Category}</td>
              <td className="border px-6 py-4 text-right">
                <button
                  onClick={() => handleDeleteUser(user.UserID)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg"
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
                  value={newUser.Name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${formErrors.Name ? 'border-red-500' : ''}`}/>
                {formErrors.Name && <p className="text-red-500 text-sm">{formErrors.Name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="EmailId"
                  value={newUser.EmailId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${formErrors.EmailId ? 'border-red-500' : ''}`}/>
                {formErrors.EmailId && <p className="text-red-500 text-sm">{formErrors.EmailId}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">College Name</label>
                <input
                  type="text"
                  name="CollegeName"
                  value={newUser.CollegeName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${formErrors.CollegeName ? 'border-red-500' : ''}`}
                />
                {formErrors.CollegeName && <p className="text-red-500 text-sm">{formErrors.CollegeName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input
                  type="text"
                  name="Designation"
                  value={newUser.Designation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${formErrors.Designation ? 'border-red-500' : ''}`}
                />
                {formErrors.Designation && <p className="text-red-500 text-sm">{formErrors.Designation}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  name="MobileNumber"
                  value={newUser.MobileNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${formErrors.MobileNumber ? 'border-red-500' : ''}`}
                />
                {formErrors.MobileNumber && <p className="text-red-500 text-sm">{formErrors.MobileNumber}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="Category"
                  value={newUser.Category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md ${formErrors.Category ? 'border-red-500' : ''}`}
                />
                {formErrors.Category && <p className="text-red-500 text-sm">{formErrors.Category}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-DGXblue text-white rounded-md"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p>Do you want to {modalAction === 'submit' ? 'submit' : 'cancel'} the form?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={modalAction === 'submit' ? confirmSubmit : confirmCancel}
                className="px-4 py-2 bg-DGXblue text-white rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
