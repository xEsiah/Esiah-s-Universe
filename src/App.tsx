import { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import BackgroundWrapper from "./components/backgrounds/BackgroundWrapper";
import CardNav from "./components/CardNav";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const Cohaise = lazy(() => import("./pages/Cohaise"));
const Zatyshok = lazy(() => import("./pages/projects/Zatyshok"));
const NeoTokyoRush = lazy(() => import("./pages/projects/NeoTokyoRush"));
const EchoesOfTheLastStop = lazy(
  () => import("./pages/projects/EchoesOfTheLastStop"),
);
const ShadowPurgeRiteOfTheDemon = lazy(
  () => import("./pages/projects/ShadowPurgeRiteOfTheDemon"),
);
const LesVoixDeLExil = lazy(() => import("./pages/projects/LesVoixDeLExil"));
const WYGTIWIF = lazy(() => import("./pages/projects/WYG-TIWIF"));

function AppContent() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  const immersivePages = ["/projects/les-voix-de-l-exil"];
  const isImmersive = immersivePages.includes(location.pathname);

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isPageLoading && <LoadingScreen />}
      <ScrollToTop />
      {!isImmersive && <BackgroundWrapper />}
      <CardNav />

      <main>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cohaise" element={<Cohaise />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/neo-tokyo-rush" element={<NeoTokyoRush />} />
            <Route
              path="/projects/echoes-of-the-last-stop"
              element={<EchoesOfTheLastStop />}
            />
            <Route
              path="/projects/shadow-purge-rite-of-the-demon"
              element={<ShadowPurgeRiteOfTheDemon />}
            />
            <Route path="/projects/zatyshok" element={<Zatyshok />} />
            <Route path="/projects/wyg-tiwif" element={<WYGTIWIF />} />
            <Route
              path="/projects/les-voix-de-l-exil"
              element={<LesVoixDeLExil />}
            />
          </Routes>
        </Suspense>
      </main>

      {!isImmersive && (
        <footer>
          <p>© 2026 - Co Hai Se | All rights reserved.</p>
        </footer>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
