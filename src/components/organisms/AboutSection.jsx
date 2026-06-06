import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AsciiArt from "../molecules/AsciiArt";
import "./AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);
  const scannerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Photo entrance
      gsap.fromTo(
        photoRef.current,
        { x: -100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 80%",
          },
        }
      );

      // Text lines staggered reveal
      const lines = textRef.current.querySelectorAll(".about-line");
      gsap.fromTo(
        lines,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 95%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );

      // Scanner line animation
      gsap.to(scannerRef.current, {
        top: "100%",
        duration: 3,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="about-section" id="about">
      {/* Background Maithili Motif (Subtle Pattern) */}
      <div className="about-motif" />

      <div className="about-container">
        {/* Left Side: The Profile Bio-Scan */}
        <div className="about-profile">
          <div ref={photoRef} className="about-photo-wrapper">
            <div className="about-photo-container">
              {/* Dynamic ASCII Art version of the profile photo */}
              <AsciiArt src="/pfp.png" width={80} height={100} />
              
              <div ref={scannerRef} className="about-scanner-line" />
              <div className="about-ui-corner top-left" />
              <div className="about-ui-corner bottom-right" />
            </div>
            <div className="about-status-tag">
              <span className="status-dot" />
              STATUS: DESIGNER_WHO_CODES
            </div>
          </div>
        </div>

        {/* Right Side: The Narrative */}
        <div ref={textRef} className="about-content">
          <div className="about-line about-label">IDENTIFICATION</div>
          <h2 className="about-line about-heading">
            I sit at the intersection of <span className="text-gradient">visual design</span> and <span className="text-gradient">software development</span>.
          </h2>
          
          <div className="about-line about-paragraph">
            I'm Aadarsh — a designer who codes, a developer who cares about aesthetics, and someone who will drop everything to learn whatever skill the project needs next. Based in Kathmandu, I work at <strong>Ikigai Tech</strong> building brand identities while wiring up server logic on the other screen.
          </div>

          <div className="about-line about-paragraph">
            I've shipped everything from news platforms to ML-powered dashboards and a desktop app that preserves <strong>Maithili proverbs</strong> — because if not us, then who? Culture isn't an afterthought for me — it's usually the whole point.
          </div>

          <div className="about-line about-toolkit">
            <div className="toolkit-label">CORE_MODULES:</div>
            <div className="toolkit-grid">
              <span>Figma</span>
              <span>React</span>
              <span>Python</span>
              <span>Django</span>
              <span>C++</span>
              <span>Scikit-learn</span>
            </div>
          </div>

          <div className="about-line about-footer">
            Open to freelance work, collaborations, and any project that makes me google something I've never heard of before.
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
