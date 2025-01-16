import React, { useState, useEffect, useContext } from 'react';
import UserProfileChart from './UserProfileChart';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEdit, FaUsers, FaPoll } from 'react-icons/fa';
import { GoCommentDiscussion } from "react-icons/go";
import { FaArrowTrendDown, FaArrowTrendUp, FaEllipsisVertical, FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { images } from '../../public/index.js';
import ChangePassword from './ChangePassword.jsx';
import { CgProfile } from "react-icons/cg";
import { MdEventAvailable } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { SlLogout } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ApiContext from '../context/ApiContext.jsx';
import { ToastContainer, toast, } from "react-toastify";
import DiscussionModal from './DiscussionModal.jsx';
import EditProfileModal from './EditProfileModal';

const UserProfile = () => {



  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const openEditForm = () => setIsEditModalOpen(true);
  // const closeEditForm = () => setIsEditModalOpen(false);

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, userToken, fetchData, setUserToken } = useContext(ApiContext);
  const navigate = useNavigate()
  const [backgroundImage, setBackgroundImage] = useState(images.NvidiaBackground);
  const [userDisscussions, setUserDisscussion] = useState([])
  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };
  const handleButtonClick = () => {
    setShowEmailInput(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    if (validateEmail(email)) {
      setEmailError('');
      setEmailSubmitted(true);
      // Add your email submission logic here
      const endpoint = "user/sendinvite";
      const method = "POST"
      const body = {
        "email": email
      }
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': userToken
      }
      setLoading(true)

      try {
        const data = await fetchData(endpoint, method, body, headers);
        if (!data.success) {
          setLoading(false)
          toast.error(`Error in send invite: ${data.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (data.success) {
          setLoading(false)

          toast.success("Invite send successfully ", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        setLoading(false)
        toast.error(`Something went wrong try again`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      // console.log('Email submitted:', email);
    } else {
      setEmailError('Invalid email address');
    }
  };
  const handleLogout = () => {
    Cookies.remove('userToken');
    setUserToken(null)
    navigate('/')
  }

  const closeModal = () => {
    setModalIsOpen(false);
    // setIsFormOpen(false);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState([]);
  const handleClickDiscussion = (discussion) => {
    setSelectedDiscussion(discussion);
    setModalIsOpen(true)
  }

  useEffect(() => {
    const fetchUserDisscussions = () => {
      try {
        const endpoint = "userprofile/getUserDiscussion";
        const method = "POST";
        const body = {}
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': userToken
        };
        if (userToken) {
          setLoading(true);
          fetchData(endpoint, method, body, headers)
            .then(result => {
              if (result && result.data) {
                return result.data;
              } else {
                throw new Error("Invalid data format");
              }
            })
            .then((data) => {
              setLoading(false);
              setUserDisscussion(data.updatedDiscussions);
            })
            .catch(error => {
              setLoading(false);
              console.log(`Something went wrong: ${error.message}`);
            });
        }
      } catch (error) {
        console.log(error)
      }
    };
    if (userToken != null && user != null && userToken != undefined && user != undefined) {
      setIsLoggedIn(true);
      fetchUserDisscussions();
    }
  }, [user, userToken, fetchData]);
  return (

    !isLoggedIn ? <h1>login?</h1> : loading ? <h1>loading....</h1> :
      <div className="bg-DGXwhite p-2 md:p-8">
        <ToastContainer />
        {modalIsOpen && selectedDiscussion && (
          <DiscussionModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            discussion={selectedDiscussion}
          // setDiscussions={setDiscussions}
          // discussions={discussions}
          />
        )}
        <div className="md:my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="bg-DGXwhite w-full rounded-lg shadow-xl  pb-6 border border-DGXgreen">
              <div className="w-full h-[250px] rounded-t-lg border border-t-0 border-l-0 border-r-0 border-b-DGXgreen border-b-4">
                <img src={images.NvidiaBackground} className="w-full h-full rounded-tl-lg rounded-tr-lg" alt="Profile background" />
              </div>
              <div className="flex flex-col items-center -mt-20">
                {/* <div className="w-40 h-40 border-4 border-DGXgreen rounded-full">
                  <img src={images.Globe} className='rounded-full' alt="Profile" />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    title="Click to change background image"
                  />
                </div> */}
                <div className="w-40 h-40 border-4 border-DGXgreen rounded-full">
                  <img src={user?.ProfilePicture || images.defaultProfile} className='object-contain aspect-square rounded-full' />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    title="Click to change background image"
                  />
                </div>
                <div>
                  {/* <FaEdit className="text-DGXblack text-3xl" /> */}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <p className="text-2xl">{user.Name}</p>
                  <span className="bg-[#2563eb] rounded-full p-1" title="Verified">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-DGXwhite h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <p className="text-DGXgray">{user.Designation}</p>
                <p className="text-sm text-[#6b7280]">{user.EmailId}</p>
              </div>
            </div>
            <div className="my-4 flex flex-col 2xl:flex-row 2xl:space-y-0 2xl:space-x-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="flex-1 bg-DGXwhite rounded-lg shadow-xl p-8 border border-DGXgreen">
                  <ul>
                    <div className={`flex items-center p-6 cursor-pointer ${activeTab === 'profile' ? 'bg-DGXgreen/40' : ''}`} onClick={() => setActiveTab('profile')}>
                      <CgProfile className='mr-4 text-2xl' />
                      <li className={`text-lg ${activeTab === 'profile' ? 'text-DGXblue font-bold' : ''}`}>My Profile</li>
                    </div>
                    <div className={`flex items-center p-6 cursor-pointer ${activeTab === 'posts' ? 'bg-DGXgreen/40' : ''}`} onClick={() => setActiveTab('posts')}>
                      <GoCommentDiscussion className='mr-4 text-2xl' />
                      <li className={`text-lg ${activeTab === 'posts' ? 'text-DGXblue font-bold' : ''}`}>My Posts</li>
                    </div>
                    <div className={`flex items-center p-6 cursor-pointer ${activeTab === 'events' ? 'bg-DGXgreen/40' : ''}`} onClick={() => setActiveTab('events')}>
                      <MdEventAvailable className='mr-4 text-2xl' />
                      <li className={`text-lg ${activeTab === 'events' ? 'text-DGXblue font-bold' : ''}`}>My Events</li>
                    </div>
                    <div className={`flex items-center p-6 cursor-pointer ${activeTab === 'password' ? 'bg-DGXgreen/40' : ''}`} onClick={() => setActiveTab('password')}>
                      <CgPassword className='mr-4 text-2xl' />
                      <li className={`text-lg ${activeTab === 'password' ? 'text-DGXblue font-bold' : ''}`}>Change Password</li>
                    </div>
                    <div className={`flex items-center p-6 cursor-pointer ${activeTab === 'logout' ? 'bg-DGXgreen/40' : ''}`} onClick={() => handleLogout()}>
                      <SlLogout className='mr-4 text-2xl' />
                      <li className={`text-lg ${activeTab === 'logout' ? 'text-DGXblue font-bold' : ''}`}>Logout</li>
                    </div>
                  </ul>
                </div>
                <div className="flex-1 bg-DGXwhite rounded-lg shadow-xl p-4 md:p-8 border border-DGXgreen">
                  <h4 className="text-md md:text-xl text-DGXblack font-bold">Personal Info</h4>
                  <ul className="mt-2 text-sm text-DGXgray">
                    {user.Name ? <li className="flex justify-between border-y py-2">
                      <span className="font-bold w-24">Full name</span>
                      <span className="text-DGXgray">{user.Name}</span>
                    </li> : <></>}
                    {user.AddOnDt != null ? <li className="flex justify-between border-b py-2">
                      <span className="font-bold w-24">Joined</span>
                      <span className="text-DGXgray">{user.AddOnDt.split('T')[0]}</span>
                    </li> : <></>}
                    {user.MobileNumber ? <li className="flex justify-between border-b py-2">
                      <span className="font-bold w-24">Mobile</span>
                      <span className="text-DGXgray">{user.MobileNumber}</span>
                    </li> : <></>}
                    {user.EmailId ? <li className="flex justify-between border-b py-2">
                      <span className="font-bold w-24">Email</span>
                      <span className="text-DGXgray">{user.EmailId}</span>
                    </li> : <></>}
                    {user.Designation ? <li className="flex justify-between border-b py-2">
                      <span className="font-bold w-24">Designation: </span>
                      <span className="text-DGXgray">{user.Designation}</span>
                    </li> : <></>}
                    {user.CollegeName ? <li className="flex justify-between border-b py-2 flex-col lg:flex-row">
                      <span className="font-bold w-24">College Name</span>
                      <span className="text-DGXgray">{user.CollegeName}</span>
                    </li> : <></>}
                    {user.ReferalNumberCount != null ? <li className="flex justify-between border-b py-2 ">
                      <span className="font-bold w-24">Refer Count Remaining</span>
                      <span className="text-DGXgray">{user.ReferalNumberCount}</span>
                    </li> : <></>}
                  </ul>
                  <button
                    className={`mt-4 px-4 py-2 bg-DGXgreen text-white rounded hover:bg-DGXdarkgreen ${user.
                      ReferalNumberCount == 0 ? 'bg-DGXgreen opacity-75' : ' '}`}
                    onClick={handleButtonClick}
                    disabled={user.ReferalNumberCount === 0}
                  >
                    Refer
                  </button>
                  {showEmailInput && (
                    <div className="mt-4 flex items-center">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        className="p-2 border border-DGXgreen rounded w-full mr-2"
                        placeholder="Enter your email"
                      />
                      <button
                        className="px-4 py-2 bg-DGXgreen text-white rounded hover:bg-DGXdarkgreen"
                        onClick={handleEmailSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
                  {emailSubmitted && !emailError && <p className="text-green-500 mt-2">Refered successfully!</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/4 bg-DGXwhite rounded-lg shadow-xl md:p-4 md:border border-DGXgreen mx-auto">
            {activeTab === 'profile' && (
              <div className="flex flex-col w-full 2xl:w-3/3 ">
                <div className="flex bg-DGXwhite rounded-lg shadow-xl p-2 md:p-4 border border-DGXgreen ">
                  {/* <div className="flex-1">
                    <h4 className="text-xl text-[#111827] font-bold">About</h4>
                    <p className="mt-2 text-DGXgray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates obcaecati numquam error et ut fugiat asperiores. Sunt nulla ad incidunt laboriosam, laudantium est unde natus cum numquam, neque facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, magni odio magnam commodi sunt ipsum eum! Voluptas eveniet aperiam at maxime, iste id dicta autem odio laudantium eligendi commodi distinctio!</p>
                  </div> */}
                  {/* <div className="flex items-end mt-4">
                    <h1>Comming Soon.......</h1>
                    <span className="badge">Achievements</span>
                    <span className="badge">Badge 2</span>
                  </div> */}
                </div>
                <div className="flex-1/2 bg-DGXwhite rounded-lg shadow-xl mt-4 p-2 md:p-8 border border-DGXgreen">
                  <h4 className="text-xl text-[#111827] font-bold">Statistics</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    <div className="px-6 py-6 bg-DGXwhite border border-DGXgreen rounded-lg shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-DGXblue">Discussions</span>
                        <span className="text-xs bg-[#e5e7eb] hover:bg-[#6b7280] text-[#6b7280] hover:text-[#e5e7eb] px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div>
                          <div className="w-12 h-12 p-2.5 bg-[#60a5fa] bg-opacity-20 rounded-full text-DGXblue border border-DGXblue flex items-center justify-center">
                            <GoCommentDiscussion className="w-6 h-6 text-[#4f46e5]" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-end">
                            <span className="text-2xl 2xl:text-3xl font-bold">532</span>
                            <div className="flex items-center ml-2 mb-1">
                              <FaArrowTrendUp className="w-5 h-5 text-[#22c55e]" />
                              <span className="font-bold text-sm text-[#6b7280] ml-0.5">3%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-6 bg-DGXwhite border border-DGXgreen rounded-lg shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-DGXblue">Polls</span>
                        <span className="text-xs bg-[#e5e7eb] hover:bg-[#6b7280] text-[#6b7280] hover:text-[#e5e7eb] px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div>
                          <div className="w-12 h-12 p-2.5 bg-[#4ade80] bg-opacity-20 rounded-full text-[#1e40af] border border-[#16a34a] flex items-center justify-center">
                            <FaPoll className="w-6 h-6 text-[#1e40af]" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-end">
                            <span className="text-2xl 2xl:text-3xl font-bold">217</span>
                            <div className="flex items-center ml-2 mb-1">
                              <FaArrowTrendUp className="w-5 h-5 text-[#22c55e]" />
                              <span className="font-bold text-sm text-[#6b7280] ml-0.5">5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-6 bg-DGXwhite border border-DGXgreen rounded-lg shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-DGXblue">Connections</span>
                        <span className="text-xs bg-[#e5e7eb] hover:bg-[#6b7280] text-[#6b7280] hover:text-[#e5e7eb] px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div>
                          <div className="w-12 h-12 p-2.5 bg-[#60a5fa] bg-opacity-20 rounded-full text-DGXblue border border-DGXblue flex items-center justify-center">
                            <FaUsers className="w-6 h-6 text-DGXblue" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-end">
                            <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                            <div className="flex items-center ml-2 mb-1">
                              <FaArrowTrendDown className="w-5 h-5 text-[#c52238]" />
                              <span className="font-bold text-sm text-[#6b7280] ml-0.5">7%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center items-center">
                    <UserProfileChart /> {/* Include the Chart component */}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'posts' && (
              <div>
                <div className='post_bar pt-4 flex flex-col space-y-6'>
                  <div className='flex-col'>
                    <h4 className="text-xl text-[#0f172a] font-bold">My Posts</h4>
                  </div>
                  {
                    userDisscussions.map((discussion, index) => (
                      <>

                        <div className='post shadow-xl rounded-md p-2'>
                          <a href="#" className="m-2 shadow-xl flex flex-col md:flex-row bg-white border border-DGXgreen rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="w-full md:w-1/4">
                              <img className="object-cover w-full h-96 md:h-auto md:rounded-none rounded-t-lg md:rounded-s-lg" src={discussion.Image} alt="" />
                            </div>
                            <div className="w-full md:w-3/4 flex flex-col justify-between p-4 leading-normal">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{discussion.Title}</h5>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{discussion.Content}</p>
                              <div className="ms-0">
                                <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline" onClick={(e) => { handleClickDiscussion(discussion) }}>
                                  Read more
                                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </>
                    ))
                  }
                  <div className='post shadow-xl rounded-md p-2'>
                    <a href="#" className="m-2 shadow-xl flex flex-col md:flex-row bg-white border border-DGXgreen rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <div className="w-full md:w-1/4">
                        <img className="object-cover w-full h-96 md:h-auto md:rounded-none rounded-t-lg md:rounded-s-lg" src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" alt="" />
                      </div>
                      <div className="w-full md:w-3/4 flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'events' && (
              <div className='w-full'>
                <div className='flex-col'>
                  <h4 className="text-xl text-[#0f172a] font-bold">My Events</h4>
                </div>
                Coming Soon

              </div>
            )}
            {activeTab === 'password' && (
              <div>
                <h4 className="text-xl text-[#0f172a] font-bold">Change Password</h4>
                <ChangePassword />
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default UserProfile;
