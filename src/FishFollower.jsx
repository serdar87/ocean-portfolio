import React, { useEffect, useRef } from "react";
import fishImg from "./assets/fish.png"; 

const FishFollower = () => {
  const fishRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const angle = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (fishRef.current) {
        const dx = mouse.current.x - position.current.x;
        const dy = mouse.current.y - position.current.y;

        position.current.x += dx * 0.1; 
        position.current.y += dy * 0.1;

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
             angle.current = Math.atan2(dy, dx) * (180 / Math.PI);
        }

        fishRef.current.style.transform = `
          translate3d(${position.current.x}px, ${position.current.y}px, 0) 
          rotate(${angle.current}deg)
        `;
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <img
      ref={fishRef}
      src={fishImg}
      alt="Follower Fish"
      style={{
        position: "fixed",
        top: -12, 
        left: -12,
        width: "24px",
        height: "24px",
        pointerEvents: "none",
        zIndex: 9998, 
        transition: "opacity 0.3s ease",
        willChange: "transform", 
        filter: "drop-shadow(0 0 5px rgba(100, 255, 218, 0.5))" 
      }}
    />
  );
};

// 👇 İŞTE EKSİK OLAN SATIR BU! 👇
export default FishFollower;