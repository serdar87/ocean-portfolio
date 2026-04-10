import { useEffect, useRef, useState } from "react";
import oceanVideo from "./assets/ocean.mp4";
import "./App.css";
import BubbleClick from "./BubbleClick";
import FishFollower from "./FishFollower";
import FishingHook from "./FishingHook";
import Logbook from './Logbook';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';
// --- SES DOSYALARINI İÇERİ AL ---
import soundAmbience from "./assets/underwater.mp3";
import soundSonar from "./assets/sonar.mp3";
import popSound from './assets/Tipa_Acma.mp3';
import openSound from './assets/AI_Acilma.mp3';
import closeSound from './assets/AI_Kapanma.mp3';
//ChatBot 
import ChatBot from "./ChatBot";

export default function App() {
  const [depth, setDepth] = useState(0);
  // --- SES KONTROL STATE'İ ---
  const [isMuted, setIsMuted] = useState(false);

  const sceneRef = useRef(null);

  // --- SES REFERANSLARI (HTML Audio Elementleri) ---
  const ambienceRef = useRef(new Audio(soundAmbience));
  const sonarRef = useRef(new Audio(soundSonar));

  // şişe efekti için
  const [bottleSequence, setBottleSequence] = useState('idle');
  const [corkPos, setCorkPos] = useState({ x: -120, y: -80 }); 
  const [bottlePos, setBottlePos] = useState({ x: 0, y: 0 });
  const [dragTarget, setDragTarget] = useState(null);
  // Sesleri hafızada tutacak obje
 const audioRefs = useRef({});

  // volume = 1 (Tam ses), volume = 0.1 (Kısık ses)
  const playAudio = (soundFile, volume = 1) => { 
    if (!isMuted) {
      if (!audioRefs.current[soundFile]) {
        audioRefs.current[soundFile] = new Audio(soundFile);
      }
      
      const audio = audioRefs.current[soundFile];
      audio.volume = volume; // Sesi burada ayarlıyoruz
      audio.currentTime = 0; 
      audio.play().catch(err => console.log("Ses çalınamadı:", err));
    }
  };
  // Şişenin her hareketini dinleyip doğru sesi çalan otomatik sistem
  useEffect(() => {
    switch (bottleSequence) {
      case 'opened': 
        // 1. Tıpa çekildi
        playAudio(popSound); // "Pop" sesi
        
        // Yarım saniye sonra Yapay Zeka uyanış sesi
        setTimeout(() => {
          playAudio(openSound); 
        }, 400); 
        break;

      case 'repacking': 
        // 2. Çarpıya (X) basıldı, AI kapanıyor / Tıpa yerine dönüyor
        playAudio(closeSound); 
        break;

      default:
        // Diğer hiçbir durumda (fırlatma, üzerine gelme vs.) ses çalma!
        break;
    }
  }, [bottleSequence]);
 // --- SÜRÜKLEME MOTORU (FİZİK VE SÖKME EKLENTİLİ) ---
  useEffect(() => {
    const handleMove = (e) => {
      if (!dragTarget) return;

      const scale = 3;
      const rad = 15 * (Math.PI / 180);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const localX = (e.movementX * cos - e.movementY * sin) / scale;
      const localY = (e.movementX * sin + e.movementY * cos) / scale;

      if (dragTarget === 'cork') {
        setCorkPos(prev => ({ x: prev.x + localX, y: prev.y + localY }));
      } else if (dragTarget === 'bottle') {
        setBottlePos(prev => ({ x: prev.x + localX, y: prev.y + localY }));
      }
    };
    
    const handleUp = () => {
      if (dragTarget === 'cork') {
        // 1. TIPA SÖKME (AÇMA) MANTIĞI
        if (bottleSequence === 'centered') {
          if (corkPos.x < -50) { // Tıpa yeterince sola (dışarı) çekildiyse
            setBottleSequence('opened');
            setCorkPos({ x: -120, y: -80 }); // Ferman kapanınca tıpa havada beklesin diye pozisyonu hazırla
          } else {
            setCorkPos({ x: 0, y: 0 }); // Yeterince çekmediyse "tık" diye geri şişeye otursun
          }
        } 
        // 2. TIPA TAKMA (YENİDEN PAKETLEME) MANTIĞI
        else if (bottleSequence === 'repacking') {
          if (corkPos.x > -60 && corkPos.x < 30 && Math.abs(corkPos.y) < 40) {
            setCorkPos({ x: 0, y: 0 }); 
            setBottleSequence('throwing'); 
            
          }
        }
      } else if (dragTarget === 'bottle') {
        const dist = Math.sqrt(bottlePos.x**2 + bottlePos.y**2);
        if (dist > 80) {
          setBottleSequence('thrown'); 
          setTimeout(() => {
            setBottleSequence('idle'); 
            setBottlePos({ x: 0, y: 0 });
          }, 800);
        } else {
          setBottlePos({ x: 0, y: 0 });
        }
      }
      setDragTarget(null);
    };

    if (dragTarget) {
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    }
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [dragTarget, corkPos, bottlePos, bottleSequence]); // DİKKAT: sürükleme tıpa
  
  // --- ESC TUŞU İLE ÇIKIŞ KONTROLÜ ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setBottleSequence('idle'); // Şişeyi sağ üste geri gönder
        setBottlePos({ x: 0, y: 0 }); // Şişe pozisyonunu sıfırla
        setCorkPos({ x: 0, y: 0 }); // Tıpa pozisyonunu sıfırla
        
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Bileşen ekrandan kalktığında dinleyiciyi temizle
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const depth01 = Math.min(depth / 120, 1);
  const visual01 = Math.min(Math.pow(depth01, 0.55), 1);
  const MAX_DEPTH = 120;
  // Görsel derinlik hissi 
 

  const getMaxScroll = () =>
    Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

  const getStartOffset = () => window.innerHeight * 0.35;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

 // --- YENİ AKILLI DERİNLİK HESAPLAMA ---
  const scrollYToDepth = (scrollY) => {
    // 1. Bölümlerin sayfadaki gerçek yerlerini (piksel olarak) buluyoruz
    const getPos = (id) => {
      const el = document.getElementById(id);
      // Başlık ofseti (100px) ile uyumlu olsun
      return el ? el.offsetTop - 30 : 999999;
    };

    // Bölüm Durakları
    const posAbout = getPos('about');
    const posProjects = getPos('projects');
    const posExp = getPos('experience');
    const posContact = getPos('contact');
    
    // --- AKILLI ORANTILAMA SİSTEMİ ---
    let calculatedDepth = 0;

    if (scrollY < posAbout) {
      // 0m -> 30m
      const progress = scrollY / Math.max(posAbout, 1); 
      calculatedDepth = 0 + progress * 30;

    } else if (scrollY < posProjects) {
      // 30m -> 60m
      const dist = posProjects - posAbout;
      const progress = (scrollY - posAbout) / dist;
      calculatedDepth = 30 + progress * 30;

    } else if (scrollY < posExp) {
      // 60m -> 90m
      const dist = posExp - posProjects;
      const progress = (scrollY - posProjects) / dist;
      calculatedDepth = 60 + progress * 30;

    } else if (scrollY < posContact) {
      // 90m -> 120m
      const dist = posContact - posExp;
      const progress = (scrollY - posExp) / dist;
      calculatedDepth = 90 + progress * 30;

    } else {
      // 120m (Sabit)
      calculatedDepth = 120;
    }

    return Math.min(Math.max(Math.round(calculatedDepth), 0), 120);
  };

  const depthToScrollY = (depth) => {
    const maxScroll = getMaxScroll();
    const startOffset = getStartOffset();
    const usableScroll = Math.max(maxScroll - startOffset, 1);
    const t = clamp(depth / MAX_DEPTH, 0, 1);
    return startOffset + t * usableScroll;
  };

  const goToDepth = (targetDepth) => {
    const y = depthToScrollY(targetDepth);
    
    // --- GÖRSEL DÜZELTME ---
    // Hedefe tam gitme, 100 piksel (veya ekranın %10'u kadar) yukarıda dur.
    // Böylece başlık tarayıcının tavanına yapışmaz, ferah görünür.
    const visualOffset = 150; 

    // Hesaplanan yerden ofseti çıkarıyoruz (Daha yukarıda durması için)
    window.scrollTo({ top: y - visualOffset, behavior: "smooth" });
  };
  // --- YENİ HEDEF KİLİTLEME FONKSİYONU ---
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Başlık tavana yapışmasın diye 100px yukarıda duruyoruz (Ofset)
      const offset = 30; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
// -------------------------------------------------------
  // 🔊 AUDIO ENGINE (SES MOTORU)
  // -------------------------------------------------------
  useEffect(() => {
    // 1. Ayarlar
    ambienceRef.current.loop = true; 
    ambienceRef.current.volume = 0.3; 
    sonarRef.current.loop = true; 
    
    // 2. Mute Kontrolü
    if (isMuted) {
      ambienceRef.current.pause();
      sonarRef.current.pause();
    } else {
      ambienceRef.current.play().catch(e => console.log("Audio play blocked:", e));
      
     if (depth > 90) { 
        if (sonarRef.current.paused) {
          sonarRef.current.play().catch(e => console.log("Sonar play blocked:", e));
        }
        
        // Sesin şiddetini hesapla (0 ile 1 arası)
        const intensity = Math.min(Math.max((depth - 90) / 30, 0), 1);
        
        // --- İŞTE BURASI ---
        // 0.05 yaparak sesi maksimum %5 ile sınırlıyoruz.
        // Böylece en dipte bile sadece "fısıltı" gibi bir sonar duyarsın.
        sonarRef.current.volume = intensity * 0.05;
        
      } else {
        // 90m'den yukarıdaysak sonarı sustur
        sonarRef.current.pause();
        sonarRef.current.currentTime = 0; 
      }
    }
  }, [depth, isMuted]);

  useEffect(() => {
    const onScroll = () => {
      setDepth(scrollYToDepth(window.scrollY));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="scene"
      ref={sceneRef}
      style={{ "--dive": Math.min(depth / 120, 1) }}
    >

   {/* --- AI ŞİŞESİ --- */}
<div 
  className={`sequence-bottle ${bottleSequence}`} 
  onClick={() => {
    // Sadece sağ üstteyken tıklayıp merkeze alıyoruz
    if (bottleSequence === 'idle') {
      setCorkPos({ x: 0, y: 0 }); // Sökmek için tıpanın koordinatını sıfırla
      setBottleSequence('centered');
    }
  }}
>
  <div
      className="technical-bottle"
      style={{
        marginLeft: `${bottlePos.x}px`,
        marginTop: `${bottlePos.y}px`,
        transition: dragTarget === 'bottle' ? 'none' : 'margin 0.3s ease'
      }}
      onPointerDown={(e) => {
        if (bottleSequence === 'throwing') {
          setDragTarget('bottle');
          e.preventDefault();
        }
      }}
    >
    {/* TIPA */}
    <div 
      className="bottle-cork"
      style={{
          // Artık hem takarken hem sökerken x,y koordinatlarına uyacak
          marginLeft: (bottleSequence === 'repacking' || bottleSequence === 'centered') ? `${corkPos.x}px` : '0px',
          marginTop: (bottleSequence === 'repacking' || bottleSequence === 'centered') ? `${corkPos.y}px` : '0px',
          transition: dragTarget === 'cork' ? 'none' : 'margin 0.3s ease'
      }}
      onPointerDown={(e) => {
        // Tıpa artık hem "sökerken(centered)" hem "takarken(repacking)" tutulabilir
        if (bottleSequence === 'repacking' || bottleSequence === 'centered') {
          setDragTarget('cork');
          e.preventDefault();
          e.stopPropagation(); // Şişeye tıklanma olayını engeller
        }
      }}
    ></div>
    <span className="bottle-brand">SerdAI</span>
  </div>
</div>

      {/* --- SES KONTROL BUTONU --- */}
      {/* --- YENİ SES KONTROL PANELİ (KNOB) --- */}
      <div className="audio-control-panel" onClick={() => setIsMuted(!isMuted)}>
        
        {/* Panel Yazıları */}
        <span className="panel-label">SOUND</span>
        
        {/* Dönen Düğme (Knob) */}
        <div className={`knob-base ${!isMuted ? 'active' : ''}`}>
          <div className="knob-indicator"></div>
        </div>

        {/* Durum Işıkları */}
        <div className="led-indicators">
           {/* Kırmızı (Mute) / Yeşil (Active) */}
          <div className={`led ${isMuted ? 'led-red' : 'led-green'}`}></div>
        </div>

      </div>


      {/* --- ARKA PLAN VİDEO KATMANI --- */}
      <div className="bgWrap" aria-hidden="true">
        <video
          className="bgVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            transform: `scale(${1.18 + visual01 * 0.32}) translateY(${-visual01 * 1000}px)`,
          }}
        >
          <source src={oceanVideo} type="video/mp4" />
        </video>
        <div
          className="deepBg"
          style={{ opacity: Math.min(Math.max((depth01 - 0.12) / 0.35, 0), 1) }}
          aria-hidden="true"
        />
      </div>

      <div
        className="seamFeather"
        style={{ opacity: Math.max(0, (depth01 - 0.10) / 0.35) }}
        aria-hidden="true"
      />

      <div className="videoFeatherBottom" aria-hidden="true" />
      <div className="videoFeatherTop" aria-hidden="true" />

      <div
        className="videoContinuation"
        style={{ opacity: Math.min(depth01 * 1.1, 1) }}
        aria-hidden="true"
      />

      {/* Surface mask (İlk scroll'dan sonra yüzeyi kapatır) */}
      <div
        className="surfaceMask"
        style={{ opacity: depth > 2 ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Derinlik Katmanları (Karanlıklaştırma efektleri) */}
      <div
        className="depthDark"
        style={{ opacity: 0.15 + depth01 * 0.75 }}
        aria-hidden="true"
      />

      <div
        className="depthBlue"
        style={{ opacity: depth01 * 0.55 }}
        aria-hidden="true"
      />

      <div
        className="depthHaze"
        style={{ opacity: depth01 * 0.35 }}
        aria-hidden="true"
      />
      <div className="depthOverlay" style={{ opacity: depth / 120 }} />


      {/* --- HUD (SAĞDAKİ NAVİGASYON PANELİ) --- */}
      <aside className="hud">
       
        <div className="gauge">
          <div className="gaugeFace" aria-hidden="true" />
          <div className="hudRadial" aria-label="Quick dive navigation">
            
            {/* 30m: ABOUT ME (ID: about) */}
            <button className="radialPill aAbout" onClick={() => scrollToSection('about')}>
              <span className="pillDepth">30m</span>
              <span className="pillLabel">ABOUT</span>
            </button>

            {/* 60m: PROJECTS (ID: projects) */}
            <button className="radialPill aProjects" onClick={() => scrollToSection('projects')}>
              <span className="pillDepth">60m</span>
              <span className="pillLabel">PROJECTS</span>
            </button>

            {/* 90m: EXPERIENCE (ID: experience) */}
            <button className="radialPill aExp" onClick={() => scrollToSection('experience')}>
              <span className="pillDepth">90m</span>
              <span className="pillLabel">EXPERIENCE</span>
            </button>

            {/* 120m: CONTACT (ID: contact) */}
            <button className="radialPill aContact" onClick={() => scrollToSection('contact')}>
              <span className="pillDepth">120m</span>
              <span className="pillLabel">CONTACT</span>
            </button>

            {/* 0m: LOGBOOK (En tepe için özel istisna) */}
            <button className="radialPill aLogbook" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="pillDepth">0m</span>
              <span className="pillLabel">LOGBOOK</span>
            </button>
          </div>

          {/* Gösterge Rakamları */}
          <div className="tick t0">0</div>
          <div className="tick t30">30</div>
          <div className="tick t60">60</div>
          <div className="tick t90">90</div>
          <div className="tick t120">120</div>

          {/* İbre (Needle) */}
          {(() => {
            const t = Math.min(depth / 120, 1);
            const startAngle = -140;
            const sweep = 280;
            const angle = startAngle + t * sweep;
            return (
              <div
                className={`needle ${depth >= 112 ? "needleCritical" : ""}`}
                style={{
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  "--angle": `${angle}deg`,
                }}
                aria-hidden="true"
              />
            );
          })()}

          <div 
            className={`hub ${depth >= 112 ? "hubCritical" : ""}`} 
            aria-hidden="true" 
          />
          <div className="readout">{depth} m</div>
        </div>

        
      </aside>

      {/* --- ANA İÇERİK BÖLÜMÜ --- */}
      <main className="content">
        <div className="kicker">PORTFOLIO LOGBOOK</div>
        <h1 className="title waveText">Serdar Ekinci</h1>
        <p className="roleLine">
          Full-Stack Developer · Computer Engineer with a Focus on AI & Technology
        </p>

        {/* 0m: LOGBOOK */}
        <div className="depthSlot start">
          <Logbook />
        </div>

        {/* 30m: ABOUT */}
        <div className="depthSlot">
          <About />
        </div>

        {/* 60m: PROJECTS */}
        <div className="depthSlot">
          <section id="projects">
            <Projects />
          </section>
        </div>

        {/* 90m: EXPERIENCE */}
        <div className="depthSlot" style={{ marginTop: '100px' }}>
          <section id="experience">
            <Experience />
          </section>
        </div>

        {/* 120m: CONTACT */}
        <div className="depthSlot" style={{ marginTop: '210px', paddingBottom: '50px' }}>
          <section id="contact">
            <Contact />
          </section>
        </div>
      </main>

      {/* Tıklama Efekti */}
      <BubbleClick />

      <FishFollower />

      <FishingHook />

      <ChatBot 
          sequenceState={bottleSequence}
          onClose={() => {
            setBottleSequence('repacking');
          }}
        />
      
    </div>
  );
}