import { useRef, useState, useEffect } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/core';
import { createPortal } from "react-dom";
import DraggableTimeline from "./DraggableTimeline.jsx";
import SectionWrapper from "./SectionWrapper.jsx";
import { CSharpLogo, GodotLogo, JavaScriptLogo, ReactLogo, UnityLogo } from "./Logos.jsx";
import ButtonSpacer from "./ButtonSpacer.jsx";

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
    stack: [<JavaScriptLogo />, <ReactLogo />],
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
    stack: [<CSharpLogo />, <JavaScriptLogo />, <ReactLogo />],
  },
  // Slime Ball Hop
  {
    name: "Slime Ball Hop",
    link: "https://tyruji.itch.io/slime-ball-hop",
    date: new Date(2024, 7, 26),
    description: "Arcade Game",
    video: "previews/SlimeBallHop.webm",
    stack: [<CSharpLogo />, <GodotLogo />],
  },
  // Square Connect
  {
    name: "Square Connect",
    link: "https://tyruji.itch.io/square-connect",
    date: new Date(2024, 7, 20),
    description: "Arcade Game",
    video: "previews/SquareConnect.webm",
    stack: [<CSharpLogo />, <GodotLogo />],
  },
  // Hospital Trip
  {
    name: "Hospital Trip",
    link: "https://tyruji.itch.io/hospital-trip",
    date: new Date(2024, 6),
    description: "Action Game",
    video: "previews/HospitalTrip.webm",
    stack: [<CSharpLogo />, <GodotLogo />],
  },
  // Mondee's Gamble
  {
    name: "Mondee's Gamble",
    link: "https://tyruji.itch.io/mondees-gamble",
    date: new Date(2024, 1),
    description: "Puzzle Game",
    video: "previews/MondeesGamble.webm",
    stack: [<CSharpLogo />, <GodotLogo />],
  },
  // Raise The Barrier
  {
    name: "Raise The Barrier",
    link: "https://drive.google.com/drive/folders/1J5H5lUBvzXyA-j4_x0GxI7Kzx1noRuA9",
    date: new Date(2022, 4),
    description: "Arcade Game",
    video: "previews/RaiseTheBarrier.webm",
    stack: [<CSharpLogo />, <UnityLogo />],
  },
  // Cook That Throws Dishes
  {
    name: "Cook That Throws Dishes",
    link: "https://drive.google.com/drive/folders/1LG-YTTUnR7GPiNIT9YcWWWmuOjI_AiF-",
    date: new Date(2021, 6),
    description: "Arcade Game",
    video: "previews/CookThatThrowsDishes.webm",
    stack: [<CSharpLogo />, <UnityLogo />],
  },
  // Walk In The Room
  {
    name: "Walk In The Room",
    link: "https://drive.google.com/drive/folders/1vmyg7Wiz3dwIEEYHnx4MZC0yJBbtJGvP",
    date: new Date(2021, 4),
    description: "Physics-Based Puzzle Game",
    video: "previews/WalkInTheRoom.webm",
    stack: [<CSharpLogo />, <UnityLogo />],
  },
  // Dont Panic
  {
    name: "Dont Panic",
    link: "https://tyruji.itch.io/dont-panic",
    date: new Date(2020, 6),
    description: "Top-down Shooter Game",
    video: "previews/DontPanic.webm",
    stack: [<CSharpLogo />, <UnityLogo />],
  },
  // Build In The Dark
  {
    name: "Build In The Dark",
    link: "https://tyruji.itch.io/build-in-the-dark",
    date: new Date(2020, 3),
    description: "Survival Platformer Game",
    video: "previews/BuildInTheDark.webm",
    stack: [<CSharpLogo />, <UnityLogo />],
  },
];

export const PROJECT_COUNT = projects.length;

// part is "header" or "content"
export default function ProjectDisplay({ projectId=0, setProjectId, part="header" }) {
  const [popup, setPopup] = useState(null);
  const [imgHeight, setImgHeight] = useState(0);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  
  useEffect(() => {
    function measure() {
      if (containerRef.current && headerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const headerRect = headerRef.current.getBoundingClientRect();
  
        // remaining space = viewport bottom - top of container - header height - margin
        const remaining = window.innerHeight - containerRect.top - headerRect.height - 64;
  
        setImgHeight(Math.max(remaining, 100));
      }
    }
  
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  
  if (part === "header") {
    return (
      <div className="transition-colors ease-in-out text-2xl sm:text-4xl md:text-5xl xl:text-6xl bg-primary text-secondary p-6">
        <DraggableTimeline projects={projects} projectId={projectId} setProjectId={setProjectId} />  
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="py-2 transition-colors ease-in-out text-primary w-full justify-center sm:justify-start">
      <SectionWrapper section={projectId} className="">
        <div ref={headerRef} className="flex justify-between w-full">
          <div className="text-xl sm:text-3xl md:text-4xl xl:text-5xl">
            <a
              href={projects[projectId]?.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="underline pr-1">{projects[projectId]?.name}</span>
              <svg aria-hidden="true" fill="none"
                className="inline h-[1em] stroke-2 stroke-primary"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <h2 className="text-sm sm:text-md md:text-xl xl:text-2xl">
              {projects[projectId]?.description}
            </h2>
          </div>
          
          <ButtonSpacer />
        </div>
        
        <div className="flex my-3">
          <div className="flex z-20">
            {projects[projectId].stack.map((l, i) => {
              return <div key={`projectDesc${i}`} className="w-7 md:w-10">
                  {l}
                </div>
            })}
          </div>
        </div>
      
        {projects[projectId].images ? (
          <Splide
            style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}
            key={projectId}
            aria-label="Screenshots"
            options={{ pagination: false, drag: 'free', perPage: 2, gap: '1rem', height: `${imgHeight ? .8 * imgHeight : 100}px`, arrows: false }}
          >
            {projects[projectId]?.images.map((src, idx) =>
              <SplideSlide
                style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}
                key={"slide" + idx} className="flex items-start justify-center">
                <img
                  style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}
                  src={src}
                  className="object-contain max-h-[60vh] cursor-pointer"
                  onClick={() => setPopup(src)}
                  alt={`Project screenshot ${idx + 1}`}
                />
              </SplideSlide>
            )}  
          </Splide>
        ) : (
          <video
            className="object-contain"
            autoPlay loop muted playsInline
            style={{ height: `${imgHeight ? .8 * imgHeight : 100}px` }}
          >
            <source src={projects[projectId].video} type="video/webm" />
          </video>
        )}
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