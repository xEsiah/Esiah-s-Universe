import { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import BackgroundWrapper from "./components/backgrounds/BackgroundWrapper";
import CardNav from "./components/CardNav";

const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
import LoadingScreen from "./components/LoadingScreen";

const Cohaise = lazy(() => import("./pages/Cohaise"));
const Zatyshok = lazy(() => import("./pages/projects/Zatyshok"));
const NeoTokyoRush = lazy(() => import("./pages/projects/NeoTokyoRush"));
const EchoesOfTheLastStop = lazy(
  () => import("./pages/projects/EchoesOfTheLastStop"),
);
const ShadowPurgeRiteOfTheDemon = lazy(
  () => import("./pages/projects/ShadowPurgeRiteOfTheDemon"),
);
import ScrollToTop from "./components/ScrollToTop";
const WYGTIWIF = lazy(() => import("./pages/projects/WYG-TIWIF"));

function AppContent() {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // Déclenche l'écran de chargement au changement de route
    setIsPageLoading(true);

    // On laisse l'écran au moins 600ms pour que l'animation warp soit visible
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isPageLoading && <LoadingScreen />}
      <ScrollToTop />
      <BackgroundWrapper />
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
          </Routes>
        </Suspense>
      </main>

      <footer>
        <p>© 2026 - Co Hai Se | All rights reserved.</p>
      </footer>
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
