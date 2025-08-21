import './App.css'
import HomePage from "./Pages/HomePage.jsx"
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PixelTransition from "./Components/PixelTransition.jsx";

const SquareAnimation = ({ onAnimationComplete }) => {
  const containerRef = useRef(null);
  const [done, setDone] = useState(false);
  const numSquares = 4;
  
  useEffect(() => {
    const squares = containerRef.current.querySelectorAll(".square");

    // Timeline to control sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        if (onAnimationComplete) onAnimationComplete();
      }
    });

    squares.forEach((sq, i) => {
      tl.fromTo(
        sq,
        { scale: 0, opacity: 1 },
        { 
          scale: (i + 1) / numSquares, 
          opacity: 1, 
          duration: 0.25, 
          ease: "power2.out" 
        },
        i * 0.25 // delay each square by 0.5s
      );
    });
    
    // final fade out
    tl.to(squares, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.inOut"
    });
    
  }, [onAnimationComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen flex justify-center items-center overflow-hidden"
    >
      <div className="relative w-full h-full">
        {[...Array(numSquares)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 square border-3 border-black"
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const [showContent, setShowContent] = useState(false);
  const [transitionDone, setTransitionDone] = useState(false);
  const [showPixels, setShowPixels] = useState(false);
  
  const handleSquareComplete = () => {
    setShowPixels(true);
    // wait 200ms before showing content
    setTimeout(() => {
      setShowContent(true);
    }, 10);
  };

  return (
    <div className="bg-white">
      {!showPixels && (
        <SquareAnimation onAnimationComplete={handleSquareComplete} />
      )}
      {showPixels && !transitionDone && (
        <PixelTransition onComplete={() => setTransitionDone(true)} />
      )}
      {showContent && (
        <HomePage throwCube={transitionDone} />
      )}
    </div>
  )
}

export default App;