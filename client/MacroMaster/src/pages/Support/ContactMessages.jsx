import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../state_manager/toastSlice";
import { supportStyles } from "./styles";

const mockMessages = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  subject: `Subject ${i + 1}`,
  message: `This is the detailed content of message number ${i + 1}. It can be long and include all information sent by the user.`,
  created_at: new Date(Date.now() - i * 10000000).toISOString(),
}));

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const dispatch = useDispatch();

  const messagesPerPage = 6;

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete message");

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);

      dispatch(addToast({ message: "Message deleted successfully!", type: "success" }));
    } catch (error) {
      dispatch(addToast({ message: error.message || "Deletion failed", type: "error" }));
    }
  };

  // Sorting
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
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse dark:bg-purple-700"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse dark:bg-pink-700"></div>

      <div className={supportStyles.headerContainer}>
        <h1 className={supportStyles.title}>Contact Messages</h1>
        <p className={supportStyles.subtitle}>
          Click on a message to view details. You can also sort, paginate, or delete messages.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
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
                <th className="p-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`transition-colors cursor-pointer ${
                    selectedMessage?.id === msg.id
                      ? "bg-blue-100 dark:bg-blue-800"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <td className="p-2 text-gray-900 dark:text-white">{msg.id}</td>
                  <td className="p-2 text-gray-900 dark:text-white">{msg.name}</td>
                  <td className="p-2 text-gray-900 dark:text-white">{msg.email}</td>
                  <td className="p-2 text-gray-900 dark:text-white">{msg.subject}</td>
                  <td className="p-2 text-gray-900 dark:text-white">{new Date(msg.created_at).toLocaleString()}</td>
                  <td className="p-2">
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(msg.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4 space-x-2 mb-4">
            <button
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-inner p-4 flex flex-col h-full min-h-[400px]">
          {selectedMessage ? (
            <>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedMessage.subject}</h2>
                <button
                  className="text-gray-700 dark:text-white font-bold text-xl"
                  onClick={() => setSelectedMessage(null)}
                >
                  ×
                </button>
              </div>
              <p className="mb-1 text-gray-900 dark:text-white">
                <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
              </p>
              <p className="mb-2 text-gray-900 dark:text-white">
                <strong>Sent:</strong> {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
              <div className="flex-grow p-2 bg-white dark:bg-gray-800 rounded-xl overflow-auto text-gray-900 dark:text-white text-sm">
                {selectedMessage.message}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-300 text-sm">
              Select a message to see details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
