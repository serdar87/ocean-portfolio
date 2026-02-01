import React from 'react';

const Projects = () => {
 const projectData = [
    {
      id: 1,
      title: "Deep Sea Portfolio",
      category: "Interactive Frontend & UX",
      status: "Live",
      
      description: "My flagship project. A fully immersive web experience that merges my past as a Naval Officer with my future as a Software Engineer. Features a physics-based coordinate system (0m-120m), dynamic depth calculations, and a custom 'Navigation Console' designed from scratch without external UI libraries.",
      
      technologies: ["React.js", "Custom Hooks", "Math & Physics", "CSS3 Animations", "Responsive Layout"],
    },
    {
      id: 2,
      title: "Movie Recommendation System",
      category: "Data Science & Machine Learning",
      
      status: "Academic / Thesis", 
     
      description: "My graduation capstone project. A sophisticated hybrid recommendation system analyzing the massive MovieLens 25M dataset. I engineered custom algorithms combining 'Content-Based' and 'Collaborative Filtering' to solve complex data challenges like the 'cold-start problem' and data sparsity using Cosine Similarity math.",
      
      technologies: ["Python", "Pandas", "Scikit-Learn", "Hybrid Filtering", "Big Data Analysis"],
      
    },

    {
      id: 3,
      title: "AI Creative Lab",
      category: "Generative AI & Digital Media",
      status: "R&D", 
      
      description: "An experimental lab where I explore the limits of AI tools. Instead of using them individually, I build automated workflows that combine text, image, and voice generation (Midjourney, ElevenLabs, etc.) to create consistent and high-quality digital content. A playground for mastering prompt engineering.",
      
      technologies: ["Generative Pipelines", "Midjourney", "ElevenLabs", "Prompt Engineering", "Multimodal AI"],
    },

     {
      id: 4, 
      title: "Lexicon: Audio-Visual Dictionary", 
      category: "Web App / UX Design", 
      status: "In Progress", 
      description: "A visually immersive personal dictionary designed to overcome vocabulary retention challenges. Features a custom alphabetical indexing engine, context-aware note-taking, and a dedicated voice recording module (Web Audio API) to compare pronunciation. Built with a focus on high-end UI aesthetics and glassmorphism design principles.",
      technologies: ["React Native", "Expo", "Native Device Features", "Mobile UX", "Async Storage"],
      
    },
   
  ];

  return (
    <div className="projects-content">
      <h3 className="section-header">Projects</h3>
      
      <div className="projects-grid">
        {projectData.map((project) => (
          <div className={`project-card ${project.status === 'In Progress' ? 'sonar-card' : ''}`} key={project.id}>
            
            <div className="card-top">
              <span className="project-category">{project.category}</span>
              <span className="project-status">{project.status}</span>
            </div>

            <h4>{project.title}</h4>
            <p>{project.description}</p>

            <div className="tech-stack">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>       
          
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Projects;