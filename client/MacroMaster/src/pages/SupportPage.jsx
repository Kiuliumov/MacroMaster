import React, { useState } from "react";

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

  const styles = {
    container:
      "min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col items-center px-4 py-12",
    headerWrapper: "text-center mb-12 max-w-3xl",
    headerTitle: "text-4xl md:text-5xl font-extrabold mb-4",
    headerSubtitle: "text-lg md:text-xl text-gray-600 dark:text-gray-300",
    grid: "grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl items-start",
    card: "bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700",
    cardTitle: "text-2xl font-bold mb-6 text-center",
    status: "text-center mb-4 text-sm text-green-500",
    form: "flex flex-col space-y-5",
    input:
      "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500",
    textarea:
      "w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500",
    button:
      "w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium py-2 rounded-xl transition-colors",
    mapWrapper:
      "rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col",
    mapText: "text-center text-gray-700 dark:text-gray-300 mt-2",
    iframe: "w-full h-full min-h-[400px] border-0",
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.headerTitle}>💌 Support</h1>
        <p className={styles.headerSubtitle}>
          Need help? Fill out the form below and our team will get back to you
          as soon as possible. We're here to help! 🛠️
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Send a Message</h2>

          {status && <p className={styles.status}>{status}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={styles.input}
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className={styles.input}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className={styles.textarea}
              required
            ></textarea>

            <button type="submit" className={styles.button}>
              Send Message
            </button>
          </form>
        </div>

        <div className={styles.mapWrapper}>
          <iframe
            title="Plovdiv Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.123456789!2d24.74500031567645!3d42.14250047918752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd7d528c6a0d5%3A0x1fddcbd896bd8a2f!2sCentral%20Square%2C%20Plovdiv!5e0!3m2!1sen!2sus!4v1692909999999!5m2!1sen!2sus"
            className={styles.iframe}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <p className={styles.mapText}>📍 Office Location</p>
        </div>
      </div>
    </div>
  );
}
