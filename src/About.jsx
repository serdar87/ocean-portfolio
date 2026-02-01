import React, { useState } from 'react';
import tcgImage from './assets/tcg-kinaliada.jpg';
import dhoImage from './assets/tur-navy.jpg';

const About = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="about" id="about">
      {/* ESKİ CILIZ BAŞLIK YERİNE BU HAVALI BAŞLIĞI KOYDUK 👇 */}
      <h3 className="section-header">About Me</h3> 

      <div className="about-content">
        
        {/* GEMİ POP-UP (Hologram) */}
        <div className={`ship-popup ${activeImage === 'tcgImage' ? 'visible' : ''}`}>
          <img src={tcgImage} alt="TCG Kınalıada" />
          <span className="ship-caption">F-514 TCG KINALIADA</span>

          </div>

        <div className={`ship-popup ${activeImage === 'dhoImage' ? 'visible' : ''}`}>
          <img src={dhoImage} alt="Turkish National Defence University – Naval Academy" />
          <span className="ship-caption">Turkish National Defence University – Naval Academy</span>

          </div>
               
        <p>
          I am a <strong>Computer Engineering graduate</strong> from the  
          <span 
            className="hover-trigger"
            onMouseEnter={() => setActiveImage('dhoImage')}  
            onMouseLeave={() => setActiveImage(null)}
          >
                        
          <strong> Turkish National Defence University – Naval Academy</strong>
          </span>, with a strong foundation in software development, system-oriented thinking, and problem solving.
        </p>

        <p>
          After graduating in 2024, I worked for approximately one and a half years as a naval officer aboard 
          <span 
            className="hover-trigger"
            onMouseEnter={() => setActiveImage('tcgImage')}  
            onMouseLeave={() => setActiveImage(null)}
          >
            <strong> TCG Kınalıada</strong>
          </span>, where I was responsible for system integration, interface operations, and the continuity of 
          <strong> mission-critical communication</strong> and technical systems.
        </p>

        <p>
          I have a strong interest in <strong>Artificial Intelligence</strong> and actively use AI tools in my daily workflow to 
          accelerate learning, experimentation, and prototyping. I see AI as a practical enabler for building and iterating on ideas quickly, 
          especially in lean, product-driven environments.
        </p>

        <p>
          What differentiates me is the combination of <strong>solid engineering fundamentals</strong> and <strong>real-world operational experience</strong>. 
          I bring a strong sense of ownership, clear communication, and a disciplined approach to problem solving.
        </p>

        <p className="closing-statement">
          <em>
            "I am now focused on building my career in technology-driven teams where learning by doing, 
            responsibility, and real impact are valued."
          </em>
        </p>
      </div>
    </section>
  );
};

export default About;