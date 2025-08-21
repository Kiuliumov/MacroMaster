import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../state_manager/toastSlice";
import { useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";

const ICONS = {
  success: (className) => (
    <svg
      className={`w-5 h-5 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  ),
  danger: (className) => (
    <svg
      className={`w-5 h-5 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
  ),
  warning: (className) => (
    <svg
      className={`w-5 h-5 ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
  ),
};

const BG_COLOR = "bg-gray-100 dark:bg-gray-800";

const ICON_COLORS = {
  success: "text-green-500",
  danger: "text-red-500",
  warning: "text-yellow-500",
};

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
    <div className="fixed top-4 right-4 flex flex-col space-y-2 z-[9999]">
      {toasts.map((toast) => (
        <Transition
          key={toast.id}
          show={true}
          enter="transform transition duration-300 ease-out"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transform transition duration-200 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <div
            className={`flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-sm ${BG_COLOR} text-gray-700 dark:text-gray-200`}
            role="alert"
          >
            <div
              className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${ICON_COLORS[toast.type]}`}
            >
              {ICONS[toast.type]?.(ICON_COLORS[toast.type])}
              <span className="sr-only">{toast.type} icon</span>
            </div>

            <div className="ms-3 text-sm font-normal flex-1">
              {toast.message}
            </div>

            <button
              type="button"
              onClick={() => handleClose(toast.id)}
              className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8
                ${BG_COLOR} text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white`}
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </Transition>
      ))}
    </div>
  );
}
