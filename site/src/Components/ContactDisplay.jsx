import { useRef, useState, useEffect } from "react";

// part is "header" or "content"
export default function ContactDisplay({ part="header" }) {
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
  
  function Logo({ src="", label="", link="" }) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center"
      >
        <img
          src={src}
          className="w-full h-auto object-contain hover:scale-120 transition cursor-pointer group-hover:translate-y-[-10px]"
        />
        
        <span className="text-black font-semibold max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">
          {label}
        </span>
      </a>
    );
  }
  
  if (part === "header") {
    return (
      <div className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl bg-white text-black p-8 space-y-[0.5em]">
        <h1>
          Get in Touch
        </h1>
        
      </div>
    );
  }
  
  function Link({ link, text }) {
    return ( 
      <a
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="underline pr-1">{text}</span>
        <svg aria-hidden="true" fill="none"
          className="inline h-[1em] stroke-2 stroke-white"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    );
  }
  
  return (
    <div ref={containerRef} className="text-white w-fit flex justify-center sm:justify-start">
      <div className="flex flex-col text-md sm:text-2xl md:text-4xl xl:text-5xl space-y-[1em]">
        {/* <Link link="" text="LinkedIn"/> */}
        <Link link="mailto:antoniferkaluk5@gmail.com" text="antoniferkaluk5@gmail.com"/>
        <Link link="https://www.linkedin.com/in/antoni-ferkaluk/" text="LinkedIn" />
        <Link link="https://github.com/tyruji/" text="GitHub" />
      </div>
        
    </div>
  );
}