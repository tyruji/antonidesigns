import { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { createPortal } from "react-dom";
import DraggableTimeline from "./DraggableTimeline.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const projects = [
  // jakub ros tutor
  {
    name: "Jakub Ros English",
    link: "https://korkiros.pl/en",
    date: new Date(2025, 7),
    description: "English tutoring",
    images: [
      "/korkiros/screen-korkiros3.png",
      "/korkiros/screen-korkiros1.png",
      "/korkiros/screen-korkiros2.png",
    ],
  },
  // barely.lol
  {
    name: "barely.lol",
    link: "https://barely.lol",
    date: new Date(2025, 6),
    description: "Multi-currency budget tracker",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Slime Ball Hop
  {
    name: "Slime Ball Hop",
    link: "https://tyruji.itch.io/slime-ball-hop",
    date: new Date(2024, 7, 26),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Square Connect
  {
    name: "Square Connect",
    link: "https://tyruji.itch.io/square-connect",
    date: new Date(2024, 7, 20),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Hospital Trip
  {
    name: "Hospital Trip",
    link: "https://tyruji.itch.io/hospital-trip",
    date: new Date(2024, 6),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Mondee's Gamble
  {
    name: "Mondee's Gamble",
    link: "https://tyruji.itch.io/mondees-gamble",
    date: new Date(2024, 1),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Raise The Barrier
  {
    name: "Raise The Barrier",
    link: "https://drive.google.com/drive/folders/1J5H5lUBvzXyA-j4_x0GxI7Kzx1noRuA9",
    date: new Date(2022, 4),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Cook That Throws Dishes
  {
    name: "Cook That Throws Dishes",
    link: "https://drive.google.com/drive/folders/1LG-YTTUnR7GPiNIT9YcWWWmuOjI_AiF-",
    date: new Date(2021, 6),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Walk In The Room
  {
    name: "Walk In The Room",
    link: "https://drive.google.com/drive/folders/1vmyg7Wiz3dwIEEYHnx4MZC0yJBbtJGvP",
    date: new Date(2021, 4),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Dont Panic
  {
    name: "Dont Panic",
    link: "https://tyruji.itch.io/dont-panic",
    date: new Date(2020, 6),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
  // Build In The Dark
  {
    name: "Build In The Dark",
    link: "https://tyruji.itch.io/build-in-the-dark",
    date: new Date(2020, 3),
    description: "Arcade Indie Game",
    images: [
      "/barelylol/ad1.png",
      "/barelylol/screen-barelylol.png",
      "/barelylol/screen-barelylol2.png",
      "/barelylol/screen-barelylol3.png",
    ],
  },
];

export const PROJECT_COUNT = projects.length;

// part is "header" or "content"
export default function ProjectDisplay({ projectId=0, setProjectId, part="header" }) {
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
      <div className="transition-colors ease-in-out text-2xl sm:text-4xl md:text-5xl xl:text-6xl bg-primary text-secondary p-8">
        <DraggableTimeline projects={projects} projectId={projectId} setProjectId={setProjectId} />
        __IN PROGRESS
        
        {/* <div className="">
          <a
            href={projects[id]?.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="underline pr-1">{projects[id]?.name}</span>
            <svg aria-hidden="true" fill="none"
              className="inline h-[1em] stroke-2 stroke-secondary"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div> */}
        
        {/* <div className="text-xl sm:text-3xl md:text-4xl xl:text-5xl">
          <h2>
            {projects[id]?.description}
          </h2>
        </div> */}
        
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="transition-colors ease-in-out text-primary w-fit flex justify-center sm:justify-start">
      <SectionWrapper section={projectId}>
        <Splide key={projectId} aria-label="Screenshots" className="w-full">
          {projects[projectId]?.images.map((src, idx) =>
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
      </SectionWrapper>
      
      {popup && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setPopup(null)}
        >
          <img
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            src={popup}
            alt="popup"
          />
        </div>,
        document.body
      )}
    </div>
  );
}