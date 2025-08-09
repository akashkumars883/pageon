import React, { useState } from "react";

const ContactForm = ({ whatsappNumber }) => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!whatsappNumber) {
      alert("Business WhatsApp number is not available.");
      return;
    }

    const cleanNumber = whatsappNumber.replace(/\D/g, ""); // remove non-numeric chars
    const fullMessage = `Hi, my name is ${formData.name}. ${formData.message}`;
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    window.open(waUrl, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm sm:text-base mb-2 font-medium">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-sm sm:text-base"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm sm:text-base mb-2 font-medium">Message</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          required
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 resize-none text-sm sm:text-base"
          placeholder="Type your message..."
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base hover:shadow-lg"
      >
        Send via WhatsApp
      </button>
    </form>
  );
};

export default ContactForm;
