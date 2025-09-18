import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import routes from "./routes";

import Toast from "./components/Toast";
import ScrollToTop from "./components/Scroller";
import PrivacyNotice from "./components/PrivacyNotice";
import Loader from "./components/Loader";
import OnboardingCheck from "./components/OnBoardingCheck";
import { useAuth } from "../hooks/useAuth";
import ThemeSetup from "./ThemeSetup";

function App() {
  useAuth();

  return (
    <>
      <ScrollToTop />
      <ThemeSetup />
      <Toast />
      <PrivacyNotice />
      <OnboardingCheck />

      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map(({ path, element, layout: Layout }) => {
            const wrappedElement = Layout ? <Layout>{element}</Layout> : element;
            return <Route key={path} path={path} element={wrappedElement} />;
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
