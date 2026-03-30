import React from 'react';
import './RotatingOrbit.css';

const icons = [
  { src: '/python.png',       alt: 'Python' },
  { src: '/js.png',           alt: 'JavaScript' },
  { src: '/c-.png',           alt: 'C++' },
  { src: '/c-sharp.png',      alt: 'C#' },
  { src: '/letter-c.png',     alt: 'C' },
  { src: '/photoshop.png',    alt: 'Photoshop' },
  { src: '/indesign.png',     alt: 'InDesign' },
  { src: '/premiere-pro.png', alt: 'Premiere Pro' },
  { src: '/physics.png',      alt: 'Physics' },
];

const RotatingOrbit = () => {
  return (
    // Zero-size fixed anchor at exact viewport centre
    <div className="orbit-scene">

      {/* Static decorative ring — not animated */}
      <div className="orbit-ring" />

      {/* Profile picture at the center */}
      <div className="orbit-pfp-wrapper">
        <img src="/pfp.png" alt="Profile" className="orbit-pfp" />
      </div>

      {/* Each icon orbits independently from the anchor */}
      {icons.map((icon, i) => {
        const angle = (360 / icons.length) * i;
        return (
          <div
            key={icon.alt}
            className="orbit-icon-wrapper"
            style={{ '--angle': `${angle}deg` }}
          >
            <img
              src={icon.src}
              alt={icon.alt}
              className="orbit-icon"
              draggable={false}
            />
          </div>
        );
      })}

    </div>
  );
};

export default RotatingOrbit;
