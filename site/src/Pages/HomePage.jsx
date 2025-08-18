import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import ProjectDisplay, { PROJECT_COUNT } from "../Components/ProjectDisplay.jsx";
import HomeScene from "../Components/HomeScene.jsx";

export default function HomePage() {
  const [section, setSection] = useState("home");
  const [projectId, setProjectId] = useState(0);
  
  function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="
          w-full p-3
          text-xl sm:text-3xl md:text-4xl xl:text-5xl
          text-white bg-black hover:text-black hover:bg-white
          cursor-pointer"
      >
        {children}
      </button>
    );
  }
  
  function MenuButton({ option="home" }) {
    return (
      <button
        onClick={() => setSection(option)}
        className={`
          w-full p-3
          text-xl sm:text-3xl md:text-4xl xl:text-5xl
          ${section === option ? "text-black bg-white"
           : "text-white bg-black hover:text-black hover:bg-white"}
          cursor-pointer
          `
        }
      >
        {/* {section === option && <span>*</span>} */}
        {option}
      </button>
    );
  }
  
  return (
    <div className="relative flex flex-col w-full h-screen bg-black p-4 md:p-8 overflow-hidden">
      {section === "home" && (
        <HomeScene />
      )}
      
      {/* Border Frame */}
      <div className="p-8 md:p-16 absolute inset-0 pointer-events-none">
        <div className="border-2 border-white h-full" />
      </div>
      
      <div className="relative bg-black border-2 border-white p-3 max-w-2/3">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl text-white">
          I'm Antoni, a developer and designer.
        </h1>        
      </div>
      
      <div className="relative flex justify-between mt-10">
        {/* Currently displayed option contents */}
        <div className="w-full">

          {section === "projects" && (
            <div className="flex flex-col">
              <ProjectDisplay id={projectId} part="header" />
              <div className="flex border-2 border-r-0 border-white">
                <Button
                  onClick={() => setProjectId(Math.max(0, projectId-1))} 
                  className="text-white">Previous</Button>
                <Button
                  onClick={() => setProjectId(Math.min(projectId+1, PROJECT_COUNT-1))} 
                  className="text-white">Next</Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="z-20 w-fit flex flex-col bg-black border-2 border-white">
          <MenuButton />
          <MenuButton option="projects" />
          <MenuButton option="about me" />     
          <MenuButton option="contact"/>
        </div>
      </div>
      
      <div className="relative flex flex-1 p-8 md:p-16">
        {section === "projects" && (
          <ProjectDisplay id={projectId} part="content" />
        )}
      </div>
      
      
    </div>
  )
}