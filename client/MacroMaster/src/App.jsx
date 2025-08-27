import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes";

import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Toast from "./components/Toast";
import ScrollToTop from "./components/Scroller";
import CookieNotice from "./components/CookieNotice";
import Loader from "./components/Loader";

import { useAuth } from "../hooks/useAuth";

function App() {
  useAuth();

  return (
    <>
      <ScrollToTop />
      <Toast />
      <CookieNotice />
      <Navbar />

      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
