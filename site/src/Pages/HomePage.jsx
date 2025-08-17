import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';

export default function HomePage() {
  const [section, setSection] = useState("home");
  
  function MenuButton({option="home"}) {
    return (
      <button
        onClick={() => setSection(option)}
        className="
          w-full p-3
          text-xl sm:text-3xl md:text-4xl xl:text-5xl
          text-white bg-black hover:text-black hover:bg-white cursor-pointer"
      >
        {section === option && <span>*</span>}
        {option}
      </button>
    );
  }
  
  return (
    <div className="w-full h-screen bg-black p-4">
      
      {/* Border Frame */}
      <div className="p-8 absolute inset-0 pointer-events-none">
        <div className="border-2 border-white h-full" />
      </div>
      
      <div className="relative bg-black border-2 border-white p-3 max-w-2/3">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl text-white">
          I'm Antoni, a web developer and designer.
        </h1>        
      </div>
      
      <div className="relative flex items-end justify-between mt-10">
        
        {/* Currently displayed option contents */}
        <div>
          {section === "projects" && (
            <div className="text-white p-8">
              barely.lol
            </div>
          )}
        </div>
        
        <div className="w-fit flex flex-col bg-black border-2 border-white">
          <MenuButton />
          <MenuButton option="projects" />
          <MenuButton option="about me" />     
          <MenuButton option="contact"/>
        </div>
      </div>
      
    </div>
  )
}