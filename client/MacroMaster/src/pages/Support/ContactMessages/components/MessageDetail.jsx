export default function MessageDetail({ message, onClose }) {
  if (!message)
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-300 text-sm text-center px-2">
        Select a message to see details
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{message.subject}</h2>
        <button className="text-gray-700 dark:text-white font-bold text-xl" onClick={onClose}>
          ×
        </button>
      </div>
      <p className="mb-1 text-gray-900 dark:text-white">
        <strong>From:</strong> {message.name} ({message.email})
      </p>
      <p className="mb-2 text-gray-900 dark:text-white">
        <strong>Sent:</strong> {new Date(message.created_at).toLocaleString()}
      </p>
      <div className="flex-grow p-2 bg-white dark:bg-gray-800 rounded-xl overflow-auto text-gray-900 dark:text-white text-sm">
        {message.message}
      </div>
    </div>
  );
}