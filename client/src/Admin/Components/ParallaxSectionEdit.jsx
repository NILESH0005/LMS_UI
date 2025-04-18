import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import ApiContext from "../../context/ApiContext";

const ParallaxSection = () => {
  const [parallaxTexts, setParallaxTexts] = useState([]);
  const [activeText, setActiveText] = useState("");
  const [newText, setNewText] = useState("");
  const { fetchData, userToken } = useContext(ApiContext);

  useEffect(() => {
    console.log("User Token:", userToken); 
    fetchParallaxTexts();
  }, [userToken, fetchData]);

  const fetchParallaxTexts = async () => {
    const endpoint = "home/getParallaxContent";
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
      // "auth-token": userToken,
    };
    const body = {};

    try {
      const response = await fetchData(endpoint, method, body, headers);
      console.log("Response:", response);

      if (response.success) {
        setParallaxTexts(response.data);
        const active = response.data.find((text) => text.isActive);
        if (active) {
          setActiveText(active.Content);
        }
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      console.error("API Request Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const addParallaxText = async () => {
    if (!userToken) {
      Swal.fire("Error", "User is not authenticated. Please log in again.", "error");
      console.error("userToken is missing!");
      return;
    }

    if (parallaxTexts.length < 10) {
      const endpoint = "home/addParallaxText";
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        "auth-token": userToken,
      };

      const body = { componentName: "Parallax", componentIdName: "parallaxText", content: newText };

      try {
        const response = await fetchData(endpoint, method, body, headers);

        if (response.success) {
          const newTextObj = { Content: newText, isActive: false, idCode: response.data.id }; 
          console.log("idcode:" , response.data.id);
          setParallaxTexts([...parallaxTexts, newTextObj]);
          setNewText("");

          await handleSetActiveText(response.data.id);

          Swal.fire({ icon: "success", title: "Added!", text: "New parallax text has been added.", timer: 1500, showConfirmButton: false });
        } else {
          Swal.fire("Error", response.message, "error");
        }
      } catch (error) {
        console.error("API Request Error:", error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    } else {
      Swal.fire({ icon: "error", title: "Limit Reached", text: "You can only add up to 10 parallax texts." });
    }
  };

  // const handleSetActiveText = async (idCode) => {
  //   const endpoint = "home/setActiveParallaxText";
  //   const method = "POST";
  //   const headers = {
  //     "Content-Type": "application/json",
  //     "auth-token": userToken,
  //   };
  //   const body = { idCode };

  //   try {
  //     const response = await fetchData(endpoint, method, body, headers);

  //     if (response.success) {
  //       fetchParallaxTexts();
  //       Swal.fire({ icon: "success", title: "Updated!", text: "Active parallax text has been updated.", timer: 1500, showConfirmButton: false });
  //     } else {
  //       Swal.fire("Error", response.message, "error");
  //     }
  //   } catch (error) {
  //     console.error("API Request Error:", error);
  //     Swal.fire("Error", "Something went wrong!", "error");
  //   }
  // };

  const handleSetActiveText = async (idCode) => {
    console.log("Setting active text with idCode:", idCode); // Debug
    const endpoint = "home/setActiveParallaxText";
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
      "auth-token": userToken,
    };
    const body = { idCode };

    try {
      const response = await fetchData(endpoint, method, body, headers);

      if (response.success) {
        fetchParallaxTexts();
        Swal.fire({ icon: "success", title: "Updated!", text: "Active parallax text has been updated.", timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire("Error", response.message, "error");
      }
    } catch (error) {
      console.error("API Request Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="w-full bg-gray-900 text-white text-center py-10 text-2xl font-bold">
        {activeText}
      </div>
      <div className="mt-6 w-full">
        <h2 className="text-lg font-semibold mb-2">Edit Parallax Text</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow w-full">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Serial No</th>
                <th className="border p-2">Parallax Text</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {parallaxTexts.map((text, index) => (
                <tr key={index} className="border">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{text.Content}</td>
                  <td className="border p-2 text-center">
                    <button
                      className={`px-3 py-1 rounded ${activeText === text.Content
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      onClick={() => handleSetActiveText(text.idCode)} // Call handleSetActiveText
                      disabled={activeText === text.Content}
                    >
                      {activeText === text.Content ? "Active" : "Set as Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="border p-2 flex-grow rounded"
            placeholder="Enter new parallax text..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addParallaxText}
          >
            Add Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;