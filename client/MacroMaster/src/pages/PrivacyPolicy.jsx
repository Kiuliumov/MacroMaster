import { commonStyles } from "../styles/commonStyles";

export default function PrivacyPolicy() {
  return (
    <main className={`${commonStyles.container} relative py-14 bg-gray-50 dark:bg-gray-500 overflow-hidden`}>
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-blue-500 drop-shadow-sm">
          Privacy Policy
        </h1>

        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 text-center">
          At <span className="font-semibold">MacroMaster</span>, your privacy is important to us. 
          This Privacy Policy explains how we collect, use, and protect your personal 
          information when you use our website and services.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">1. Information We Collect</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may collect personal details such as your name, email address,
          account credentials, dietary preferences, and activity data you log
          within the app.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>To provide and improve our services.</li>
          <li>To personalize your experience and track your fitness goals.</li>
          <li>To send important updates and respond to support requests.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">3. Cookies</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We use cookies to enhance your browsing experience, analyze site
          traffic, and personalize content. You can manage or disable cookies in
          your browser settings.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">4. Data Security</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We implement appropriate technical and organizational measures to
          protect your data. However, please note that no system is 100% secure.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">5. Third-Party Services</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may use third-party services (such as analytics providers) that
          collect and process data according to their own privacy policies.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">6. Your Rights</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Depending on your location, you may have rights to access, correct,
          delete, or restrict the use of your personal data. Contact us to
          exercise these rights.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">7. Updates to This Policy</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">8. Contact Us</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <span className="font-semibold">support@macromaster.com</span>.
        </p>
      </div>
    </main>
  );
}
