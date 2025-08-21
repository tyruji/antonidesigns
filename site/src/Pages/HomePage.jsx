import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import ProjectDisplay, { PROJECT_COUNT } from "../Components/ProjectDisplay.jsx";
import HomeScene from "../Components/HomeScene.jsx";
import AboutMeDisplay from "../Components/AboutMeDisplay.jsx";
import ContactDisplay from "../Components/ContactDisplay.jsx";
import OfferDisplay from "../Components/OfferDisplay.jsx";
import ButtonSpacer from "../Components/ButtonSpacer.jsx";
import SectionWrapper from "../Components/SectionWrapper.jsx";
import ThemeToggle from "../Components/ThemeToggle.jsx";

export default function HomePage({ throwCube=true }) {
  const [section, setSection] = useState("home");
  const [projectId, setProjectId] = useState(0);
  const [theme, setTheme] = useState("light"); // default dark

  // Apply or remove "dark" class on html tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  
  
  function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="
          w-full p-3
          text-xl sm:text-3xl md:text-4xl xl:text-5xl transition-colors ease-in-out 
          text-primary bg-secondary hover:text-secondary hover:bg-primary
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
          w-full p-3 transition-colors ease-in-out 
          text-xl sm:text-3xl md:text-4xl xl:text-5xl
          ${section === option ? "text-secondary bg-primary"
           : "text-primary bg-secondary hover:text-secondary hover:bg-primary"}
          cursor-pointer
          `
        }
      >
        {option}
      </button>
    );
  }
  
  return (
    <div className="relative flex flex-col w-full h-[100dvh] transition-colors ease-in-out bg-secondary p-4 md:p-8 overflow-hidden">

      {section === "home" && throwCube && (
        <HomeScene isDark={theme === "dark"} />
      )}
      
      {/* Border Frame */}
      <div className="p-8 md:p-16 absolute inset-0 pointer-events-none">
        <div className="border-2 border-primary h-full" />
      </div>
      
      <div className="relative bg-secondary border-2 border-primary p-3 max-w-2/3">
        <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl text-primary">
          I'm Antoni, a developer and designer.
        </h1>        
      </div>
      
      <div className="relative flex justify-between mt-10">
        {/* Currently displayed option contents */}
        <div className="w-full">
          
          <SectionWrapper section={section}>
            {section === "projects" && (
              <div className="flex flex-col">
                <ProjectDisplay id={projectId} part="header" />
                <div className="flex border-2 border-r-0 border-primary">
                  <Button
                    onClick={() => setProjectId(Math.max(0, projectId-1))} 
                    className="text-primary">Previous</Button>
                  <Button
                    onClick={() => setProjectId(Math.min(projectId+1, PROJECT_COUNT-1))} 
                    className="text-primary">Next</Button>
                </div>
              </div>
            )}
            {section === "about me" && (
              <div className="flex flex-col">
                <AboutMeDisplay part="header" />
              </div>
            )}
            {section === "contact" && (
              <div className="flex flex-col">
                <ContactDisplay part="header" />
              </div>
            )}
            {section === "offer" && (
              <div className="flex flex-col">
                <OfferDisplay part="header" />
              </div>
            )}
          </SectionWrapper>
        </div>
        
        <div className="px-2 w-fit bg-secondary border-2 border-primary">
          <ButtonSpacer />
        </div>
        
        <div className="absolute right-0 top-0 z-20 w-fit flex flex-col bg-secondary border-2 border-primary">
          <MenuButton />
          <MenuButton option="projects" />
          <MenuButton option="about me" />
          <MenuButton option="offer" /> 
          <MenuButton option="contact"/>
        </div>
      </div>
      
      <div className="relative flex flex-1 p-8 md:p-16">
        <SectionWrapper section={section}>
          {section === "projects" && (
            <ProjectDisplay id={projectId} part="content" />
          )}
          {section === "about me" && (
            <AboutMeDisplay part="content" />
          )}
          {section === "contact" && (
            <ContactDisplay part="content" />
          )}
          {section === "offer" && (
            <OfferDisplay part="content" />
          )}
        </SectionWrapper>
      </div>
      
      <div className="absolute bottom-0 left-0 z-30 w-fit p-4 md:p-8">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  )
}