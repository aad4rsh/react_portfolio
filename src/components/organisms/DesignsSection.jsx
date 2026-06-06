import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DesignCard from "../molecules/DesignCard";
import designs from "../../data/designs";
import "./DesignsSection.css";

gsap.registerPlugin(ScrollTrigger);

function DesignsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const btnRef = useRef(null);

  const featuredDesigns = designs.filter((d) => d.featured).slice(0, 3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 65%",
            scrub: 1.2,
          },
        }
      );

      // Cards staggered entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 75%",
              scrub: 1.5,
            },
            delay: i * 0.15,
          }
        );
      });

      // View More button
      if (btnRef.current) {
        gsap.fromTo(
          btnRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: btnRef.current,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="designs-section" id="designs">
      <div className="designs-section__top">
        <div ref={headingRef} className="designs-section__header">
          <span className="designs-section__label">VISUAL EXPLORATIONS</span>
          <h2 className="designs-section__title">Digital Designs</h2>
        </div>

        <div ref={btnRef} className="designs-section__cta">
          <Link to="/designs" className="designs-section__view-more">
            <span>View Archive</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="designs-section__grid">
        {featuredDesigns.map((design, i) => (
          <div
            key={design.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="designs-section__card-wrapper"
          >
            <DesignCard design={design} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default DesignsSection;
