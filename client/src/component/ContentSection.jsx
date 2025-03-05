import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import ApiContext from "../context/ApiContext";

const ContentSection = () => {
  const [contentData, setContentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
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
        const transformedData = response.data.map((item) => ({
          id: item.idCode,
          title: item.Title,
          text: item.Content,
          image: item.Image,
        }));
        setContentData(transformedData);
        console.log("data is-:", transformedData);
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      Swal.fire("Error", "Failed to fetch content", "error");
    } finally {
      setIsLoading(false); // Set loading to false after API call completes
    }
  };

  // Show loading spinner or message while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div id="sec" className="relative p-24 bg-DGXblue flex items-center justify-between">
      {contentData.length > 0 ? (
        <>
          <div className="max-w-2xl">
            <h2 className="text-white text-4xl mb-8">{contentData[0].title}</h2>
            <p className="text-white">{contentData[0].text}</p>
          </div>
          <div className="w-1/3">
            {contentData[0].image ? (
              <img
                src={contentData[0].image}
                alt="Content"
                className="w-80 h-80 object-cover rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-80 h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg shadow-2xl">
                No Image
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-white">No content available.</p>
      )}
    </div>
  );
};

export default ContentSection;