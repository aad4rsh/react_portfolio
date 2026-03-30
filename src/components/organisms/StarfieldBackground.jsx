import { useEffect, useRef } from "react";
import "./StarfieldBackground.css";

export function StarfieldBackground({
  className = "",
  children,
  count = 400,
  speed = 0.5,
  starColor = "#ffffff",
  twinkle = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationId;
    let tick = 0;
    const maxDepth = 1500;

    const createStar = (initialZ) => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: initialZ ?? Math.random() * maxDepth,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
    });

    const stars = Array.from({ length: count }, () => createStar());

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      tick++;
      ctx.fillStyle = "rgba(10, 10, 15, 0.2)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (const star of stars) {
        star.z -= speed * 2;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = maxDepth;
        }

        const scale = 400 / star.z;
        const x = cx + star.x * scale;
        const y = cy + star.y * scale;

        if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;

        const size = Math.max(0.5, (1 - star.z / maxDepth) * 3);
        let opacity = (1 - star.z / maxDepth) * 0.9 + 0.1;

        if (twinkle && star.twinkleSpeed > 0.015) {
          opacity *= 0.7 + 0.3 * Math.sin(tick * star.twinkleSpeed + star.twinkleOffset);
        }

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = opacity;
        ctx.fill();

        if (star.z < maxDepth * 0.3 && speed > 0.3) {
          const streakLength = (1 - star.z / maxDepth) * speed * 8;
          const angle = Math.atan2(star.y, star.x);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - Math.cos(angle) * streakLength,
            y - Math.sin(angle) * streakLength
          );
          ctx.strokeStyle = starColor;
          ctx.globalAlpha = opacity * 0.3;
          ctx.lineWidth = size * 0.5;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, width, height);
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count, speed, starColor, twinkle]);

  return (
    <div ref={containerRef} className={`starfield-container ${className}`}>
      <canvas ref={canvasRef} className="starfield-canvas" />

      {/* Subtle nebula glow */}
      <div className="starfield-nebula" />

      {/* Vignette */}
      <div className="starfield-vignette" />

      {/* Content layer */}
      {children && <div className="starfield-content">{children}</div>}
    </div>
  );
}

export default StarfieldBackground;
