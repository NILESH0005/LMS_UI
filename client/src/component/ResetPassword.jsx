import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ApiContext from "../context/ApiContext.jsx";
import { decrypt } from "../utils/decrypt.js";
import { images } from '../../public/index.js';
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  validateConfirmPassword,
  validatePassword,
  validateRequired,
} from "../utils/formValidation.js";
import LoadPage from "./LoadPage.jsx";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { fetchData, userToken, setUserToken } = useContext(ApiContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (userToken != null && userToken !== undefined) {
      setIsLoggedIn(true);
      Cookies.remove("userToken");
      setUserToken(null);
    } else {
      setIsLoggedIn(false);
    }
  }, [userToken, setUserToken]);

  const urlExtract = async () => {
    const params = new URLSearchParams(location.search);
    const encryptedEmail = params.get("email");
    const encryptedReferCode = params.get("signature");

    if (encryptedEmail && encryptedReferCode) {
      const decryptedEmail = await decrypt(encryptedEmail);
      const decryptedSignature = await decrypt(encryptedReferCode);

      if (decryptedEmail && decryptedSignature) {
        setEmail(decryptedEmail);
        setSignature(decryptedSignature);
      } else {
        navigate("/404");
      }
    } else {
      navigate("/404");
    }
  };
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    validatePassword(e.target, e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(newPassword, e.target.value, e.target);
  };
  const validateForm = (elements) => {
    const inputElements = elements.filter(
      (element) => element.tagName === "INPUT"
    );
    inputElements.forEach((formElemment) => {
      console.log(formElemment.id);
      validateRequired(formElemment.id);
    });
    return document.querySelector(".is-invalid") === null;
  };

  useEffect(() => {
    urlExtract();
  }, [location, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElements = Array.from(event.target.elements);
    const isValid = validateForm(formElements);
    if (!isValid) {
      return;
    }
    if (passwordsMatch) {
      const endpoint = "user/resetpassword";
      const method = "POST";
      const body = {
        email: email,
        signature: signature,
        password: newPassword,
      };

      setLoading(true);

      try {
        const data = await fetchData(endpoint, method, body);

        if (!data.success) {
          setLoading(false);
          toast.error("Error in Password Reset", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        } else if (data.success) {
          setLoading(false);
          toast.success("Password Reset done successfully, go login", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/SignInn");
          }, 3500);
        }
      } catch (error) {
        setLoading(false);
        toast.error(`Something went wrong, try again`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    } else {
      toast.error("Passwords do not match.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
  };

  return loading ? (
    < LoadPage />) : (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center relative">
      <ToastContainer />
      <div className="w-full lg:w-1/2 min-h-screen py-20 px-8 lg:rounded-r-3xl bg-DGXblue flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-xl mx-auto shadow-lg overflow-hidden bg-DGXwhite shadow-DGXgreen p-8">
            <h1 className="text-DGXblue text-3xl mb-6 font-bold text-center">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4 relative">
                <input
                  id="password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="border border-DGXgreen py-2 px-3 w-full rounded pr-10"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-[#4b5563]"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <div id="passwordVerify" className="invalid-feedback"></div>
              </div>
              <div className="mb-4 relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`border border-DGXgreen py-2 px-3 w-full rounded pr-10 ${passwordsMatch ? "" : "border-[#ef4444]"
                    }`}
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-[#4b5563]"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                <div
                  id="confirmPasswordVerify"
                  className="invalid-feedback"
                ></div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full text-lg bg-DGXgreen rounded-full py-3 text-center font-medium text-DGXwhite"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 hidden lg:flex justify-center items-center lg:pl-1">
        <img
          src={images.secure}
          alt="Background"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
