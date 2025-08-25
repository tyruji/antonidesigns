import { useRef, useState, useEffect } from "react";
import ButtonSpacer from "./ButtonSpacer.jsx";

// part is "header" or "content"
export default function ContactDisplay({ part="header" }) {
  const containerRef = useRef(null);
  const [imgHeight, setImgHeight] = useState(0);
  const [containerDims, setContainerDims] = useState({width: 0, height: 0});
  const { width, height } = containerDims;
  const fontSize = Math.max(
    Math.min(width/16, 48), // scale up to a max, e.g. 48px
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
  
  if (part === "header") {
    return (
      <div className="transition-colors ease-in-out text-2xl sm:text-4xl md:text-5xl xl:text-6xl bg-primary text-secondary p-8 space-y-[0.5em]">
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
          className="inline h-[1em] stroke-2 stroke-primary"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    );
  }
  
  return (
    <div ref={containerRef} className="transition-colors ease-in-out text-primary flex flex-col h-full justify-end">
      <div style={{ fontSize: fontSize + 'px' }} className="flex flex-col space-y-[1em]">
        {/* <Link link="" text="LinkedIn"/> */}
        <Link link="https://www.linkedin.com/in/antoni-ferkaluk/" text="LinkedIn" />
        <Link link="https://github.com/tyruji/" text="GitHub" />
        <Link link="mailto:antoniferkaluk5@gmail.com" text="antoniferkaluk5@gmail.com"/>
      </div>
      <div className="">
        <ButtonSpacer />
      </div>
    </div>
  );
}