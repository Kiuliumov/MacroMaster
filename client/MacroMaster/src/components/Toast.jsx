import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../state_manager/toastSlice";
import { useEffect, useRef } from "react";

export default function Toast() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toasts);
  const timers = useRef({});

  useEffect(() => {
    toasts.forEach((toast) => {
      if (!timers.current[toast.id]) {
        timers.current[toast.id] = setTimeout(() => {
          dispatch(removeToast(toast.id));
          delete timers.current[toast.id];
        }, toast.duration || 3000);
      }
    });
  }, [toasts, dispatch]);

  const handleClose = (id) => {
    clearTimeout(timers.current[id]);
    dispatch(removeToast(id));
    delete timers.current[id];
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative px-4 py-2 rounded-lg shadow-lg text-white transition-all transform duration-300 ease-in-out
            ${toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"}
          `}
        >
          {toast.message}
          <button
            onClick={() => handleClose(toast.id)}
            className="absolute top-1 right-2 text-white font-bold hover:text-gray-200"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
