import React, { useState, useEffect } from 'react';

const BubbleClick = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Tek tıkta 3 tane baloncuk oluştur
      const newBubbles = Array.from({ length: 3 }).map((_, i) => ({
        id: Date.now() + Math.random(), // Benzersiz ID
        // Tıklanan noktanın etrafına rastgele dağıt (±15 piksel)
        x: e.clientX + (Math.random() * 30 - 15),
        y: e.clientY + (Math.random() * 30 - 15)
      }));

      // Listeye ekle
      setBubbles((prev) => [...prev, ...newBubbles]);

      // 1 saniye sonra hepsini temizle
      newBubbles.forEach((bubble) => {
        setTimeout(() => {
          setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
        }, 1000); // Biraz daha hızlı kaybolsun (0.8sn)
      });
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <style>{`
        .click-bubble {
          position: absolute;
          /* Daha ufak boyut (8px) */
          width: 8px;
          height: 8px;
          border-radius: 50%;
          
          /* Renk ve Parlama */
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.1));
          box-shadow: 0 0 2px rgba(255, 255, 255, 0.4), inset -1px -1px 2px rgba(0, 0, 0, 0.1);
          border: 0.5px solid rgba(255, 255, 255, 0.3);
          
          /* Animasyon */
          animation: bubbleScatter 0.8s ease-out forwards;
          pointer-events: none;
          z-index: 9999;
        }

        @keyframes bubbleScatter {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          50% {
            /* Yarı yolda biraz büyüsün */
            transform: translate(var(--mx, 0), -20px) scale(1.1);
          }
          100% {
            /* Yukarı doğru sönerek gitsin */
            transform: translate(var(--mx, 0), -60px) scale(0);
            opacity: 0;
          }
        }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="click-bubble"
            style={{ 
              left: b.x, 
              top: b.y,
              // Her baloncuk hafif sağa/sola rastgele süzülsün
             // '--mx': `${Math.random() * 20 - 10}px` 
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BubbleClick;