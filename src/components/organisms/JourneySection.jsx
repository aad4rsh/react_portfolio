import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import journey from "../../data/journey";
import "./JourneySection.css";

gsap.registerPlugin(ScrollTrigger);

function JourneySection() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const nodesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Draw the SVG path as we scroll
      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1.5,
        },
      });

      // 2. Animate each node (Planet) and its HUD info
      nodesRef.current.forEach((node, i) => {
        if (!node) return;

        const planet = node.querySelector(".journey-node__planet");
        const info = node.querySelector(".journey-node__info");

        // Planet entrance
        gsap.fromTo(
          planet,
          { scale: 0, filter: "brightness(0) blur(10px)" },
          {
            scale: 1,
            filter: "brightness(1) blur(0px)",
            duration: 1,
            scrollTrigger: {
              trigger: node,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // HUD Info reveal (sliding out from planet)
        gsap.fromTo(
          info,
          { 
            x: i % 2 === 0 ? -50 : 50, 
            opacity: 0, 
            clipPath: i % 2 === 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" 
          },
          {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0 0 0%)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="journey-section" id="journey">
      <div className="journey-bg">
        <div className="journey-bg__stars" />
      </div>

      <div className="journey-header">
        <span className="journey-label">LOGBOOK</span>
        <h2 className="journey-title">The Career Journey</h2>
      </div>

      <div className="journey-container">
        {/* The Connection Path */}
        <svg className="journey-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M50,0 Q80,100 50,200 T50,400 T50,600 T50,800"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="20%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="80%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Journey Nodes */}
        <div className="journey-nodes">
          {journey.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (nodesRef.current[i] = el)}
              className={`journey-node ${i % 2 === 0 ? "left" : "right"}`}
            >
              {/* The Planet/Station */}
              <div className="journey-node__planet-wrapper">
                <div className="journey-node__planet">
                  <div className="planet-glow" />
                  <div className="planet-core" />
                </div>
              </div>

              {/* HUD Information */}
              <div className="journey-node__info">
                <div className="hud-header">
                  <span className="hud-type">{item.type}</span>
                  <span className="hud-date">{item.duration}</span>
                </div>
                <h3 className="hud-company">{item.company}</h3>
                <h4 className="hud-role">{item.role}</h4>
                <p className="hud-summary">{item.summary}</p>
                <div className="hud-footer">
                  <span className="hud-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {item.location}
                  </span>
                </div>
                <div className="hud-corner top-left" />
                <div className="hud-corner bottom-right" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
