import { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';

// part is "header" or "content"
export default function AboutMeDisplay({ part="header" }) {
  const containerRef = useRef(null);
  const [imgHeight, setImgHeight] = useState(0);
  
  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        // Where is the carousel in the viewport?
        const rect = containerRef.current.getBoundingClientRect();
        // Remaining height = window height - distance from top of carousel container
        const remaining = window.innerHeight - rect.top - 32; // -32px for a little safety margin/padding
        setImgHeight(Math.max(remaining, 100)); // Don't go below 100px
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  
  if (part === "header") {
    return (
      <div className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl bg-white text-black p-8">
        <h1>
          Antoni Ferkaluk
        </h1>
        <p>
          C# Python JavaScript React.js
        </p>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="text-white w-fit flex justify-center sm:justify-start">
      <div className="text-md sm:text-2xl md:text-4xl xl:text-5xl space-y-[1em]">
        <p>
          I've been programming since 14 years old, started out in game development and been growing ever since.
        </p>
        <p>
          I always strive for creativity, I love seeing my ideas come to life.
        </p>
      </div>
        
    </div>
  );
}