import { useRef, useState, useEffect, use } from "react";

export default function DraggableTimeline({ projects, projectId, setProjectId }) {
  const timelineRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [xPos, setXPos] = useState(0);       // current interpolated position
  const [targetX, setTargetX] = useState(0); // mouse-driven target
  const [positions, setPositions] = useState([]);
  const [minSpace, setMinSpace] = useState(100);
  const dragStartX = useRef(0);     // mouse down position
  const dragStartPos = useRef(0);   // handle position when dragging starts
  
  // Calculate project positions once timeline ref is measured
  useEffect(() => {
    if (timelineRef.current) {
      const width = timelineRef.current.offsetWidth;
  
      const timestamps = projects.map(p => p.date.getTime());
      const minDate = Math.min(...timestamps);
      const maxDate = Math.max(...timestamps);
      
      // Compute differences between consecutive dates
      const diffs = [];
      for (let i = 0; i < timestamps.length - 1; i++) {
        diffs.push(timestamps[i] - timestamps[i + 1]);
      }

      // Find smallest & largest gaps
      const maxDiff = Math.max(...diffs);
      const minDiff = Math.min(...diffs);
      
      const maxSpace = width / 2;
      setMinSpace(Math.max(width / 4, 200));
      
      let last_ts = maxDate;
      let last_pos = 0;
      let firstPos = true;
      setPositions(
        timestamps.map(ts => {
          if (firstPos) {
            firstPos = false;
            return 0;
          }
          const diff = last_ts - ts;
          const space =
            maxSpace * (diff - minDiff) / (maxDiff - minDiff) + 
            minSpace * (diff - maxDiff) / (minDiff - maxDiff);
          last_ts = ts;
          const new_pos = last_pos - space;
          last_pos = new_pos;
            
          return new_pos; 
        })
      );
    }
  }, [projects]);
  
  // Interpolation loop
  useEffect(() => {
    let animationId;
    const animate = () => {
      setXPos((prev) => {
        const lerpFactor = 0.1; // smaller = slower smoothing
        const next = prev + (targetX - prev) * lerpFactor;
        return next;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [targetX]);

  // handle dragging (unified for pointer events)
  const handleDrag = (newX) => {
    setTargetX(newX);

    // find closest project
    let closestIndex = 0;
    let closestDist = Infinity;
    positions.forEach((pos, i) => {
      const dist = Math.abs(newX - pos);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });

    setProjectId(closestIndex);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div
        ref={timelineRef}
        className="z-20 relative py-10 w-full rounded cursor-grab active:cursor-grabbing overflow-hidden"
        onPointerDown={(e) => {
          setIsDragging(true);
          dragStartX.current = e.clientX;
          dragStartPos.current = xPos;
          // capture pointer so drag keeps working outside element
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!isDragging) return;
          const delta = dragStartX.current - e.clientX;
          const newX = dragStartPos.current + delta;
          handleDrag(newX);
        }}
        onPointerUp={(e) => {
          setIsDragging(false);
          setTargetX(positions[projectId]);
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerLeave={() => {
          // optional: stop dragging when pointer leaves
          setIsDragging(false);
          setTargetX(positions[projectId]);
        }}
      >
        <div className="w-full bg-secondary h-2" />
        <div
          className="absolute -translate-x-1/2 left-1/2 top-1/2 w-6 h-6 bg-secondary rounded-full transform -translate-y-1/2 transition-colors"
        >
          <div
            className="absolute -translate-x-1/2 left-1/2 top-1/2 w-3 h-3 bg-primary rounded-full transform -translate-y-1/2 transition-colors"
          />
        </div>
      </div>

      <div className="absolute flex w-full items-center h-full justify-between pointer-events-none z-50">
        <div className="flex w-full h-full">
          <div className="bg-gradient-to-l bg-primary h-full w-1/10" />
          <div className="bg-gradient-to-l from-primary/0 to-primary h-full w-1/2" />
        </div>
        <div className="flex w-full h-full justify-end">
          <div className="bg-gradient-to-l from-primary to-primary/0 h-full w-1/2" />
          <div className="bg-gradient-to-l bg-primary h-full w-1/10" />
        </div>
      </div>

      <div
        style={{ transitionDuration: "0ms", transitionTimingFunction: "unset" }}
        className="absolute left-1/2 w-full h-9/10 text-sm font-semibold transition-opacity duration-300">
        {positions.map((pos, i) => {
          return (
            <div
              key={i}
              style={{ left: `${pos - xPos}px`, fontSize: `${Math.min(i === projectId ? minSpace/10 : minSpace/15, 16)}px`,
                  transitionDuration: "0ms", transitionTimingFunction: "unset"
                }}
              className="flex flex-col space-y-2 h-full items-center absolute text-nowrap -translate-x-1/2"
            >
              <span>
                {projects[i].date.toLocaleString("en-US", { year: "numeric", month: "short" })}
              </span>
              {i % 2 === 0 ? (
                <div className="h-full mb-2 w-2 bg-secondary" />
              ) : (
                <div className="h-8 mb-2 w-2 bg-secondary" />
              )}
              {i === projectId ? (
                <b>{projects[i].name}</b>
              ) : (
                <span>{projects[i].name}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
