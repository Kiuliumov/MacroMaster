import Navbar from "../partials/Navbar";
import Footer from "../partials/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

