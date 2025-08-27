import { useRef, useState, useEffect } from "react";
import ButtonSpacer from "./ButtonSpacer.jsx";

// part is "header" or "content"
export default function AboutMeDisplay({ part="header", onClickConnect }) {
  const containerRef = useRef(null);
  const [containerDims, setContainerDims] = useState({width: 0, height: 0});
  const { width, height } = containerDims;
  const fontSize = Math.max(
    Math.min(((width/20)+(height/35))/2 , 48), // scale up to a max, e.g. 48px
    7 // min
  );
  
  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDims({
          width: rect.width,
          height: rect.height,
          top: rect.top,
        });
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
    <div ref={containerRef} className="py-2 transition-colors ease-in-out text-primary w-fit overflow-auto">
      <div
        className="flex flex-col justify-start space-y-[1em] text-md sm:text-xl md:text-2xl"
        // style={{ fontSize: fontSize + 'px' }}
      >
        <div className="flex">
          <div className="flex justify-end flex-col space-y-[1em]">
            
            <div className="justify-center flex">
              <div className="max-w-4/5">
                <p className="italic">At no point am I not building something.</p>
              </div>
            </div>
            
            <p style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}>
              At 14 years old, I started with game development as a designer and programmer. Starting with only an idea and growing it into a finished product quickly became my biggest interest.
            </p>

          </div>
          
          <div className="flex flex-col px-4">
            <ButtonSpacer />
          </div>
        </div>
        
        <p style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}>
          Today, I specialize in AI, SaaS products, backend systems, web applications and websites.
        </p>
        
        <div>
          <p style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}>Interested in working together?</p>
          <p style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}>
            Let's<span> </span>
            <span
              style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}
              className="underline hover:text-primary/50 transition cursor-pointer"
              onClick={onClickConnect} // this opens the contact menu
            >connect!</span>
          </p>  
        </div>
      </div>
        
    </div>
  );
}