import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BackgroundWrapper from "./components/backgrounds/BackgroundWrapper";
import CardNav from "./components/CardNav";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
const Cohaise = lazy(() => import("./pages/Cohaise"));
import Zatyshok from "./pages/projects/Zatyshok";
import NeoTokyoRush from "./pages/projects/NeoTokyoRush";
import EchoesOfTheLastStop from "./pages/projects/EchoesOfTheLastStop";
import ShadowPurgeRiteOfTheDemon from "./pages/projects/ShadowPurgeRiteOfTheDemon";

function AppContent() {
  return (
    <>
      <BackgroundWrapper />
      <CardNav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cohaise"
            element={
              <Suspense
                fallback={<div className="loading">Loading Universe...</div>}
              >
                <Cohaise />
              </Suspense>
            }
          />
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
        </Routes>
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
