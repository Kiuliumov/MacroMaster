export default function LogoutButton({ onLogout }) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onLogout}
        className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow transition"
      >
        Logout
      </button>
    </div>
  );
}
