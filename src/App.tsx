import { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import BackgroundWrapper from "./components/backgrounds/BackgroundWrapper";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import CardNav from "./components/CardNav";
import NotFound from "./components/NotFound";

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
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");

      if (
        target &&
        target.href &&
        target.origin === window.location.origin &&
        target.target !== "_blank" &&
        !e.ctrlKey &&
        !e.metaKey
      ) {
        const currentPath = window.location.pathname;
        const targetPath = new URL(target.href).pathname;
        if (currentPath !== targetPath) {
          setIsPageLoading(true);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);
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
            <Route path="*" element={<NotFound />} />
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
