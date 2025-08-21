import { useRef, useState, useEffect } from "react";
import ButtonSpacer from "./ButtonSpacer.jsx";

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
          className="ease-in-out invert dark:invert-0 w-full h-auto object-contain hover:scale-120 transition cursor-pointer group-hover:translate-y-[-10px]"
        />
        
        <span className="ease-in-out text-secondary font-semibold max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">
          {label}
        </span>
      </a>
    );
  }
  
  if (part === "header") {
    return (
      <div className="transition-colors ease-in-out text-2xl sm:text-4xl md:text-5xl xl:text-6xl bg-primary text-secondary p-8 space-y-[0.5em]">
        <h1>
          Antoni Ferkaluk
        </h1>
        
        <div className="grid grid-cols-7 md:gap-2 md:max-w-2/3">
          <Logo
            src="/logos/csharp.svg"
            label="C#"
            link="https://learn.microsoft.com/en-us/dotnet/csharp/"
          />
          <Logo
            src="/logos/python.svg"
            label="Python"
            link="https://www.python.org/"
          />
          <Logo
            src="/logos/js.svg"
            label="JavaScript"
            link="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          />
          <Logo
            src="/logos/react.svg"
            label="React"
            link="https://react.dev/"
          />
          <Logo
            src="/logos/git.svg"
            label="Git"
            link="https://git-scm.com/"
          />
          <Logo
            src="/logos/unity.svg"
            label="Unity"
            link="https://unity.com/"
          />
          <Logo
            src="/logos/godot.svg"
            label="Godot"
            link="https://godotengine.org/"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="transition-colors ease-in-out text-primary w-fit h-1/2 flex justify-center sm:justify-start">
      <div
        className="flex flex-col justify-start space-y-[1em]"
        style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.8rem)" }}
      >
        <div className="flex">
          <p>I've been programming since 14 years old, started out in game development and been growing ever since.</p>
          <div className="px-4 text-secondary">
            <ButtonSpacer />
          </div>
        </div>
        <p>
          I always strive for creativity, I love seeing my ideas come to life.
        </p>
      </div>
        
    </div>
  );
}