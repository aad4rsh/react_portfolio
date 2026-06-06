import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DesignCard from "../components/molecules/DesignCard";
import designs from "../data/designs";
import "./DesignsPage.css";

function DesignsPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={pageRef} className="designs-page">
      <div className="designs-page__header-container">
        <Link to="/" className="designs-page__back">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Home</span>
        </Link>
        <h1 className="designs-page__title">Design Archive</h1>
        <p className="designs-page__subtitle">A collection of graphic design, posters, and brand explorations.</p>
      </div>

      <div className="designs-page__grid">
        {designs.map((design, i) => (
          <DesignCard key={design.id} design={design} index={i} />
        ))}
      </div>
    </div>
  );
}

export default DesignsPage;
