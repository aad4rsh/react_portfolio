import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "../molecules/ProjectCard";
import projects from "../../data/projects";
import "./ProjectsSection.css";

gsap.registerPlugin(ScrollTrigger);

function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const btnRef = useRef(null);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1.2,
          },
        }
      );

      // Cards staggered entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 120, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 70%",
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: btnRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      {/* Section Heading & CTA */}
      <div className="projects-section__top">
        <div ref={headingRef} className="projects-section__header">
          <span className="projects-section__label">SELECTED WORKS</span>
          <h2 className="projects-section__title">My Projects</h2>
        </div>

        {/* View More Button (Top Right) */}
        <div ref={btnRef} className="projects-section__cta">
          <Link to="/projects" className="projects-section__view-more">
            <span>View All</span>
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

      {/* Cards Grid */}
      <div className="projects-section__grid">
        {featuredProjects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="projects-section__card-wrapper"
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
