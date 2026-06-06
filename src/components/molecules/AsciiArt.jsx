import { useEffect, useRef } from "react";

const AsciiArt = ({ src, width = 100, height = 120, charSet = "@#S%?*+;:,." }) => {
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const hiddenCanvas = hiddenCanvasRef.current;
    const hiddenCtx = hiddenCanvas.getContext("2d", { willReadFrequently: true });

    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      // Set hidden canvas size (low resolution for ASCII mapping)
      hiddenCanvas.width = width;
      hiddenCanvas.height = height;

      // Draw image to hidden canvas
      hiddenCtx.drawImage(img, 0, 0, width, height);

      // Get pixel data
      const imageData = hiddenCtx.getImageData(0, 0, width, height).data;

      // Configure visible canvas for rendering text
      const fontSize = 8;
      canvas.width = width * (fontSize * 0.6);
      canvas.height = height * fontSize;
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = "#8b5cf6";

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = imageData[offset];
            const g = imageData[offset + 1];
            const b = imageData[offset + 2];
            const brightness = (r + g + b) / 3;

            const charIndex = Math.floor((brightness / 255) * (charSet.length - 1));
            const char = charSet[charIndex];

            // Add slight flicker/noise
            if (Math.random() > 0.99) {
              ctx.fillStyle = "#ffffff";
            } else {
              ctx.fillStyle = `rgba(139, 92, 246, ${0.4 + (brightness / 255) * 0.6})`;
            }

            ctx.fillText(char, x * (fontSize * 0.6), y * fontSize);
          }
        }
      };

      render();
    };
  }, [src, width, height, charSet]);

  return (
    <div className="ascii-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      <canvas ref={hiddenCanvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default AsciiArt;
