import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import ApiContext from "../context/ApiContext";

const ContentSection = () => {
  const [contentData, setContentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData, userToken } = useContext(ApiContext);
  const [retryCount, setRetryCount] = useState(0); 
  const maxRetries = 3;

  useEffect(() => {
    let isMounted = true;
  
    const fetchContentData = async (attempt = 0) => {
      if (attempt >= maxRetries) {
        setIsLoading(false);
        return;
      }
  
      const endpoint = "home/getContent";
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
      };
      const timeoutDuration = 10000;
  
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
  
        const response = await fetchData(endpoint, method, {}, headers, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
  
        if (isMounted) {
          if (response?.success && Array.isArray(response.data) && response.data.length > 0) {
            setContentData(
              response.data.map((item) => ({
                id: item.idCode,
                title: item.Title,
                text: item.Content,
                image: item.Image,
              }))
            );
            setIsLoading(false);
            setRetryCount(0); // Reset retry count after success
          } else {
            console.warn(`Attempt ${attempt + 1}: Content fetch returned empty. Retrying...`);
            setRetryCount(attempt + 1);
            setTimeout(() => fetchContentData(attempt + 1), 2000); // Retry after 2 seconds
          }
        }
      } catch (error) {
        if (isMounted) {
          if (error.name === "AbortError") {
            Swal.fire("Error", "Request timed out. Please try again.", "error");
          } else {
            Swal.fire("Error", "Failed to fetch content", "error");
          }
          setIsLoading(false);
        }
      }
    };
  
    fetchContentData(); 
  
    return () => {
      isMounted = false; 
    };
  }, []); 
  

  return (
    <div id="sec" className="relative p-24 bg-DGXblue flex items-center justify-between">
      {isLoading ? (
        <>
          <div className="max-w-2xl">
            <div className="h-10 w-3/4 bg-gray-300 animate-pulse mb-8 rounded"></div>
            <div className="h-6 w-full bg-gray-300 animate-pulse rounded"></div>
            <div className="h-6 w-5/6 bg-gray-300 animate-pulse rounded mt-2"></div>
          </div>
          <div className="w-1/3">
            <div className="w-80 h-80 bg-gray-300 animate-pulse rounded-lg shadow-2xl"></div>
          </div>
        </>
      ) : contentData.length > 0 ? (
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
