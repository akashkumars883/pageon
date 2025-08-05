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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white text-black"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Message</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          required
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white text-black"
          placeholder="Type your message..."
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
      >
        Send via WhatsApp
      </button>
    </form>
  );
};

export default ContactForm;
