import React, { useState } from "react";
import { commonStyles } from "../../styles/commonStyles";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("❌ Something went wrong. Please try again. " + err.message);
    }
  };

  return (
    <div className={commonStyles.container}>
      <div
        className={commonStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className={commonStyles.card}>
          <h2 className={commonStyles.cardTitle}>Send a Message</h2>

          {status && <p className={commonStyles.status}>{status}</p>}

          <form onSubmit={handleSubmit} className={commonStyles.form}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={commonStyles.input}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={commonStyles.input}
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={commonStyles.input}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className={commonStyles.textarea}
              required
            />
            <button type="submit" className={commonStyles.button}>
              Send Message
            </button>
          </form>
        </div>

        <div className={commonStyles.mapWrapper}>
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.123456789!2d24.74500031567645!3d42.14250047918752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd7d528c6a0d5%3A0x1fddcbd896bd8a2f!2sCentral%20Square%2C%20Plovdiv!5e0!3m2!1sen!2sus!4v1692909999999!5m2!1sen!2sus"
            className={commonStyles.iframe}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <p className={commonStyles.mapText}>📍 Office Location</p>
        </div>
      </div>
    </div>
  );
}
