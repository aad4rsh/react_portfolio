import { useRef, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarfieldBackground from "../components/organisms/StarfieldBackground";
import RotatingOrbit from "../components/organisms/RotatingOrbit";
import HeroText from "../components/molecules/text";
import RightText from "../components/molecules/RightText";
import DesignsSection from "../components/organisms/DesignsSection";
import JourneySection from "../components/organisms/JourneySection";
import AboutSection from "../components/organisms/AboutSection";
import ContactSection from "../components/organisms/ContactSection";
import "./HomePage.css";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const heroRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    // Small delay to let the DOM settle before creating ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Parallax and Pinning logic
    const ctx = gsap.context(() => {
      // 1. Pin the hero section
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // 2. Add a parallax "recede" effect to the hero content
      gsap.to(heroRef.current.querySelectorAll(".starfield-container, .heroText-container, .heroTextRight-container"), {
        y: -100,
        opacity: 0.2,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [location.pathname]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Hero Section (Pinned) ── */}
      <section ref={heroRef} className="hero-section">
        <StarfieldBackground>
          <RotatingOrbit />
        </StarfieldBackground>
        <HeroText />
        <RightText />

        {/* ── Quick Nav Buttons ── */}
        <nav className="hero-quicknav">
          <Link to="/designs" className="hero-quicknav__btn">
            <span className="hero-quicknav__icon">✦</span> Designs
          </Link>
          <button className="hero-quicknav__btn" onClick={() => scrollTo("journey")}>
            <span className="hero-quicknav__icon">◈</span> Journey
          </button>
          <button className="hero-quicknav__btn" onClick={() => scrollTo("about")}>
            <span className="hero-quicknav__icon">◉</span> About
          </button>
          <button className="hero-quicknav__btn" onClick={() => scrollTo("contact")}>
            <span className="hero-quicknav__icon">◎</span> Contact
          </button>
        </nav>
      </section>

      {/* ── Designs Section ── */}
      <DesignsSection />

      {/* ── Journey Section ── */}
      <JourneySection />

      {/* ── About Section ── */}
      <AboutSection />

      {/* ── Contact Section ── */}
      <ContactSection />
    </>
  );
}

export default HomePage;


