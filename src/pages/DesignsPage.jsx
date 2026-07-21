import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import DesignCard from "../components/molecules/DesignCard";
import designs, { categories } from "../data/designs";
import "./DesignsPage.css";

function DesignsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const pageRef = useRef(null);
  const gridRef = useRef(null);
  const overlayRef = useRef(null);
  const lightboxRef = useRef(null);

  const filteredDesigns =
    activeCategory === "all"
      ? designs
      : designs.filter((d) => d.folder === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeCategory]);

  const openLightbox = useCallback((design) => {
    setSelectedDesign(design);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    if (overlayRef.current && lightboxRef.current) {
      gsap.to(lightboxRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setSelectedDesign(null);
          document.body.style.overflow = "";
        },
      });
    } else {
      setSelectedDesign(null);
      document.body.style.overflow = "";
    }
  }, []);

  useEffect(() => {
    if (!selectedDesign || !overlayRef.current || !lightboxRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      lightboxRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
    );

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedDesign, closeLightbox]);

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
        <p className="designs-page__subtitle">
          A collection of graphic design, posters, and brand explorations.
        </p>
      </div>

      <div className="designs-page__filters">
        <button
          className={`designs-page__filter-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`designs-page__filter-btn ${activeCategory === cat.key ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="designs-page__grid">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            className="designs-page__card-wrapper"
            onClick={() => openLightbox(design)}
          >
            <DesignCard design={design} />
          </div>
        ))}
      </div>

      {selectedDesign && (
        <div
          ref={overlayRef}
          className="designs-page__lightbox-overlay"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxRef}
            className="designs-page__lightbox"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="designs-page__lightbox-close"
              onClick={closeLightbox}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={selectedDesign.image}
              alt={selectedDesign.title}
              className="designs-page__lightbox-image"
            />
            <div className="designs-page__lightbox-info">
              <span className="designs-page__lightbox-category">
                {selectedDesign.category}
              </span>
              <h2 className="designs-page__lightbox-title">
                {selectedDesign.title}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignsPage;
