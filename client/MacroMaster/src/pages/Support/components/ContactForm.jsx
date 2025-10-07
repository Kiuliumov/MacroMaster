import { useState, useEffect, useRef } from "react";
import { supportStyles } from "../styles";
import { API_BASE_URL } from "../../../config";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const socketRef = useRef(null);

  useEffect(() => {
    const wsProtocol = API_BASE_URL.startsWith("https") ? "wss" : "ws";
    const wsUrl = API_BASE_URL.replace(/^http(s)?:/, wsProtocol + ":") + "/contact-messages/";

    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => socketRef.current.close();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      setStatus("❌ WebSocket not connected");
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        action: "create",
        ...formData,
      })
    );

    setStatus("✅ Message sent via WebSocket!");
    setFormData({ name: "", email: "", subject: "", message: "" });
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
