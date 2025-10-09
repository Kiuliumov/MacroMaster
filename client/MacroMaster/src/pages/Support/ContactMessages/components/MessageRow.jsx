export default function MessageRow({ message, selected, onSelect, onDelete }) {
  return (
    <tr
      key={message.id}
      className={`transition-colors cursor-pointer ${
        selected ? "bg-blue-100 dark:bg-blue-800" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      onClick={() => onSelect(message)}
    >
      <td className="p-2 text-gray-900 dark:text-white">{message.id}</td>
      <td className="p-2 text-gray-900 dark:text-white">{message.name}</td>
      <td className="p-2 text-gray-900 dark:text-white">{message.email}</td>
      <td className="p-2 text-gray-900 dark:text-white">{message.subject}</td>
      <td className="p-2 text-gray-900 dark:text-white">
        {new Date(message.created_at).toLocaleString()}
      </td>
      <td className="p-2">
        <button
          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(message.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}