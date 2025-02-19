import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Contact = () => {
  // Initialize state with the default values
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    address: "Global Infoventures Pvt. Ltd. H-65 Sector 63, Noida",
    email: "info@giindia.com",
    contactNo: "+91 9876543210",
    workingHours: "Mon - Fri: 10:00 AM - 06:00 PM",
  });

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  // Toggle edit/save mode
  const toggleEdit = () => {
    if (isEditing) {
      // If switching to "Save", show SweetAlert2 confirmation
      Swal.fire({
        title: 'Saved!',
        text: 'Your contact information has been saved.',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex justify-center items-center">
      <section className="w-full max-w-7xl mb-8">
        <div className="container px-8 md:px-12 mt-12">
          <div className="block rounded-lg border border-DGXgreen shadow-md px-8 py-12 md:py-16 md:px-12">
            {/* Heading and Tagline */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-DGXgreen">Contact Us</h1>
              <p className="text-neutral-500 mt-2">We're here to help! Reach out to us for any inquiries.</p>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 lg:w-1/2 md:px-3 lg:px-3">
                {/* 2x2 Grid Layout for Labels */}
                <div className="grid grid-cols-2 gap-8"> {/* Increased gap here */}
                  {[ 
                    { title: "Address", name: "address" }, 
                    { title: "Email", name: "email" }, 
                    { title: "Contact No", name: "contactNo" }, 
                    { title: "Working hours", name: "workingHours" } 
                  ].map((info, idx) => (
                    <div key={idx} className="flex flex-col mb-4"> {/* Added margin to bottom for better spacing */}
                      <h2 className="md:text-base font-bold text-primary mb-2">{info.title}</h2>
                      {isEditing ? (
                        <input
                          type="text"
                          name={info.name}
                          value={contactInfo[info.name]}
                          onChange={handleInputChange}
                          className="text-neutral-500 text-sm md:text-sm border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-DGXgreen transition-colors" // Improved focus styling
                        />
                      ) : (
                        <p className="text-neutral-500 text-sm md:text-sm">{contactInfo[info.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={toggleEdit}
                  className="mt-6 px-6 py-2 bg-DGXgreen text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Google Map */}
            <div className="mt-8 relative h-[400px] w-full overflow-hidden bg-cover bg-no-repeat rounded-lg border border-DGXgreen shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0870145803983!2d77.37414877613706!3d28.627154084323823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce542aa429ff5%3A0xe9ff04abfd54f721!2sGlobal%20Infoventures%20Pvt.%20Ltd.%20-%20University%20ERP%2C%20College%20ERP%2C%20Institute%20%2F%20School%20ERP!5e0!3m2!1sen!2sin!4v1739864558312!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
