import React from "react";
// CV'ni import etmeyi unutma (Dosya yolunun doğru olduğundan emin ol)
// import myCV from "./assets/my_cv.pdf";

const Contact = () => {
  
  const contactLinks = [
    {
      id: "linkedin",
      label: "LinkedIn",
      subLabel: "Professional Network",
      freq: "CH-01 // 404.5 MHz", 
      url: "https://www.linkedin.com/in/serdar-ekinci-635811370/", 
      icon: <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    },
    {
      id: "github",
      label: "GitHub",
      subLabel: "Code Repository",
      freq: "CH-02 // 808.2 MHz",
      url: "https://github.com/serdar87",
      icon: <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    },
    {
      id: "twitter",
      label: "Twitter / X",
      subLabel: "Global Comms",
      freq: "CH-03 // 102.9 MHz",
      url: "https://x.com/serdar_ekinc?s=21",
      icon: <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
    },
    {
      id: "mail",
      label: "Secure Mail",
      subLabel: "Encrypted Line",
      freq: "CH-04 // SMTP-SEC",
      // Gmail direkt linki
      url: "https://mail.google.com/mail/?view=cm&fs=1&to=serdarekinci1545@gmail.com",
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    },
    {
      id: "instagram",
      label: "Instagram",
      subLabel: "Visual Log",
      freq: "CH-05 // IMG-UPL",
      url: "https://www.instagram.com/_serdarekinci/",
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    {
      id: "cv",
      label: "Download CV",
      subLabel: "Personnel File",
      freq: "DATA-LINK // PDF",
      url: "https://drive.google.com/file/d/1_axiIqphfOxrTxiRknY5THBCMHyX4mEU/view?usp=sharing",
      isDownload: true,
      icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
    }
  ];

  return (
    <section id="contact" className="contact-wrapper">
      
      <div className="section-header">
        <h3 className="glitch-text" data-text="Comms Array">CONTACT</h3>
        <p className="subtitle">Active Communication Channels</p>
      </div>

      <div className="connection-grid">
        {contactLinks.map((link) => (
          <a 
            key={link.id} 
            href={link.url} 
            className={`comms-card ${link.id} ${link.isDownload ? 'download-mode' : ''}`}
            target={link.isDownload ? "_self" : "_blank"}
            rel="noopener noreferrer"
            download={link.isDownload}
          >
            {/* SOL TARAF */}
            <div className="card-left">
              <div className="status-light"></div>
              <div className="icon-box">
                {link.icon}
              </div>
            </div>

            {/* ORTA */}
            <div className="card-info">
              <span className="freq-code">{link.freq}</span>
              <span className="link-label">{link.label}</span>
              <span className="sub-label">{link.subLabel}</span>
            </div>

            {/* SAĞ: Sinyal Göstergesi */}
            <div className="signal-meter">
              <div className="bar b1"></div>
              <div className="bar b2"></div>
              <div className="bar b3"></div>
              <div className="bar b4"></div>
            </div>

            <div className="scan-overlay"></div>
          </a>
        ))}
      </div>

      <footer className="minimal-footer">
        <span>LOC: Istanbul, TR</span>
        <span className="separator">|</span>
        <span>SYS: Online</span>
        <span className="separator">|</span>
        <span>© {new Date().getFullYear()} Serdar Ekinci</span>
      </footer>

    </section>
  );
};

export default Contact;