import { Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import OfficeLocation from "./components/OfficeLocation";
import { supportStyles } from "./styles";
import { useAuth } from "../../../hooks/useAuth"; 
export default function SupportPage() {
  const { user } = useAuth();

  const isAdmin = user?.is_staff || user?.is_superuser;

  return (
    <main className={supportStyles.container}>
      <div
        className={supportStyles.gradientBlur}
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.2) 15.73%, rgba(14, 165, 233, 0.6) 15.74%, rgba(232, 121, 249, 0.35) 56.49%, rgba(79, 70, 229, 0.5) 115.91%)",
        }}
      />

      <div className={supportStyles.headerContainer}>
        <h1 className={supportStyles.title}>Support Center</h1>
        <p className={supportStyles.subtitle}>
          Have questions, feedback, or need assistance? Fill out the form below
          and our support team will get back to you as soon as possible.
        </p>
        {isAdmin && (
          <Link
            to="/contact-messages"
            className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            View Contact Messages
          </Link>
        )}
      </div>

      <div className={supportStyles.mainContentGrid}>
        <ContactForm />
        <OfficeLocation />
      </div>
    </main>
  );
}
