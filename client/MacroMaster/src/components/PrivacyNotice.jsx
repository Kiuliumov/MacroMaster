import React, { useState, useEffect } from "react";

export default function PrivacyNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-2xl w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between z-50">
      <p className="text-sm text-gray-700 dark:text-gray-300 mr-4">
        We use cookies to enhance your experience. By continuing, you agree to
        our use of cookies. See our <a href="/policy" className="underline">Privacy Policy</a>.
      </p>
      <button
        onClick={handleAccept}
        className="whitespace-nowrap px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium shadow-md"
      >
        Got it
      </button>
    </div>
  );
}
