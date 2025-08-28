import { useState } from "react";
import { supportStyles } from "../styles";

export default function ContactForm() {
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
    <div className={supportStyles.card}>
      <h2 className={supportStyles.cardTitle}>Send a Message</h2>
      {status && <p className={supportStyles.status}>{status}</p>}
      <form onSubmit={handleSubmit} className={supportStyles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className={supportStyles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className={supportStyles.input}
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className={supportStyles.input}
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          className={supportStyles.textarea}
          required
        />
        <button type="submit" className={supportStyles.button}>
          Send Message
        </button>
      </form>
    </div>
  );
}