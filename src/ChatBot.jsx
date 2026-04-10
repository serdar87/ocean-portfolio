import React from 'react';
import './ChatBot.css';

const ChatBot = ({ sequenceState, onClose }) => {
  // Sadece idle iken hiçbir şey gösterme
  if (sequenceState === 'idle') {
    return null;
  }

  // Hem 'centered' hem 'opened' durumunda arka plan kararacak
  return (
    <div className={`chatbot-sequence-container ${sequenceState}`}>
      
      {/* Ferman / Sohbet Ekranı (Sadece tıpa çekilip 'opened' olunca görünür) */}
      {sequenceState === 'opened' && (
        <div className="ferman-window">
          <div className="chatbot-header">
            <span className="chatbot-title">SYSTEM.LOG // SEYİR SUBAYI YZ</span>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          
          <div className="chatbot-body">
            <div className="ai-message terminal-text">
              <span className="ai-prefix">&gt; AI: </span>
              Kaptan, veri kapsülü başarıyla açıldı. Dijital ferman hizmetinizde. Ne iletmek istersiniz?
            </div>
          </div>
          
          <div className="chatbot-input-area">
            <input type="text" placeholder="Komut girin..." disabled />
            <button disabled>İlet</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChatBot;