import { useRef, useState, useEffect } from "react";
import ButtonSpacer from "./ButtonSpacer.jsx";

// part is "header" or "content"
export default function OfferDisplay({ part="header" }) {
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
      <div className="transition-colors ease-in-out text-2xl sm:text-4xl md:text-5xl xl:text-6xl bg-primary text-secondary p-8">
        <h1>
          My Approach
        </h1>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="transition-colors ease-in-out text-primary w-fit flex h-full justify-center sm:justify-start">
      <div className="flex flex-col justify-center md:justify-end md:w-3/4 xl:w-full"
        style={{ fontSize: "clamp(1rem, 2vw, 2.5rem)" }}
      >
        
        <div className="flex items-center">
          <div className="w-[4em]">
            <svg dataSlot="icon" className="w-[4em]" aria-hidden="true" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-snug">
            <b>Responsive Design</b>
            <span>Websites that adapt to any screen size: mobile, tablet, or desktop.</span>
          </div>
          <div className="px-1">
            <ButtonSpacer />
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-[4em]">
            <svg dataSlot="icon" className="w-[4em]" aria-hidden="true" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-snug">
            <b>Fast and Lightweight</b>
            <span>Built from scratch with clean code for speed, I don't use website builders.</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-[4em]">
            <svg dataSlot="icon" className="w-[4em]" aria-hidden="true" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.867 19.125h.008v.008h-.008v-.008Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-snug">
            <b>Custom-Built</b>
            <span>Unique website designs made from scratch, not templates.</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}