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

  return (
    <div className="fixed top-4 right-4 flex flex-col space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-2 rounded-lg shadow-lg text-white transition-all ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
