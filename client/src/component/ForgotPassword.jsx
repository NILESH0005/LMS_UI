import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import ApiContext from '../context/ApiContext.jsx';
import { images } from '../../public/index.js';
import LoadPage from './LoadPage.jsx';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchData } = useContext(ApiContext);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = "user/passwordrecovery";
    const method = "POST";
    const body = { "email": email };

    setLoading(true);

    try {
      const data = await fetchData(endpoint, method, body);
      setLoading(false);

      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in Password Reset, try again!',
        });
        return;
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password reset mail has been sent to your email!',
        }).then(() => {
          navigate('/SignInn');
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, try again!',
      });
    }
  };

  return (
    loading ? <LoadPage /> : <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative">
      {/* Right side with background image */}
      <div className="lg:w-1/2 hidden lg:flex justify-center items-center lg:pr-1">
        <img
          src={images.secure}
          alt="Background"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      {/* Left side with form */}
      <div className="w-full lg:w-1/2 min-h-screen py-20 px-8 lg:rounded-l-full bg-DGXblue flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-xl mx-auto shadow-lg overflow-hidden bg-DGXwhite shadow-DGXgreen p-8">
            <h1 className="text-DGXblue text-3xl mb-10 font-bold text-center">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4 relative">
                <label htmlFor="email" className="block text-DGXgreen font-medium mb-2">Email or Username</label>
                <input
                  id="email"
                  type="text"
                  className="border border-DGXgreen py-2 px-3 w-full rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="w-full text-lg bg-DGXgreen hover:bg-DGXblue rounded-full py-3 text-center font-medium text-DGXwhite">
                  Verify Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;