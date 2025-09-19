import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../state_manager/toastSlice";
import { useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";

const ICONS = {
  success: () => (
    <svg
      className="w-5 h-5 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  ),
  danger: () => (
    <svg
      className="w-5 h-5 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
  ),
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

  const getBgColor = (type) => {
    if (type === "success") return "#16a34a";
    if (type === "danger") return "#dc2626";
    return "#374151"; 
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
            className="flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-lg"
            role="alert"
            style={{ backgroundColor: getBgColor(toast.type) }}
          >
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg text-white">
              {ICONS[toast.type]?.()}
            </div>

            <div className="ms-3 text-sm font-normal flex-1 text-white">
              {toast.message}
            </div>

            <button
              type="button"
              onClick={() => handleClose(toast.id)}
              className="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center text-white hover:text-gray-200 transition"
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
