import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../components/molecules/ProjectCard";
import projects from "../data/projects";
import "./ProjectsPage.css";

gsap.registerPlugin(ScrollTrigger);

function ProjectsPage() {
  const pageRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Page entrance
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      // All cards staggered
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.1)",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="projects-page">
      {/* Ambient background */}
      <div className="projects-page__bg" />

      {/* Back nav */}
      <Link to="/" className="projects-page__back">
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
        <span>Back Home</span>
      </Link>

      {/* Heading */}
      <div ref={headingRef} className="projects-page__header">
        <span className="projects-page__label">THE ARCHIVE</span>
        <h1 className="projects-page__title">All Projects</h1>
        <p className="projects-page__subtitle">
          A complete collection of my work — from major builds to personal experiments.
        </p>
      </div>

      {/* Grid */}
      <div className="projects-page__grid">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="projects-page__card-wrapper"
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
