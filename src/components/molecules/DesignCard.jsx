import { useRef, useEffect } from "react";
import gsap from "gsap";
import "./DesignCard.css";

function DesignCard({ design, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Hover effect
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="design-card">
      <div className="design-card__image-container">
        <img src={design.image} alt={design.title} className="design-card__image" />
        <div className="design-card__overlay">
          <span className="design-card__category">{design.category}</span>
          <h3 className="design-card__title">{design.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
