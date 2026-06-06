import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./ProjectCard.css";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Idle floating / bouncing animation
    gsap.to(card, {
      y: -12,
      duration: 2 + index * 0.3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: index * 0.2,
    });

    // Hover tilt effect
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.04,
        boxShadow: "0 25px 60px rgba(99, 102, 241, 0.35), 0 0 40px rgba(139, 92, 246, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, [index]);

  return (
    <div ref={cardRef} className="project-card" style={{ perspective: "800px" }}>
      {/* Image */}
      <div className="project-card__image-wrapper">
        <img src={project.image} alt={project.title} className="project-card__image" />
        <div className="project-card__image-overlay" />
      </div>

      {/* Content */}
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        {/* Tags */}
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub Link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__github"
          aria-label={`View ${project.title} on GitHub`}
        >
          <svg
            className="project-card__github-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>View Code</span>
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
