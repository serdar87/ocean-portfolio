import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ChatBot.css';

// 1. API Bağlantısını Başlat
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// 2. Yapay Zeka Karakter Profilini Tanımla (System Prompt)
const systemInstruction = `
Senin adın SerdAİ. Sen Serdar Ekinci'nin dijital asistanı ve "Seyir Subayı" yapay zekasısın.
Serdar Ekinci, eski bir Deniz Kuvvetleri subayıdır ve şu an kariyerine Bilgisayar Mühendisi ve Java Backend Developer olarak devam etmektedir.
Ziyaretçilere (özellikle siteyi inceleyen İK uzmanlarına) objektif, analitik ve askeri bir disiplinle cevap vermelisin.
Gereksiz duygusal tepkilerden kaçın, net ve hedefe yönelik bilgiler ver. 
Mesajlarını her zaman kısa ve okunabilir tut. Denizcilik ve yazılım mühendisliği terimlerini harmanlayarak profesyonel bir üslup kullan.
`;

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: systemInstruction,
});

const ChatBot = ({ sequenceState, onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Kaptan, veri kapsülü başarıyla açıldı. Dijital ferman hizmetinizde. Ne iletmek istersiniz?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (sequenceState === 'idle') {
    return null;
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setMessages((prev) => [...prev, { text: userText, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = model.startChat({
        history: messages.slice(1).map((msg) => ({
          role: msg.isBot ? "model" : "user",
          parts: [{ text: msg.text }],
        })),
      });

      const result = await chat.sendMessage(userText);
      const response = await result.response;
      
      setMessages((prev) => [...prev, { text: response.text(), isBot: true }]);
    } catch (error) {
      console.error("API İletişim Hatası:", error);
      setMessages((prev) => [...prev, { text: "[SİSTEM HATASI] Sinyal koptu. İletişim kurulamıyor.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`chatbot-sequence-container ${sequenceState}`}>
      {sequenceState === 'opened' && (
        <div className="ferman-window">
          
          <div className="chatbot-header">
            <span className="chatbot-title">SYSTEM.LOG // SEYİR SUBAYI YZ</span>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div key={index} className="ai-message terminal-text" style={{ opacity: msg.isBot ? 1 : 0.7 }}>
                <span className="ai-prefix" style={{ color: msg.isBot ? '#64ffda' : '#8892b0' }}>
                  &gt; {msg.isBot ? 'SerdAİ' : 'GUEST'}: 
                </span>
                <span style={{ marginLeft: '10px' }}>{msg.text}</span>
              </div>
            ))}
            
            {isLoading && (
              <div className="ai-message terminal-text">
                <span className="ai-prefix">&gt; SYSTEM: </span>
                <span style={{ marginLeft: '10px', fontStyle: 'italic' }}>Veri işleniyor...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input-area">
            <input 
              type="text" 
              placeholder="Komut girin..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()}>
              {isLoading ? '...' : 'İlet'}
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatBot;