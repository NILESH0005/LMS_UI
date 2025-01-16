import React from "react";

const Map = () => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.087171674819!2d77.37414877616469!3d28.62714937566778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce542aa429ff5%3A0xe9ff04abfd54f721!2sGlobal%20Infoventures%20Pvt.%20Ltd.%20-%20University%20ERP%2C%20College%20ERP%2C%20Institute%20%2F%20School%20ERP!5e0!3m2!1sen!2sin!4v1732270468809!5m2!1sen!2sin"
        style={{
          border: "0",
          width: "100%",
          height: "100%",
        }}
        allowFullScreen=""
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;
