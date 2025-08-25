import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SectionWrapper({ section, children }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Start hidden
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 40 },  // hidden & pushed down
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [section]); // Re-run when section changes

  return (
    <div ref={contentRef} key={section} className="h-full flex flex-col">
      {children}
    </div>
  );
}