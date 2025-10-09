import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../../state_manager/toastSlice";
import { supportStyles } from "./styles";
import { API_BASE_URL } from "../../../config";
import MessageDetail  from './components/MessageDetail';
import MessageRow from "./components/MessageRow";
import Pagination from "./components/Pagination";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const messagesPerPage = 6;
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/contact-messages/`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        dispatch(addToast({ message: error.message || "Failed to load messages", type: "error" }));
      }
    };
    fetchMessages();
  }, [dispatch]);

  useEffect(() => {
    const wsProtocol = API_BASE_URL.startsWith("https") ? "wss" : "ws";
    const wsUrl = API_BASE_URL.replace(/^http(s)?:/, wsProtocol + ":") + "/api/ws/contact-messages/";
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.action === "init") {
        setMessages(data.messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      }
      if (data.action === "create") {
        setMessages((prev) => [data.message, ...prev]);
      }
      if (data.action === "delete") {
        setMessages((prev) => prev.filter((msg) => msg.id !== data.id));
        if (selectedMessage?.id === data.id) setSelectedMessage(null);
      }
    };

    return () => socket.close();
  }, [selectedMessage]);

  const deleteMessage = (id) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      dispatch(addToast({ message: "WebSocket not connected", type: "error" }));
      return;
    }
    socketRef.current.send(JSON.stringify({ action: "delete", id }));
  };

  const sortMessages = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    setMessages((prev) =>
      [...prev].sort((a, b) => {
        if (a[field] < b[field]) return order === "asc" ? -1 : 1;
        if (a[field] > b[field]) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 flex flex-col items-center justify-start lg:justify-start p-6 lg:p-12 overflow-visible">
      <div className={supportStyles.headerContainer}>
        <h1 className={supportStyles.title}>Contact Messages</h1>
        <p className={supportStyles.subtitle}>
          Click on a message to view details. You can also sort, paginate, or delete messages.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-auto">
          <table className="w-full text-left border-collapse text-sm min-w-[600px] lg:min-w-full">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                {["id", "name", "email", "subject", "created_at"].map((field) => (
                  <th
                    key={field}
                    className="cursor-pointer p-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                    onClick={() => sortMessages(field)}
                  >
                    {field.toUpperCase()}
                    {sortField === field ? (sortOrder === "asc" ? " 🔼" : " 🔽") : ""}
                  </th>
                ))}
                <th className="p-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.map((msg) => (
                <MessageRow
                  key={msg.id}
                  message={msg}
                  selected={selectedMessage?.id === msg.id}
                  onSelect={setSelectedMessage}
                  onDelete={deleteMessage}
                />
              ))}
            </tbody>
          </table>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

        <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-inner p-4 flex flex-col h-full min-h-[400px]">
          <MessageDetail message={selectedMessage} onClose={() => setSelectedMessage(null)} />
        </div>
      </div>
    </div>
  );
}