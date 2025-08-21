import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PixelTransition({ onComplete }) {
  const containerRef = useRef(null);
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get container size
    const { clientWidth: width, clientHeight: height } = containerRef.current;

    const pixelSize = width/10; // pixel square size in px (tweak this)
    const cols = Math.ceil(width / pixelSize);
    const rows = Math.ceil(height / pixelSize);

    // Build pixel grid data
    const newPixels = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newPixels.push({
          id: `${r}-${c}`,
          top: r * pixelSize,
          left: c * pixelSize,
          width: pixelSize,
          height: pixelSize,
        });
      }
    }

    setPixels(newPixels);

  }, []); // run once on mount

  useEffect(() => {
    if (pixels.length === 0) return;

    const squares = containerRef.current.querySelectorAll(".pixel");

    gsap.to(squares, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: {
        grid: "auto",
        from: "random",
        amount: 1.2,
      },
      onComplete,
    });
  }, [pixels, onComplete]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 overflow-hidden">
      {/* <div className="w-screen h-screen bg-black -z-100 absolute" /> */}
      {pixels.map((sq) => (
        <div
          key={sq.id}
          className="pixel bg-primary"
          style={{
            position: "absolute",
            width: `${sq.width}px`,
            height: `${sq.height}px`,
            top: `${sq.top}px`,
            left: `${sq.left}px`,
          }}
        />
      ))}
    </div>
  );
}