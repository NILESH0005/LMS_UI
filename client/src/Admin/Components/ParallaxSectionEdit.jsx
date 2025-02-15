import { useState } from "react";
import Swal from "sweetalert2";

const ParallaxSection = () => {
  const [parallaxTexts, setParallaxTexts] = useState([
    "Innovate. Collaborate. Transform.",
    "Empowering AI for the Future.",
    "Building a Smarter Tomorrow."
  ]);
  const [activeText, setActiveText] = useState(parallaxTexts[0]);
  const [newText, setNewText] = useState("");

  const addParallaxText = () => {
    if (newText.trim()) {
      if (parallaxTexts.length < 10) {
        setParallaxTexts([...parallaxTexts, newText]);
        setNewText("");

        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "New parallax text has been added.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Limit Reached",
          text: "You can only add up to 10 parallax texts.",
        });
      }
    }
  };

  const deleteParallaxText = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This text will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setParallaxTexts(parallaxTexts.filter((_, i) => i !== index));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The parallax text has been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      {/* Parallax Banner */}
      <div className="w-full bg-gray-900 text-white text-center py-10 text-2xl font-bold">
        {activeText}
      </div>

      {/* Edit Parallax Text Section */}
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
                  <td className="border p-2">{text}</td>
                  <td className="border p-2 text-center flex gap-2 justify-center">
                    <button
                      className={`px-3 py-1 rounded ${
                        activeText === text
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      onClick={() => setActiveText(text)}
                      disabled={activeText === text}
                    >
                      {activeText === text ? "Active" : "Set as Active"}
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => deleteParallaxText(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Parallax Text */}
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
