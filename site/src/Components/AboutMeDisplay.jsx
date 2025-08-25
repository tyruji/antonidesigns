import { useRef, useState, useEffect } from "react";
import ButtonSpacer from "./ButtonSpacer.jsx";

// part is "header" or "content"
export default function AboutMeDisplay({ part="header", onClickConnect }) {
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
    <div ref={containerRef} className="py-2 transition-colors ease-in-out text-primary w-fit">
      <div
        className="flex flex-col justify-start space-y-[1em]"
        style={{ fontSize: `${imgHeight/30}px` }}
      >
        <div className="flex">
          <div className="flex flex-col space-y-[1em]">
            
            <div className="justify-center flex">
              <div className="max-w-4/5">
                <p className="italic">At no point am I not building something.</p>
              </div>
            </div>
              
            <p>
              At 14 years old, I started with game development as a designer and programmer. Starting with only an idea and growing it into a finished product quickly became my biggest interest.
            </p>
            <p>
              Today, I specialize in AI, SaaS products, backend systems, web applications and websites.
            </p>
            <p>
              <p>Interested in working together?</p>
              Let's<span> </span>
              <span
                className="underline hover:text-primary/50 transition cursor-pointer"
                onClick={onClickConnect} // this opens the contact menu
              >connect!</span>
            </p>
            
          </div>
          
          <div className="px-2 text-secondary">
            <ButtonSpacer />
          </div>
        </div>
      </div>
        
    </div>
  );
}