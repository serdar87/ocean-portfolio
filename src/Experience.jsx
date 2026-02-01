import React from 'react';
import academyImg from "./assets/academy_speech.jpg";
const Experience = () => {
  const careerSteps = [
    {
      id: 1,
      role: "System Integration & Interface Operations Officer",
      company: "Turkish Navy (TCG Kınalıada)",
      date: "Sept 2024 - Jan 2026",
    
      description: [
        "Ensured continuity and stability of data and communication systems in operational environments.",
        "Coordinated with external technical teams, including ASELSAN and HAVELSAN, during system incidents and malfunction analysis.",
        "Took responsibility in fast paced and high pressure environments, ensuring accurate and disciplined task execution.",
        "Strengthened problem solving and analytical thinking skills through real time operational analysis and decision making.",
        "Supported documentation and reporting activities to improve the efficiency and clarity of technical processes."
      ],
      tech: ["Crisis Management", "System Analysis", "Network Ops", "Team Leadership"],
      type: "work" 
    },
    {
      id: 2,
      role: "Computer Engineering (B.Sc.)",
      company: "Turkish Naval Academy",
      date: "2019 - 2024",
      description: [
        "Graduated with a focus on software development and system-oriented thinking.",
        "Gained a strong foundation in algorithmic problem solving, OOP, and data structures.",
        

        <span key="speech-trigger" className="hover-trigger relative inline-block">
          Demonstrated leadership by <strong className="text-[#64ffda] border-b border-dotted border-[#64ffda] cursor-pointer">addressing the Cadet Regiment</strong>.
          
          <div className="ship-popup" style={{ 
              top: '-150px',   
              right: '-280px', 
              width: '260px',
              zIndex: 100
          }}>
            <img src={academyImg} alt="Academy Speech" style={{ width: '100%', borderRadius: '6px' }} />
            <span className="ship-caption">Cadet Regiment Speech - 2024</span>
          </div>
        </span>
      ],
      tech: ["Java", "Python", "SQL", "Algorithms"],
      type: "education" 
    }
  ];

  return (
    <div className="experience-content">
      <h3 className="section-header">EXPERIENCES</h3>
      
      <div className="career-grid">
        {careerSteps.map((step) => (
          <div key={step.id} className={`career-card ${step.type}`}>
            
            <div className="card-header-row">
              <div className="role-group">
                <h4>{step.role}</h4>
                <span className="company-name">{step.company}</span>
              </div>
              <span className="date-badge">{step.date}</span>
            </div>

            <ul className="description-list">
              {step.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <div className="tech-stack-mini">
              {step.tech.map((t, i) => (
                <span key={i} className="tech-pill-mini">{t}</span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;