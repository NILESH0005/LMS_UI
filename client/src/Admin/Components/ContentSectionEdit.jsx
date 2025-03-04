import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import ApiContext from "../../context/ApiContext";

const ContentManager = () => {
  const [contentData, setContentData] = useState([]); 
  const [formData, setFormData] = useState({ title: "", text: "", image: null });
  const [charCount, setCharCount] = useState(800);
  const [isTableView, setIsTableView] = useState(true);
  const { fetchData, userToken } = useContext(ApiContext);

  useEffect(() => {
    if (userToken) {
      fetchContentData();
    }
  }, [userToken]);

  const fetchContentData = async () => {
    const endpoint = "home/getContent";
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
      "auth-token": userToken,
    };
    const body = {};

    try {
      const response = await fetchData(endpoint, method, body, headers);
      console.log("API Response:", response);

      if (response.success) {
        
        const transformedData = response.data.map((item) => {
          const contentObj = JSON.parse(item.Content); 
          return {
            id: item.idCode,
            title: contentObj.title,  
            text: contentObj.text,    
            image: item.Image, 
          };
        });
        setContentData(transformedData);
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      Swal.fire("Error", "Failed to fetch content", "error");
    }
  };

  const toggleView = () => setIsTableView(!isTableView);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value.length > 100) return;
    if (name === "text" && value.length > 800) return;
    setFormData({ ...formData, [name]: value });
    if (name === "text") setCharCount(800 - value.length);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 500;
          canvas.height = 500;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setFormData({ ...formData, image: canvas.toDataURL("image/jpeg") });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.text) {
      Swal.fire("Error", "Title and Text fields cannot be empty!", "error");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to save the content!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (!userToken) {
          Swal.fire("Error", "User is not authenticated. Please log in again.", "error");
          return;
        }

        const endpoint = "content/addContentSection";
        const method = "POST";
        const headers = {
          "Content-Type": "application/json",
          "auth-token": userToken,
        };

        const body = {
          componentName: "ContentSection",
          componentIdName: "contentSection",
          title: formData.title,
          text: formData.text,
          image: formData.image, // Ensure it's base64 or URL if required by the backend
        };

        try {
          const response = await fetchData(endpoint, method, body, headers);
          if (response.success) {
            Swal.fire({
              icon: "success",
              title: "Added!",
              text: "New content has been added.",
              timer: 1500,
              showConfirmButton: false,
            });

            // Update the content data with the new entry
            setContentData([...contentData, { ...formData, id: response.data.id }]);
            setIsTableView(true);
          } else {
            Swal.fire("Error", response.message, "error");
          }
        } catch (error) {
          console.error("API Request Error:", error);
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{isTableView ? "Content Section" : "Edit Content"}</h1>
        <button
          onClick={toggleView}
          className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          {isTableView ? "Edit Content" : "View Content"}
        </button>
      </div>
      {isTableView ? (
        <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-xl shadow-lg">
          {contentData.length > 0 ? (
            <>
              <div className="w-full md:w-1/2 p-4">
                <h2 className="text-xl font-bold text-gray-800">{contentData[0].title}</h2>
                <p className="text-gray-700 mt-2">{contentData[0].text}</p>
              </div>
              <div className="w-full md:w-1/2 p-4 flex justify-center">
                {contentData[0].image ? (
                  <img src={contentData[0].image} alt="Content" className="w-80 h-80 object-cover rounded-lg shadow-2xl" />
                ) : (
                  <div className="w-80 h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg shadow-2xl">No Image</div>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-700">No content available.</p>
          )}
        </div>
      ) : (
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <div className="mb-4">
            <label className="block mb-1 font-bold text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-200"
              maxLength={100}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-gray-700">Text:</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg h-32 focus:ring focus:ring-blue-200"
              maxLength={800}
            />
            <p className="text-sm text-gray-500">Characters remaining: {charCount}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-gray-700">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-2xl"
            />
          </div>
          {formData.image && (
            <div className="mb-4 flex justify-center">
              <img src={formData.image} alt="Preview" className="w-80 h-80 object-cover rounded-lg shadow-2xl" />
            </div>
          )}
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition w-full"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentManager;