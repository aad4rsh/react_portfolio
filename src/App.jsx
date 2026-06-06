import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import DesignsPage from "./pages/DesignsPage";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on every route change and kill stale ScrollTriggers
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);

    // Refresh after the new page mounts to recalculate scroll positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/designs" element={<DesignsPage />} />
      </Routes>
    </>
  );
}

export default App;
