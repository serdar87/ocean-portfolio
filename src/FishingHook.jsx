import React, { useEffect, useRef } from "react";
import hookImg from "./assets/hook.png"; 

const FishingHook = () => {
  const hookRef = useRef(null);
  const lineRef = useRef(null);
  
  const position = useRef({ x: window.innerWidth / 2, y: -100 });
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const angle = useRef(0); 

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const dx = mouse.current.x - position.current.x;
      const dy = mouse.current.y - position.current.y;

      // Hız ayarı (0.05 ile biraz ağır gelsin)
      position.current.x += dx * 0.05;
      position.current.y += dy * 0.05;

      // Sallanma açısı hesabı
      const targetAngle = (dx * 0.1) * -1; 
      angle.current += (targetAngle - angle.current) * 0.1;
      
      if (hookRef.current && lineRef.current) {
        
        // --- İŞTE KALİBRASYON AYARLARI BURADA ---
        // Eğer hala boşluk varsa 'hookOffsetY' değerini artır (Örn: 15, 20 yap)
        // Eğer ip sağa/sola kayıksa 'hookOffsetX' ile oyna
        const hookOffsetX = 19.8; // 32px resmin tam ortası (16)
        const hookOffsetY = 5; // İpin ucunu resmin içine 12px sokuyoruz (Boşluğu kapatır)

        // 1. Kancayı Hareket Ettir
        hookRef.current.style.transform = `
          translate3d(${position.current.x}px, ${position.current.y}px, 0) 
          rotate(${angle.current}deg)
        `;

        // 2. İpi Çiz
        lineRef.current.setAttribute("x1", position.current.x + hookOffsetX); 
        lineRef.current.setAttribute("y1", -500); 
        // İpin bittiği yer (Kancanın deliği)
        lineRef.current.setAttribute("x2", position.current.x + hookOffsetX);
        lineRef.current.setAttribute("y2", position.current.y + hookOffsetY);
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
    <div style={{ 
      position: "fixed", 
      inset: 0, 
      pointerEvents: "none", 
      zIndex: 9996 
    }}>
      {/* --- OLTA İPİ --- */}
      <svg style={{ width: "100%", height: "100%", position: "absolute" }}>
        <line 
          ref={lineRef}
          stroke="rgba(255, 255, 255, 0.4)" // Biraz daha belirgin yaptım (0.3 -> 0.4)
          strokeWidth="1.5" // Biraz kalınlaştırdım
        />
      </svg>

      {/* --- KANCA RESMİ --- */}
      <img
        ref={hookRef}
        src={hookImg}
        alt="Fishing Hook"
        style={{
          position: "absolute",
          top: 0, 
          left: 0,
          width: "32px", 
          willChange: "transform",
          filter: "drop-shadow(0 0 5px rgba(0,0,0,0.6))",
          
          // ÖNEMLİ: Kanca artık ortasından değil, tepesinden (ipin olduğu yerden) sallanacak
          transformOrigin: "16px 5px" 
        }}
      />
    </div>
  );
};

export default FishingHook;