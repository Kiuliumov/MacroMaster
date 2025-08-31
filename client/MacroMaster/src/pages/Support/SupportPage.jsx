import ContactForm from "./components/ContactForm";
import OfficeLocation from "./components/OfficeLocation";
import { supportStyles } from "./styles";

export default function SupportPage() {
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
      </div>

      <div className={supportStyles.mainContentGrid}>
        <ContactForm />
        <OfficeLocation />
      </div>
    </main>
  );
}