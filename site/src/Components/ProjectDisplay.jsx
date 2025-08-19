import { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const projects = [
  // barely.lol
  {
    header: "barely.lol",
    link: "https://barely.lol",
    description: "Multi-currency budget tracker",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // jakub ros tutor
  {
    header: "Jakub Ros English",
    link: "https://korkiros.pl/en",
    description: "English tutoring",
    images: [
      "/korkiros/screen-korkiros3.png",
      "/korkiros/screen-korkiros1.png",
      "/korkiros/screen-korkiros2.png",
    ],
  }
];

export const PROJECT_COUNT = projects.length;

// part is "header" or "content"
export default function ProjectDisplay({ id=0, part="header" }) {
  const [popup, setPopup] = useState(null);
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
        <div className="">
          <a
            href={projects[id]?.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="underline pr-1">{projects[id]?.header}</span>
            <svg aria-hidden="true" fill="none"
              className="inline h-[1em] stroke-2 stroke-black"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        
        <div className="text-xl sm:text-3xl md:text-4xl xl:text-5xl">
          <h2>
            {projects[id]?.description}
          </h2>
        </div>
        
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="text-white w-fit flex justify-center sm:justify-start">
      <Splide key={id} aria-label="Screenshots" className="">
        {projects[id]?.images.map((src, idx) =>
          <SplideSlide key={idx} className="flex items-center justify-center">
            <img
              className="cursor-pointer"
              style={{
                height: imgHeight ? (.8 * imgHeight) + 'px' : undefined,  // "auto" at first render (SSR-safe)
                maxHeight: '90vh', // Still protect against way-too-large
                width: "auto",     // Don't stretch horizontally
                objectFit: "contain"
              }}
              src={src}
              onClick={() => setPopup(src)}
              alt={idx}
            />
          </SplideSlide>
        )}  
      </Splide>
      
      {popup && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setPopup(null)}
        >
          <img
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            src={popup}
            alt="popup"
          />
        </div>
      )}
    </div>
  );
}